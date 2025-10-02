export const validateRoleMiddleware = (allowedRoles) => {

    return (req, res, next) => {
        const hasRole = req?.user?.role?.some(role => allowedRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({error: 'No tienes permiso para realizar esta acción'});
        } else {
            next();
        }


    }
}