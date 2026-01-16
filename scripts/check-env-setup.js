#!/usr/bin/env node

/**
 * 检查 Cloudflare Pages 环境变量设置
 * 帮助用户验证配置是否正确
 */

const BLOG = require('../blog.config')

console.log('🔍 检查环境变量配置...\n')
console.log('='.repeat(60))

// 检查必需的环境变量
const requiredEnvVars = {
  NOTION_PAGE_ID: {
    name: 'NOTION_PAGE_ID',
    description: 'Notion 数据库页面 ID',
    required: true,
    example: '02ab3b8678004aa69e9e415905ef32a5',
    current: process.env.NOTION_PAGE_ID || BLOG.NOTION_PAGE_ID || '未设置'
  }
}

// 检查推荐的环境变量
const recommendedEnvVars = {
  NEXT_PUBLIC_CONTACT_LINKEDIN: {
    name: 'NEXT_PUBLIC_CONTACT_LINKEDIN',
    description: 'LinkedIn 链接',
    required: false,
    example: 'https://www.linkedin.com/in/andycywu/',
    current: process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || BLOG.CONTACT_LINKEDIN || '未设置'
  },
  NEXT_PUBLIC_AUTHOR: {
    name: 'NEXT_PUBLIC_AUTHOR',
    description: '作者名称',
    required: false,
    example: 'Andy C. Y. Wu',
    current: process.env.NEXT_PUBLIC_AUTHOR || BLOG.AUTHOR || '未设置'
  },
  NEXT_PUBLIC_LINK: {
    name: 'NEXT_PUBLIC_LINK',
    description: '网站地址',
    required: false,
    example: 'https://notion-next-blog.andycywu.workers.dev',
    current: process.env.NEXT_PUBLIC_LINK || BLOG.LINK || '未设置'
  },
  NEXT_PUBLIC_THEME: {
    name: 'NEXT_PUBLIC_THEME',
    description: '主题名称',
    required: false,
    example: 'simple',
    current: process.env.NEXT_PUBLIC_THEME || BLOG.THEME || '未设置'
  }
}

let hasErrors = false
let hasWarnings = false

// 检查必需变量
console.log('\n📋 必需环境变量：\n')
Object.values(requiredEnvVars).forEach(env => {
  const isSet = env.current !== '未设置' && env.current
  const status = isSet ? '✅' : '❌'
  const statusText = isSet ? '已设置' : '未设置'
  
  console.log(`${status} ${env.name}`)
  console.log(`   描述: ${env.description}`)
  console.log(`   状态: ${statusText}`)
  if (isSet) {
    console.log(`   当前值: ${env.current}`)
  } else {
    console.log(`   示例值: ${env.example}`)
    console.log(`   ⚠️  需要在 Cloudflare Dashboard 中设置此变量`)
    hasErrors = true
  }
  console.log('')
})

// 检查推荐变量
console.log('\n📝 推荐环境变量：\n')
Object.values(recommendedEnvVars).forEach(env => {
  const isSet = env.current !== '未设置' && env.current
  const status = isSet ? '✅' : '⚠️'
  const statusText = isSet ? '已设置' : '未设置（可选）'
  
  console.log(`${status} ${env.name}`)
  console.log(`   描述: ${env.description}`)
  console.log(`   状态: ${statusText}`)
  if (isSet) {
    console.log(`   当前值: ${env.current}`)
  } else {
    console.log(`   示例值: ${env.example}`)
    hasWarnings = true
  }
  console.log('')
})

// 验证 NOTION_PAGE_ID 格式
if (requiredEnvVars.NOTION_PAGE_ID.current !== '未设置') {
  const pageId = requiredEnvVars.NOTION_PAGE_ID.current
  const isValidFormat = /^[a-f0-9]{32}$/i.test(pageId.split(',')[0].trim().split(':').pop())
  
  if (!isValidFormat) {
    console.log('⚠️  警告: NOTION_PAGE_ID 格式可能不正确')
    console.log('   Notion 页面 ID 应该是 32 位十六进制字符串')
    console.log(`   当前值: ${pageId}`)
    hasWarnings = true
  } else {
    console.log('✅ NOTION_PAGE_ID 格式正确')
  }
}

// 总结
console.log('\n' + '='.repeat(60))
console.log('\n📊 检查结果总结：\n')

if (hasErrors) {
  console.log('❌ 发现必需的环境变量未设置')
  console.log('\n🔧 解决步骤：')
  console.log('1. 访问 Cloudflare Dashboard: https://dash.cloudflare.com/')
  console.log('2. 进入 Pages > notion-next-blog > Settings > Environment variables')
  console.log('3. 添加必需的环境变量')
  console.log('4. 重新部署项目')
  console.log('\n📖 详细说明请查看: 设置指南.md')
  process.exit(1)
} else if (hasWarnings) {
  console.log('✅ 必需的环境变量已设置')
  console.log('⚠️  建议设置推荐的环境变量以优化体验')
  console.log('\n📖 详细说明请查看: 设置指南.md')
  process.exit(0)
} else {
  console.log('✅ 所有环境变量配置正确！')
  console.log('\n🎉 您的配置看起来很好，可以开始使用了！')
  process.exit(0)
}
