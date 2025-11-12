import routerEX from "express";
import UserController from "../controllers/UserController.js";
// middlewares
//import verifyToken from '../helpers/check-token.js';

const routerL = routerEX.Router();

routerL.post("/", UserController.login);

export default routerL;
