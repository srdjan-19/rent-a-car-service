import { combineReducers } from "redux";
import userReducer from "./user/reducer/";
import commonReducer from "./common/reducer";
import rentACarReducer from "./rent-a-car/reducer";
import vehicleReducer from "./vehicle/reducer";

const rootReducer = combineReducers({
  userReducer,
  rentACarReducer,
  vehicleReducer,
  commonReducer
});

export default (state, action) => {
  return rootReducer(state, action);
};
