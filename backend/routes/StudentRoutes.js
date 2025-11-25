import routerEX from "express";
import StudentController from "../controllers/StudentController.js";
import verifyToken from "../helpers/check-token.js";

const router = routerEX.Router();

router.get("/me/notas/:id", verifyToken, StudentController.minhasNotas);
router.get(
  "/me/frequencia/:id",
  verifyToken,
  StudentController.minhasFrequencias
);
//router.get("/me/horarios/:id", verifyToken, StudentController.meusHorarios);
//router.get("/me/materiais/", verifyToken, StudentController.materiais);
router.get("/me/avisos", verifyToken, StudentController.listAvisos);

export default router;
