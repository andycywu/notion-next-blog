# 🔧 修复构建命令问题

## 问题分析

从构建日志看到：

1. **Cloudflare 使用了 Bun**（检测到 bun.lockb）
2. **Bun 安装依赖后**，生成了 `bun.lockb`，但没有 `package-lock.json`
3. **构建命令 `npm ci` 失败**，因为 `npm ci` 需要 `package-lock.json`

## ✅ 解决方案

### 方案一：修改构建命令（推荐）

在 Cloudflare Dashboard 中修改构建命令为：

```
npm install && npm run build
```

而不是 `npm ci && npm run build`

### 方案二：确保 package-lock.json 被提交

如果 `package-lock.json` 在 `.gitignore` 中，需要：

1. 从 `.gitignore` 中移除 `package-lock.json`
2. 提交 `package-lock.json` 到 Git
3. 然后可以使用 `npm ci`

### 方案三：阻止使用 Bun

创建 `.npmrc` 或修改构建命令强制使用 npm。

## 📋 推荐的 Cloudflare 构建设置

在 Cloudflare Dashboard 中设置：

| 设置项 | 值 |
|--------|-----|
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `.next` |
| **Node version** | `20` |

## 说明

- `npm install` 会创建或更新 `package-lock.json`
- `npm ci` 需要已存在的 `package-lock.json`，适合 CI/CD 环境
- 如果 `package-lock.json` 不在 Git 中，使用 `npm install` 更安全
