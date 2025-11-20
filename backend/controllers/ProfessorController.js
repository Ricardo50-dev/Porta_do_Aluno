import User from "../models/User.js";
import Professor from "../models/Professores.js";
// import Aluno from "../models/Aluno.js";
import bcrypt from "bcryptjs";
// import Logger from "../db/logger.js";
// import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
//import jwt from "jsonwebtoken";
import getUserByToken from "../helpers/get-user-by-token.js";
import Turma from "../models/Turma.js";
import ProfessoresTurmas from "../models/ProfessoresTurmas.js";
import Disciplina from "../models/Disciplinas.js";
import Aluno from "../models/Aluno.js";
import Notas from "../models/Notas.js";
import Frequencia from "../models/Frequencia.js";

export default class ProfessorController {
  static async getMinhaTurma(req, res) {
    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (!user) {
        return res.status(401).json({ message: "Acesso negado!" });
      }

      // find professor on db
      const professor = await Professor.findOne({
        where: { usuario_id: user.ID },
      });

      if (!professor) {
        return res.status(404).json({
          message: "Perfil de professor não encontrado para este usuário.",
        });
      }

      const minhasTurmas = await ProfessoresTurmas.findAll({
        attributes: [],
        where: {
          professor_id: professor.ID, // substitua pela variável apropriada
        },
        include: [
          {
            model: Turma,
            attributes: ["nome_turma", "ano_letivo"],
          },
        ],
      });

      const turmasEncontradas = minhasTurmas.map((link) => ({
        nome_turma: link.turma.nome_turma,
        ano_letivo: link.turma.ano_letivo,
      }));

      // return data
      return res.status(200).json({
        turmasEncontradas,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar turmas." });
    }
  }

  static async postNotas(req, res) {
    const { aluno_id, disciplina_id, bimestre, valor_nota } = req.body;

    // validation
    if (!aluno_id || !disciplina_id || !bimestre || valor_nota === undefined) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (!user) {
        return res.status(401).json({ message: "Acesso negado!" });
      }

      // find professor on db
      const professor = await Professor.findOne({
        where: { usuario_id: user.ID },
      });

      try {
        const disciplinaProfessor = await Disciplina.findOne({
          where: {
            ID: disciplina_id,
            professor_id: professor.ID,
          },
        });

        if (!disciplinaProfessor) {
          return res.status(401).json({
            message:
              "Você não tem permissão para lançar notas nesta disciplina.",
          });
        }

        const alunoExiste = await Aluno.findByPk(aluno_id);
        if (!alunoExiste) {
          return res.status(404).json({ message: "Aluno não encontrado." });
        }

        const notaExistente = await Notas.findOne({
          where: {
            aluno_id,
            disciplina_id,
            bimestre,
          },
        });

        if (notaExistente) {
          return res.status(422).json({
            message:
              "Já existe uma nota lançada para este aluno neste bimestre.",
          });
        }

        const novaNota = await Notas.create({
          aluno_id,
          disciplina_id,
          bimestre,
          valor_nota,
        });

        return res
          .status(201)
          .json({ message: "Nota lançada com sucesso!", nota: novaNota });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao encontrar a disciplina referente ao seu cadastro.",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro ao postar nota." });
    }
  }

  static async lancarFrequencia(req, res) {
    const { aluno_id, disciplina_id, data, presente } = req.body;

    // validation
    if (!aluno_id || !disciplina_id || !data || presente === undefined) {
      return res
        .status(422)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    try {
      const token = getToken(req);
      const user = await getUserByToken(token);

      if (!user) {
        return res.status(401).json({ message: "Acesso negado!" });
      }

      // find professor on db
      const professor = await Professor.findOne({
        where: { usuario_id: user.ID },
      });

      try {
        const disciplinaProfessor = await Disciplina.findOne({
          where: {
            ID: disciplina_id,
            professor_id: professor.ID,
          },
        });

        if (!disciplinaProfessor) {
          return res.status(401).json({
            message:
              "Você não tem permissão para lançar frequências nesta disciplina.",
          });
        }

        const alunoExiste = await Aluno.findByPk(aluno_id);
        if (!alunoExiste) {
          return res.status(404).json({ message: "Aluno não encontrado." });
        }

        const frequenciaExistente = await Frequencia.findOne({
          where: {
            aluno_id,
            disciplina_id,
            data,
          },
        });

        if (frequenciaExistente) {
          return res.status(422).json({
            message:
              "Já existe uma frequência lançada para este aluno nesta data.",
          });
        }

        const novaFrequencia = await Frequencia.create({
          aluno_id,
          disciplina_id,
          data,
          presente,
        });

        return res.status(201).json({
          message: "Frequência lançada com sucesso!",
          frequencia: novaFrequencia,
        });
      } catch (error) {
        res.status(500).json({
          message: "Erro ao encontrar a disciplina referente ao seu cadastro.",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Erro ao postar frequência." });
    }
  }
}
