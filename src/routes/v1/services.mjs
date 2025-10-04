import express from 'express';
import { createService } from '../../controllers/service-controller.mjs';
import { validateRequest } from '../../middleware/validation.middleware.mjs';
import { validateCreateService } from '../../validations/validation-service.mjs';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { authMiddleware } from '../../middleware/auth-middleware.mjs';
import { validateRoleMiddleware } from '../../middleware/validate-role-middleware.mjs';


const routes = express.Router();

routes.use(authMiddleware);

routes.post("/", validateRoleMiddleware('admin', 'customer'), validateRequest(validateCreateService, reqValidate.BODY), createService);


export default routes;