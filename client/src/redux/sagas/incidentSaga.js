import { call, put, throttle } from 'redux-saga/effects'
import { GET_INCIDENTS, SET_INCIDENTS } from '../types'
import axios from 'axios'
import { setIncidents } from '../actions/incidentActions'

const incFromBack = () => {
	return axios.get('http://localhost:3000/incident').then((res) => res.data)
}

function* incSagaWorker(action) {
	try {
		const allInc = yield call(incFromBack, action.payload)

		for (let i = 0; i < allInc.length; i++) {
			let rawCoords = allInc[i].coords
			rawCoords = rawCoords.slice(1, -1).split(',')
			let postCoords = rawCoords.map((el) => Number(el))
			allInc[i].coords = postCoords
		}

		yield put(setIncidents(allInc))
	} catch (e) {
		yield put({
			type: SET_INCIDENTS,
			payload: [{ id: 1, word: 'server is death' }],
		})
	}
}

function* incSagaWatcher() {
	yield throttle(15000, GET_INCIDENTS, incSagaWorker)
}

export default incSagaWatcher
