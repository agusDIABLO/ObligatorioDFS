import express from 'express';
import { createService, getAllServices, getServiceById } from '../../controllers/service-controller.mjs';
import { validateRequest } from '../../middleware/validation.middleware.mjs';
import { validateCreateService, validateServiceById } from '../../validations/validation-service.mjs';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { authMiddleware } from '../../middleware/auth-middleware.mjs';
import { validateRoleMiddleware } from '../../middleware/validate-role-middleware.mjs';


const routes = express.Router();

routes.use(authMiddleware);

routes.post("/", validateRoleMiddleware('admin', 'customer'), validateRequest(validateCreateService, reqValidate.BODY), createService);
routes.get("/:id", validateRoleMiddleware('admin', 'customer'), validateRequest(validateServiceById, reqValidate.PARAM), getServiceById);
routes.get("/all", getAllServices);




export default routes;