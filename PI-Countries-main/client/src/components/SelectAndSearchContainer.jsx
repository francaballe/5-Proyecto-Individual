import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './SelectAndSearchContainer.module.css';
import SearchBar from "./SearchBar";
import {getCountriesByActivity, orderCountriesBy, getActivities, filterCountriesByContinent} from "../redux/actions/index";

const SelectAndSearchContainer = (props) => {

  const dispatch = useDispatch();
  const dayOrNigth = useSelector((state) => state.modoDiaNoche);

  const allActivities = useSelector((state) => state.activities);
  useEffect(()=>{
    dispatch(getActivities());
  },[dispatch])
  //console.log(allActivities)

  //Los estaba llenando a mano, re loco y desprolijo el tipo. Gracias JS por existir...
  //La cabecera de los 3 selects las mantengo y no las incluyo en los arreglos
  const continentOptions = ["All Continents","Asia","South America","North America","Oceania","Antarctica","Africa","Europe"];

  //Este lo tengo que llenar con una consulta a la DB...magia no hace. No se llena solo viteh...
  //const myActivityNamesArray = allActivities.map(unaActivity => unaActivity.name);
  //console.log(myActivityNamesArray)
  //const activitiesOptions = myActivityNamesArray;

  //Este era medio al pepe, pero no puedo con mis tocs, asi que va asi también...
  const orderByOptions = ["A to Z","Z to A","Population + to -","Population - to +"];


  const selectedContinentHandler = (event) => {
    const currentContinent = event.target.value;
    if (currentContinent!=="Filter by Continent"){
      //console.log("dispatcheo:" + currentContinent)
      dispatch(filterCountriesByContinent(currentContinent));
    }
  }

  const selectedOrderHandler = (event) => {
    const criteria = event.target.value;
    if (criteria!=="Order by"){
      //console.log(criteria)
      dispatch(orderCountriesBy(criteria));
    } 
  }

  const selectedActivityHandler = (event) => {
    const activityId = event.target.value;
    if (activityId!=="Filter by Activities"){
      //console.log(activityId);
      dispatch(getCountriesByActivity(activityId));
    }

  }

        return (
            <div className={dayOrNigth==="NIGHT"? style.mainContainer_black:style.mainContainer}>
              <div className={style.selectorsContainer}>

                <select onChange={selectedContinentHandler} className={style.aSelector}>
                  <option>Filter by Continent</option>
                  {continentOptions.map(unaOpcion=><option value={unaOpcion} key={unaOpcion}>{unaOpcion}</option>)}
                </select>
                
                <select onChange={selectedActivityHandler} className={style.aSelector}>
                  <option>Filter by Activities</option>
                  <option>All Activities</option>
                  {allActivities.map(unaOpcion=><option value={unaOpcion.Id} key={unaOpcion.Id}>{unaOpcion.name}</option>)}
                </select>
                
                <select onChange={selectedOrderHandler} className={style.aSelector}>
                  <option>Order by</option>
                  {orderByOptions.map(unaOpcion=><option value={unaOpcion} key={unaOpcion}>{unaOpcion}</option>)}
                </select>
              </div>
              <div className={style.searchBarContainer}>
                <SearchBar/>
              </div>
            </div>
        );
};

export default SelectAndSearchContainer;
