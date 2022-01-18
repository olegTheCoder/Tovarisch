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
  
  for (let i = 0; i < newInc.length; i++) {
    let rawCoords = newInc[i].coords;
    rawCoords = rawCoords.slice(1, -1).split(",");
    let postCoords = rawCoords.map((el) => Number(el));
    newInc[i].coords = postCoords
  }

  dispatch({
    type: GET_INCIDENTS,
    payload: {
      newInc
    },
  });
};
