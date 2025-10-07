import { createError } from "../error/create-error.mjs";
import reservationRepository from "../repositories/reservation-repository.mjs";
import userRepository from "../repositories/user-repository.mjs";
import serviceRepository from "../repositories/service-repository.mjs";




export const createReservation = async (req, res, next) => {   
    try {
        const { barberId, serviceId, reservationDateTime, status } = req.body;
        const customerId = req.user.id; // del token
        
        

        const customer = await userRepository.getUserById(customerId);
        if (!customer || !customer.role.includes('customer')) {
        return next(createError(400, 'Cliente no válido'));
        }
        
        const barber = await userRepository.getUserById(barberId);
        if (!barber || !barber.role.includes('barber')) {
        return next(createError(400, 'Barbero no válido'));
        }

        const service = await serviceRepository.getServiceById(serviceId);
        if (!service) {
            return next(createError(400, 'Servicio no válido'));
        }


        const nuevaReserva = await reservationRepository.createReservation({
            customerId,
            barberId,
            serviceId,
            reservationDateTime,
            status
        });


        res.status(201).json(nuevaReserva);
    } catch (error) {
        next(createError(500, 'No se pudo crear la reserva'));
    }
}
