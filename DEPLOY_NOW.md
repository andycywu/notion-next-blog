# 🚀 立即部署指南

## 当前状态

- ✅ Cloudflare Pages 项目已创建：`notion-next-blog`
- ✅ LinkedIn 链接已配置
- ✅ 代码已推送到 GitHub

## 部署方式选择

由于网络连接问题，我建议您使用以下方式之一：

---

## 方式一：通过 Cloudflare Dashboard（推荐，最简单）

这是最简单可靠的方式，不需要本地构建：

### 步骤：

1. **访问 Cloudflare Dashboard**
   ```
   https://dash.cloudflare.com/
   ```

2. **连接 Git 仓库**
   - 进入 **Pages** > **notion-next-blog**
   - 点击 **Connect to Git**
   - 授权访问 GitHub
   - 选择仓库：`andycywu/notion-next-blog`
   - 分支：`main`

3. **配置构建设置**
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Build output directory: `.next`（或留空）

4. **设置环境变量**
   - 在 Environment variables 中添加：
   - `NOTION_PAGE_ID` = `02ab3b8678004aa69e9e415905ef32a5`
   - （LinkedIn 链接已设置，无需重复）

5. **部署**
   - 点击 **Save and Deploy**
   - 等待构建完成（3-5 分钟）

### 优点：
- ✅ 不需要本地构建
- ✅ 自动部署（每次 push 自动更新）
- ✅ 有预览部署功能
- ✅ 不依赖本地网络

---

## 方式二：使用部署脚本（需要网络连接正常）

如果您的网络连接正常，可以使用我创建的部署脚本：

### 步骤：

1. **确保已登录 Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **运行部署脚本**
   ```bash
   ./deploy.sh
   ```

   脚本会自动：
   - 检查登录状态
   - 检查环境变量
   - 构建项目（如果需要）
   - 部署到 Cloudflare

3. **或手动部署**
   ```bash
   # 设置环境变量（如果未设置）
   npx wrangler pages secret put NOTION_PAGE_ID --project-name=notion-next-blog
   # 输入: 02ab3b8678004aa69e9e415905ef32a5
   
   # 构建项目
   npm run build
   
   # 部署
   npx wrangler pages deploy .next --project-name=notion-next-blog
   ```

---

## 方式三：使用 GitHub Actions（自动化）

如果您想通过 GitHub Actions 自动部署，我可以帮您创建 workflow 文件。

---

## 🎯 推荐操作

**由于当前网络连接问题，强烈推荐使用方式一（Dashboard）：**

1. 访问：https://dash.cloudflare.com/
2. 进入 Pages > notion-next-blog
3. 点击 **Connect to Git**
4. 按照上面的步骤完成设置

这样您就不需要担心网络连接问题，而且之后每次更新都会自动部署！

---

## 📝 环境变量清单

确保设置以下环境变量：

**必需：**
- `NOTION_PAGE_ID` = `02ab3b8678004aa69e9e415905ef32a5`（默认模板）

**已设置：**
- `NEXT_PUBLIC_CONTACT_LINKEDIN` = `https://www.linkedin.com/in/andycywu/` ✅

**可选：**
- `NEXT_PUBLIC_AUTHOR` = 您的名字
- `NEXT_PUBLIC_BIO` = 您的简介
- `NEXT_PUBLIC_LINK` = 您的网站地址
- `NEXT_PUBLIC_TITLE` = 您的博客标题

---

## ✅ 部署后验证

部署完成后，访问：**https://notion-next-blog.pages.dev**

检查：
- [ ] 网站可以正常访问
- [ ] LinkedIn 链接显示在社交按钮中
- [ ] 点击 LinkedIn 链接跳转到 https://www.linkedin.com/in/andycywu/
- [ ] 博客内容正常显示

---

**现在就访问 Cloudflare Dashboard 开始部署吧！** 🚀

https://dash.cloudflare.com/
