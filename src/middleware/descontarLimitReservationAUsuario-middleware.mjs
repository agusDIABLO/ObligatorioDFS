import userRepository from "../repositories/user-repository.mjs";
import { createError } from "../error/create-error.mjs";

export const descontarLimitReservationAUsuarioMiddleware = async (req, res, next) => {
    try {
        const customerId = req.user.id; // del token
        const customer = await userRepository.getUserById(customerId);
        if (!customer) {
            return next(createError(400, 'Cliente no válido'));
        }
        

        if (!customer.role.includes('customer')) {
            return next(createError(403, 'Solo los clientes pueden hacer reservas'));
        }

        if (customer.limitReservations <= 0) {
            return next(createError(403, 'Has alcanzado el límite de reservas permitidas. No puedes hacer más reservas.'));
        }   

        if (customer.plan == 'plus') {
            await userRepository.decrementLimitReservations(customerId);
        }
        
        // Descontar 1 al límite de reservas
        //customer.limitReservations -= 1;
        //await customer.save();
        next();
    } catch (error) {
        next(createError(500, 'Error al procesar la reserva'));
    }   
};