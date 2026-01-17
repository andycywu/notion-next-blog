#!/bin/bash

# Cloudflare Pages 部署脚本
# 用于部署 NotionNext Blog 到 Cloudflare Pages

set -e

PROJECT_NAME="blog-andycywu"
BUILD_DIR=".next"

echo "🚀 开始部署到 Cloudflare Pages..."
echo "=================================="
echo ""

# 检查是否已登录
echo "1. 检查 Cloudflare 登录状态..."
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo "❌ 未登录 Cloudflare，请先运行: npx wrangler login"
    exit 1
fi
echo "✅ 已登录 Cloudflare"
echo ""

# 检查环境变量
echo "2. 检查环境变量..."
NOTION_PAGE_ID_SET=$(npx wrangler pages secret list --project-name=$PROJECT_NAME 2>/dev/null | grep -c "NOTION_PAGE_ID" || echo "0")
if [ "$NOTION_PAGE_ID_SET" -eq "0" ]; then
    echo "⚠️  警告: NOTION_PAGE_ID 环境变量未设置"
    echo "   请运行以下命令设置:"
    echo "   npx wrangler pages secret put NOTION_PAGE_ID --project-name=$PROJECT_NAME"
    echo ""
    read -p "是否现在设置 NOTION_PAGE_ID? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "请输入您的 Notion 页面 ID:"
        read NOTION_PAGE_ID
        echo "$NOTION_PAGE_ID" | npx wrangler pages secret put NOTION_PAGE_ID --project-name=$PROJECT_NAME
        echo "✅ NOTION_PAGE_ID 已设置"
    else
        echo "⚠️  跳过设置，请稍后在 Cloudflare Dashboard 中设置"
    fi
    echo ""
fi

# 构建项目
echo "3. 构建项目..."
if [ ! -d "$BUILD_DIR" ]; then
    echo "   构建目录不存在，开始构建..."
    npm run build
else
    echo "   检测到已有构建目录，跳过构建"
    echo "   如需重新构建，请先删除 $BUILD_DIR 目录"
fi
echo ""

# 检查构建目录
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ 构建失败：找不到 $BUILD_DIR 目录"
    exit 1
fi
echo "✅ 构建完成"
echo ""

# 部署
echo "4. 部署到 Cloudflare Pages..."
npx wrangler pages deploy $BUILD_DIR --project-name=$PROJECT_NAME
echo ""

echo "=================================="
echo "✅ 部署完成！"
echo ""
echo "访问您的网站: https://$PROJECT_NAME.pages.dev"
echo ""
