import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCountry} from "../redux/actions/index";
import style from './CountryCard.module.css';

const CountryCard = ({countryId}) => {
    
    const dayOrNigth = useSelector((state) => state.modoDiaNoche);
    const dispatch = useDispatch();
    const selectedCountry = useSelector((state) => state.country);

    //tuve que agregar ambas dependencias...no solo que getCountry este OK, sino que tenga algo el Id.
    useEffect(()=>{
      dispatch(getCountry(countryId));
    },[dispatch,countryId])

    //estoy reusando una funcion que ya usé en OneCountry...
    function numberWithDots(aNumber) {
      return aNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");//La expresión regular la busqué en internet...para que no soy mago...
    }

    //console.log(typeof(selectedCountry.area))
    var area = 0;
    if (typeof(selectedCountry.area)==="number"){
      area = numberWithDots(selectedCountry.area)
    }
    var population = 0;
    if (typeof(selectedCountry.population)==="number"){
      population = numberWithDots(selectedCountry.population)
    }

    const isArrayAndNotEmpty = function (){
      if(Array.isArray(selectedCountry.activities)){
        if (selectedCountry.activities.length>0){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    
    //console.log(isArrayAndNotEmpty()?"Tengo algo":"Estoy vacio")

    return (
      <div className={dayOrNigth==="NIGHT"? style.mainContainer_black:style.mainContainer}>
        <h1 className={style.myH1}>{selectedCountry.name}</h1>
        <img className={style.myFlag} src={selectedCountry.flagImg} alt="bandera"></img>
        <p className={style.pWhite}>Country Code Alpha 3: {selectedCountry.Id}</p>
        <p className={style.pGrey}>Capital: {selectedCountry.capital}</p>
        <p className={style.pWhite}>Continent: {selectedCountry.continent}</p>
        <p className={style.pGrey}>Sub Region: {selectedCountry.subregion}</p>
        <p className={style.pWhite}>Area: {area} Km²</p>
        <p className={style.pGrey}>Population: {population}</p>
        <p className={style.pWhite}>Activities: </p>
        {isArrayAndNotEmpty()?selectedCountry.activities.map(unaActividad=><p className={style.pActivity}>{unaActividad.name} ({unaActividad.season})</p>) : <p className={style.pActivity}>None</p>}
        
      </div>
    );
};

export default CountryCard;
