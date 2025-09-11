const express = require('express');
const { blog } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  let posts = blog.filter(p => p.status === 'published');
  if (search) {
    const s = String(search).toLowerCase();
    posts = posts.filter(p => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
  }
  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const start = (page - 1) * limit;
  const paged = posts.slice(start, start + Number(limit));
  res.json({ posts: paged, pagination: { page: Number(page), limit: Number(limit), total: posts.length, pages: Math.ceil(posts.length / limit) } });
});

router.get('/:id', (req, res) => {
  const post = blog.find(p => p._id === req.params.id);
  if (!post || post.status !== 'published') return res.status(404).json({ error: 'Blog post not found' });
  post.views += 1;
  res.json({ post });
});

module.exports = router;


