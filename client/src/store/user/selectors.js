const reducer = "userReducer";

export const userDataSelector = state => {
  return state[reducer].details;
};
export const userLoggedSelector = state => state[reducer].logged;

export const userTokenSelector = state => state[reducer].token;

export const selectUserFriends = state => {
  console.log(state)
  return state[reducer].friends
};

export const foundFriendsSelector = state => state[reducer].foundUsers;

export const selectUsers = state => state[reducer].users;

export const selectUserInvites = state => state[reducer].userInvites;

export const selectVehicleReservations = state =>
  state[reducer].vehicleReservations;

export const selectFriendshipRequests = state =>
  state[reducer].friendshipRequests;
