const express = require('express');
const isAuth = require('../middlewears/isAuth.js');
const mongoose = require('mongoose');
const User = require('../models/user.js');
const router = express.Router();

router
  .get('/', isAuth, async (req, res) => {
    const user = await User.findOne({ _id: req.session?.user.id });
    console.log(user);
    res.render('profile', { user });
  });

module.exports = router;
