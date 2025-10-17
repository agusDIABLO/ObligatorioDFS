import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";
import { validateRoleMiddleware } from "../../middleware/validate-role-middleware.mjs";
import { validatePlanMiddleware } from "../../middleware/validate-plan-middleware.mjs";
import { updateUserPlan } from "../../controllers/user-controller.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import { validateUpdateUser, validateUpdateUserId } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";


const routes = express.Router();

routes.use(authMiddleware);

routes.patch("/:id/plan",
    validateRoleMiddleware('admin', 'customer'),
    validateRequest(validateUpdateUser, reqValidate.BODY),
    validatePlanMiddleware('plus', 'premium'),
    validateRequest(validateUpdateUserId, reqValidate.PARAM), updateUserPlan);

export default routes;