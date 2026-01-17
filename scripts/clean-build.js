#!/usr/bin/env node

/**
 * 清理 Next.js 构建输出中的缓存文件
 * 用于 Cloudflare Pages 部署，避免文件大小超过 25 MiB 限制
 */

const fs = require('fs')
const path = require('path')

const nextDir = path.join(__dirname, '..', '.next')

if (!fs.existsSync(nextDir)) {
  console.log('⚠️  .next 目录不存在，跳过清理')
  process.exit(0)
}

console.log('🧹 开始清理构建缓存...')

// 清理缓存目录
const cacheDir = path.join(nextDir, 'cache')
if (fs.existsSync(cacheDir)) {
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true })
    console.log('✅ 已删除 .next/cache 目录')
  } catch (error) {
    console.error('❌ 删除 .next/cache 失败:', error.message)
  }
}

// 清理 webpack 缓存文件（如果存在）
const webpackCacheDir = path.join(nextDir, 'cache', 'webpack')
if (fs.existsSync(webpackCacheDir)) {
  try {
    fs.rmSync(webpackCacheDir, { recursive: true, force: true })
    console.log('✅ 已删除 .next/cache/webpack 目录')
  } catch (error) {
    // 可能已经被上面的删除操作清理了
  }
}

// 查找并删除所有 .pack 文件（webpack 缓存文件）
function findAndDeletePackFiles(dir) {
  if (!fs.existsSync(dir)) {
    return
  }

  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      findAndDeletePackFiles(fullPath)
    } else if (file.name.endsWith('.pack')) {
      try {
        const stats = fs.statSync(fullPath)
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
        fs.unlinkSync(fullPath)
        console.log(`✅ 已删除大文件: ${file.name} (${sizeMB} MB)`)
      } catch (error) {
        console.error(`❌ 删除文件失败 ${file.name}:`, error.message)
      }
    }
  }
}

// 在整个 .next 目录中查找 .pack 文件
findAndDeletePackFiles(nextDir)

// 检查清理后的目录大小
function getDirectorySize(dir) {
  if (!fs.existsSync(dir)) {
    return 0
  }

  let size = 0
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      size += getDirectorySize(fullPath)
    } else {
      try {
        const stats = fs.statSync(fullPath)
        size += stats.size
      } catch (error) {
        // 忽略无法访问的文件
      }
    }
  }

  return size
}

const totalSize = getDirectorySize(nextDir)
const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2)

console.log(`📊 .next 目录总大小: ${totalSizeMB} MB`)

if (totalSize > 25 * 1024 * 1024) {
  console.warn('⚠️  警告: .next 目录仍然超过 25 MB，可能需要进一步清理')
} else {
  console.log('✅ 清理完成，目录大小符合 Cloudflare Pages 要求')
}

console.log('✅ 构建清理完成')
