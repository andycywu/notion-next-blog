#!/usr/bin/env node

/**
 * 检查 Cloudflare Pages 部署配置
 * 帮助诊断网页无法显示的问题
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 检查 Cloudflare Pages 部署配置...\n')
console.log('='.repeat(60))

const issues = []
const warnings = []

// 1. 检查 next.config.js
console.log('\n📋 检查 Next.js 配置...')
const nextConfigPath = path.join(__dirname, '..', 'next.config.js')
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf-8')
  
  // 检查 output 配置
  if (nextConfig.includes('output:')) {
    if (nextConfig.includes('output: \'export\'')) {
      console.log('✅ Next.js 配置为静态导出模式')
    } else if (nextConfig.includes('output: \'standalone\'')) {
      warnings.push('⚠️  Next.js 配置为 standalone 模式，Cloudflare Pages 可能不完全支持')
    } else {
      console.log('ℹ️  Next.js 使用默认输出模式（SSR/SSG）')
      console.log('   这应该可以在 Cloudflare Pages 上工作')
    }
  }
} else {
  issues.push('❌ 找不到 next.config.js 文件')
}

// 2. 检查 wrangler.toml
console.log('\n📋 检查 wrangler.toml 配置...')
const wranglerPath = path.join(__dirname, '..', 'wrangler.toml')
if (fs.existsSync(wranglerPath)) {
  const wranglerConfig = fs.readFileSync(wranglerPath, 'utf-8')
  
  if (wranglerConfig.includes('pages_build_output_dir')) {
    const match = wranglerConfig.match(/pages_build_output_dir\s*=\s*["']?([^"'\s]+)["']?/)
    if (match) {
      console.log(`✅ 构建输出目录: ${match[1]}`)
      if (match[1] !== '.next') {
        warnings.push(`⚠️  构建输出目录是 ${match[1]}，确保 Cloudflare Dashboard 中设置一致`)
      }
    }
  }
  
  if (wranglerConfig.includes('name =')) {
    const match = wranglerConfig.match(/name\s*=\s*["']?([^"'\s]+)["']?/)
    if (match) {
      console.log(`✅ 项目名称: ${match[1]}`)
    }
  }
} else {
  warnings.push('⚠️  找不到 wrangler.toml 文件（可选）')
}

// 3. 检查清理脚本
console.log('\n📋 检查清理脚本...')
const cleanScriptPath = path.join(__dirname, 'clean-build.js')
if (fs.existsSync(cleanScriptPath)) {
  console.log('✅ 清理脚本存在: scripts/clean-build.js')
} else {
  warnings.push('⚠️  清理脚本不存在，可能导致文件大小问题')
}

// 4. 检查 package.json
console.log('\n📋 检查 package.json...')
const packageJsonPath = path.join(__dirname, '..', 'package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  
  if (packageJson.scripts.postbuild) {
    console.log('✅ postbuild 脚本已配置')
    if (packageJson.scripts.postbuild.includes('clean-build')) {
      console.log('✅ 清理脚本会在构建后自动运行')
    }
  } else {
    warnings.push('⚠️  package.json 中没有 postbuild 脚本')
  }
  
  if (packageJson.scripts.build) {
    console.log(`✅ 构建命令: ${packageJson.scripts.build}`)
  }
} else {
  issues.push('❌ 找不到 package.json 文件')
}

// 5. 检查 .next 目录（如果存在）
console.log('\n📋 检查构建输出...')
const nextDir = path.join(__dirname, '..', '.next')
if (fs.existsSync(nextDir)) {
  console.log('✅ .next 目录存在')
  
  // 检查缓存目录
  const cacheDir = path.join(nextDir, 'cache')
  if (fs.existsSync(cacheDir)) {
    warnings.push('⚠️  .next/cache 目录存在，应该被清理脚本删除')
  } else {
    console.log('✅ .next/cache 目录已清理')
  }
  
  // 检查静态文件
  const staticDir = path.join(nextDir, 'static')
  if (fs.existsSync(staticDir)) {
    console.log('✅ .next/static 目录存在（必需）')
  } else {
    warnings.push('⚠️  .next/static 目录不存在，可能需要重新构建')
  }
  
  // 检查服务器文件
  const serverDir = path.join(nextDir, 'server')
  if (fs.existsSync(serverDir)) {
    console.log('✅ .next/server 目录存在（用于 SSR/API）')
  }
} else {
  warnings.push('⚠️  .next 目录不存在（可能需要先构建）')
}

// 总结
console.log('\n' + '='.repeat(60))
console.log('\n📊 检查结果总结：\n')

if (issues.length > 0) {
  console.log('❌ 发现严重问题：')
  issues.forEach(issue => console.log(`   ${issue}`))
  console.log('')
}

if (warnings.length > 0) {
  console.log('⚠️  警告：')
  warnings.forEach(warning => console.log(`   ${warning}`))
  console.log('')
}

if (issues.length === 0 && warnings.length === 0) {
  console.log('✅ 配置检查通过！')
} else if (issues.length === 0) {
  console.log('✅ 没有严重问题，但有一些警告需要注意')
}

// 提供建议
console.log('\n💡 建议检查：\n')

console.log('1. 环境变量设置：')
console.log('   - 在 Cloudflare Dashboard 中确认 NOTION_PAGE_ID 已设置')
console.log('   - 值应该是: 02ab3b8678004aa69e9e415905ef32a5')
console.log('')

console.log('2. 访问 URL：')
console.log('   - 确认访问的是 *.pages.dev URL（不是 *.workers.dev）')
console.log('   - 在 Cloudflare Dashboard > Pages > blog-andycywu 中查看部署 URL')
console.log('')

console.log('3. 浏览器控制台：')
console.log('   - 按 F12 打开开发者工具')
console.log('   - 查看 Console 和 Network 标签的错误信息')
console.log('')

console.log('4. 重新部署：')
console.log('   - 如果修改了环境变量，需要重新部署')
console.log('   - 在 Deployments 页面点击 Retry deployment')
console.log('')

console.log('📖 详细排查指南请查看: 网页无法显示-排查指南.md')
console.log('')
