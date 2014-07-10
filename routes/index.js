var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { googlePlusClientID: '774666853835.apps.googleusercontent.com' ,title: 'Express' });
});

module.exports = router;
