import Logger from "../db/logger.js";
import Aluno from "../models/Aluno.js";
import Notas from "../models/Notas.js";
import getUserByToken from "../helpers/get-user-by-token.js";
import getToken from "../helpers/get-token.js";
import Frequencia from "../models/Frequencia.js";
import Avisos from "../models/Avisos.js";

export default class StudentController {
  //static async minhasNotas(req, res) {
  //  const token = getToken(req);
  //  const user = await getUserByToken(token);

  //  if (!user) {
  //    return res.status(401).json({ message: "Acesso negado." });
  //  }

  //  const aluno = await Aluno.findOne({ where: { usuario_id: user.ID } });

  //  if (!aluno) {
  //   return res.status(404).json({ message: "Aluno não encontrado." });
  //  }

  //  try {
  //    const notasExists = await Notas.findAll({
  //      where: { aluno_id: aluno.ID },
  //    });

  //    if (notasExists.length === 0) {
  //      return res.status(404).json({
  //        message: "Notas não encontradas.",
  //      });
  //    }

  //    return res.status(200).json({
  //      notas: notasExists,
  //    });
  //  } catch (error) {
  //    Logger.error(`Erro encontrar notas. ${error}`);
  //    res.status(500).json({ message: error });
  //  }
  //}

  static async minhasNotas(req, res) {
    const id = req.params.id;

    try {
      const notasExists = await Notas.findAll({
        where: { aluno_id: id },
      });

      if (notasExists.length === 0) {
        return res.status(404).json({
          message: "Notas não encontradas.",
        });
      }

      return res.status(200).json({
        notas: notasExists,
      });
    } catch (error) {
      Logger.error(`Erro encontrar notas. ${error}`);
      res.status(500).json({ message: error });
    }
  }

  static async minhasFrequencias(req, res) {
    const id = req.params.id;

    try {
      const frequenciaExists = await Frequencia.findAll({
        where: { aluno_id: id },
      });

      if (frequenciaExists.length === 0) {
        return res.status(404).json({
          message: "Frequência não encontradas.",
        });
      }

      return res.status(200).json({
        notas: frequenciaExists,
      });
    } catch (error) {
      Logger.error(`Erro encontrar frequência. ${error}`);
      res.status(500).json({ message: error });
    }
  }

  static async listAvisos(req, res) {
    try {
      const avisosExists = await Avisos.findAll();

      if (avisosExists.length === 0) {
        return res.status(404).json({
          message: "Avisis não encontrados.",
        });
      }

      return res.status(200).json({
        avisos: avisosExists,
      });
    } catch (error) {
      Logger.error(`Erro encontrar avisos. ${error}`);
      res.status(500).json({ message: error });
    }
  }
}
