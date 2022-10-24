const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    Id: {
      type: DataTypes.STRING(3),  //"cca2":"CX","ccn3":"162","cca3":"CXR" ----> country code alpha 3
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagImg: {                //tal vez sea mas simple definir un flagImg1 y un flagImg2 dentro de la BBDD. Es mas ordenado
      type: DataTypes.STRING, //DataTypes.ARRAY(DataTypes.STRING) veremos si es necesario una u otra opcion
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING, //en principio lo voy a definir como string aunque en la API es un campo en plural y un array....raro. Idem a lo que sucede con flags
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING
    },
    capital: {
      type: DataTypes.STRING, //también es un array en la API....ma raroooo. Idem a los 2 campos de arriba
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT
    },
    population: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  });
};
