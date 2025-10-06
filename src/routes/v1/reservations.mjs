import express from 'express';
import { createReservation } from '../../controllers/reservation-controller.mjs';
import { validateRequest } from '../../middleware/validation.middleware.mjs';
import { validateCreateReservation } from '../../validations/validation-reservation.mjs';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { authMiddleware } from '../../middleware/auth-middleware.mjs';
import { validateRoleMiddleware } from '../../middleware/validate-role-middleware.mjs';


const routes = express.Router();


routes.use(authMiddleware);

routes.post("/",validateRoleMiddleware('customer'), validateRequest(validateCreateReservation, reqValidate.BODY), createReservation);  


export default routes;