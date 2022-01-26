import { GET_CORDSWHEREWEARE } from "../types";

export const getCords = (cords) => async (dispatch) => {
  dispatch({
    type: GET_CORDSWHEREWEARE,
    payload: {
      cords,
    },
  });
};
