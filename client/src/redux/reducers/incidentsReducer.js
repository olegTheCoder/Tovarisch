import { SET_INCIDENTS, ADD_INCIDENT } from "../types";

export const incidentsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INCIDENTS: {
      return payload;
    }

    case ADD_INCIDENT: {
      const { newIncServer } = payload;
      return [...state, newIncServer];
    }

    default: {
      return state;
    }
  }
};
