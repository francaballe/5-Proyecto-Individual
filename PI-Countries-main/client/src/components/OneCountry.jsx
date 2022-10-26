import React from 'react';
import style from './OneCountry.module.css';
import style_black from './OneCountryBlack.module.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const OneCountry = (props) => {  
  const {Id,name,continent,subregion,population,flagImg} = props;
  const dayOrNigth = useSelector((state) => state.modoDiaNoche);

  function numberWithDots(aNumber) {
    return aNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");//La expresión regular la busqué en internet...pará que no soy mago...
  }

    return (
      <div className={dayOrNigth==="NIGHT"?style_black.mainContainer_black:style.mainContainer}>
          <div className={style.flagContainer}>
            <img src={flagImg} className={style.imagenPais} alt="countryImg"></img>
          </div>
          <div className={style.tituloNombre}>    
            <p>{name}</p>
          </div>
          <div className={style.countryInfo}>
            <p>Continent:{continent}</p>
            <p>Subregion:{subregion}</p>
            <p>Population:{numberWithDots(population)}</p>
            <Link to={`/countries/${Id}`}> 
              <button className={style.myButton}>Detailed Info</button>
            </Link>
          </div>
      </div>
    );
};

export default OneCountry;
