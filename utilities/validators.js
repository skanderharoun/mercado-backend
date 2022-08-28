const Joi = require('joi');

const itemValidator = Joi.object({
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    photo: Joi.string(),
    price: Joi.number().required()
});

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required().min(4),
    phone: Joi.string().required(),
})

const loginValidator = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required()
})

module.exports = {
    itemValidator,
    registerValidator,
    loginValidator
}