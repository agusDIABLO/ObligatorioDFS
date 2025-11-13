import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";
import { validateRoleMiddleware } from "../../middleware/validate-role-middleware.mjs";
import { validatePlanMiddleware } from "../../middleware/validate-plan-middleware.mjs";
import { updateUserPlan, getAllUsers, getUserById, getUsersByRole } from "../../controllers/user-controller.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import { validateUpdateUser, validateUpdateUserId } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
import { get } from "mongoose";


const routes = express.Router();



// Middleware global: todas las rutas requieren autenticación
routes.use(authMiddleware);

// Obtener usuarios por rol
routes.get("/roles/:role", getUsersByRole);

// Actualizar plan de usuario
routes.patch(
  "/:id/plan",
  validateRoleMiddleware('admin', 'customer'),
  validateRequest(validateUpdateUserId, "params"),
  validateRequest(validateUpdateUser, "body"),
  updateUserPlan 
);

// Obtener todos los usuarios (solo admin)
routes.get(
  "/all",
  validateRoleMiddleware('admin'),
  getAllUsers
);

// Obtener usuario por ID (admin, customer, barber)
routes.get(
  "/user/:id",
  validateRoleMiddleware('admin', 'customer', 'barber'),
  getUserById
);







export default routes;