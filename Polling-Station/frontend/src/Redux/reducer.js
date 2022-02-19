import {
  GET_DATA_REQUEST,GET_DATA_SUCCESS,GET_DATA_FAILURE,
    GET_CITY_REQUEST,GET_CITY_SUCCESS,GET_CITY_FAILURE
    
  } from "./actionTypes";
  
  const initState = {
    auth: false,
    token: "",
    error: false,
    errorMessage: "",
    cityData: [],
    loading: false,
  };
  
  const reducers = (state = initState, { type, payload }) => {
    switch (type) {
      
        case GET_DATA_REQUEST:
          return { ...state, 
            loading: true, 
            error: false };
    
      case GET_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          totalData: payload.totalData,
        };
        case GET_DATA_FAILURE:
          return {
            ...state,
            loading: false,
            errorMessage: "fetch data failed",
          };
          case GET_CITY_REQUEST:
        return { ...state, 
          loading: true, 
          error: false 
        };
  
      case GET_CITY_SUCCESS:
        return {
          ...state,
          loading: false,
          cityData: payload.data,
        };
  
      case GET_CITY_FAILURE:
        return {
          ...state,
          loading: false,
          errorMessage: "fetch citydata failed",
        };
      default:
        return state;
    }
  };
  
  export default reducers;