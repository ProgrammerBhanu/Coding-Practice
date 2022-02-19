import {
    GET_CITY_REQUEST,GET_CITY_SUCCESS,GET_CITY_FAILURE,
    GET_DATA_SUCCESS,GET_DATA_FAILURE,GET_DATA_REQUEST,
  } from "./actionTypes";
  import axios from "axios";
  
  export const getCitySuccess = (data) => ({
    type: GET_CITY_SUCCESS,
    payload: {
      data,
    },
  });
  
  export const getCityFailure = (payload) => ({
    type: GET_CITY_FAILURE,
    payload,
  });
  
  export const getCityRequest = (payload) => ({
    type: GET_CITY_REQUEST,
    payload,
  });
  export const getDataFailure = (payload) => ({
    type: GET_DATA_FAILURE,
    payload,
  });
  
  export const getDataRequest = (payload) => ({
    type: GET_DATA_REQUEST,
    payload,
  });
  export const getDataSuccess = (totalData) => ({
    type: GET_DATA_SUCCESS,
    payload: {
      totalData,
    },
  });
  
  export const getCity = () => (dispatch) => {
    dispatch(getDataRequest());
    axios
      .get("http://localhost:3001/city")
      .then((res) => {
        console.log(res.data.data);
        dispatch(getDataSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(getDataFailure());
      });
  };
  