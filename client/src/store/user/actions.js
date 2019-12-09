import {
  REGISTRATION,
  LOGIN,
  PUT_LOGGED,
  LOGOUT,
  PUT_USER_DATA,
  SAVE_USER_DATA,
  PUT_USER_TOKEN,
  CHANGE_USER_PASSWORD,
  SEND_FRIENDSHIP_REQUEST,
  REMOVE_FRIEND,
  PUT_REMOVED_FRIEND,
  FETCH_USERS,
  SEARCH_USERS,
  PUT_USERS,
  FETCH_USER_DATA,
  FETCH_FRIENDSHIP_REQUESTS,
  PUT_FRIENDSHIP_REQUESTS,
  UPDATE_FRIENDSHIP_REQUEST,
  FETCH_USER_FRIENDS,
  PUT_USER_FRIENDS,
  FETCH_USER_VEHICLES_RESERVATION,
  PUT_VEHICLE_RESERVATIONS,
  PUT_CREATED_VEHICLE_RESERVATION,
  PUT_CANCELED_VEHICLE_RESERVATION
} from "./constants";

export const registerUser = payload => ({
  type: REGISTRATION,
  payload
});

export const loginUser = payload => ({
  type: LOGIN,
  payload
});

export const putLogged = payload => ({
  type: PUT_LOGGED,
  payload
});

export const logoutUser = payload => ({
  type: LOGOUT,
  payload
});

export const putUserData = payload => ({
  type: PUT_USER_DATA,
  payload
});

export const putUserToken = payload => ({
  type: PUT_USER_TOKEN,
  payload
});

export const saveUserData = payload => ({
  type: SAVE_USER_DATA,
  payload
});

export const changeUserPassword = payload => ({
  type: CHANGE_USER_PASSWORD,
  payload
});

export const removeFriend = payload => ({
  type: REMOVE_FRIEND,
  payload
});

export const putRemovedFriend = payload => ({
  type: PUT_REMOVED_FRIEND,
  payload
});

export const fetchUsers = payload => ({
  type: FETCH_USERS,
  payload
});

export const searchUsers = payload => ({
  type: SEARCH_USERS,
  payload
});

export const putUsers = payload => ({
  type: PUT_USERS,
  payload
});

export const fetchUserData = payload => ({
  type: FETCH_USER_DATA,
  payload
});

export const fetchUserFriends = payload => ({
  type: FETCH_USER_FRIENDS,
  payload
});

export const putUserFriends = payload => ({
  type: PUT_USER_FRIENDS,
  payload
});

export const sendFriendshipRequest = payload => ({
  type: SEND_FRIENDSHIP_REQUEST,
  payload
});

export const fetchFriendshipRequests = payload => ({
  type: FETCH_FRIENDSHIP_REQUESTS,
  payload
});

export const putFriendshipRequests = payload => ({
  type: PUT_FRIENDSHIP_REQUESTS,
  payload
});

export const updateFriendshipRequest = payload => ({
  type: UPDATE_FRIENDSHIP_REQUEST,
  payload
});

export const fetchUserVehiclesReservation = payload => ({
  type: FETCH_USER_VEHICLES_RESERVATION,
  payload
});

export const putVehicleReservations = payload => ({
  type: PUT_VEHICLE_RESERVATIONS,
  payload
});

export const putCreatedVehicleReservation = payload => ({
  type: PUT_CREATED_VEHICLE_RESERVATION,
  payload
})

export const putCanceledVehicleReservation = payload => ({
  type: PUT_CANCELED_VEHICLE_RESERVATION,
  payload
})