//Borré el dibujito. No se enojen....

const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require("axios");

// Syncing all the models at once.
//conn.sync({ force: true }).then(() => {
conn.sync().then(() => { //cambiar esto a ALTER: TRUE una vez que todo este listo.....ver si conviene
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });

  //voy a poner, en principio, mi fetch a la API de paises aca....veremos
  const fetchDataAsync = async () =>{
    const response = await axios.get("https://restcountries.com/v3/all")
    
  //Escribo todos los elementos del array que viene de la API pero en otro array solo con lo necesario
  //Ademas, agrego validaciones, porque me encontré al menos un caso de property no existente en la API
    const newArray = response.data.map(unPais => ({
      "Id":unPais.cca3, //No puedo hacer manejo de errores en la PK...se supone que siempre existe desde la API
      "name":unPais.hasOwnProperty("name") ? unPais.name.common : "Not Available",
      "flagImg":unPais.hasOwnProperty("flags") ? unPais.flags[0] : "Flag Not Available",
      "continent":unPais.hasOwnProperty("continents") ? unPais.continents[0] : "Not Available",
      "subregion":unPais.hasOwnProperty("subregion") ? unPais.subregion : "Not Available",
      "capital":unPais.hasOwnProperty("capital") ? unPais.capital[0] : "Not Available",
      "area":unPais.hasOwnProperty("area") ? unPais.area : null,
      "population":unPais.hasOwnProperty("population") ? unPais.population : null
    }));
    await Country.bulkCreate(newArray,{ignoreDuplicates:true});

  };

  fetchDataAsync();
});