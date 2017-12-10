var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/questions', function (req, res, next) {
   res.render('questions',{title:'This is a question'});
});



module.exports = router;