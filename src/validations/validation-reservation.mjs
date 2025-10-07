import Joi from "joi";

export const validateCreateReservation = Joi.object({
    serviceId: Joi.string().required(),
    barberId: Joi.string().required(),
    reservationDateTime: Joi.date().greater('now').required(),
    status: Joi.string().valid('pending', 'confirmed', 'cancelled').default('pending')
});