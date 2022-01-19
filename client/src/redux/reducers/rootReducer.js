<<<<<<< HEAD
import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
	users: userReducer,
	auth: authReducer,
})

export default rootReducer
=======
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
>>>>>>> 71e84e248c827ed4d54e0ed5674d8548dda8e22f
