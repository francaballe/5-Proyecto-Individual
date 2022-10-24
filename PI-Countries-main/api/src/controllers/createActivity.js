//Consumo mi modelo de BBDD. Voy a necesitar los 2 modelos...
const { Country, Activity } = require('../db');


//voy a definir una funcion
const createActivity = async function (data) {
    //console.log(data)
    //Validación de datos...
    if ((typeof(data.name)==="string") && (data.name.length===0)){
      throw new Error("Error: El nombre de actividad debe ser un texto no vacío.")
    }
    
    if ((data.difficulty!==1)&&(data.difficulty!==2)&&(data.difficulty!==3)
    &&(data.difficulty!==4)&&(data.difficulty!==5)){
      throw new Error("Error: La dificultad debe estar comprendida entre 1 y 5.")
    }

    if (typeof(data.duration)!=="number")
      throw new Error("Error: La duración debe ser un número entero (horas).")
    else  //si efectivamente ES un numero
      if (!((data.duration>0) && (Number.isInteger(data.duration))))
      throw new Error("Error: La duración debe ser un número entero (horas).")

    const toUpperSeason = data.season.toUpperCase(); 
    if ((toUpperSeason!=="WINTER")&&(toUpperSeason!=="SUMMER")&&(toUpperSeason!=="SPRING")&&(toUpperSeason!=="FALL")){
      throw new Error("Error: Estación del año incorrecta.")
    }

    for (let i=0;i<data.countries.length;i++){
      try{
        let resp = await Country.findByPk(data.countries[i])
        if (!resp) throw new Error(`El País ${data.countries[i]} no fue encontrado en la base local!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
    }

    //Aca viene la cosa: si el "nombre" de la actividad YA existe, la actualizo. Si no existe, la creo
    //esta decision es "algo" arbitraria, ya que si actualizo los datos de la actividad lo hago para todo los paises
    //Mejor, tomando mi propia decisión, voy a hacer un nuevo registro SIN validar el nombre. Es decir
    //se va a crear una nueva entrada en la BBDD cada vez que yo ponga "Create Activity". Tiene mucho más sentido...
    //llegado el caso, voy a usar findOrCreate
    //console.log(data) //ojo, aca tengo tambien countries que NO es de la tabla activities
    try{
       //le podria haber pasado data y funciona OK por mas que tenga un dato de sobra, pero no es lo correcto
      //console.log(data)
      const {name,difficulty,duration,season,countries} = data;
       const newActivity =  await Activity.create({name,difficulty,duration,season});
       //console.log(newActivity.getDataValue("Id"))
      
      for (let i=0;i<countries.length;i++){
        //("countryId","activityId") //Si no era por el console.log....como sabia que argumentos esperaba una funcion que yo no creé...
        newActivity.setCountries(countries[i],newActivity.getDataValue("Id")); //Utilizo el método automaticamente creado por sequelize al hacer las asociaciones. Lo que me costó encontrar el nombre correcto...tuve que crear una funcion para obtener los metodos de un objeto
      }
      
      //ver si esta bien retornar esto...pero diria que en principio si...aunque innecesario.
      //desde mi ruta solo voy a devolver un OK.
      return newActivity;
    }
    catch(unError){
      throw new Error(unError.message)
    }
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = createActivity;
