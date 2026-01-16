# Cloudflare Pages 部署指南

本指南将帮助您将 NotionNext Blog 部署到 Cloudflare Pages，并正确配置环境变量和敏感信息。

## 📋 前置要求

1. **Cloudflare 账号**
   - 访问 [Cloudflare](https://dash.cloudflare.com/) 注册账号
   - 如果没有账号，可以免费注册

2. **GitHub/GitLab 仓库**
   - 将代码推送到 GitHub 或 GitLab
   - 确保仓库是公开的（或配置 Cloudflare 访问私有仓库的权限）

3. **Node.js 环境**
   - 本地需要 Node.js 20+ 版本（用于测试构建）

## 🚀 部署步骤

### 方法一：通过 Cloudflare Dashboard（推荐）

#### 1. 创建新项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单选择 **Pages**
3. 点击 **Create a project**
4. 选择 **Connect to Git**
5. 授权 Cloudflare 访问您的 GitHub/GitLab 账号
6. 选择您的 `notion-next-blog` 仓库

#### 2. 配置构建设置

在项目设置页面，配置以下信息：

- **Project name**: `notion-next-blog`（或您喜欢的名称）
- **Production branch**: `main`（或您的主分支名称）
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`（Next.js 会自动处理）

#### 3. 配置环境变量

这是**最关键**的步骤，需要将所有敏感信息设置为 Secrets：

1. 在项目设置页面，进入 **Settings** > **Environment variables**
2. 为每个环境（Production、Preview、Development）添加以下变量：

##### 必需变量（必须设置）

```
NOTION_PAGE_ID = your-notion-page-id
```

##### 公共变量（NEXT_PUBLIC_* 开头，可以设置为普通变量）

```
NEXT_PUBLIC_CONTACT_LINKEDIN = https://www.linkedin.com/in/andycywu/
NEXT_PUBLIC_AUTHOR = 您的名字
NEXT_PUBLIC_BIO = 您的简介
NEXT_PUBLIC_LINK = https://yourdomain.com
NEXT_PUBLIC_TITLE = 您的博客标题
NEXT_PUBLIC_DESCRIPTION = 您的博客描述
```

##### 敏感变量（必须设置为 Secret 类型）

以下变量包含敏感信息，**必须**设置为 **Secret** 类型：

- `NOTION_TOKEN_V2` - Notion API Token（如果使用私有数据库）
- `NOTION_ACTIVE_USER` - Notion Active User（如果使用私有数据库）
- `ALGOLIA_ADMIN_APP_KEY` - Algolia 管理密钥（如果使用 Algolia 搜索）
- `AI_SUMMARY_API` - AI 摘要 API 地址（如果使用 AI 摘要）
- `AI_SUMMARY_KEY` - AI 摘要 API 密钥（如果使用 AI 摘要）
- `MAILCHIMP_API_KEY` - Mailchimp API 密钥（如果使用邮件订阅）
- `REDIS_URL` - Redis 连接 URL（如果使用 Redis 缓存）

**如何设置 Secret：**
1. 在添加变量时，选择 **Secret** 类型
2. 输入变量名称和值
3. Secret 类型的值在保存后无法查看，只能重新设置

#### 4. 部署

1. 点击 **Save and Deploy**
2. Cloudflare 会自动开始构建和部署
3. 构建完成后，您会获得一个 `*.pages.dev` 的域名

#### 5. 自定义域名（可选）

1. 在项目设置中，进入 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入您的域名
4. 按照提示配置 DNS 记录

### 方法二：使用 Wrangler CLI

#### 1. 安装 Wrangler

```bash
npm install -g wrangler
# 或
npm install --save-dev wrangler
```

#### 2. 登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器，要求您授权 Wrangler 访问您的 Cloudflare 账号。

#### 3. 设置环境变量（Secrets）

使用 Wrangler CLI 设置敏感信息：

```bash
# 设置 Notion Page ID（必需）
wrangler pages secret put NOTION_PAGE_ID

# 设置敏感信息（如果使用）
wrangler pages secret put NOTION_TOKEN_V2
wrangler pages secret put NOTION_ACTIVE_USER
wrangler pages secret put ALGOLIA_ADMIN_APP_KEY
wrangler pages secret put AI_SUMMARY_API
wrangler pages secret put AI_SUMMARY_KEY
wrangler pages secret put MAILCHIMP_API_KEY
wrangler pages secret put REDIS_URL
```

每次运行命令时，会提示您输入值。

#### 4. 设置公共环境变量

公共变量（NEXT_PUBLIC_*）可以在 `wrangler.toml` 中设置，或使用：

```bash
wrangler pages project create notion-next-blog
```

#### 5. 部署

```bash
# 构建项目
npm run build

# 部署到 Cloudflare Pages
wrangler pages deploy .next --project-name=notion-next-blog
```

## 🔐 环境变量管理最佳实践

### 1. 区分公共变量和敏感变量

- **公共变量**（`NEXT_PUBLIC_*`）：可以在客户端访问，可以设置为普通环境变量
- **敏感变量**（API keys、tokens）：必须设置为 Secret 类型

### 2. 使用 .env.example 文件

项目根目录的 `.env.example` 文件列出了所有需要的环境变量，但不包含实际值。您可以：

1. 复制 `.env.example` 为 `.env.local`（本地开发使用）
2. 在 Cloudflare Dashboard 中设置对应的环境变量

### 3. 不要提交敏感信息

确保以下文件在 `.gitignore` 中：

```
.env
.env.local
.env.*.local
```

## 📝 环境变量清单

### 必需变量

- [ ] `NOTION_PAGE_ID` - Notion 页面 ID

### 推荐配置

- [ ] `NEXT_PUBLIC_CONTACT_LINKEDIN` - LinkedIn 链接（已设置为 https://www.linkedin.com/in/andycywu/）
- [ ] `NEXT_PUBLIC_AUTHOR` - 作者名称
- [ ] `NEXT_PUBLIC_BIO` - 作者简介
- [ ] `NEXT_PUBLIC_LINK` - 网站地址
- [ ] `NEXT_PUBLIC_TITLE` - 博客标题
- [ ] `NEXT_PUBLIC_DESCRIPTION` - 博客描述

### 可选变量（根据功能需求）

- [ ] `NEXT_PUBLIC_CONTACT_GITHUB` - GitHub 链接
- [ ] `NEXT_PUBLIC_CONTACT_TWITTER` - Twitter 链接
- [ ] `NEXT_PUBLIC_CONTACT_EMAIL` - 邮箱（会自动加密）
- [ ] `NEXT_PUBLIC_THEME` - 主题名称
- [ ] `NEXT_PUBLIC_LANG` - 语言设置

### 敏感变量（如果使用相关功能）

- [ ] `NOTION_TOKEN_V2` - Notion API Token（Secret）
- [ ] `NOTION_ACTIVE_USER` - Notion Active User（Secret）
- [ ] `ALGOLIA_ADMIN_APP_KEY` - Algolia 管理密钥（Secret）
- [ ] `AI_SUMMARY_API` - AI 摘要 API（Secret）
- [ ] `AI_SUMMARY_KEY` - AI 摘要密钥（Secret）
- [ ] `MAILCHIMP_API_KEY` - Mailchimp API 密钥（Secret）
- [ ] `REDIS_URL` - Redis 连接 URL（Secret）

## 🐛 故障排除

### 构建失败

1. **检查环境变量**
   - 确保所有必需的环境变量都已设置
   - 检查变量名称是否正确（注意大小写）

2. **查看构建日志**
   - 在 Cloudflare Dashboard 中查看构建日志
   - 查找错误信息

3. **本地测试构建**
   ```bash
   npm run build
   ```
   如果本地构建失败，Cloudflare 上也会失败

### 环境变量未生效

1. **检查变量名称**
   - 确保变量名称完全匹配（包括大小写）
   - 注意 `NEXT_PUBLIC_*` 前缀

2. **重新部署**
   - 修改环境变量后，需要重新部署才能生效
   - 在 Cloudflare Dashboard 中触发新的部署

3. **清除缓存**
   - 如果使用了 Cloudflare 缓存，可能需要清除缓存

### LinkedIn 链接未显示

1. **检查环境变量**
   - 确保 `NEXT_PUBLIC_CONTACT_LINKEDIN` 已设置
   - 值应为：`https://www.linkedin.com/in/andycywu/`

2. **检查主题配置**
   - 确保使用的主题支持 LinkedIn 链接显示
   - 大多数主题都支持，但可以检查 `themes/[your-theme]/components/SocialButton.js`

## 📚 相关资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [NotionNext 文档](https://docs.tangly1024.com/)

## ✅ 部署检查清单

部署前请确认：

- [ ] 所有必需的环境变量已设置
- [ ] 敏感信息已设置为 Secret 类型
- [ ] LinkedIn 链接已配置为 `https://www.linkedin.com/in/andycywu/`
- [ ] 本地构建测试通过
- [ ] 代码已推送到 Git 仓库
- [ ] Cloudflare 项目已连接到 Git 仓库
- [ ] 自定义域名已配置（如需要）

部署后请验证：

- [ ] 网站可以正常访问
- [ ] LinkedIn 链接在社交按钮中显示
- [ ] 所有功能正常工作
- [ ] 环境变量正确生效

---

**注意**：首次部署可能需要几分钟时间。部署完成后，每次推送到主分支都会自动触发新的部署。
