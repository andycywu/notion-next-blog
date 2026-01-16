# 🎯 最终部署指南

## ✅ 已完成的工作

1. ✅ **LinkedIn 链接已配置**
   - 已添加到配置文件
   - 已设置到 Cloudflare：`NEXT_PUBLIC_CONTACT_LINKEDIN = https://www.linkedin.com/in/andycywu/`

2. ✅ **Cloudflare Pages 项目已创建**
   - 项目名称：`notion-next-blog`
   - 项目 URL：https://notion-next-blog.pages.dev（部署后可用）

3. ✅ **代码已推送到 GitHub**
   - 仓库：`andycywu/notion-next-blog`
   - 分支：`main`

4. ✅ **配置文件已准备**
   - `wrangler.toml` - Cloudflare 配置
   - 所有部署文档已创建

## 🚀 立即部署（3 步完成）

### 步骤 1: 访问 Cloudflare Dashboard

打开浏览器，访问：**https://dash.cloudflare.com/**

### 步骤 2: 连接 Git 仓库并设置环境变量

1. 在左侧菜单选择 **Pages**
2. 点击项目 **notion-next-blog**
3. 点击 **Connect to Git** 按钮
4. 授权 Cloudflare 访问您的 GitHub
5. 选择仓库：`andycywu/notion-next-blog`
6. 分支：`main`
7. 配置构建设置：
   - **Framework preset**: Next.js（自动检测）
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`（或留空）

8. **重要：设置环境变量**
   - 在构建设置页面找到 **Environment variables**
   - 点击 **Add variable**
   - 添加以下变量：

   **必需：**
   ```
   变量名: NOTION_PAGE_ID
   值: 02ab3b8678004aa69e9e415905ef32a5
   （这是默认模板 ID，如果您有自己的 Notion 页面，请使用您的页面 ID）
   类型: Secret（推荐）
   环境: Production（或 Apply to all environments）
   ```

   **已配置（无需重复设置）：**
   ```
   NEXT_PUBLIC_CONTACT_LINKEDIN = https://www.linkedin.com/in/andycywu/
   ```

   **可选（推荐设置）：**
   ```
   NEXT_PUBLIC_AUTHOR = Andy C. Y. Wu
   NEXT_PUBLIC_BIO = 您的简介
   NEXT_PUBLIC_LINK = https://notion-next-blog.pages.dev
   NEXT_PUBLIC_TITLE = 您的博客标题
   ```

### 步骤 3: 部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约 3-5 分钟）
3. 构建完成后，访问：**https://notion-next-blog.pages.dev**

## 📋 部署检查清单

部署前确认：
- [ ] 已登录 Cloudflare Dashboard
- [ ] 已连接 GitHub 仓库
- [ ] 已设置 `NOTION_PAGE_ID` 环境变量
- [ ] LinkedIn 链接已配置（已完成 ✅）

部署后验证：
- [ ] 网站可以正常访问
- [ ] LinkedIn 链接显示在社交按钮中
- [ ] 点击 LinkedIn 链接跳转到 https://www.linkedin.com/in/andycywu/
- [ ] 博客内容正常显示

## 🔍 如何获取自己的 Notion 页面 ID

如果您想使用自己的 Notion 页面：

1. 打开您的 Notion 页面
2. 点击右上角 **Share** > **Copy link**
3. 链接格式：`https://www.notion.so/Your-Page-Name-XXXXXXXXXXXXX`
4. 其中 `XXXXXXXXXXXXX`（32 位字符）就是您的页面 ID
5. 在 Cloudflare Dashboard 中更新 `NOTION_PAGE_ID` 环境变量

**注意：** 如果您的 Notion 页面是私有的，需要：
- 将页面设置为 **Public**，或
- 设置 `NOTION_TOKEN_V2` 和 `NOTION_ACTIVE_USER` 环境变量（Secret 类型）

## 🎉 完成！

部署完成后，您的博客将：
- ✅ 自动从 GitHub 同步更新
- ✅ 每次推送代码到 `main` 分支都会自动重新部署
- ✅ 显示您的 LinkedIn 个人名片链接
- ✅ 拥有 Cloudflare 的全球 CDN 加速

## 📞 需要帮助？

- **详细文档**: [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- **快速指南**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
- **部署步骤**: [DEPLOY_STEPS.md](./DEPLOY_STEPS.md)

---

**现在就访问 Cloudflare Dashboard 开始部署吧！** 🚀

https://dash.cloudflare.com/
