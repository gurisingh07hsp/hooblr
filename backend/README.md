# Backend (Express API)

This is a minimal Express backend for the job board, kept separate in `backend/`.

## Quick start

1) Install dependencies
```bash
cd backend
npm install
```

2) Run the server (default: port 5001)
```bash
npm start
# or during development (auto-reload)
npm run dev
```

3) Test health
```bash
curl http://localhost:5001/api/health
```

## Environment
Create a `.env` with:
```env
PORT=5001
FRONTEND_URL=http://localhost:3000
```

## Endpoints
- GET `/api/health`
- Jobs: GET `/api/jobs`, GET `/api/jobs/:id`, POST `/api/jobs/:id/apply`
- Companies: GET `/api/companies`, GET `/api/companies/:id`
- Blog: GET `/api/blog`, GET `/api/blog/:id`
- Users: GET `/api/users`, GET `/api/users/:id`

Notes
- Uses in-memory data in `src/data/store.js` so it runs without a DB.
- Swap the store for a real database when needed.


