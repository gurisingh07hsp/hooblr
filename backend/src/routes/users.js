const express = require('express');
const { users } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const publicUsers = users.map(u => ({ _id: u._id, email: u.email, role: u.role, profile: u.profile, createdAt: u.createdAt }));
  res.json({ users: publicUsers });
});

router.get('/:id', (req, res) => {
  const u = users.find(x => x._id === req.params.id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  const publicUser = { _id: u._id, email: u.email, role: u.role, profile: u.profile, createdAt: u.createdAt };
  res.json({ user: publicUser });
});

module.exports = router;


