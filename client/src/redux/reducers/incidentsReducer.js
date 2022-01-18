import { GET_INCIDENTS , ADD_INCIDENT} from "../types";

export const incidentsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_INCIDENTS: {
      const { newInc } = payload;
      return newInc;
    }

    case ADD_INCIDENT: {
      const { newIncServer } = payload;
      return  [...state, newIncServer]
    }


    default: {
      return state;
    }
  }
};
