const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.status(200).json(userData);
    } catch(err){
        res.status(400).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try{
        const userData = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password']
            },
            include: [{
                model: Post,
                attributes: ['id', 'name', 'details']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_details'],
                include: {
                    model: Post,
                    attributes: ['name']
                }
            }
        ]
        });
        res.status(200).json(userData);
    } catch (errr) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        //add session when authorized
        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email of password, please try again'});

            return;
        }

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'});

            return;
        }

        req.session.save(() => {
            req.session.user.id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!"});
        });
    } catch {
        res.status(400).json(err);
    }
});

router.post('/login', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

