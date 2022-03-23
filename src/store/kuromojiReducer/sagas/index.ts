import {call, put, takeLatest} from "redux-saga/effects";
import {fetchKuromoji} from "../../../services/api/kuromojiApi";
import {IFetchKuromojiAction} from "../actionCreator";
import {KuromojiActionsObject} from "../actionCreator";
import {
  IKuromojiArticle,
  KuromojiActionTypes,
  LoadingStates,
} from "../contracts/state";
const {SetKuromojiResponseAction, SetLoadingState} = KuromojiActionsObject;

export function* KuromojiSaga() {
  yield takeLatest(
    KuromojiActionTypes.FETCH_KUROMOJI_RESPONSE,
    getKuromojiArticles
  );
}

export function* getKuromojiArticles({payload}: IFetchKuromojiAction) {
  try {
    const data: IKuromojiArticle[] = yield call(fetchKuromoji, payload);
    yield put(SetKuromojiResponseAction(data));
  } catch (error) {
    alert(error);
    yield put(SetLoadingState(LoadingStates.ERORR));
  }
}
