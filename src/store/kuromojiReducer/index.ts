import {
  PageMode,
  KuromojiActionTypes,
  KuromojiStore,
  LoadingStates,
} from "./contracts/state";
import {KuromojiActions} from "./actionCreator";

import produce, {Draft} from "immer";

const initialState: KuromojiStore = {
  kuromojiResponse: [],
  loadingState: LoadingStates.NEVER,
  currentText: "",
  currentWord: 0,
  pageMode: PageMode.FULLTEXT,
};

const kuromojiReducer = produce(
  (draft: Draft<KuromojiStore>, action: KuromojiActions) => {
    switch (action.type) {
      case KuromojiActionTypes.SET_KUROMOJI_RESPONSE:
        draft.kuromojiResponse = action.payload;
        draft.loadingState = LoadingStates.LOADED;
        break;
      case KuromojiActionTypes.FETCH_KUROMOJI_RESPONSE:
        draft.loadingState = LoadingStates.LOADING;
        break;
      case KuromojiActionTypes.SET_CURRENT_TEXT:
        draft.currentText = action.payload;
        break;
      case KuromojiActionTypes.SET_CURRENT_WORD:
        draft.currentWord = action.payload;
        break;
      case KuromojiActionTypes.SET_PAGE_MODE:
        draft.pageMode = action.payload;
        break;
      case KuromojiActionTypes.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;
      default:
        break;
    }
  },
  initialState
);

export default kuromojiReducer;
