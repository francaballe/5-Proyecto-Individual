import React from 'react';
import style from './OneActivity.module.css';
import {deleteActivity} from "../redux/actions/index";
import {useDispatch} from "react-redux";

const OneActivity = (props) => {  

  //no se por que cuando son muchas props me parece mas prolijo destructurarlas fuera del argumento de la funcion
  const {Id,difficulty,duration,name,season,countries} = props;
  
  const dispatch = useDispatch();
  const clickHandler=()=>{
    dispatch(deleteActivity(Id));
    //console.log("hice click: " + Id);
  } 

    return (
      <div className={style.mainContainer}>
      
        <h1>{name}</h1>
        <p className={style.pRed}>Season: {season}</p>
        <p className={style.pWhite}>Difficulty: {difficulty}/5</p>
        <p className={style.pRed}>Duration: {duration} hours</p>
        <p className={style.pWhite}>Countries in which this activity is available:</p> 
          <div className={style.myCountry}>
            {countries.map(unPais=><p key={unPais.Id}>{unPais.name}</p>)}
          </div>
        <button onClick={clickHandler} className={style.myButton}>Delete this Activity</button>

      </div>
    );
};

export default OneActivity;
