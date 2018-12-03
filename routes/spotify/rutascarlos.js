const express = require("express");

const router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('music/carlos/randj')
})

module.exports = router