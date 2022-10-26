import React from 'react';
import style from './About.module.css';
import {useHistory} from "react-router-dom";

const CountryCard = (props) => {

  const history = useHistory();
  const onClickHandler = (event) => {
    history.push("/countries");
  }

  return (
      <div className={style.mainContainer}>
          <hr className={style.myHr}/>
          <h1 className={style.Titulo}>About me...</h1>
          <hr className={style.myHr}/>
          <div className={style.cuerpoAbout}>
            <p>The name is Francisco Javier Caballe, or just Fran for short, friends and family.</p>
            <p>I've been in the IT world for more than 2 decades now, but even though I've have done</p>
            <p>some programming in the past, I can't really say I did, let alone a full web application.</p>
            <p>So, long story short, after some family discussion plus some internal debate the path was clear:</p>
            <p>I had to do it. I had to get back on track and do what makes me happy even if it meant to</p>
            <p>quit a well paid job. So I did...no regrets at all.</p>
            <p>Someone said "Do what you love, and you'll never work another day in your life."</p>
          </div>
          <div>
            <button onClick={onClickHandler} className={style.button}>Go Back!</button>
            </div>
          <hr className={style.myHr}/>
      </div>
    );
};

export default CountryCard;
