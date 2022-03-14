import {all, fork, spawn} from "redux-saga/effects";
import {KuromojiSaga} from "../kuromojiReducer/sagas";

export default function* rootSaga() {
  // yield all([fork(KuromojiSaga)]);
  yield spawn(KuromojiSaga);
}
