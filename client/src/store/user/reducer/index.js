import {
  PUT_USER_DATA,
  PUT_USER_TOKEN,
  PUT_USER_FRIENDS,
  PUT_USERS,
  PUT_REMOVED_FRIEND,
  PUT_VEHICLE_RESERVATIONS,
  PUT_CREATED_VEHICLE_RESERVATION,
  PUT_CANCELED_VEHICLE_RESERVATION,
  PUT_FRIENDSHIP_REQUESTS,
} from "../constants";
import * as computationFunctions from "./computation-functions";

const initialState = {
  details: {},
  users: [],
  token: window.localStorage.getItem("token"),
  friends: [],
  friendshipRequests: [],
  vehicleReservations: []
};

const userReducer = (state = initialState, { type, payload }) => {
  if (actionHandler.hasOwnProperty(type)) {
    return actionHandler[type](state, payload);
  }

  return state;
};

const actionHandler = {
  [PUT_USER_DATA]: computationFunctions.putUserData,
  [PUT_USER_TOKEN]: computationFunctions.putUserToken,
  [PUT_VEHICLE_RESERVATIONS]: computationFunctions.putVehicleReservations,
  [PUT_CREATED_VEHICLE_RESERVATION]: computationFunctions.putCreatedVehicleReservation,
  [PUT_CANCELED_VEHICLE_RESERVATION]: computationFunctions.putCanceledVehicleReservation,
  [PUT_FRIENDSHIP_REQUESTS]: computationFunctions.putFriendshipRequests,
  [PUT_USERS]: computationFunctions.putUsers,
  [PUT_USER_FRIENDS]: computationFunctions.putUserFriends,
  [PUT_REMOVED_FRIEND]: computationFunctions.putRemovedFriend
};

export default userReducer;
