const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const jobsRouter = require('./routes/jobs');
const companiesRouter = require('./routes/companies');
const blogRouter = require('./routes/blog');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json({ limit: '5mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', service: 'hooblr-backend' });
});

app.use('/api/jobs', jobsRouter);
app.use('/api/companies', companiesRouter);
app.use('/api/blog', blogRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


