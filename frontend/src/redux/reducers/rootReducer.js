import { combineReducers } from "redux";
import { cordsReducer } from "./cordsReducer";
import { incidentsReducer } from "./incidentsReducer";
import { radiusReducer } from "./radiusReducer";

export const rootReducer = combineReducers({
  cords: cordsReducer,
  incidents: incidentsReducer,
  radius: radiusReducer,
});
