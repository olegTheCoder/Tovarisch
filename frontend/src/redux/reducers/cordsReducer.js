import { GET_CORDSWHEREWEARE } from "../types";

export const cordsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CORDSWHEREWEARE: {
      const { cords } = payload;
      return cords;
    }

    default: {
      return state;
    }
  }
};
