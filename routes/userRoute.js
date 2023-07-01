const {
    register,
    login,
    getOneUser
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authenticationMiddleware')


const express  = require('express');
const route = express.Router();

// Register a new User
route.post('/register', register)

// Login a User
route.post('/login', login)

// Get a user information 
// route.get('/user', authMiddleware, getOneUser);
route.get('/user/:id', getOneUser);

module.exports = route;
