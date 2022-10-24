const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    Id: {
      type: DataTypes.INTEGER, //creo que el ID en sí mismo no hace ni falta definirlo y sequelize lo pone por defecto, pero por las dudas y para asegurarme....
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5")
    },
    duration: {
      type: DataTypes.INTEGER //asumo que es en horas...y que es un dato entero
    },
    season: {
      type: DataTypes.ENUM("Winter", "Summer", "Spring", "Fall")  //no recordaba que en ingles se podia decir tanto Fall como Autumn
    }
  },
  {
    timestamps: false
  });
};