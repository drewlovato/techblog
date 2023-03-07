const router = require("express").Router();
const { User, Post } = require("../../models");
const isAuthorized = require("../../utils/auth");

// GET post by ID
router.get("/:id", isAuthorized, async (req, res) => {
  try {
    const data = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
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

// CREATE a new post
router.post("/", isAuthorized, async (req, res) => {
  try {
    const data = await Post.create({
      title: req.body.title,
      date_created: Date.now(),
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE existing post
router.put("/:id", isAuthorized, async (req, res) => {
  try {
    const data = await Post.update(
      {
        id: req.params.id,
        title: req.body.title,
        date_created: req.body.dateCreated,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.body.user_id,
        },
      }
    );
    console.log(data);

    if (!data) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE existing post
router.delete("/:id", isAuthorized, async (req, res) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
