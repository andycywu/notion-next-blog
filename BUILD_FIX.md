# 🔧 Cloudflare Pages 构建失败修复指南

## 问题分析

从您的构建日志看到：

1. **Cloudflare 使用了 Yarn**（因为检测到 `yarn.lock`）
2. **依赖警告**：
   - `@testing-library/dom` 缺失（已修复 ✅）
   - React 版本冲突（警告，不影响构建）

## ✅ 已修复

我已经：
- ✅ 添加了缺失的 `@testing-library/dom` 依赖
- ✅ 创建了 `.nvmrc` 文件指定 Node.js 版本

## 🚀 解决方案

### 方案一：在 Cloudflare Dashboard 中配置（推荐）

1. **进入 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com/
   - 进入 **Pages** > **notion-next-blog** > **Settings**

2. **修改构建设置**
   - 找到 **Builds & deployments** 部分
   - 修改 **Build command** 为：
     ```
     npm install --legacy-peer-deps && npm run build
     ```
   - **Build output directory**: `.next`
   - **Node version**: `20`（或留空，会自动使用 .nvmrc）

3. **或者强制使用 npm**
   - 在 **Environment variables** 中添加：
     ```
     变量名: NPM_FLAGS
     值: --legacy-peer-deps
     环境: Production
     ```

### 方案二：删除 yarn.lock（如果主要使用 npm）

如果您主要使用 npm，可以删除 yarn.lock：

```bash
git rm yarn.lock
git commit -m "Remove yarn.lock, use npm only"
git push origin main
```

这样 Cloudflare 会自动使用 npm。

## 📋 推荐的 Cloudflare Pages 构建设置

在 Cloudflare Dashboard 中设置：

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | Next.js |
| **Build command** | `npm install --legacy-peer-deps && npm run build` |
| **Build output directory** | `.next` |
| **Root directory** | `/` |
| **Node version** | `20` |

## 🔍 环境变量检查

确保已设置：

- ✅ `NOTION_PAGE_ID` = `02ab3b8678004aa69e9e415905ef32a5`
- ✅ `NEXT_PUBLIC_CONTACT_LINKEDIN` = `https://www.linkedin.com/in/andycywu/`

## 📝 下一步

1. **提交修复**
   ```bash
   git add package.json package-lock.json .nvmrc
   git commit -m "Fix build dependencies: add @testing-library/dom"
   git push origin main
   ```

2. **在 Cloudflare Dashboard 中更新构建命令**
   - 使用上面的推荐设置

3. **重新部署**
   - Cloudflare 会自动检测新的 commit 并重新构建
   - 或手动触发重新部署

## ✅ 验证

构建成功后，检查：
- [ ] 构建日志没有错误
- [ ] 网站可以正常访问
- [ ] LinkedIn 链接正常显示

---

**现在提交更改并更新 Cloudflare 构建配置即可！** 🚀
