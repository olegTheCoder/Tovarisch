import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();

const initState = {
  cords: [],
  incidents: [],
  radius: [],
  nearby: {} // Точка юзера и события поблизости
};


export const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(sagaMiddleware,thunk))
);



sagaMiddleware.run(rootSaga);
