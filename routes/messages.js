var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.post('/',function (req, res, next) {
   var message = new Message({
       content:req.body.content
   });
   message.save(function (err, result) {
       if(err){
           return res.status(500).json({
               title:'An error occurred',
               err:err,
               request:req.body
           });
       }
       else{
           return res.status(201).json({
               message:'Successfully saved',
               obj:result
           });
       }
   });
});

router.get('/', function (req, res, next) {
   Message.find(function (err, data) {
       if(err){
           return res.status(500).json({
               title:'An error occurred',
               err:err
           });
       }
       else{
           return res.status(201).json({
               message:'Successfully get messages',
               messages:data
           });
       }
   });

});

router.put('/:id', function (req, res, next) {
    console.log(req.params.id);
    Message.findById(req.params.id, function (err ,message) {
        if(err){
            return res.status(500).json({
                title:'An error occurred',
                err:err
            });
        }
        if(!message){
            return res.status(500).json({
                title:'No Message!',
                err:{message: 'Message not found!'}
            });
        }
        message.content = req.body.content;
        message.save(function (err, data) {
            if(err){
                return res.status(500).json({
                    title: 'An error occurred when updated.',
                    err:err
                });
            }
            res.status(200).json({
                message: 'Successfully updated',
                obj:data
            });
        });
      });
});

router.delete('/:id', function (req, res, next) {
   Message.findByIdAndRemove(req.params.id, function (err, data) {
       if (err) {
            res.status(500).json({
                title: 'An error occurred',
                error:err
            });
       }

       res.status(200).json({
           message:'Successfully removed',
           obj:data
       });
   });
});

module.exports = router;