import { delay } from 'redux-saga'
import { put, takeLatest, all } from 'redux-saga/effects'

export default function* rootSaga() {
   yield all([
       managerSelectChangeWatcher(),
       sendAbusiveRequestWatcher(),
   ])
}


//select manager in profile input
export function* managerSelectChange(action){
    // yield delay(2000);
    yield put({type: 'ADD_USERS_MANAGER', manager: action.managerSaga})
}
export function* managerSelectChangeWatcher() {
    yield takeLatest('ADD_USERS_MANAGER_SAGA', managerSelectChange)
}

//Send abusive request about incoming feedback
export function* sendAbusiveRequest(action) {
    console.log(action)
    // yield put({type: "SEND_ABUSIVE_REQUEST", details: action.details})
}
export function* sendAbusiveRequestWatcher() {
    yield takeLatest('SENT_ABUSIVE_REQUEST_SAGA', sendAbusiveRequest)
}