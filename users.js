const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    create_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    update_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    update_time: {
        type: Date,
        default: null
    },
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    no_phone: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        default: ''
    },
    last_login_time: {
        type: Date,
        default: null
    },
    role: {
        type: Number,
        enum: [1, 2, 3, 4],
        default: 1
    }
}, { collection: 'users' });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
