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

  const newInc = await getIncFromServer(data);
console.log('all' , newInc);

  dispatch({
    type: GET_INCIDENTS,
    payload: {
      newInc,
    },
  });
};
