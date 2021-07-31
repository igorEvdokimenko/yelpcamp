const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviews = require('../controllers/review')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReviev))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteRiview))

module.exports = router;