import user from "../model/user.mjs";
import userRepository from "../repositories/user-repository.mjs";

export const validatePlanMiddleware = (...allowedPlans) => {
    return async (req, res, next) => {
        try {
            let userPlan = req?.user?.plan;

            // Si no tenemos plan en req.user, lo buscamos en DB
            if (!userPlan && req.user?.id) {
                const userFromDB = await userRepository.getUserById(req.user.id);
                if (!userFromDB) {
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }
                userPlan = userFromDB.plan;
                req.user.plan = userPlan; 
            }

            // Validamos si el plan está permitido
            if (!allowedPlans.includes(userPlan)) {
                return res.status(403).json({ error: 'No tienes permiso para realizar esta acción con tu plan actual' });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno al validar el plan' });
        }
    }
}