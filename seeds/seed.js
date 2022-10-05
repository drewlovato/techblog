const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedData = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

        for (const post of postData) {
            await Post.bulkCreate({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const data = await Post.findAll();
    const posts = data.map((post) => post.get({ plain: ture }));

    for(const comment of commentData) {
    await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: posts[Math.floor(Math.random() * posts.length)].id,
    });
}
    process.exit(0);
};

seedData();