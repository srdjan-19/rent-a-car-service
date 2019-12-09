import { PUT_ERROR, PUT_ADDRESSES } from "../constants";
import * as computationFunctions from "./computation-functions";

const initialState = {
  error: "",
  addresses: []
};

const commonReducer = (state = initialState, { type, payload }) => {
  if (actionHandler.hasOwnProperty(type)) {
    return actionHandler[type](state, payload);
  }

  return state;
};

const actionHandler = {
  [PUT_ERROR]: computationFunctions.putError,
  [PUT_ADDRESSES]: computationFunctions.putAddresses
};

export default commonReducer;
