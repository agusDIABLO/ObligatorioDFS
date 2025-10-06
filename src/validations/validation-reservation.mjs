import Joi from "joi";

export const validateCreateReservation = Joi.object({
    serviceId: Joi.string().required(),
    barberId: Joi.string().required(),
    reservationDate: Joi.date().greater('now').required(),
    reservationTime: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')).required(),
    status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending')
});