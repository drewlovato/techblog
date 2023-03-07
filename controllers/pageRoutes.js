const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const isAuthorized = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const data = await Post.findAll({
      include: [{ model: User }],
      order: [
        ["date_created", "DESC"],
        ["id", "DESC"],
      ],
    });

    const posts = data.map((post) => post.get({ plain: true }));

    res.render("login", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", isAuthorized, async (req, res) => {
  try {
    const data = await Post.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.session.user_id,
      },
      order: [
        ["date_created", "DESC"],
        ["id", "DESC"],
      ],
    });

    const posts = data.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET view of post page
router.get("/post/:id", async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["id", "date_created", "content"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [
        [Comment, "date_created", "DESC"],
        [Comment, "id", "DESC"],
      ],
    });
    const post = data.get({ plain: true });

    res.render("post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET edit Past page by Id
router.get("/editPost/:id", isAuthorized, async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id, {
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          attributes: ["id", "date_created", "content"],
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
      order: [
        [Comment, "date_created", "DESC"],
        [Comment, "id", "DESC"],
      ],
    });
    console.log(data);
    const post = data.get({ plain: true });

    res.render("editPost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(520).json(err);
  }
});

// GET create Post page
router.get("/createPost/", isAuthorized, async (req, res) => {
  try {
    res.render("createPost", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET delete Post page by Id
router.get("/deletePost/:id", isAuthorized, async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
      where: {
        user_id: req.session.user_id,
      },
    });

    const post = data.get({ plain: true });

    res.render("deletePost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// GET delete Post page by Id
router.get("/deleteComment/:id", isAuthorized, async (req, res) => {
  try {
    const data = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Post,
          attributes: ["id", "title"],
        },
      ],
    });

    const comment = data.get({ plain: true });

    res.render("deleteComment", {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET change Password page
router.get("/changePassword/", isAuthorized, async (req, res) => {
  try {
    const data = await User.findByPk(req.session.user_id);

    const user = data.get({ plain: true });

    res.render("changePassword", {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Login page
router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    } else {
      res.render("login", {
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Create Account page
router.get("/createAccount", async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
    } else {
      res.render("createAccount", {
        logged_on: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
