# Hari Store

Next.js 14 e-commerce: 20 categories x 20 products, mobile side menu, login/register, cart, COD checkout, user orders, admin panel, SEO (metadata, JSON-LD, sitemap, robots).

## Vercel
1. Files repo ke root me rakho (package.json seedha dikhe), Vercel me Import karo.
2. Upstash Redis add karo (Vercel Marketplace, free). Iske bina data restart pe reset hota hai.
3. Env: JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD (.env.example dekho). Default admin: admin@haristore.com / admin123
4. /login se admin login karo, /admin me products, orders, settings.

Local: `npm install && npm run dev`
