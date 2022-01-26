import { USER_POSITION, NEARBY_INCIDENTS } from "../types";

export const userPosition = (cords) => async (dispatch) => {
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
      nearbyIncidents,
    },
  });
};
