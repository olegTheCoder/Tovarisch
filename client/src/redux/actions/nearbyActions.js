import { USER_POSITION, NEARBY_INCIDENTS } from "../types";
// import axios from "axios";

export const userPosition = (cords) => async (dispatch) => {
  // console.log('action',cords);
  dispatch({
    type: USER_POSITION,
    payload: {
      cords,
    },
  });
};

export const getNearbyIncidents = (nearbyIncidents) => async (dispatch) => {
  dispatch({
    type: NEARBY_INCIDENTS,
    payload: {
      nearbyIncidents
    },
  });
};
