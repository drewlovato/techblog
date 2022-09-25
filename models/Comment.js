// Attach Models and Datatypes through sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Comment attaches to models
class Comment extends Model {}

// Create comment database
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_details: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references:{
            model: 'user',
            key: 'id',
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'post',
            key: 'id',
        },
    },
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Comment;