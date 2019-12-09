export function putUserData(state, details) {
  return {
    ...state,
    details
  };
}

export function putUserToken(state, payload) {
  return {
    ...state,
    token: payload
  };
}

export function putUserFriends(state, friends) {
  return {
    ...state,
    friends
  };
}

export function putRemovedFriend(state, friendshipId) {
  const index = state.friends.findIndex(f => f.id === friendshipId);
  state.friends.splice(index, 1);
  const refresh = state.friends.slice();

  return {
    ...state,
    friends: refresh
  }

}

export function putFoundUsersData(state, payload) {
  return {
    ...state,
    foundUsers: payload
  };
}

export function putUsers(state, users) {
  return {
    ...state,
    users
  };
}

export function putFriendshipRequests(state, friendshipRequests) {
  return {
    ...state,
    friendshipRequests
  };
}

export function putLogged(state, logged) {
  return {
    ...state,
    logged
  };
}

export function putVehicleReservations(state, vehicleReservations) {
  return {
    ...state,
    vehicleReservations
  };
}

export function putCreatedVehicleReservation(state, vehicleReservation) {
  return {
    ...state,
    ...state.vehicleReservations.push(vehicleReservation)
  };
}

export function putCanceledVehicleReservation(state, reservationId) {
  const index = state.vehicleReservations.findIndex(vr => vr.reservationId === reservationId);
  state.vehicleReservations.splice(index, 1);
  const refresh = state.vehicleReservations.slice();

  return {
    ...state,
    vehicleReservations: refresh
  }
}