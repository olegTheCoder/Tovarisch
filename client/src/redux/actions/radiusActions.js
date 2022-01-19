import { SET_RADIUS } from "../types";
import axios from "axios";

export const setRadius = (radius) => async (dispatch) => {
  dispatch({
    type: SET_RADIUS,
    payload: {
      radius,
    },
  });
};

export const setRadiusAndSendOnServer = (dataRadius) => async (dispatch,getState) => {

  const token = getState().auth.token


  // const addRadiusToServer = async (rad) => {
  //   return await axios
  //     .post("http://localhost:3000/radius", { rad })
  //     .then((res) => res.data);
  // };

  // const addRadiusToServer = async (rad) => {
  //   return await fetch("http://localhost:3000/radius", {
  //     method: "POST",
  //     body: rad,
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }

  const response = await fetch("http://localhost:3000/radius", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(dataRadius)
  });

  // const response = await fetch("http://localhost:3000/incident/new", {
  //   method: "POST",
  //   body: formData,
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // });
  // const newIncServer = await response.json();







  const radius = await response.json()
  // const radius = await radiusQ.json()
  console.log( radius, 'radius!!!!!');

  dispatch({
    type: SET_RADIUS,
    payload: {
      radius
    },
  });
};
