import React, { useEffect, useState } from 'react';
import style from './NewActivityForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {createActivity} from "../redux/actions/index";
import {useHistory} from "react-router-dom";

const NewActivityForm = () => {  

const dayOrNigth = useSelector((state) => state.modoDiaNoche);
const allCountries = useSelector((state) => state.countries);  
const dispatch = useDispatch();
const history = useHistory();
const [allCountriesCopy,setAllCountriesCopy] = useState([]);

//Espero que se cargue algo en allCountries y recién ahí hago el set.
useEffect(()=>{
  setAllCountriesCopy([...allCountries]);
},[allCountries])


//Ordenando la copia de mi array con todos los países.Puedo ordenar el estado directamente!!!
allCountriesCopy.sort((a, b) => {
  let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

  if (fa < fb) {
      return -1;
  }
  if (fa > fb) {
      return 1;
  }
  return 0;
});


//Declaro mis estados locales...(podria haber creado 1 solo estado que aune los 4 del formulario en si, pero por la cantidad ni se justifica...)
const [activityName,setActivityName] = useState("");
const [difficulty,setDifficulty] = useState(1);//bien o mal, estoy decidiendo de manera arbitraria que algunos de mis estados tomen valor inicial 1...
const [duration,setDuration] = useState("");//ídem con este estado....duracion 1 hora como mínimo...igual voy a hacer validación de datos luego...
const [season,setSeason] = useState("Winter");//valor inicial arbitrario que ya setee en el combo.
const [enableButton,setEnableButton] = useState(false);
const [countriesSelected, setCountriesSelected] = useState([]);//va a tener potencialmente 1 o más países...por lo cual se me ocurre que un array es lo mejor...
const [selectedCountryId, setSelectedCountryId] = useState("Choose a Country");

//Estados de manejo de Errores
const [errorName,setErrorName] = useState("");
const [errorDuration,setErrorDuration] = useState("");
const [errorCountries,setErrorCountries] = useState("");


/********************************************FUNCIONES************************************************/
function removeFromCountriesCopy(selectedCountryId){
    setAllCountriesCopy(allCountriesCopy.filter(unPais => (unPais.Id!==selectedCountryId)))
  return;
}

function addToCountriesCopy(reAddingCountry){
  setAllCountriesCopy([...allCountriesCopy,reAddingCountry])
  return;
}

function buscarPaisId (Id){
  let match = "";
  if (allCountries && allCountries.length){
    for (let i=0;i<allCountries.length;i++){
      if (allCountries[i].Id===Id){
        match = allCountries[i];
      }
    }
  }
  //console.log(match)
   return match;
} 


/********************************************HANDLERS*************************************************/

//Handler de cambio de nombre de la actividad
const actNameChangeHandler = (event) => {
  const aName = event.target.value
  setActivityName(aName);
  //Que comience con letra, que tenga un máximo de 40 caracteres (alcanza y sobra), que pueda tener 
  //cualquier caracter unicode (letra o número) y cualquiera de estos caracteres: _@,.&$%#
  if (!/^(?=[\p{L}])[\p{L}\p{N}_@,.&$%#\s-]{1,40}$/u.test(aName)){
    setErrorName("Invalid Activity Name");
  }
  else{
    setErrorName("");
  }
}

//No hace falta control de errores para este caso puntual. Está bindeado el estado y el value y es un 
//combo desplegable con un valor por defecto ya colocado, más algunos más como única opción.
const difficultyChangeHandler = (event) => {
  setDifficulty(event.target.value);
}

//Totamente arbitraria la cantidad máxima de horas....le puse 100.
const durationChangeHandler = (event) => {
  const duration = event.target.value;
  setDuration(duration);
  if (!/^[1-9]$|^[1-9][0-9]$|^(100)$/.test(duration)){
    setErrorDuration("Invalid Amount of Hours (1-100)");
  }
  else{
    setErrorDuration("");
  }
}

//Handler de cambio de estación
const seasonChangeHandler = (event) => {
  setSeason(event.target.value);
}

//handler de selección de un país ANTES de agregarlo
const countrySelectedHandler = (event) => {
  setSelectedCountryId(event.target.value)
}

//Handler del ADD Button del país
const countryAddClickHandler = (event) => {  
    if (selectedCountryId!=="Choose a Country"){
      const unSet = new Set([...countriesSelected,selectedCountryId])
      unSet.delete("") //elimino el vacio que me devuelve
      setCountriesSelected([...unSet])
      removeFromCountriesCopy(selectedCountryId);
    }
    setEnableButton(false);
}

//Handler de remover países
const removeSelectedCountryHandler = (event) => {
  const reAddingCountry = buscarPaisId(event.target.value); //Me traigo el objeto completo de mi countries original, asi lo reingreso a countrieCopy
  addToCountriesCopy(reAddingCountry); 
  setCountriesSelected(countriesSelected.filter(oneCountryId=>oneCountryId!==event.target.value))
}

const submitHandler = (event) => {
  event.preventDefault();
  dispatch(createActivity({
    "name":activityName,
    "difficulty":parseInt(difficulty),
    "duration":parseInt(duration),
    "season":season,
    "countries":countriesSelected
  }));
  alert("A New Activity Has Been Created!");
  history.push("/countries");
}

/******************************************ALGUNOS UseEffect******************************************/
//Add Button On and Off.
useEffect(()=>{
  if (selectedCountryId!=="Choose a Country"){
    setEnableButton(true);
  }else{
    setEnableButton(false);
  }
 },[selectedCountryId])

 //Deshabilito el botón si countriesSelected está vacío.
 useEffect(()=>{
  if (!countriesSelected.length){
    setEnableButton(false);
    setErrorCountries("At least One Country Must be Selected");
    }
    else{
        setErrorCountries("");
    }
 },[countriesSelected])

 /******************************************* RENDERIZADO *******************************************/
    return (
      <form onSubmit={submitHandler}>
        <div className={dayOrNigth==="NIGHT"?style.mainContainer_black:style.mainContainer}>
          <h1>Activity Creation</h1>
          <h4>Activity Name:</h4>
          {errorName && <p className={style.error}>{errorName}</p>}
          <input onChange={actNameChangeHandler} value={activityName} className={style.myInput} type="text" name="name" id="name" placeholder="Enter a valid Activity Name..."/>
          <h4>Difficulty (1 to 5):</h4>
          <select onChange={difficultyChangeHandler} value={difficulty} className={style.aSelector}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
          </select>
          <h4>Duration in hours:</h4>
          {errorDuration && <p className={style.error}>{errorDuration}</p>}
          <input onChange={durationChangeHandler} value={duration} className={style.myInput} type="text" name="duration" id="duration" placeholder="Enter a valid Duration..."/>
          <h4>Season:</h4>
          <select onChange={seasonChangeHandler} value={season} className={style.aSelector}>
                  <option value="Winter">Winter</option>
                  <option value="Summer">Summer</option>
                  <option value="Spring">Spring</option>
                  <option value="Fall">Fall</option>
          </select>
          <h4>Countries:</h4>
          {errorCountries && <p className={style.error}>{errorCountries}</p>}
          <div className={style.countrySelectionDiv}>
            <select onChange={countrySelectedHandler} value={selectedCountryId} className={style.aSelectorCountries}>                  
                <option>Choose a Country</option>
                {allCountriesCopy.map(unaOpcion=><option value={unaOpcion.Id} key={unaOpcion.Id}>{unaOpcion.name}</option>)}                  
            </select>
            <button type="button" onClick={countryAddClickHandler} disabled={!enableButton} className={style.addButton}>ADD</button>
          </div>

          <div className={style.addedCountries}>
              {countriesSelected.map(unPais=><button onClick={removeSelectedCountryHandler} className={style.oneAddedCountries} value={unPais} key={unPais}>{buscarPaisId(unPais).name}</button>)}
          </div>

          <button type="submit" className={style.submitButton} disabled={errorName || errorCountries || errorDuration || !activityName || !duration}>
            Create this Activity
          </button>
        </div>
      </form>
    );
};

export default NewActivityForm;
