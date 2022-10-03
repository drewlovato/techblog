const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const commentRoutes = require('./api/commentRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;