import { GET_COMMENT, ADD_COMMENT } from "../types";

export const commentReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    
    case GET_COMMENT: {
      const { comment } = payload;
      return comment;
    }

    case ADD_COMMENT: {
      const { comment } = payload;
      return [...state, comment]
    }

    default: {
      return state;
    }
  }
};
