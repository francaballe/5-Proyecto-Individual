import React, { useState } from 'react';
import style from './SearchBar.module.css';
import {getCountriesLike} from "../redux/actions/index";
import {useDispatch} from "react-redux";

export default function SearchBar() {

  const [searchInput,setSearchInput]=useState("");//seteo el estado inicial del search box como texto vacio

  const changeHandler=(event)=>{
    setSearchInput(event.target.value);
    //console.log(searchInput);
  }
  
  const dispatch = useDispatch();  
  const clickHandler=()=>{
    dispatch(getCountriesLike(searchInput));
    //console.log("hice click: " + searchInput);
  }
  
  return ( 
        <div className={style.mainContainer}>
          <input type="text" name="search" id="search" placeholder="  Find a Country..." 
          onChange={changeHandler} className={style.myInput}></input>
          <button onClick={clickHandler} className={style.myButton}>Go</button>
        </div>
  )
};

