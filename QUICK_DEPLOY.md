# 🚀 快速部署指南

## 当前状态

✅ Cloudflare Pages 项目已创建：`notion-next-blog`  
✅ LinkedIn 链接已配置：`https://www.linkedin.com/in/andycywu/`  
✅ 代码已推送到 GitHub：`andycywu/notion-next-blog`

## 立即部署（推荐方式）

### 方式一：通过 Cloudflare Dashboard（最简单，推荐）

1. **访问 Cloudflare Dashboard**
   - 打开：https://dash.cloudflare.com/
   - 登录您的账号（andywu719@gmail.com）

2. **连接 Git 仓库**
   - 进入 **Pages** > **notion-next-blog**
   - 点击 **Connect to Git** 或 **Create deployment**
   - 选择 **Connect to Git**
   - 授权访问 GitHub
   - 选择仓库：`andycywu/notion-next-blog`
   - 分支：`main`

3. **配置构建设置**
   - Framework preset: **Next.js**（自动检测）
   - Build command: `npm run build`
   - Build output directory: `.next`（或留空，Next.js 会自动处理）
   - Root directory: `/`（根目录）

4. **设置环境变量**
   - 在构建设置页面，找到 **Environment variables**
   - 点击 **Add variable**
   - 添加以下变量：

   **必需变量：**
   ```
   NOTION_PAGE_ID = 您的 Notion 页面 ID
   ```
   （如果使用默认模板，可以使用：`02ab3b8678004aa69e9e415905ef32a5`）

   **已配置的变量：**
   ```
   NEXT_PUBLIC_CONTACT_LINKEDIN = https://www.linkedin.com/in/andycywu/
   ```

   **可选变量（推荐）：**
   ```
   NEXT_PUBLIC_AUTHOR = Andy C. Y. Wu
   NEXT_PUBLIC_BIO = 您的简介
   NEXT_PUBLIC_LINK = https://yourdomain.com
   NEXT_PUBLIC_TITLE = 您的博客标题
   ```

5. **部署**
   - 点击 **Save and Deploy**
   - 等待构建完成（约 3-5 分钟）
   - 部署完成后访问：`https://notion-next-blog.pages.dev`

---

### 方式二：使用 CLI 部署

如果您想使用命令行部署，请按以下步骤：

#### 1. 设置环境变量

```bash
# 设置 Notion 页面 ID（必需）
npx wrangler pages secret put NOTION_PAGE_ID --project-name=notion-next-blog
# 输入您的 Notion 页面 ID

# LinkedIn 链接已设置，无需重复设置
# 如需设置其他变量：
npx wrangler pages secret put NEXT_PUBLIC_AUTHOR --project-name=notion-next-blog
npx wrangler pages secret put NEXT_PUBLIC_BIO --project-name=notion-next-blog
```

#### 2. 构建项目

```bash
npm run build
```

#### 3. 部署

```bash
npx wrangler pages deploy .next --project-name=notion-next-blog
```

---

## 📝 获取 Notion 页面 ID

如果您需要获取自己的 Notion 页面 ID：

1. 打开您的 Notion 页面
2. 点击右上角的 **Share** > **Copy link**
3. 链接格式：`https://www.notion.so/Your-Page-Name-XXXXXXXXXXXXX`
4. 其中 `XXXXXXXXXXXXX`（32 位字符）就是您的页面 ID

**注意：** 如果您的 Notion 页面是私有的，需要：
- 将页面设置为 **Public**，或
- 设置 `NOTION_TOKEN_V2` 和 `NOTION_ACTIVE_USER` 环境变量

---

## ✅ 部署后检查

部署完成后，请验证：

- [ ] 访问 https://notion-next-blog.pages.dev
- [ ] 检查 LinkedIn 链接是否显示在社交按钮中
- [ ] 点击 LinkedIn 链接，确认跳转到 https://www.linkedin.com/in/andycywu/
- [ ] 博客内容正常显示

---

## 🎯 推荐操作

**立即执行：**

1. 访问 https://dash.cloudflare.com/
2. 进入 Pages > notion-next-blog
3. 点击 **Connect to Git**
4. 连接您的 GitHub 仓库
5. 设置 `NOTION_PAGE_ID` 环境变量
6. 点击 **Save and Deploy**

**预计时间：** 5-10 分钟

---

## 📞 需要帮助？

- 查看详细文档：[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
- 查看部署步骤：[DEPLOY_STEPS.md](./DEPLOY_STEPS.md)
- 查看部署状态：[DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md)
