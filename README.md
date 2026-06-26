# StoryScout Website

Full-stack travel website for StoryScout — React frontend, Express API, admin portal, and user authentication.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5000

## Production

```bash
npm install
npm run build
npm start
```

Copy `.env.example` to `.env` and set `DATABASE_URL` (Supabase) and `SESSION_SECRET`.

## Admin (default dev accounts)

| Email | Password |
|-------|----------|
| `admin@storyscout.in` | `admin123` |
| `test@storyscout.in` | `test123` |

Change these before going live.
