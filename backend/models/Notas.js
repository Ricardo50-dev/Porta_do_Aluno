import { DataTypes } from "sequelize";
import db from "../db/db.js";
import Aluno from "./Aluno.js";
import Disciplinas from "./Disciplinas.js";

const Notas = db.define(
  "notas",
  {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Aluno,
        key: "ID",
      },
    },
    disciplina_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Disciplinas,
        key: "ID",
      },
    },
    bimestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor_nota: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
  },
  {
    tableName: "notas",
    timestamps: false,
  }
);

Notas.belongsTo(Aluno, {
  foreignKey: "aluno_id",
});

Aluno.hasMany(Notas, {
  foreignKey: "aluno_id",
});

Notas.belongsTo(Disciplinas, {
  foreignKey: "disciplina_id",
});

Disciplinas.hasMany(Notas, {
  foreignKey: "disciplina_id",
});

export default Notas;
