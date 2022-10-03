const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const isAuthorized = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const newComment = await Comment.findAll()
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', isAuthorized, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_details: req.body.comment_details,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }).then(newComment => res.json(newComment))
        .catch(err => {
            res.status(404).json(err)
        });
    }
});

module.exports = router;
