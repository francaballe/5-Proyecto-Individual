import OneActivity from './OneActivity';
import style from './Activities.module.css';
import {useDispatch, useSelector} from "react-redux";
import React, { useEffect } from 'react';
import {getActivities} from "../redux/actions/index";


//En este component me voy a traer todo lo que tiene el estado global, en particular, mi prop. activities
const Activities = () => {
  
  const dayOrNigth = useSelector((state) => state.modoDiaNoche);
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);
  useEffect(()=>{
    dispatch(getActivities());
  },[dispatch])
  
  //console.log(allActivities)

if (allActivities.length){// solo muestro si el array no esta vacio
    return (
    <>
    <h1 className={dayOrNigth==="NIGHT"?style.Titulo_black:style.Titulo}>ACTIVITIES</h1>
    <div className={dayOrNigth==="NIGHT"?style.mainContainer_black:style.mainContainer}>
      
      {allActivities.map(unaActividad=><OneActivity
      Id={unaActividad.Id}
      key={unaActividad.Id}
      difficulty={unaActividad.difficulty}
      duration={unaActividad.duration}
      name={unaActividad.name}
      season={unaActividad.season}
      countries={unaActividad.countries}
      />
      )}

    </div>
    </>
  )}
else return (
  <div className={style.notFound}>
    THERE ARE NO ACTIVITIES!
  </div>
);

}; 

export default Activities;
