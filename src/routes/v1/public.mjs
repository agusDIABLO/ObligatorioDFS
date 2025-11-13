import express from "express";
import { createUser, loginUser } from "../../controllers/user-controller.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import { validateLogin, validateSignup } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";

const routes = express.Router();

routes.post("/signup", validateRequest(validateSignup, reqValidate.BODY), createUser);
routes.post("/login", validateRequest(validateLogin, reqValidate.BODY), loginUser);

export default routes;