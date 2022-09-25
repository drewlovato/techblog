const router = require('express').Router();
const {User, Post, Comment } = require('../../models');
const isAuthorized = require('../../utils/auth');

router.get('/', async (req, res) =>{
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'name', 'details', 'creation_data'],
            order: [['creation_data', 'DESC']],
            include: [{
                model: User,
                attributes: ['name'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_details', 'post_id', 'user_id', 'craetion_data'],
                include: {
                    model: User,
                    attributes: ['name'],
                },
            },
        ],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: ['id', 'name', 'details', 'creation_data'],
        include : [{ 
            model: User, 
            attributes: ['names'],
        },
        {
            model: Comment,
            attributes: ['id', 'comment_details', 'post_id', 'user_id', 'craetion_data'],
            include: {
                model: User,
                attributes: ['name'],
            },
        },
    ],
    });
    res.status(200).json(postData);
    } catch (err) {
    res.status(400).json(err);
    }
});