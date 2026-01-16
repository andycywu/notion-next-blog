const fs = require('fs')
const path = require('path')
const BLOG = require('../blog.config')

function checkDeployment() {
  console.log('🔍 Starting Deployment Check...')
  const errors = []
  const warnings = []

  // 1. Check Key Environment Variables
  const requiredEnv = ['NOTION_PAGE_ID']
  requiredEnv.forEach(env => {
    if (!process.env[env] && !BLOG.NOTION_PAGE_ID) {
       // Check if it's in blog.config.js as fallback
       errors.push(`❌ Missing Environment Variable: ${env}`)
    }
  })

  // 2. Check Configuration
  if (!BLOG.NOTION_PAGE_ID) {
      errors.push('❌ NOTION_PAGE_ID is not configured in blog.config.js or environment variables.')
  } else {
      console.log('✅ NOTION_PAGE_ID found.')
  }

  // 3. Check Package.json scripts
  const packageJson = require('../package.json')
  if (!packageJson.scripts.export) {
      errors.push('❌ Missing "export" script in package.json. Cloudflare Pages requires "next export" or "output: export" config.')
  } else {
      console.log('✅ Export script found.')
  }

  // 4. Recommend Settings
  console.log('\n📋 Cloudflare Pages Configuration Recommendation:')
  console.log('   - Build Command: npm run export')
  console.log('   - Build Output Directory: out')
  console.log('   - Environment Variables: Ensure NOTION_PAGE_ID is set in Cloudflare Dashboard')

  if (errors.length > 0) {
    console.error('\n🚫 Deployment Check Failed with Errors:')
    errors.forEach(e => console.error(e))
    process.exit(1)
  } else {
    console.log('\n✅ Deployment Check Passed! You verify the build locally with: npm run export')
  }
}

checkDeployment()
