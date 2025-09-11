const express = require('express');
const { companies } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ companies });
});

router.get('/:id', (req, res) => {
  const company = companies.find(c => c._id === req.params.id);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  res.json({ company });
});

module.exports = router;


