import {all, fork} from "redux-saga/effects";
import {KuromojiSaga} from "../kuromojiReducer/sagas";

export default function* rootSaga() {
  yield all([fork(KuromojiSaga)]);
}
