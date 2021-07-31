const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const { storage } = require('../cloudinary');
const multer = require('multer');
const upload = multer({ storage })

router.get('/new', isLoggedIn, campgrounds.newCampgroundForm);

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit));

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));


router.route('/:id')
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))
    .get(catchAsync(campgrounds.showCampground))

module.exports = router;