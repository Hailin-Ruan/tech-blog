const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const postDataItem of postData) {
    const { title, content, date_created, comments } = postDataItem;

    // Create the post
    const post = await Post.create({
      title,
      content,
      date_created,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    // Create and associate comments with the post
    for (const commentData of comments) {
      const user = users[Math.floor(Math.random() * users.length)];
      await Comment.create({
        text: commentData.text,
        date_created: commentData.date_created,
        user_id: user.id,
        post_id: post.id,
      });
    }
  }

  process.exit(0);
};

seedDatabase();
