const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");

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

    process.exit(0);
};

seedData();