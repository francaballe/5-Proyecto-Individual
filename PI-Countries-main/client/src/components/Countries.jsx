import React from 'react';
import OneCountry from './OneCountry.jsx';
import style from './Countries.module.css';
import {useSelector} from "react-redux";

const Countries = ({currentCountries}) => {

  const dayOrNigth = useSelector((state) => state.modoDiaNoche);

if (currentCountries.length){// solo muestro si el array no esta vacio
    return (
    <div className={dayOrNigth==="NIGHT"? style.mainContainer_black:style.mainContainer}>

      {currentCountries.map(unPais=><OneCountry
      Id={unPais.Id}
      key={unPais.Id}
      name={unPais.name}
      continent={unPais.continent}
      subregion={unPais.subregion}
      population={unPais.population}
      flagImg={unPais.flagImg}/>
      )}

    </div>
  )}
else return (
  <div className={style.notFound}>
    NO COUNTRIES MATCHING YOUR CRITERIA HAS BEEN FOUND!
  </div>
)}; 

export default Countries;
