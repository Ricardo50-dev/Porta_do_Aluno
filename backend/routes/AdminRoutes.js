import routerEX from "express";
import AdminController from "../controllers/AdminController.js";
// middlewares
import verifyToken from "../helpers/check-token.js";
import verifyTokenAdmin from "../helpers/check-token-admin.js";

const router = routerEX.Router();

router.post("/register", AdminController.register);
router.get("/checkuser", AdminController.checkUser);
router.get("/get-turmas", AdminController.getTurma);
router.post("/edit", verifyTokenAdmin, AdminController.editUser);
router.get("/:id", AdminController.getUserById);
router.delete("/delete-user/:id", AdminController.deleteUser);
router.post("/create-turma", AdminController.createTurma);

export default router;
