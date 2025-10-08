import Joi from "joi";

export const validateCreateReservation = Joi.object({
    serviceId: Joi.string().required(),
    barberId: Joi.string().required(),
    reservationDateTime: Joi.date().greater('now').required()
    .custom((value, helpers) => {
        const date = new Date(value);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        if (hours < 9 || (hours >= 22 && minutes > 0) || hours > 22) {
            return helpers.message('La reserva debe ser entre las 9:00 AM y las 10:00 PM');
        }       
        return value;
    }),
    reservationDateTime: Joi.date()
        .greater('now')
        .required()
        .custom((value, helpers) => {
            const date = new Date(value);
            const hour = date.getUTCHours(); // Usar UTC para consistencia
            const minutes = date.getUTCMinutes();
            const timeInMinutes = hour * 60 + minutes;
            
            // Horario de funcionamiento: 8:00 AM (480 min) a 6:00 PM (1080 min)
            const openTime = 8 * 60; // 8:00 AM = 480 minutos
            const closeTime = 22 * 60; // 6:00 PM = 1080 minutos
            
            console.log(`Validando hora: ${hour}:${minutes} (${timeInMinutes} minutos)`);
            console.log(`Rango permitido: ${openTime} - ${closeTime} minutos`);
            
            if (timeInMinutes < openTime || timeInMinutes >= closeTime) {
                return helpers.message('La reserva debe ser entre las 8:00 AM y las 10:00 PM');
            }

            // Validar que los minutos sean múltiplos de 30
            if (minutes % 30 !== 0) {
                return helpers.message('La hora debe ser en intervalos de 30 minutos (ej: 9:00, 9:30, 10:00, 10:30)');
            }
            
            return value;
        }),
    status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending')
});


export const validateDeleteReservation = Joi.object({
    id: Joi.string().hex().length(24).required()
});


export const validateReservationByCategory = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "El id de la categoría es obligatorio",
        "string.empty": "El id de la categoría no puede estar vacío"
    })
});


export const validateReservationByUserId = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "El id del usuario es obligatorio",
        "string.empty": "El id del usuario no puede estar vacío"
    })
});


