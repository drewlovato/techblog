const router = require('express').Router();
const { User } = require('../../models');
const isAuthorized = require("../../utils/auth");

// Create a User
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData)
        });
    } catch(err) {
        res.status(400).json(err)
    }
});

// Login a User
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email of password, please try again'});
            return;
        }

        if (!correctPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user.id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Login Succesfull"});
        });
    } catch {
        res.status(400).json(err);
    }
});

// UPDATE a Users Password
router.put("/password/", isAuthorized, async(req,res) => {
    try {
        const userDataDB = await User.findByPk(req.session.user_id);
        const correctPassword = userDataDB.checkPassword(
            req.body.presentPassword
        );
        if(correctPassword) {
            const userData = await User.update(
                {
                    password: req.body.newPassword,
                },
                {
                    where: {
                        id: req.session. user_id,
                    },
                    individualHooks: true,
                }
            );
            if (userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({ message: "No user found" })
            }
            } else {
                res.status(400).json({ message: "Incorrect password" });
            }
            } catch (err) {
                res.status(500).json(err)
            }
        });

// Logout a User
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

