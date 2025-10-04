import Joi from 'joi';

export const validateCreateCategory = Joi.object({
    name: Joi.string().min(3).max(30).required()
});

export const validateGetCategoryById = Joi.object({
    id: Joi.string().required()
}); 