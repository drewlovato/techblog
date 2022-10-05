const router = require('express').Router();
const {User, Post } = require('../../models');
const isAuthorized = require('../../utils/auth');

// GET post by ID
router.get('/:id', isAuthorized, async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
        include : [
            { 
            model: User, 
            },
        ],
    });
    const post = data.get({ plain: true });
    res.render("post", {
        post,
        loggedIn: req.session.loggedIn,
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// CREATE a new post
router.post('/', isAuthorized, async (req, res) => {
    try {
        const data = await Post.create({
        title: req.body.name,
        content: req.body.content,
        user_id: req.session.user_id,
        });
        res.status(200).json(data);
    } catch (err){
        res.status(400).json(err);
    }
});

// UPDATE existing post
router.put('/:id', isAuthorized, async (req, res) => {
    try{
        const updatePost = await Post.update(
            {
                id: req.params.id,
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id:req.params.id,
                    user_id: req.body.user_id,
                },
            }
        );
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE existing post
router.delete('/:id', isAuthorized, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;