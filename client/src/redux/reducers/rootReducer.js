import { combineReducers } from "redux";
import { cordsReducer } from "./cordsReducer";
import { incidentsReducer } from "./incidentsReducer";
import { radiusReducer } from "./radiusReducer";
import { nearbyReducer } from "./nearbyReducer"

export const rootReducer = combineReducers({
  cords: cordsReducer,
  incidents: incidentsReducer,
  radius: radiusReducer,
  nearby: nearbyReducer,
});
