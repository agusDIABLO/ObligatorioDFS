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

export const getCategoryById = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const category = await categoryRepository.getCategoryById(_id);
        if (!category) {
            return next(createError(404, 'Categoria no encontrada'));
        }
        res.status(200).json({Category: category});
    } catch (error) {
        next(createError(500, 'No se pudo obtener la categoria'));
    }
}
