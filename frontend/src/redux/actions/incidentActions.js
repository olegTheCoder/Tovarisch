import { ADD_INCIDENT, GET_INCIDENTS } from "../types";
// import { mockDB } from "../../mockDB";
import axios from "axios";


export const addNewIncident = (newIncident) => async (dispatch) => {

  const addIncToServer = async (inc) => {
    return await axios
    .post("http://localhost:3000/incident/new", {inc})
    .then((res) => res.data)
  }

  const newIncServer = await addIncToServer(newIncident)
console.log(newIncServer);


  dispatch({
    type: ADD_INCIDENT,
    payload: {
      newIncServer,
    },
  });
};

export const getIncidents = (data) => async (dispatch) => {

  const getIncFromServer = async (data) => {
    return await axios
    .get("http://localhost:3000/incident")
    .then((res) => res.data)
  }

  const newInc = await getIncFromServer(data)

  dispatch({
    type: GET_INCIDENTS,
    payload: {
      newInc
    },
  });
};
