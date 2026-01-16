# Cloudflare Pages 构建配置

## 问题诊断

从构建日志看到的问题：
1. Cloudflare 自动检测到 `yarn.lock`，使用了 Yarn 4.9.1
2. 依赖解析警告：`@testing-library/dom` 缺失
3. React 版本冲突警告（可以忽略，不影响构建）

## 解决方案

### 方案一：在 Cloudflare Dashboard 中指定使用 npm（推荐）

1. 进入 Cloudflare Dashboard
2. 进入 Pages > notion-next-blog > Settings
3. 找到 **Builds & deployments** 部分
4. 在 **Environment variables** 中添加：
   ```
   变量名: NPM_FLAGS
   值: --legacy-peer-deps
   环境: Production
   ```
5. 或者修改构建命令为：
   ```
   npm install --legacy-peer-deps && npm run build
   ```

### 方案二：删除 yarn.lock，只使用 npm

如果项目主要使用 npm，可以删除 yarn.lock：

```bash
git rm yarn.lock
git commit -m "Remove yarn.lock, use npm only"
git push origin main
```

### 方案三：修复依赖问题

添加缺失的依赖：

```bash
npm install --save-dev @testing-library/dom
```

## 推荐的 Cloudflare Pages 构建设置

在 Cloudflare Dashboard 中设置：

- **Build command**: `npm install --legacy-peer-deps && npm run build`
- **Build output directory**: `.next`
- **Node version**: `20`（已在 .nvmrc 中指定）

## 环境变量设置

确保设置以下环境变量：

- `NOTION_PAGE_ID` = `02ab3b8678004aa69e9e415905ef32a5`
- `NEXT_PUBLIC_CONTACT_LINKEDIN` = `https://www.linkedin.com/in/andycywu/`
