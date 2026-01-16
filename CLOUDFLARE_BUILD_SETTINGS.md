# ⚙️ Cloudflare Pages 构建设置

## 🎯 推荐设置

在 Cloudflare Dashboard 中设置以下配置：

### 构建配置

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | Next.js |
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `.next` |
| **Root directory** | `/` |
| **Node version** | `20` |

### 环境变量

确保设置以下环境变量：

- `NOTION_PAGE_ID` = `02ab3b8678004aa69e9e415905ef32a5`
- `NEXT_PUBLIC_CONTACT_LINKEDIN` = `https://www.linkedin.com/in/andycywu/`

## 📝 说明

### 为什么使用 `npm install` 而不是 `npm ci`？

- `npm ci` 需要已存在的 `package-lock.json` 文件
- 如果 `package-lock.json` 不在 Git 仓库中，`npm ci` 会失败
- `npm install` 会自动创建或更新 `package-lock.json`
- 现在 `package-lock.json` 已提交到 Git，两种方式都可以使用

### 如果 Cloudflare 使用 Bun

如果 Cloudflare 检测到 Bun 并使用它：

1. **方案一**：修改构建命令为 `npm install && npm run build`（推荐）
2. **方案二**：在构建命令前添加 `rm -f bun.lockb && npm install && npm run build`

## ✅ 验证

构建成功后：
- [ ] 构建日志显示使用 npm
- [ ] 构建成功完成
- [ ] 网站可以正常访问：https://notion-next-blog.pages.dev
- [ ] LinkedIn 链接正常显示
