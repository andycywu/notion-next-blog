const fs = require('fs');
const path = require('path');

const OUT_DIR = path.resolve(__dirname, '../out');
const ARTICLE_DIR = path.join(OUT_DIR, 'article');
const OUTPUT_FILE = path.join(OUT_DIR, 'notebooklm_corpus.md');

// Simple HTML Entity decoder
function decodeHTMLEntities(text) {
    const entities = {
        '&nbsp;': ' ',
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&quot;': '"',
        '&#39;': "'",
        '&copy;': '©'
    };
    return text.replace(/&[a-zA-Z0-9#]+;/g, match => entities[match] || match);
}

function getAllFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            if (file.endsWith('.html')) {
                fileList.push(filePath);
            }
        }
    });
    return fileList;
}

function extractContent(html) {
    // 1. Extract Article Block
    // Matches <article id="article-wrapper" ... > ... </article>
    const articleRegex = /<article id="article-wrapper"[^>]*>([\s\S]*?)<\/article>/i;
    const match = html.match(articleRegex);

    if (!match) return null;
    let contentHtml = match[1];

    // 2. Remove Scripts and Styles
    contentHtml = contentHtml.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "");
    contentHtml = contentHtml.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gim, "");

    // 3. Strip Tags but preserve newlines for blocks
    // Replace block tags with newlines
    const blockTags = ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'br', 'li', 'tr'];
    const blockRegex = new RegExp(`<(${blockTags.join('|')})\\b[^>]*>`, 'gi');
    contentHtml = contentHtml.replace(blockRegex, '\n');

    // Remove all other tags
    let text = contentHtml.replace(/<[^>]+>/g, ' ');

    // 4. Decode entities
    text = decodeHTMLEntities(text);

    // 5. Cleanup whitespace
    text = text.replace(/\s+/g, ' ').trim();

    return text;
}

function extractTitle(html) {
    const titleRegex = /<title>([^<]*)<\/title>/i;
    const match = html.match(titleRegex);
    return match ? decodeHTMLEntities(match[1]) : 'Untitled';
}

function generateCorpus() {
    console.log('📚 Starting Corpus Generation (Regex Mode)...');

    if (!fs.existsSync(ARTICLE_DIR)) {
        console.error(`❌ Article directory not found: ${ARTICLE_DIR}`);
        console.log('   Please run "npm run export" first.');
        process.exit(1);
    }

    const files = getAllFiles(ARTICLE_DIR);
    console.log(`🔍 Found ${files.length} article files.`);

    let corpusContent = '# Notion Blog Corpus\n\nGenerated on: ' + new Date().toISOString() + '\n\n';

    let count = 0;
    for (const file of files) {
        try {
            const html = fs.readFileSync(file, 'utf8');

            const title = extractTitle(html);
            const content = extractContent(html);

            if (content) {
                const relativePath = path.relative(OUT_DIR, file);
                const url = `/${relativePath.replace('.html', '')}`;

                corpusContent += `## ${title}\n`;
                corpusContent += `**URL:** ${url}\n\n`;
                corpusContent += `${content}\n\n`;
                corpusContent += `---\n\n`;

                count++;
                if (count % 10 === 0) process.stdout.write('.');
            } else {
                // console.warn(`⚠️  No article content found for ${path.basename(file)}`);
            }

        } catch (err) {
            console.error(`❌ Error processing ${file}:`, err.message);
        }
    }

    // Also write to public so it is included in future builds if needed, 
    // but mostly users need it in 'out' for deployment.
    fs.writeFileSync(OUTPUT_FILE, corpusContent);

    // Optional: Copy to public for dev convenience
    // const PUBLIC_FILE = path.resolve(__dirname, '../public/notebooklm_corpus.md');
    // fs.writeFileSync(PUBLIC_FILE, corpusContent);

    console.log(`\n✅ Corpus generated at: ${OUTPUT_FILE}`);
    console.log(`📊 Total articles processed: ${count}`);
}

generateCorpus();
