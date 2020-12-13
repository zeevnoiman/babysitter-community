const express = require('express');
const multer = require("multer");

const auth = require('./middleware/auth');
const babysitter = require('./controller/babySitterController');
const user = require('./controller/userController');
const work = require('./controller/workController');
const uploadConfig = require('./config/upload');
const searchController = require('./controller/searchController');
const reviewController = require('./controller/reviewController');
const likeController = require('./controller/likeController');
const distanceController = require('./controller/distanceController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res)=>{
    return res.send('Hello world');
})
routes.get('/babysitter/:user_id', auth ,babysitter.index);
routes.post('/babysitter', auth, upload.single('photo'), babysitter.store);
routes.post('/valorate', auth, reviewController.store);
routes.put('/like/:babysitter_id', auth, likeController.store);
routes.delete('/like/:babysitter_id', auth, likeController.delete);
routes.get('/like', auth, likeController.show);
routes.get('/reviews/:babysitterId', auth, reviewController.index);
routes.get('/user', auth ,user.index);
routes.post('/signin', user.signinUser);
routes.post('/login', user.loginUser);
routes.get('/work', auth, work.index);
routes.post('/work/:babysitter_id', auth, work.store);
routes.get('/search', searchController.index);
routes.get('/distance', distanceController.distance);

module.exports = routes;