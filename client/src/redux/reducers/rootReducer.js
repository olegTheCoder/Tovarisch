import { combineReducers } from "redux";
import { cordsReducer } from "./cordsReducer";
import { incidentsReducer } from "./incidentsReducer";
import { radiusReducer } from "./radiusReducer";
import { nearbyReducer } from "./nearbyReducer"
import { authReducer } from './authReducer'
import {commentReducer} from './commentReducer'

export const rootReducer = combineReducers({
  cords: cordsReducer,
  incidents: incidentsReducer,
  radius: radiusReducer,
  comment: commentReducer,
  nearby: nearbyReducer,
  auth: authReducer,
});

