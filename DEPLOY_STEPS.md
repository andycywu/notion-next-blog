# Cloudflare Pages 部署步骤

## 🚀 快速部署指南

您的代码已经推送到 GitHub: `git@github.com:andycywu/notion-next-blog.git`

现在有两种方式部署到 Cloudflare Pages：

---

## 方法一：通过 Cloudflare Dashboard（推荐，最简单）

### 步骤 1: 登录 Cloudflare

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 如果没有账号，请先注册（免费）
3. 登录后，在左侧菜单选择 **Pages**

### 步骤 2: 创建新项目

1. 点击 **Create a project** 按钮
2. 选择 **Connect to Git**
3. 授权 Cloudflare 访问您的 GitHub 账号
4. 选择仓库：`andycywu/notion-next-blog`
5. 点击 **Begin setup**

### 步骤 3: 配置构建设置

在项目设置页面，配置以下信息：

- **Project name**: `notion-next-blog`（或您喜欢的名称）
- **Production branch**: `main`
- **Framework preset**: 选择 **Next.js**（Cloudflare 会自动检测）
- **Build command**: `npm run build`
- **Build output directory**: `.next`（Next.js 会自动处理，可以留空）

### 步骤 4: 配置环境变量（重要！）

在项目设置页面，进入 **Settings** > **Environment variables**

#### 必需变量（Production 环境）

1. 点击 **Add variable**
2. 添加以下变量：

**必需：**
- 变量名: `NOTION_PAGE_ID`
- 值: 您的 Notion 页面 ID（从 Notion 页面 URL 获取）
- 类型: 选择 **Secret**（如果包含敏感信息）

**推荐配置：**
- 变量名: `NEXT_PUBLIC_CONTACT_LINKEDIN`
- 值: `https://www.linkedin.com/in/andycywu/`
- 类型: **Plain text**

- 变量名: `NEXT_PUBLIC_AUTHOR`
- 值: 您的名字（例如：Andy C. Y. Wu）
- 类型: **Plain text**

- 变量名: `NEXT_PUBLIC_BIO`
- 值: 您的简介
- 类型: **Plain text**

- 变量名: `NEXT_PUBLIC_LINK`
- 值: 您的网站地址（例如：https://yourdomain.com）
- 类型: **Plain text**

- 变量名: `NEXT_PUBLIC_TITLE`
- 值: 您的博客标题
- 类型: **Plain text**

**敏感变量（如果使用相关功能，必须设置为 Secret）：**
- `NOTION_TOKEN_V2` - Notion API Token（Secret）
- `NOTION_ACTIVE_USER` - Notion Active User（Secret）
- `ALGOLIA_ADMIN_APP_KEY` - Algolia 管理密钥（Secret）
- `AI_SUMMARY_API` - AI 摘要 API（Secret）
- `AI_SUMMARY_KEY` - AI 摘要密钥（Secret）
- `MAILCHIMP_API_KEY` - Mailchimp API 密钥（Secret）
- `REDIS_URL` - Redis 连接 URL（Secret）

**注意：** 为每个环境（Production、Preview、Development）分别设置变量，或者使用 "Apply to all environments" 选项。

### 步骤 5: 部署

1. 点击 **Save and Deploy**
2. Cloudflare 会自动开始构建和部署
3. 构建过程可能需要 3-5 分钟
4. 构建完成后，您会获得一个 `*.pages.dev` 的域名

### 步骤 6: 查看部署结果

1. 部署完成后，点击项目进入详情页
2. 您会看到部署的 URL，例如：`https://notion-next-blog.pages.dev`
3. 点击 URL 访问您的网站
4. 检查 LinkedIn 链接是否正确显示在社交按钮中

### 步骤 7: 自定义域名（可选）

1. 在项目设置中，进入 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入您的域名
4. 按照提示配置 DNS 记录（添加 CNAME 记录）

---

## 方法二：使用 Wrangler CLI

### 步骤 1: 登录 Cloudflare

```bash
npx wrangler login
```

这会打开浏览器，要求您授权 Wrangler 访问您的 Cloudflare 账号。

### 步骤 2: 创建 Pages 项目

```bash
npx wrangler pages project create notion-next-blog
```

### 步骤 3: 设置环境变量（Secrets）

```bash
# 设置必需变量
npx wrangler pages secret put NOTION_PAGE_ID
# 输入提示时，粘贴您的 Notion 页面 ID

# 设置 LinkedIn 链接（公共变量）
npx wrangler pages secret put NEXT_PUBLIC_CONTACT_LINKEDIN
# 输入: https://www.linkedin.com/in/andycywu/

# 如果使用其他功能，设置相应的 Secret
npx wrangler pages secret put NOTION_TOKEN_V2  # 如果使用私有数据库
npx wrangler pages secret put ALGOLIA_ADMIN_APP_KEY  # 如果使用 Algolia
# ... 其他敏感变量
```

### 步骤 4: 构建项目

```bash
npm run build
```

### 步骤 5: 部署

```bash
npx wrangler pages deploy .next --project-name=notion-next-blog
```

---

## 🔍 如何获取 Notion 页面 ID

1. 打开您的 Notion 页面
2. 查看浏览器地址栏的 URL
3. URL 格式类似：`https://www.notion.so/Your-Page-Name-XXXXXXXXXXXXX`
4. 其中 `XXXXXXXXXXXXX` 就是您的 `NOTION_PAGE_ID`
5. 如果 URL 中有多个 ID，使用最后一个（32 位字符）

---

## ✅ 部署后验证清单

- [ ] 网站可以正常访问
- [ ] LinkedIn 链接在社交按钮中显示
- [ ] 点击 LinkedIn 链接可以跳转到 https://www.linkedin.com/in/andycywu/
- [ ] 博客内容正常显示
- [ ] 所有功能正常工作

---

## 🐛 常见问题

### 构建失败

1. **检查环境变量**
   - 确保 `NOTION_PAGE_ID` 已设置
   - 检查变量名称是否正确（注意大小写）

2. **查看构建日志**
   - 在 Cloudflare Dashboard 中查看构建日志
   - 查找错误信息

3. **本地测试构建**
   ```bash
   npm run build
   ```
   如果本地构建失败，Cloudflare 上也会失败

### LinkedIn 链接未显示

1. **检查环境变量**
   - 确保 `NEXT_PUBLIC_CONTACT_LINKEDIN` 已设置
   - 值应为：`https://www.linkedin.com/in/andycywu/`

2. **清除缓存并重新部署**
   - 在 Cloudflare Dashboard 中触发新的部署

---

## 📞 需要帮助？

如果遇到问题，请：
1. 查看构建日志中的错误信息
2. 参考 [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) 获取详细文档
3. 检查 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)

---

**祝部署顺利！** 🎉
