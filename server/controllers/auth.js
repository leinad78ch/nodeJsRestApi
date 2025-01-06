const { validationResult } = require('express-validator/check');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const error = new Error('validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    bcrypt.hash(password,12)
    .then(hashedPw => {
        const user = new User({
            email: email,
            name: name,
            password: hashedPw
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({ message: 'User created', userId: result._id });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    })

};