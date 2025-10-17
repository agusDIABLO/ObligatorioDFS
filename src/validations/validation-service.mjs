import Joi from "joi";


export const validateCreateService = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    duration: Joi.number().integer().min(15).max(240).required(),
    price: Joi.number().required(),
    categoryId: Joi.required()
});

export const validateServiceById = Joi.object({
    id: Joi.required()
});