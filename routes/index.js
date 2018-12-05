const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  const index = true
  res.render('index',{index});
});

module.exports = router;
