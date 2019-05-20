const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    online: {
        type: Boolean,
        default: 0
    }
});

/**
 * Before save a user document, Make sure to Hash user's password
 *
 */
UserSchema.pre('save', async function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (user.isModified('password')) {
        // generate a salt
        try {
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;

        } catch (error) {
            throw new Error('Hashing failed', error);
        }
    }

    next();
});

/**
 * Create an Instance method to validate user's password
 * This method will be used to compare the given password with the passwoed stored in the database
 * 
 */
UserSchema.methods.validatePassword = (password, callback) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

UserSchema.methods.joiValidate = (data) => {
    const Joi = require('joi');
    const schema = {
        username: Joi.string().min(6).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required()
    };
    return Joi.validate(data, schema);
};

module.exports = mongoose.model('user', UserSchema);