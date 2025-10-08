import express from 'express';
import { createReservation } from '../../controllers/reservation-controller.mjs';
import { validateRequest } from '../../middleware/validation.middleware.mjs';
import { validateCreateReservation } from '../../validations/validation-reservation.mjs';
import { validateDeleteReservation } from '../../validations/validation-reservation.mjs';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { authMiddleware } from '../../middleware/auth-middleware.mjs';
import { validateRoleMiddleware } from '../../middleware/validate-role-middleware.mjs';
import { validateReservationTimeMiddleware } from '../../middleware/validate-reservationTime-middleware.mjs';
import { descontarLimitReservationAUsuarioMiddleware } from '../../middleware/descontarLimitReservationAUsuario-middleware.mjs';
import { validateBarberAvailabilityMiddleware } from '../../middleware/validate-barber-availability-middleware.mjs';
import { validateCustomerAvailabilityMiddleware } from '../../middleware/validate-customer-availability-middleware.mjs';
import { deleteReservation } from '../../controllers/reservation-controller.mjs';



const routes = express.Router();


routes.use(authMiddleware);

routes.post("/",validateRoleMiddleware('customer', 'admin'),
validateRequest(validateCreateReservation, reqValidate.BODY),   
validateReservationTimeMiddleware,
validateCustomerAvailabilityMiddleware,
validateBarberAvailabilityMiddleware,
descontarLimitReservationAUsuarioMiddleware,
createReservation);


routes.delete("/:id", validateRoleMiddleware('customer', 'admin'), validateRequest(validateDeleteReservation, reqValidate.PARAM), deleteReservation);


export default routes;