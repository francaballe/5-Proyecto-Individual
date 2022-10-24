import React, { useState } from "react";
import style from './Paging.module.css';

const Paging = ({countriesPerPage, allCountriesLength, paging}) => {  
const pageNumbers = [];//la idea es que si tengo 7 paginas---> [1,2,3,4,5,6,7]

let cantidadPaginas = 0;
if (allCountriesLength === 0) {
  cantidadPaginas = 0;
}

if (allCountriesLength>0 && allCountriesLength<10){
  cantidadPaginas = 1;
}

if (allCountriesLength>=10){
  cantidadPaginas = 1 + Math.ceil((allCountriesLength - 9)/10)
}

//console.log("cant.paginas:",cantidadPaginas)


//me daba error.....no tenia sentido un indice 0....por eso comienzo de 1 y ahora todo anda bien!
//useState(1); Ademas, si mi estado tenia valor inicial 1....qué sentido tenia escribirle un 0....ninguno
for (let i=1; i<=cantidadPaginas;i++){
  pageNumbers.push(i);
}


//Que dolor de cabeza me dio pensar cómo hacer esto...era un detalle pero lo quería en mi PI..re feliz!
const [currentIndex,setCurrentIndex] = useState(1)//página 1 ya pintadita vitesss
const onClickHandler = function (unNumero){
  return function (){
    //console.log("indice: " + unNumero);
    paging(unNumero);
    setCurrentIndex(unNumero);
  }
}


 //Le tuve que agregar una Key porque los warnings no paraban de molestar...
if (allCountriesLength){// solo muestro si es mayor que 0
  return (
    <div className={style.mainContainer}>
        
        {pageNumbers.map(unNumero => (
        <button className={unNumero!==currentIndex? style.myButton:style.myButtonPressed} key={unNumero} onClick={onClickHandler(unNumero)}>{unNumero}</button>))}
      
    </div> 
  )}
  else return null;//idem a lo que hago en Countries....mismo consejito del console...gracias.
};

export default Paging;