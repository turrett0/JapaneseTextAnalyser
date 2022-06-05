import {IRootState} from "../..";
import {KuromojiStore} from "./state";

export const selectKuromojiResponse = (
  state: IRootState
): KuromojiStore["kuromojiResponse"] => state.kuromojiReducer.kuromojiResponse;

export const selectKuromojiLoading = (
  state: IRootState
): KuromojiStore["loadingState"] => state.kuromojiReducer.loadingState;

export const selectCurrentText = (
  state: IRootState
): KuromojiStore["currentText"] => state.kuromojiReducer.currentText;

export const selectCurrentWord = (
  state: IRootState
): KuromojiStore["currentWord"] => state.kuromojiReducer.currentWord;

export const selectPageMode = (state: IRootState): KuromojiStore["pageMode"] =>
  state.kuromojiReducer.pageMode;
