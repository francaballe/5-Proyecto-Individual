import {useDispatch, useSelector} from "react-redux";
import style from './Nav.module.css';
import {Link} from "react-router-dom";
import {setDayNight} from "../redux/actions/index";
import myIcon from "../resources/MundoIcono.jpg";
import moonImg from "../resources/moon.png";
import sunImg from "../resources/sun.png";

const Nav = () => {

const dispatch = useDispatch();
const dayOrNigth = useSelector((state) => state.modoDiaNoche);

//Seteo mi estado global.
const onClickHandler = (event) => {  
    if (dayOrNigth==="NIGHT") dispatch(setDayNight("DAY"));
    else dispatch(setDayNight("NIGHT"));
}

        return (
            <div className={dayOrNigth==="NIGHT"? style.mainContainer_black : style.mainContainer}>
                <div className={style.iconContainer}>
                    <Link to="/countries">
                        <img src={myIcon} alt="Icono Mundo" className={style.worldIcon}/>    
                    </Link>
                    <Link to="/about" className={style.unLinkAzul}>
                        <span>About Me</span>
                    </Link>
                </div>

                <div className={style.sunAndMoonContainer}>
                    <img onClick={onClickHandler} src={dayOrNigth==="DAY"? sunImg : moonImg} alt="Icono solYluna" className={style.moonAndSun}/> 
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
