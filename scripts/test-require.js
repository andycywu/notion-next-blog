try {
    const { getGlobalData } = require('../lib/db/getSiteData');
    console.log('Require works', typeof getGlobalData);
} catch (e) {
    console.error('Require failed:', e.message);
}
