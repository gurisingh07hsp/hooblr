const express = require('express');
const { jobs } = require('../data/store');

const router = express.Router();

// GET /api/jobs
router.get('/', (req, res) => {
  const { page = 1, limit = 10, category, location, type, search } = req.query;

  let results = jobs.filter(j => j.status === 'active');
  if (category) results = results.filter(j => j.category === category);
  if (location) results = results.filter(j => j.location.toLowerCase().includes(String(location).toLowerCase()));
  if (type) results = results.filter(j => j.type === type);
  if (search) {
    const s = String(search).toLowerCase();
    results = results.filter(j => j.title.toLowerCase().includes(s) || j.description.toLowerCase().includes(s) || j.company.name.toLowerCase().includes(s));
  }

  results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const start = (page - 1) * limit;
  const paged = results.slice(start, start + Number(limit));

  res.json({ jobs: paged, pagination: { page: Number(page), limit: Number(limit), total: results.length, pages: Math.ceil(results.length / limit) } });
});

// GET /api/jobs/:id
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j._id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  job.views += 1;
  res.json({ job });
});

// POST /api/jobs/:id/apply (demo)
router.post('/:id/apply', (req, res) => {
  const job = jobs.find(j => j._id === req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  if (job.status !== 'active') return res.status(400).json({ error: 'Job is not accepting applications' });
  const body = req.body || {};
  job.applications.push({ user: 'demo-user', appliedAt: new Date().toISOString(), coverLetter: body.coverLetter || '', resume: body.resume || '' });
  res.json({ message: 'Application submitted successfully' });
});

module.exports = router;


