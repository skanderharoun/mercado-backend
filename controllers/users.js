const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { registerValidator, loginValidator } = require('../utilities/validators');

const register = async (req, res) => {
    try {
        const validationResult = registerValidator.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            res.status(400).json(validationResult);
        } else {
            const { firstName, lastName, email, password, phone } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(401).json({
                    error: 'An account with this email exists already'
                });
                return;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone
            }).save();
            res.status(201).json({
                message: 'Account created successfully'
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

const login = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            res.status(400).json(validationResult);
        } else {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({
                    error: 'Wrong email and/or password'
                });
                return;
            }
            const passwordsMatch = await bcrypt.compare(password, user.password)
            if (!passwordsMatch) {
                res.status(401).json({
                    error: 'Wrong email and/or password'
                });
                return;
            }
            user.password = undefined;
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
            res.status(200).json({
                message: `Welcome ${user.firstName}`,
                user,
                token
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login
}