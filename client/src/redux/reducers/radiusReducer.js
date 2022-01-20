import { SET_RADIUS,GET_RADIUS } from "../types";

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

    default: {
      return state;
    }
  }
};
