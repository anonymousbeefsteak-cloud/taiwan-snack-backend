# 台灣小吃店後端 API

這是台灣小吃店 LINE 訂餐系統的後端 API，部署在 Vercel。

## API 端點

- `POST /api/orders` - 提交新訂單
- `POST /api/menu` - 獲取菜單
- `POST /api/history` - 查詢歷史訂單

## 環境變數

在 Vercel 中設置：
- `GOOGLE_SCRIPT_URL`: 您的 Google Apps Script Web App URL

## 本地開發

```bash
npm install
npm run dev
