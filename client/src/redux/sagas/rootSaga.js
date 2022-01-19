import { all } from "redux-saga/effects";
import incSagaWatcher from "./incidentSaga";



export function* rootSaga(){
    yield all([
      incSagaWatcher()
    ])
}
