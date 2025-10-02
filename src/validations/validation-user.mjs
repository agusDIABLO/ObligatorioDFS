import Joi from "joi";


export const validateAuth = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    role: Joi.array().items(Joi.string().valid('customer', 'admin', 'barber')).required()
    //iat: Joi.number().integer() probe sacarle el iat
});


export const validateSignup = Joi.object({
    name: Joi.string().min(3).max(35).required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    phone: Joi.number().integer().required(),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid('customer').default('customer'),
    plan: Joi.string().valid('plus', 'premium').default('plus')
});

export const validateLogin = Joi.object({
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string().min(6).max(20).required()
});