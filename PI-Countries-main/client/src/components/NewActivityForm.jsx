import React, { useEffect, useState } from 'react';
import style from './NewActivityForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {removeFromCountriesCopy} from "../redux/actions/index";
import {addToCountriesCopy} from "../redux/actions/index";
import {createActivity} from "../redux/actions/index";
import {useHistory} from "react-router-dom";

const NewActivityForm = () => {  

const allCountries = useSelector((state) => state.countries);  
const allCountriesCopy = useSelector((state) => state.countriesCopy);
const dispatch = useDispatch();
const history = useHistory();

//Declaro mis estados locales...(podria haber creado 1 solo estado que aune los 4 del formulario en si, pero por la cantidad ni se justifica...)
const [activityName,setActivityName] = useState("");
const [difficulty,setDifficulty] = useState(1);//bien o mal, estoy decidiendo de manera arbitraria que algunos de mis estados tomen valor inicial 1...
const [duration,setDuration] = useState("");//ídem con este estado....duracion 1 hora como mínimo...igual voy a hacer validación de datos luego...
const [season,setSeason] = useState("Winter");//valor inicial arbitrario que ya setee en el combo.
const [enableButton,setEnableButton] = useState(false);
const [countriesSelected, setCountriesSelected] = useState([]);//va a tener potencialmente 1 o más países...por lo cual se me ocurre que un array es lo mejor...
const [selectedCountryId, setSelectedCountryId] = useState([]);


//Estado de manejo de Errores
const [errorName,setErrorName] = useState("");
const [errorDuration,setErrorDuration] = useState("");
const [errorCountries,setErrorCountries] = useState("");

const actNameChangeHandler = (event) => {
  const aName = event.target.value
  setActivityName(aName);
  //como dijo Jorgito, super googleables las reg.exp. Que comience con letra, que tenga un máximo 
  //de 40 caracteres (alcanza y sobra), que pueda tener cualquier caracter unicode (letra o número) 
  //y cualquiera de estos caracteres: _@,.&$%#
  if (!/^(?=[\p{L}])[\p{L}\p{N}_@,.&$%#\s-]{1,40}$/u.test(aName)){
    setErrorName("Invalid Activity Name");
  }
  else{
    setErrorName("");
  }
}

//No hace falta control de errores. Está bindeado el estado y el value y es un combo desplegable con 
//un valor por defecto ya colocado, más algunos más como única opción
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
const seasonChangeHandler = (event) => {
  setSeason(event.target.value);
}

//!countriesSelected.length}>
const countrySelectedHandler = (event) => {
  setEnableButton(true);
  setSelectedCountryId(event.target.value)
}

//Handler del ADD Button
const countryAddClickHandler = (event) => {  
    //console.log("que tengo aca:" + selectedCountryId) //Choose a Country
    if (selectedCountryId!=="Choose a Country"){
      const unSet = new Set([...countriesSelected,selectedCountryId])
      unSet.delete("") //elimino el vacio que me devuelve
      setCountriesSelected([...unSet])
      dispatch(removeFromCountriesCopy(selectedCountryId));
    }
}

 //por el delay, es la única forma que tengo de deshabilitar el botón si countriesSelected está vacío.
 useEffect(()=>{
  //console.log(countriesSelected.length)
  if (!countriesSelected.length){
    setEnableButton(false);
    setErrorCountries("At least One Country Must be Selected");
    }
    else{
        setErrorCountries("");
    }
 },[countriesSelected])


const removeSelectedCountryHandler = (event) => {
  const reAddingCountry = buscarPaisId(event.target.value);//Me traigo el objeto completo de mi countries original, asi lo reingreso a countrieCopy
  dispatch(addToCountriesCopy(reAddingCountry));
  setCountriesSelected(countriesSelected.filter(oneCountryId=>oneCountryId!==event.target.value))
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

const submitHandler = (event) => {
  event.preventDefault();
  /* console.log(activityName);
  console.log(difficulty);
  console.log(duration);
  console.log(season);
  console.log(countriesSelected); */
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

    return (
      <form onSubmit={submitHandler}>
        <div className={style.mainContainer}>
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
            <select onChange={countrySelectedHandler} className={style.aSelectorCountries}>                  
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
