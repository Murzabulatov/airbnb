const express = require('express');
const isAuth = require('../middlewears/isAuth.js');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.session?.user.id });
  res.render('profile', { user });
});

router.get('/edit', isAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.session?.user.id });
  res.render('profileEdit', user);
});

router.post('/edit', isAuth, async (req, res) => {
  await User.findByIdAndUpdate(req.session?.user.id, req.body);
  res.json();
});
module.exports = router;
