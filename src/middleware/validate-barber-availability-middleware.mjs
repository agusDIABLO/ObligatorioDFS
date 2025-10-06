import reservationRepository from "../repositories/reservation-repository.mjs";
import { createError } from "../error/create-error.mjs";
import serviceRepository from "../repositories/service-repository.mjs";


export const validateBarberAvailabilityMiddleware = async (req, res, next) => {
    try {
        const { barberId, serviceId ,reservationDate, reservationTime } = req.body;

        const service = await serviceRepository.getServiceById(serviceId);
        if (!service) {
            return next(createError(400, 'Servicio no válido'));
        }

        const duration = service.duration; // duración en minutos

        const startTime = new Date(`${reservationDate}T${reservationTime}`);
        const endTime = new Date(startTime.getTime() + duration * 60000); // sumamos duracion en ms

        // Buscar reservas existentes del barbero en la misma fecha
        const existingReservations = await reservationRepository.getReservationByBarberAndDate(barberId, reservationDate);

        // Verificar si hay solapamiento de horarios
        const isOverlapping = existingReservations.some(reservation => {
            const existingStartTime = new Date(`${reservation.reservationDate.toISOString().split('T')[0]}T${reservation.reservationTime}`);
            const existingServiceDuration = reservation.serviceId?.duration || 0;
            const existingEndTime = new Date(existingStartTime.getTime() + reservation.serviceId.duration * 60000);
            return (startTime >= existingStartTime && startTime < existingEndTime) ||
                   (endTime > existingStartTime && endTime <= existingEndTime) ||
                   (startTime <= existingStartTime && endTime >= existingEndTime);
        });

        if (isOverlapping) {
            return next(createError(400, 'El barbero no está disponible en el horario seleccionado'));
        }
        next();
    } catch (error) {
        next(createError(500, 'Error al validar la disponibilidad del barbero'));
    }
};