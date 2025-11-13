import routerEX from "express";
import UserController from "../controllers/UserController.js";

const routerLogin = routerEX.Router();

routerLogin.post("/login", UserController.login);

export default routerLogin;
