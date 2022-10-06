const router = require("express").Router();
const { Comment } = require("../../models");
const isAuthorized = require("../../utils/auth");

router.post("/", isAuthorized, async (req, res) => {
  try {
    const data = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(data);
  } catch {
    res.status(400).json(err);
  }
});

router.delete("/", isAuthorized, async (req, res) => {
  try {
    const data = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "There are no comments to delete." });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
