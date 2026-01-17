#!/bin/bash

# Cloudflare Pages 环境变量设置脚本
# 此脚本帮助您设置 Cloudflare Pages 项目的环境变量

PROJECT_NAME="blog-andycywu"

echo "🚀 Cloudflare Pages 环境变量设置"
echo "=================================="
echo ""

# 检查是否已登录
echo "检查 Cloudflare 登录状态..."
npx wrangler whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ 未登录 Cloudflare，请先运行: npx wrangler login"
    exit 1
fi
echo "✅ 已登录 Cloudflare"
echo ""

# 设置 LinkedIn 链接（已知）
echo "设置 LinkedIn 链接..."
echo "https://www.linkedin.com/in/andycywu/" | npx wrangler pages secret put NEXT_PUBLIC_CONTACT_LINKEDIN --project-name=$PROJECT_NAME
echo "✅ LinkedIn 链接已设置"
echo ""

# 询问并设置其他环境变量
echo "现在需要设置其他环境变量："
echo ""

# NOTION_PAGE_ID (必需)
read -p "请输入您的 Notion 页面 ID (必需): " NOTION_PAGE_ID
if [ -n "$NOTION_PAGE_ID" ]; then
    echo "$NOTION_PAGE_ID" | npx wrangler pages secret put NOTION_PAGE_ID --project-name=$PROJECT_NAME
    echo "✅ NOTION_PAGE_ID 已设置"
else
    echo "⚠️  跳过 NOTION_PAGE_ID（稍后请在 Cloudflare Dashboard 中设置）"
fi
echo ""

# 作者信息
read -p "请输入作者名称 (可选，按 Enter 跳过): " AUTHOR
if [ -n "$AUTHOR" ]; then
    echo "$AUTHOR" | npx wrangler pages secret put NEXT_PUBLIC_AUTHOR --project-name=$PROJECT_NAME
    echo "✅ NEXT_PUBLIC_AUTHOR 已设置"
fi
echo ""

read -p "请输入作者简介 (可选，按 Enter 跳过): " BIO
if [ -n "$BIO" ]; then
    echo "$BIO" | npx wrangler pages secret put NEXT_PUBLIC_BIO --project-name=$PROJECT_NAME
    echo "✅ NEXT_PUBLIC_BIO 已设置"
fi
echo ""

read -p "请输入网站地址 (可选，按 Enter 跳过): " LINK
if [ -n "$LINK" ]; then
    echo "$LINK" | npx wrangler pages secret put NEXT_PUBLIC_LINK --project-name=$PROJECT_NAME
    echo "✅ NEXT_PUBLIC_LINK 已设置"
fi
echo ""

read -p "请输入博客标题 (可选，按 Enter 跳过): " TITLE
if [ -n "$TITLE" ]; then
    echo "$TITLE" | npx wrangler pages secret put NEXT_PUBLIC_TITLE --project-name=$PROJECT_NAME
    echo "✅ NEXT_PUBLIC_TITLE 已设置"
fi
echo ""

echo "=================================="
echo "✅ 环境变量设置完成！"
echo ""
echo "下一步："
echo "1. 运行 'npm run build' 构建项目"
echo "2. 运行 'npx wrangler pages deploy .next --project-name=$PROJECT_NAME' 部署"
echo ""
echo "或者访问 Cloudflare Dashboard 进行部署："
echo "https://dash.cloudflare.com/"
echo ""
