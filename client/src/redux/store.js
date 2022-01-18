import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


const initState = {
  cords: [],
  incidents: [],
  radius: [],
  nearby: {} // Точка юзера и события поблизости
};


export const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);



