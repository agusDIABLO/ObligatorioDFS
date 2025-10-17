import userRepository from "../repositories/user-repository.mjs";
import { createError } from "../error/create-error.mjs";

export const descontarLimitReservationAUsuarioMiddleware = async (req, res, next) => {
    try {
        const customerId = req.user.id; // del token
        const customer = await userRepository.getUserById(customerId);

        if (!customer) {
            res.status(400).json({ error: 'Cliente no válido' });
        } else if (!customer.role.includes('customer')) {
            res.status(403).json({ error: 'Solo los clientes pueden hacer reservas' });
        } else if (customer.limitReservations <= 0 && customer.plan == 'plus') {
            res.status(403).json({ error: 'Has alcanzado el límite de reservas permitidas. No puedes hacer más reservas.' });
        }

        if (customer.plan == 'plus') {
            await userRepository.decrementLimitReservations(customerId);
        }
        next();
    } catch (error) {
        next(createError(500, 'Error al procesar la reserva'));
    }
}