var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.get('/', function (req, res, next) {
   Message.find()
       .populate('user','firstName')
       .exec(function (err, data) {
       if(err){
           return res.status(500).json({
               title:'An error occurred',
               error:err
           });
       }
       else{
           return res.status(200).json({
               message:'Successfully get messages',
               obj:data
           });
       }
   });

});
//
router.use('/', function (req, res, next) {
    var token = req.header('Authorization');
    jwt.verify(token, 'secret', function (err, decoded) {
        if(err){
            return res.status(401).json({
                title:'Not authenticated',
                error:err
            });
        }
        next();
    });
});


router.post('/',function (req, res, next) {
   var decoded = jwt.decode(req.header('Authorization'));
          User.findById(decoded.user._id, function (err, user) {
              if(err){
                  return res.status(500).json({
                      title:'An error occurred',
                      error:err
                  });
              }
              if(user){
                  var message = new Message({
                      content:req.body.content,
                      user:user._id
                  });
                  message.save(function (err, result) {
                      if(err){
                          return res.status(500).json({
                              title:'An error occurred',
                              error:err
                          });
                      }
                      user.messages.push(result);
                      user.save();
                      Message.findById(result._id)
                          .populate('user','firstName')
                          .exec(function (err, message) {
                              return res.status(201).json({
                                  message:'Successfully saved',
                                  obj:message
                              });

                          })
                  });
              }
           });
       });

router.put('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.header('Authorization'));
    Message.findById(req.params.id, function (err ,message) {
        if(err){
            return res.status(500).json({
                title:'An error occurred',
                error:err
            });
        }
        if(!message){
            return res.status(500).json({
                title:'No Message!',
                error:{message: 'Message not found!'}
            });
        }
        if(decoded.user._id != message.user){
            return res.status(500).json({
               title: 'An error occurred',
               error:{message:'Do not have any permission'}
            });
        }
        message.content = req.body.content;
        message.save(function (err, data) {
            if(err){
                return res.status(500).json({
                    title: 'An error occurred when updated.',
                    error:err
                });
            }
            res.status(201).json({
                message: 'Successfully updated',
                obj:data
            });
        });
      });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.header('Authorization'));
   Message.findById(req.params.id, function (err, message) {
       if (err) {
           return res.status(500).json({
                title: 'An error occurred',
                error:err
            });
       }
       if(!message){
           return res.status(500).json({
               title:'An error occurred',
               error:{message:'Not find the message on database'}

           });
       }
       if(decoded.user._id != message.user) {
           return res.status(500).json({
               title:'An error occurred',
               error:{message:'Do not have any permission'}
           });
       }
       message.remove(function (err, result) {
           if(err){
               if (err) {
                   return res.status(500).json({
                       title: 'An error occurred',
                       error:err
                   });
               }
           }
           res.status(201).json({
               message:'Successfully removed',
               obj:message
           })
       });
   });
});

module.exports = router;