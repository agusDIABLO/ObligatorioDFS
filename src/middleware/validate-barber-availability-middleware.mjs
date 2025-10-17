import reservationRepository from "../repositories/reservation-repository.mjs";
import { createError } from "../error/create-error.mjs";
import serviceRepository from "../repositories/service-repository.mjs";


export const validateBarberAvailabilityMiddleware = async (req, res, next) => {
    try {
        const { barberId, serviceId, reservationDateTime } = req.body;

        const service = await serviceRepository.getServiceById(serviceId);
        if (!service) {
            res.status(400).json({ error: "Servicio no valido" });
        }

        const duration = service.duration; // duración en minutos
        const startTime = new Date(reservationDateTime);
        const endTime = new Date(startTime.getTime() + duration * 60000); // sumamos duracion en ms

        const startOfDay = new Date(startTime);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(startTime);
        endOfDay.setHours(23, 59, 59, 999);

        // Buscar reservas existentes del barbero en la misma fecha
        const existingReservations = await reservationRepository.getReservationByBarberAndDate(barberId, startOfDay, endOfDay);

        // Verificar si hay solapamiento de horarios
        const isOverlapping = existingReservations.some(reservation => {
            const existingStartTime = new Date(reservation.reservationDateTime);
            const existingServiceDuration = reservation.serviceId?.duration || 0;
            const existingEndTime = new Date(existingStartTime.getTime() + existingServiceDuration * 60000);
            return (startTime >= existingStartTime && startTime < existingEndTime) ||
                (endTime > existingStartTime && endTime <= existingEndTime) ||
                (startTime <= existingStartTime && endTime >= existingEndTime);
        });

        if (isOverlapping) {
            res.status(400).json({ error: "El barbero no esta disponible en el horario seleccionado" });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Error al validar la disponibilidad del barbero" });
    }
};