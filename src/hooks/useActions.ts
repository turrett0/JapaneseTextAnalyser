import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {KuromojiActionsObject} from "../store/kuromojiReducer/actionCreator";

const allActions = {
  ...KuromojiActionsObject,
};

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};

export default useActions;
