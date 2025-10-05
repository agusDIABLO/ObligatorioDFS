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


export const getServiceById = async (req, res, next) => {
    try {
        const _id  = req.params.id;
        const service = await serviceRepository.getServiceById(_id);
        if (!service) {
            return next(createError(404, 'Servicio no encontrado'));
        }
        res.status(200).json({Service: service});
    } catch (error) {
        next(createError(500, 'Error al obtener el servicio'));
    }   

}