import { ADD_COMMENT, GET_COMMENT } from "../types";

export const getComment = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const response = await fetch(`http://localhost:3000/comment/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const commentFromBack = await response.json();
  console.log(commentFromBack)
  dispatch({
    type: GET_COMMENT,
    payload: {
      comment: commentFromBack,
    },
  });
};

export const addNewComment = (comment, id) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const response = await fetch(`http://localhost:3000/comment/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({comment}),
  });

  const newCommentFromBack = await response.json();

  dispatch({
    type: ADD_COMMENT,
    payload: {
      comment: newCommentFromBack,
    },
  });
};
