var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/signup', function (req, res) {
   var user = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       password: bcrypt.hashSync(req.body.password,10),
       email: req.body.email
   });
   
   user.save(function (err, result) {
       if(err){
           return res.status(500).json({
               title:'An error occurred',
               error:err
           });
       }
       else{
           return res.status(201).json({
               message:'Successfully created',
               obj:result
           });
       }
   });
});

router.post('/signin' ,function (req, res, next) {
    User.findOne({email:req.body.email}, function (err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred.',
                error:err
            });
        }
        if(!user) {
            return res.status(401).json({
                title:'Invalid login',
                error: {message:'Wrong password or username'}
            });
        }
        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).json({
                title:'Invalid login',
                error: {message: 'Wrong password or username'}
            });
        }else{
            var token = jwt.sign({user:user},'secret',{expiresIn:7200});
            return res.status(201).json({
                message:'Successfully login',
                token:token,
                userId:user._id
            });
        }
    });
});

module.exports = router;