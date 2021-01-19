const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/keys');

const User = require('../models/User');
const BabySitter = require('../models/BabySitter');


// Helper function for JWT
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.jwtSecret, {
        expiresIn: 604800 // expires in 7 days = 604800s
    })
}

module.exports = {
    // @route   POST auth/register
    // @desc    Register new user
    // @access  Public
    async signinUser(req, res) {

        const {
            email
        } = req.body;

        try {
            if (await User.findOne(
                    email
                )) {
                // Email/user already exists
                return res.status(400).send({
                    error: `The email ${email} is already in use.`
                });
            }
            const userId = await User.create(req.body);

            return res.json({
                ...userId,
                token: generateToken({
                    id: userId
                })
            });

        } catch (err) {
            return res.status(400).send({
                error: 'Registration failed'
            });
        }
    },

    // @route   POST auth/authenticate
    // @desc    Auth user
    // @access  Public
    async loginUser(req, res) {
        const {
            email,
            password
        } = req.body;
        
        const user = await User.findOne(
            email
        );

        if (!user) {
            // Email/user doesn't exist
            // return res.status(400).send({ error: 'Email not found. Please sign up.' });
            return res.status(400).json({
                error: 'Email not found. Please sign in.'
            });
        }

        if (!await bcrypt.compare(password, user.password)) {
            // password incorrect
            return res.status(400).send({
                error: 'Your email and password do not match'
            });
        }

        user.password = undefined;

        res.json({
            ...user,
            token: generateToken({
                id: user.id
            })
        });
    },

    // @route   GET /api/auth/user
    // @desc    Get user data
    // @access  Private
    async index(req, res) {
        const {user_id} = req.headers;
        const user = await User.findById({id : user_id});
        
        user.password = undefined;

        res.send(user);

    },
};