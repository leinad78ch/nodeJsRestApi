const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Maximilian'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(402).json({ message: 'validation failed, entered data is incorrect', errors: errors.array() });
  }

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title, 
    content: content,
    creator: { name : 'Rinderer Daniel'},
    imageUrl: '/images/duck.jpg'
  });

  post.save()
  .then(saved_post => {
    
    res.status(201).json({
      message: 'Post created successfully!',
      post: saved_post
    });

  })
  .catch(err => {
    console.log(err);
  });

};
