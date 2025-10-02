import express from 'express';
import { createCategory } from '../../controllers/category-controller.mjs';
import { validateRequest } from '../../middleware/validation.middleware.mjs';
import { validateCreateCategory } from '../../validations/validation-category.mjs';
import reqValidate from '../../constants/request-validate-constants.mjs';
import { authMiddleware } from '../../middleware/auth-middleware.mjs';
import { validateRoleMiddleware } from '../../middleware/validate-role-middleware.mjs';

const routes = express.Router();


routes.use(authMiddleware);

routes.post("/", validateRoleMiddleware("admin"), validateRequest(validateCreateCategory, reqValidate.BODY), createCategory);



export default routes;