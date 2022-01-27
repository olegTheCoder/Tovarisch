import { USER_POSITION, NEARBY_INCIDENTS } from "../types";

export const nearbyReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_POSITION: {
      const { cords } = payload;
      return {
        ...state,
        userCords: [...cords],
      };
    }

    case NEARBY_INCIDENTS: {
      const { nearbyIncidents } = payload;
      return {
        ...state,
        nearbyIncidents: [...nearbyIncidents],
      };
    }

    default: {
      return state;
    }
  }
};
