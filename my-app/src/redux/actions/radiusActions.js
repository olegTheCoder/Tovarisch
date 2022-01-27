import { SET_RADIUS, GET_RADIUS_SERVER } from "../types";
const { REACT_APP_API_URL } = process.env;

export const setRadius = (radius) => async (dispatch) => {
  dispatch({
    type: SET_RADIUS,
    payload: {
      radius,
    },
  });
};

export const setRadiusAndSendOnServer =
  (dataRadius) => async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(`${REACT_APP_API_URL}/radius`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataRadius),
    });

    const radius = await response.json();

    let rawCoords = radius.coords;
    rawCoords = rawCoords.slice(1, -1).split(",");
    let radCoords = rawCoords.map((el) => Number(el));

    const courRadius = {
      inputTitle: radius.title,
      radiusMetr: radius.radius,
      currentPoint: {
        CordsWhereWeAre: radCoords,
        textAddress: null,
      },
    };

    dispatch({
      type: SET_RADIUS,
      payload: {
        courRadius,
      },
    });
  };

export const getRadiusFromBack = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;

  const response = await fetch(`${REACT_APP_API_URL}/radius/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  const radius = await response.json();
  let rawCoords = radius.point;
  rawCoords = rawCoords.slice(1, -1).split(",");
  let radCoords = rawCoords.map((el) => Number(el));

  const courRadius = {
    inputTitle: radius.title,
    radiusMetr: radius.radius,
    currentPoint: {
      CordsWhereWeAre: radCoords,
      textAddress: null,
    },
  };

  dispatch({
    type: GET_RADIUS_SERVER,
    payload: {
      courRadius,
    },
  });
};
