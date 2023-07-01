const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = process.env.SECRET_KEY

const register = async (req, res)=>{
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const user = await userModel.create({name, email, password});
        if (!user) {
            res.status(400).json({
                message: 'Invalid username or password'
            })
        } else {
            res.status(200).json({
                message: 'Success',
                data: user
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const login = async(req, res)=>{
    try {
        const {
            email, 
            password
        } = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            res.status(404).json({
                message: 'Invalid email or password'
            });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(404).json({
                    message: 'Invalid password, Try Again'
                });
            } else {
                const token = jwt.sign({userId: user._id}, secretkey, {expiresIn: '1h'});
                res.status(200).json({
                    message: 'Successfully Logged in',
                    data: token
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};



const getOneUser = async (req, res)=>{
    try {
        // console.log(req.user)
        // const user = await userModel.findById(req.user.userId);
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
        } else {
            res.status(200).json({
                message: 'User found',
                data: user
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    register,
    login,
    getOneUser
}