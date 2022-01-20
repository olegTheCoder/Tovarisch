import { SET_RADIUS, GET_RADIUS, GET_RADIUS_SERVER } from "../types";

export const radiusReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_RADIUS: {
      const { radius } = payload;
      return radius;
    }

    case GET_RADIUS: {
      const { radius } = payload;
      return radius;
    }

    case GET_RADIUS_SERVER: {
      const { courRadius } = payload
      return courRadius
      
    }

    default: {
      return state;
    }
  }
};
