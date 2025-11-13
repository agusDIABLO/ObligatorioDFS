import { createError } from "../error/create-error.mjs";    
import serviceRepository from "../repositories/service-repository.mjs";

export const createService = async (req, res, next) => {   
    try {
        console.log(req.body)
        const service = req.body;
        const serviceCreado = await serviceRepository.createService(service);
        res.status(201).json({Service: serviceCreado});
    } catch (error) {
        
        res.status(500).json({error: 'No se pudo crear el servicio'}); 
    }
}


export const getAllServices = async (req, res, next) => {
    try {
        const services = await serviceRepository.getAllServices();
        res.status(200).json({Services: services});
    } catch (error) {
        res.status(500).json({error: 'No se pudieron obtener los servicios'}); 
    }
}



export const getServiceById = async (req, res, next) => {
     console.log('req.params:', req.params);
    try {
        const id  = req.params.id;
        const service = await serviceRepository.getServiceById(id);
        if (!service) {
            res.status(404).json({error: 'No se pudo encontrar el servicio'});
        }
        res.status(200).json({Service: service});
    } catch (error) {
        res.status(500).json({error: 'No se pudo obtener el servicio'}); 
    }   

}