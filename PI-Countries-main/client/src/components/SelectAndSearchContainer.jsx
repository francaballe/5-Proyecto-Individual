import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './SelectAndSearchContainer.module.css';
import SearchBar from "./SearchBar";
import {getCountriesByActivity, orderCountriesBy, getActivities, filterCountriesByContinent} from "../redux/actions/index";

const SelectAndSearchContainer = () => {

  const dispatch = useDispatch();
  const dayOrNigth = useSelector((state) => state.modoDiaNoche);

  const allActivities = useSelector((state) => state.activities);
  useEffect(()=>{
    dispatch(getActivities());
  },[dispatch])
  //console.log(allActivities)

  
  const continentOptions = ["All Continents","Asia","South America","North America","Oceania","Antarctica","Africa","Europe"];
  const orderByOptions = ["A to Z","Z to A","Population + to -","Population - to +"];


  const [selectedContinent,setSelectedContinent] = useState("Filter by Continent"); //Default Value para continentes
  const [selectedOrder,setSelectedOrder] = useState("Order by");
  const [selectedActivity,setSelectedActivity] = useState("Filter by Activities");

  const selectedContinentHandler = (event) => {
    const currentContinent = event.target.value;
    setSelectedContinent(currentContinent);
    if (currentContinent!=="Filter by Continent"){
      dispatch(filterCountriesByContinent(currentContinent));
    }
  }

  const selectedOrderHandler = (event) => {
    const criteria = event.target.value;
    setSelectedOrder(criteria);
    if (criteria!=="Order by"){
      dispatch(orderCountriesBy(criteria));
    } 
  }

  const selectedActivityHandler = (event) => {
    const activityId = event.target.value;
    setSelectedActivity(activityId);
    if (activityId!=="Filter by Activities"){
      dispatch(getCountriesByActivity(activityId));
    }
  }

        return (
            <div className={dayOrNigth==="NIGHT"? style.mainContainer_black:style.mainContainer}>
              <div className={style.selectorsContainer}>

                <select onChange={selectedContinentHandler} value={selectedContinent} className={style.aSelector}>
                  <option disabled>Filter by Continent</option>
                  {continentOptions.map(unaOpcion=><option value={unaOpcion} key={unaOpcion}>{unaOpcion}</option>)}
                </select>
                
                <select onChange={selectedActivityHandler} value={selectedActivity} className={style.aSelector}>
                  <option disabled>Filter by Activities</option>
                  <option>All Activities</option>
                  {allActivities.map(unaOpcion=><option value={unaOpcion.Id} key={unaOpcion.Id}>{unaOpcion.name}</option>)}
                </select>
                
                <select onChange={selectedOrderHandler} value={selectedOrder} className={style.aSelector}>
                  <option disabled>Order by</option>
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
