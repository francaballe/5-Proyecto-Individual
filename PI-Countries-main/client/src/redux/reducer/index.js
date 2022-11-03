const initialState = {
    //Estados "normales"
    countries: [],
    country: {},
    activities: [],
    
    //Mis estados para los filtros...
    sumOfAllFilters: [],    
    likeFilteredArray: [],
    continentFilteredArray: [],
    activityFilteredArray: [],

    //...y mi estado para el modo dia o noche, por defecto, seteado en dia.
    modoDiaNoche: "DAY"
  };
  
  function rootReducer (state = initialState, action) {

    switch(action.type) {

        case "EMPTY_COUNTRY_CARD":
          return {
            ...state,
            country:{}
          }

        case "SET_DAY_NIGHT":
          return {
            ...state,
            modoDiaNoche:action.payload
          }

        case "GET_COUNTRIES_BY_ACTIVITY":
          
          const mySelectedActivityId = action.payload
          const allCountries = state.countries;
          let mySelectedActivity=[];
          let filteredByActivity=[];

          if (mySelectedActivityId==="All Activities"){
            mySelectedActivity = state.activities;
            filteredByActivity =allCountries;
          }
          else{
            mySelectedActivity = state.activities.filter(unaActivity => (unaActivity.Id===parseInt(mySelectedActivityId)))
            const arrayPaises = mySelectedActivity[0].countries;
            filteredByActivity = allCountries.filter(item1 => arrayPaises.some(item2 => item1.Id === item2.Id))
          } 

          //filtrado por continente
          const array7 = state.continentFilteredArray;

          //filtrado por actividad
          const array8 = filteredByActivity;

          //me traigo el otro array filtrado por like
          const array9 = state.likeFilteredArray;

          //hago nuevamente la interseccion
          const intersection5 = array7.filter(item1 => array8.some(item2 => item1.Id === item2.Id))

          //y hago una segunda intersección....un poquito de teoría de conjuntos que tanto me gusta...
          //me sigue pareciendo una genialidad la idea que tuve....que modesto soy...
          const intersection6 = intersection5.filter(item1 => array9.some(item2 => item1.Id === item2.Id))

          return {
            ...state,
            activityFilteredArray:filteredByActivity,
            sumOfAllFilters: intersection6
          }

        case "ORDER_COUNTRIES_BY":
          //console.log("adentro del reducer: " + action.payload)
          const order = action.payload;
          const arrayDesordenado = state.sumOfAllFilters;
          if (order==="A to Z"){
              /* console.log("Array Desordenado:" + arrayDesordenado.length)
              console.log(arrayDesordenado) */
              arrayDesordenado.sort((a, b) => {
              let fa = a.name.toLowerCase(),
                  fb = b.name.toLowerCase();
          
              if (fa < fb) {
                  return -1;
              }
              if (fa > fb) {
                  return 1;
              }
              return 0;
            });
          }

          if (order==="Z to A"){
            arrayDesordenado.sort((b, a) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
          });
        }

        if (order==="Population - to +"){
          arrayDesordenado.sort((a, b) => {
          return a.population - b.population;
          });
        }

        if (order==="Population + to -"){
          arrayDesordenado.sort((a, b) => {
          return b.population - a.population;
          });
        }

          return {
            ...state,
            sumOfAllFilters: [...arrayDesordenado] //lo voy a devolver ordenado según uno de los 4 criterios.
          }
      
        case "DELETE_ACTIVITY":
          return {
            ...state,
            activities: state.activities.filter(unaActividad => (unaActividad.Id!==action.payload)) 
          }

        case "GET_COUNTRIES":
          return {
            ...state,
            countries: action.payload,
            sumOfAllFilters: action.payload,
            continentFilteredArray: action.payload, //inicialmente va a tener todo para todos los continentes
            likeFilteredArray: action.payload, //inicialmente va a tener 0 filtros "like", o sea, todos los países.
            activityFilteredArray: action.payload
          };
  
        case "GET_COUNTRY":
          return {
            ...state,
            country: action.payload
          }

          case "FILTER_BY_CONTINENT": //en mi payload viene solo el nombre del continente, ojo!!!

            const continenteElegido = action.payload;
            const allMyCountries = state.countries;
            const filteredByContinent = continenteElegido==="All Continents" ? allMyCountries :
            allMyCountries.filter(unPais => unPais.continent===continenteElegido);

          //filtrado por continente
          const array4 = filteredByContinent;

          //me traigo el otro array filtrado por like
          const array5 = state.likeFilteredArray;

          //filtrado por actividad
          const array6 = state.activityFilteredArray;

          //hago nuevamente la interseccion
          const intersection3 = array4.filter(item1 => array5.some(item2 => item1.Id === item2.Id))

          //y otra vez
          const intersection4 = intersection3.filter(item1 => array6.some(item2 => item1.Id === item2.Id))

          return {
            ...state,
            continentFilteredArray: filteredByContinent,
            sumOfAllFilters:intersection4
          }

        case "GET_COUNTRIES_LIKE": //en mi payload viene un array de paises según el criterio de nombre escrito
           
          //filtrado por continente
          const array1 = state.continentFilteredArray; 
          
          //me traigo el otro array filtrado por like
          const array2 = action.payload;

          //filtrado por actividad
          const array3 = state.activityFilteredArray;
          
          //Intersección entre ambos arrays.....que ideota tuve...toy contento!
          const intersection1 = array1.filter(item1 => array2.some(item2 => item1.Id === item2.Id))

          //hago nuevamente la interseccion
          const intersection2 = intersection1.filter(item1 => array3.some(item2 => item1.Id === item2.Id))

          return {
            ...state,
            likeFilteredArray: action.payload,
            sumOfAllFilters:intersection2
          }
  
        case "GET_ACTIVITIES":
          return {
            ...state,
            activities: action.payload
          }
  
        default:
          return {...state};
    };
  };
  
  export default rootReducer;