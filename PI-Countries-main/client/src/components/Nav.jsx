import React from 'react';
import style from './Nav.module.css';
import {Link} from "react-router-dom";
import myIcon from "../resources/MundoIcono.jpg"

const Nav = () => {

        return (
            <div className={style.mainContainer}>
                
                <div className={style.iconContainer}>
                    <Link to="/countries">
                        <img src={myIcon} alt="Icono Mundo" className={style.worldIcon}/>    
                    </Link>
                    <Link to="/about" className={style.unLinkAzul}>
                        <span>About Me</span>
                    </Link>
                </div>

                <div className={style.linkContainer}>
                    <Link to="/countries" className={style.unLinkAzul}>
                        <span>Countries</span>
                    </Link>
                    <Link to="/activities" className={style.unLinkBlanco}>
                        <span>Activities</span>
                    </Link>
                    <Link to="/activities/creation" className={style.unLinkAzul}>
                        <span>Create New Activity</span>
                    </Link>
                </div>

            </div>
        );
};

export default Nav;
