import { SET_RADIUS,GET_RADIUS } from "../types";
import axios from "axios";

export const setRadius = (radius) => async (dispatch) => {
  dispatch({
    type: SET_RADIUS,
    payload: {
      radius,
    },
  });
};

export const setRadiusAndSendOnServer =
  (dataRadius) => async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch("http://localhost:3000/radius", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataRadius),
    });

    const radius = await response.json();

    dispatch({
      type: SET_RADIUS,
      payload: {
        radius,
      },
    });
  };



// функционал получения радиуса с бэка по айди пользователя

export const getRadiusFromBack = () => async (dispatch, getState) => {
  const token = getState().auth.token;

  const response = await fetch("http://localhost:3000/radius", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const radius = await response.json();

  dispatch({
    type: GET_RADIUS,
    payload: {
      radius,
    },
  });
};
