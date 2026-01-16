# 🔧 强制 Cloudflare Pages 使用 npm

## 问题

Cloudflare Pages 检测到 `yarn.lock` 文件，自动使用 Yarn 安装依赖，导致构建失败。

## ✅ 解决方案

### 已完成的修复

1. ✅ **删除 yarn.lock** - 强制 Cloudflare 使用 npm
2. ✅ **创建 .npmrc** - 设置 `legacy-peer-deps=true` 解决依赖冲突

### Cloudflare Dashboard 配置

在 Cloudflare Dashboard 中设置：

1. **进入项目设置**
   - https://dash.cloudflare.com/
   - Pages > notion-next-blog > Settings

2. **修改构建命令**
   - 找到 **Builds & deployments**
   - **Build command** 设置为：
     ```
     npm install && npm run build
     ```
   - 或者（如果仍有问题）：
     ```
     npm ci && npm run build
     ```

3. **确保环境变量**
   - `NOTION_PAGE_ID` = `02ab3b8678004aa69e9e415905ef32a5`
   - `NEXT_PUBLIC_CONTACT_LINKEDIN` = `https://www.linkedin.com/in/andycywu/`

## 📝 说明

- `.npmrc` 文件会自动应用 `legacy-peer-deps=true`，解决 React 版本冲突警告
- 删除 `yarn.lock` 后，Cloudflare 会自动使用 npm（因为存在 `package-lock.json`）
- 如果 Cloudflare 仍然使用 Yarn，可以在构建命令中明确指定：`npm install && npm run build`

## ✅ 验证

提交更改后，Cloudflare 会自动重新构建。检查：
- [ ] 构建日志显示使用 npm 而不是 yarn
- [ ] 构建成功完成
- [ ] 网站可以正常访问
