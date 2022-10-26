import axios from "axios";

export function setDayNight(dayOrNight){
    return{
        type: "SET_DAY_NIGHT",
        payload: dayOrNight
    }
}

export function getCountriesByActivity(activityId){
    return {
        type: "GET_COUNTRIES_BY_ACTIVITY",
        payload: activityId
    }
}

export function orderCountriesBy(orderCriteria){
    return {
        type: "ORDER_COUNTRIES_BY",
        payload: orderCriteria
    }
}

export function filterCountriesByContinent(continent){
    return {
        type: "FILTER_BY_CONTINENT",
        payload: continent //si ponia payload como argumento, lo dejaba asi: payload, a secas, por object literals
    }
}

export function getActivities(){
    return async function(dispatch){
        var response = await axios.get("http://localhost:3001/activities");
        return dispatch({
            type: "GET_ACTIVITIES",
            payload: response.data
        })}
}

export function getCountries(){
    return async function(dispatch){
        var response = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: "GET_COUNTRIES",
            payload: response.data
        })}
}

export function getCountry(Id){
    return async function(dispatch){
        var response = await axios.get(`http://localhost:3001/countries/${Id}`);
        return dispatch({
            type: "GET_COUNTRY",
            payload: response.data
        })}
}

export function getCountriesLike(likeString){
    return async function(dispatch){
        var response = await axios.get(`http://localhost:3001/countries/?name=${likeString}`);
        if (response.data.includes("Ningún País coincide con los datos informados"))
        {
            //console.log("no lo encontre") //control de errores. Si desde mi back no recibo un array sino un mensaje de error
            response.data = [];
        }
        //console.log(response.data)
        return dispatch({
            type: "GET_COUNTRIES_LIKE",
            payload: response.data
        })
    }
}

export function deleteActivity(Id){
     return async function(dispatch){
        var response = await axios.delete(`http://localhost:3001/activities/delete/${Id}`);
        return dispatch({
            type: "DELETE_ACTIVITY",
            payload: response.data
        })} 
}

export function removeFromCountriesCopy(Id){
    return async function(dispatch){
    return dispatch({
        type: "REMOVE_FROM_COUNTRIES_COPY",
        payload: Id
    })}
}

export function addToCountriesCopy(oneCountry){
    return async function(dispatch){
    return dispatch({
        type: "ADD_TO_COUNTRIES_COPY",
        payload: oneCountry
    })}
}

export function createActivity(data){
    return async function(dispatch){
        //console.log("por algun motivo me estan invocando...") //cualquier boton del form, por mas que tenga o no type=submit, me estaba haciendo el submit.
        //tuve que cambiar el boton ADD a cualquier otra cosa que no fuese button (un div por ejemplo)
        var response = await axios.post(`http://localhost:3001/activities`,data);//este data es el jason que luego mi back va a recibir, es el req.body....viste que de algun lado salia
    return response;//No hace falta hacer un reducer en este caso. No actualizo ningun estado global.    
    } 
}