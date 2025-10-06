import e from "express";
import Joi from "joi";


export const validateAuth = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    role: Joi.array(), //.items(Joi.string().valid('customer', 'admin', 'barber')).required()
    iat: Joi.number().integer(),
    exp: Joi.date()
});


export const validateSignup = Joi.object({
    name: Joi.string().min(3).max(35).required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    phone: Joi.number().integer().required(),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid('customer').default('customer'),
    plan: Joi.string().valid('plus', 'premium').default('plus') //chequear si no deja el plus siempre
});

export const validateLogin = Joi.object({
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string().min(6).max(20).required()
});


export const validateUpdateUser = Joi.object({
    plan: Joi.string().valid('plus', 'premium')
});

export const validateUpdateUserId = Joi.object({
    id: Joi.required()
});