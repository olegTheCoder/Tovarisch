import { GET_CORDSWHEREWEARE } from "../types";
import axios from "axios";

export const getCords = (cords) => async (dispatch) => {
  // console.log('action',cords);
  dispatch({
    type: GET_CORDSWHEREWEARE,
    payload: {
      cords,
    },
  });
};
