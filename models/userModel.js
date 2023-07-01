const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password') || user.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
