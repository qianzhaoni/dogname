#!/bin/bash

# 构建应用
npm run build

# 生成sitemap
node server/utils/generateSitemap.ts

# 部署到Vercel
vercel --prod 