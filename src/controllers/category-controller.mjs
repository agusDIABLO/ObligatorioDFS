import {createError} from "../error/create-error.mjs";
import categoryRepository from "../repositories/category-repository.mjs";


export const createCategory = async (req, res, next) => {   
    try {
        const category = req.body;
        const categoryCreada = await categoryRepository.createCategory(category);
        res.status(201).json({Category: categoryCreada});
    } catch (error) {
        next(createError(500, 'No se pudo crear la categoria'));
    }
}