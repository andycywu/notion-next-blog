# Cloudflare Pages 部署方式对比

## 📌 重要说明

**Wrangler CLI 不能直接连接 GitHub 仓库**。Git 连接必须通过 Cloudflare Dashboard 完成。

但是，您有两种部署方式可以选择：

---

## 方式一：Git 集成（推荐，自动部署）

### 特点
- ✅ **自动部署**：每次 push 到 GitHub 自动构建和部署
- ✅ **最简单**：设置一次，后续自动运行
- ✅ **无需本地构建**：Cloudflare 自动构建
- ✅ **预览部署**：每个 Pull Request 自动创建预览

### 设置步骤

1. **通过 Cloudflare Dashboard 连接**
   - 访问：https://dash.cloudflare.com/
   - 进入 **Pages** > **notion-next-blog**
   - 点击 **Connect to Git**
   - 授权访问 GitHub
   - 选择仓库：`andycywu/notion-next-blog`
   - 配置构建设置

2. **使用 Wrangler CLI 设置环境变量**
   ```bash
   # 设置环境变量（CLI 可以设置 secrets）
   npx wrangler pages secret put NOTION_PAGE_ID --project-name=notion-next-blog
   npx wrangler pages secret put NEXT_PUBLIC_AUTHOR --project-name=notion-next-blog
   # ... 其他变量
   ```

3. **完成**
   - 之后每次 `git push` 到 `main` 分支
   - Cloudflare 自动检测并部署

---

## 方式二：Wrangler CLI 手动部署

### 特点
- ✅ **完全控制**：手动控制何时部署
- ✅ **灵活**：可以自定义构建流程
- ❌ **需要本地构建**：每次部署前需要本地构建
- ❌ **手动操作**：需要手动运行命令

### 设置步骤

1. **使用 CLI 设置环境变量**
   ```bash
   # 设置环境变量
   npx wrangler pages secret put NOTION_PAGE_ID --project-name=notion-next-blog
   npx wrangler pages secret put NEXT_PUBLIC_CONTACT_LINKEDIN --project-name=notion-next-blog
   ```

2. **本地构建**
   ```bash
   npm run build
   ```

3. **手动部署**
   ```bash
   npx wrangler pages deploy .next --project-name=notion-next-blog
   ```

4. **每次更新都需要重复步骤 2-3**

---

## 对比表格

| 特性 | Git 集成 | CLI 手动部署 |
|------|---------|-------------|
| **设置复杂度** | 简单（Dashboard 一次设置） | 简单（CLI 命令） |
| **后续操作** | 自动（git push 即可） | 手动（需要运行命令） |
| **构建位置** | Cloudflare 服务器 | 本地机器 |
| **预览部署** | ✅ 自动（PR 预览） | ❌ 无 |
| **环境变量设置** | Dashboard 或 CLI | CLI |
| **适合场景** | 日常开发 | 特殊需求、CI/CD |

---

## 🎯 推荐方案

**对于您的 NotionNext Blog，强烈推荐使用 Git 集成方式：**

### 理由：
1. ✅ 您已经将代码推送到 GitHub
2. ✅ 设置一次，后续自动部署
3. ✅ 每次更新博客内容，只需 push 代码
4. ✅ 有预览部署功能（PR 自动预览）

### 具体操作：

1. **在 Dashboard 连接 Git**（必须通过 Dashboard）
   - https://dash.cloudflare.com/ > Pages > notion-next-blog
   - 点击 **Connect to Git**

2. **使用 CLI 设置环境变量**（可选，也可以用 Dashboard）
   ```bash
   npx wrangler pages secret put NOTION_PAGE_ID --project-name=notion-next-blog
   ```

3. **完成！** 之后每次 `git push` 自动部署

---

## 💡 混合使用

您也可以**混合使用**两种方式：

- **Git 集成**：用于日常开发和自动部署
- **CLI 部署**：用于紧急修复或测试特定构建

两种方式可以共存，互不冲突。

---

## 📝 总结

- ❌ **Wrangler CLI 不能连接 GitHub 仓库**
- ✅ **Git 连接必须通过 Cloudflare Dashboard**
- ✅ **CLI 可以用于设置环境变量和手动部署**
- ✅ **推荐使用 Git 集成方式（自动部署）**

---

**下一步：** 访问 Cloudflare Dashboard 连接您的 GitHub 仓库！

https://dash.cloudflare.com/
