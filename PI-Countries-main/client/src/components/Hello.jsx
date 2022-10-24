import React from 'react';
import style from './Hello.module.css';
import {Link} from "react-router-dom";

const Hello = (props) => {
    
    return (
        <div className={style.mainContainer}>
          <hr className={style.myHr}/>
          <h1 className={style.titulo}>One Country at a Time</h1>
          <Link to="/countries">
            <button className={style.myButton}>Start my Journey</button>
          </Link>
          <hr className={style.myHr}/>
        </div>
    );
};

export default Hello;
