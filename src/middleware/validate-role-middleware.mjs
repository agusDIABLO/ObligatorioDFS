export const validateRoleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        const hasRole = req?.user?.role?.some(rol => allowedRoles.includes(rol));
        if (!hasRole) {
            return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
        } else {
            next();
        }
    }
}