/**
 * Created by michael on 21/09/2014.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/movies', function(req, res) {
    res.render('movies');
});

module.exports = router;