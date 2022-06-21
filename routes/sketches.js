var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  
});

router.get('/:sketchid', function(req, res, next) {
  res.render('sketch', { id: req.params.sketchid });
});

module.exports = router;
