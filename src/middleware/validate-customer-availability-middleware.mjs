import reservationRepository from "../repositories/reservation-repository.mjs";
import { createError } from "../error/create-error.mjs";
import serviceRepository from "../repositories/service-repository.mjs";


export const validateCustomerAvailabilityMiddleware = async (req, res, next) => {
    try {
        const { serviceId, reservationDateTime } = req.body;
        const customerId = req.user.id; // del token
        const service = await serviceRepository.getServiceById(serviceId);

        if (!service) {
            return next(createError(400, 'Servicio no válido'));
        }

        const duration = service.duration; // duración en minutos

        // reservationDateTime ya viene como Date del frontend
        const startTime = new Date(reservationDateTime);
        
        // Verificar que la fecha sea válida
        if (isNaN(startTime.getTime())) {
            return next(createError(400, 'Fecha y hora de reserva inválida'));
        }
        
        const endTime = new Date(startTime.getTime() + duration * 60000);

        // Buscar reservas existentes del cliente en el mismo día
        const startOfDay = new Date(startTime);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(startTime);
        endOfDay.setHours(23, 59, 59, 999);
        
        const existingReservations = await reservationRepository.getReservationsByCustomerAndDateRange(
            customerId, startOfDay, endOfDay
        );
        
        // Verificar si hay solapamiento de horarios
        const isOverlapping = existingReservations.some(reservation => {
            const existingStartTime = new Date(reservation.reservationDateTime);
            const existingEndTime = new Date(existingStartTime.getTime() + reservation.serviceId.duration * 60000);

            return (startTime >= existingStartTime && startTime < existingEndTime) ||
                   (endTime > existingStartTime && endTime <= existingEndTime) ||
                   (startTime <= existingStartTime && endTime >= existingEndTime);
        });

        if (isOverlapping) {
            return next(createError(400, 'Ya tienes otra reserva en el horario seleccionado'));
        }
        
        next();
    } catch (error) {
        next(createError(500, 'Error al validar la disponibilidad del cliente'));
    }
};