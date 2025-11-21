import routerEX from "express";
import AdminController from "../controllers/AdminController.js";
// middlewares
import verifyToken from "../helpers/check-token.js";
import verifyTokenAdmin from "../helpers/check-token-admin.js";

const router = routerEX.Router();

router.post("/register", AdminController.register);
router.get("/checkuser", AdminController.checkUser);
router.post("/select-turmas", AdminController.selectTurma);
router.post("/edit", verifyTokenAdmin, AdminController.editUser);
router.get("/:id", AdminController.getUserById);
router.delete("/delete-user/:id", AdminController.deleteUser);
router.delete("/delete-turma/:id", AdminController.deleteTurma);
router.delete("/delete-disciplina/:id", verifyTokenAdmin, AdminController.deleteDisciplina);
router.post("/create-turma", AdminController.createTurma);
router.post("/edit-turma", AdminController.editTurma);
router.post("/create-disciplina", verifyTokenAdmin, AdminController.createDisciplina);
router.post("/select-disciplina", verifyTokenAdmin, AdminController.selectDisciplina);
router.post("/edit-disciplina", verifyTokenAdmin, AdminController.editDisciplina);

export default router;
