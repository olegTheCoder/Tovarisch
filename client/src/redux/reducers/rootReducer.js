import { combineReducers } from "redux";
import { cordsReducer } from "./cordsReducer";
import { incidentsReducer } from "./incidentsReducer";
import { radiusReducer } from "./radiusReducer";
import { nearbyReducer } from "./nearbyReducer"
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  cords: cordsReducer,
  incidents: incidentsReducer,
  radius: radiusReducer,
  nearby: nearbyReducer,
  auth: authReducer,
});

