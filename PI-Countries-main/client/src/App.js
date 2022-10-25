import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Route } from "react-router-dom";
import {getCountries} from "./redux/actions/index";
import style from './App.module.css';
//Components...
import Hello from "./components/Hello";
import Nav from "./components/Nav";
import About from "./components/About";
import Countries from "./components/Countries";
import CountryCard from "./components/CountryCard";
import SelectAndSearchContainer from "./components/SelectAndSearchContainer";
import Paging from "./components/Paging";
import Activities from "./components/Activities";
import NewActivityForm from "./components/NewActivityForm";

//recordar que en la forma "components" no le puedo pasar props...
function App() {

  //console.log("ME RENDERIZO!!!")

  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.sumOfAllFilters);
  const [currentPage, setCurrentPage] = useState(1);
  
  
  //const [countriesPerPage, setCountriesPerPage]= useState(10);
  //tuve que hacer una negrada acá.....seguro se puede hacer mejor...
  const countriesPerPage=10;
  let indexOfLastCountry;
  let indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  if (currentPage===1){
    indexOfLastCountry = 9;  
    indexOfFirstCountry = indexOfLastCountry - indexOfLastCountry;
  } else{
    indexOfLastCountry = (currentPage * countriesPerPage)-1;
    indexOfFirstCountry = (indexOfLastCountry - countriesPerPage);
  }
  
  
  //los paises que tengo actualmente en mi pagina. Voy a partir mi array basado en 2 parametros...desde el primer pais y al ultimo
  const currentCountries = allCountries.slice(indexOfFirstCountry,indexOfLastCountry);

  //se la voy a pasar a Paging para, en la medida que hago click, actualizar mi estado CurrentPage
  function paging (pageNumber){
    setCurrentPage (pageNumber);
  }

  //le agregué algunas dependencias necesarias.
  useEffect(()=>{
    dispatch(getCountries());
  },[dispatch])
  
  //En realidad lo separé para solucionar un efecto no esperado si uno selecciona
  //una página 26 por ejemplo y luego cambia a continente "Asia". No mostraba nada hasta que uno
  // elegía la página 1 por ejemplo...Solución en conjunto con Paging.jsx
  useEffect(()=>{
    //console.log("me renderizo pero además cambió el valor de allCountries")
    setCurrentPage(1)
  },[allCountries])
  

  return (
    <div className={style.App}>
      
      <Route exact path="/" component={Hello}/>

      <Route path="/countries" component={Nav}/>    {/*en mi caso quiero mostrar la nav siempre, pero no en el raiz, sino en /countries*/}
      
      <Route exact path="/about" component={About}/>

      <Route exact path="/countries" render={() => 
      <div>
        <SelectAndSearchContainer/>
        <Paging
            allCountriesLength={allCountries.length}//le paso asi porque necesito un valor numerico
            paging={paging}
        />
        <Countries currentCountries={currentCountries}/>
      </div>}/>
    
      <Route
          path="/countries/:countryId"
          render={({match}) => 
          <CountryCard countryId={match.params.countryId}/>}
      />

      <Route exact path="/activities/creation" render={() =>
      <>
        <Nav/>
        <NewActivityForm/>
      </>  
    }/>

      <Route exact path="/activities" render={() =>
        <>
          <Nav/>
          <Activities/>
        </>
      }/>

      

    </div>
  
  );}

export default App;
