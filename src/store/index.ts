import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import kuromojiReducer from "./kuromojiReducer";
import {KuromojiStore} from "./kuromojiReducer/contracts/state";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  kuromojiReducer: kuromojiReducer,
});

export interface IRootState {
  kuromojiReducer: KuromojiStore;
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
