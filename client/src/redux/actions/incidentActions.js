import { ADD_INCIDENT, GET_INCIDENTS } from "../types";
import axios from "axios";

export const addNewIncident = (newIncident, file) => async (dispatch) => {
  

  try {
    const formData = new FormData();
    for (let key in newIncident) {
      formData.append(key, newIncident[key]);
    }

    formData.append("file", file);

    const response = await fetch("http://localhost:3000/incident/new", {
      method: "POST",
      body: formData,
    });
    const newIncServer = await response.json();
    console.log("newIncServer", newIncServer);

    dispatch({
      type: ADD_INCIDENT,
      payload: {
        newIncServer,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getIncidents = (data) => async (dispatch) => {
  const getIncFromServer = async (data) => {
    return await axios
      .get("http://localhost:3000/incident")
      .then((res) => res.data);
  };

  const newInc = await getIncFromServer(data)
  
  for (let i = 0; i < newInc.length; i++) {
    let rawCoords = newInc[i].coords;
    rawCoords = rawCoords.slice(1, -1).split(",");
    let postCoords = rawCoords.map((el) => Number(el));
    newInc[i].coords = postCoords
  }

  dispatch({
    type: GET_INCIDENTS,
    payload: {
      newInc,
    },
  });
};
