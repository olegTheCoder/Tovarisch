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

export const setRadiusAndSendOnServer = (dataRadius) => async (dispatch) => {
  const addRadiusToServer = async (rad) => {
    return await axios
      .post("http://localhost:3000/radius", { rad })
      .then((res) => res.data);
  };

  const radius = await addRadiusToServer(dataRadius);
  console.log(radius);

  dispatch({
    type: SET_RADIUS,
    payload: {
      radius,
    },
  });
};
