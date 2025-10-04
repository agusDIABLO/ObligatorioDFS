import { createError } from "../error/create-error.mjs";    
import serviceRepository from "../repositories/service-repository.mjs";


export const createService = async (req, res, next) => {   
    try {
        const service = req.body;
        const serviceCreado = await serviceRepository.createService(service);
        res.status(201).json({Service: serviceCreado});
    } catch (error) {
        next(createError(500, 'No se pudo crear el servicio'));
    }
}   