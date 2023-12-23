const express = require('express');
const router = express.Router(); 
const postController = require('../controllers/postcontroller');
const middlewareauth=require('../middleware/auth')
const middlewareAuth=middlewareauth.auth;



router.post('/create',middlewareAuth, postController.createpost);
router.get('/get', middlewareAuth,postController.getAllPost);
router.put('/updater/:id',middlewareAuth, postController.updatePost);
router.delete('/delete/:id',middlewareAuth, postController.deletePost);

module.exports=router;