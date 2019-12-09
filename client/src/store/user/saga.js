import { take, put, call } from "redux-saga/effects";
import {
  REGISTRATION,
  LOGIN,
  LOGOUT,
  SAVE_USER_DATA,
  CHANGE_USER_PASSWORD,
  SEND_FRIENDSHIP_REQUEST,
  FETCH_USER_VEHICLES_RESERVATION,
  FETCH_USERS,
  FETCH_USER_DATA,
  FETCH_USER_FRIENDS,
  FETCH_FRIENDSHIP_REQUESTS,
  UPDATE_FRIENDSHIP_REQUEST,
  REMOVE_FRIEND
} from "./constants";
import {
  putUserData,
  putUserToken,
  putUsers,
  putUserFriends,
  putRemovedFriend,
  putVehicleReservations,
  putFriendshipRequests,
} from "./actions";
import userService from "../../services/api/User";
import authService from "../../services/api/Auth";
import reservationService from "../../services/api/Reservation";
import friendshipService from "../../services/api/Friendship";


export function* registration() {
  const { payload } = yield take(REGISTRATION);
  const { data } = yield call(authService.registration, payload);
  alert(data.message);
  payload.callback();
}

export function* login() {
  const { payload } = yield take(LOGIN);
  const { data } = yield call(authService.login, payload);
  yield put(putUserData(data));
  yield put(putUserToken(data.token));
  payload.callback();
}

export function* logout() {
  const { payload } = yield take(LOGOUT);
  window.localStorage.clear();
  yield put(putUserToken(null));
  yield put(putUserData(null));
  payload.callback();
}

export function* saveUserData() {
  const { payload } = yield take(SAVE_USER_DATA);
  yield call(userService.saveUser, payload.userDetails);
  payload.callback();
}

export function* changePassword() {
  const { payload } = yield take(CHANGE_USER_PASSWORD);
  const { data } = yield call(userService.changePassword, payload);
  payload.callback(data)
}

export function* fetchUsers() {
  const { payload } = yield take(FETCH_USERS);
  const { data } = yield call(userService.fetchUsers, payload);
  yield put(putUsers(data));
}

export function* fetchUserData() {
  const { payload } = yield take(FETCH_USER_DATA);
  const { data } = yield call(userService.fetchUser, payload);
  yield put(putUserData(data));
}

export function* fetchUserFriends() {
  yield take(FETCH_USER_FRIENDS);
  const { data } = yield call(friendshipService.fetchFriends);
  yield put(putUserFriends(data));
}

export function* sendFriendshipRequest() {
  const { payload } = yield take(SEND_FRIENDSHIP_REQUEST);
  yield call(friendshipService.sendRequest, payload);
  payload.callback();
}

export function* fetchFriendshipRequests() {
  yield take(FETCH_FRIENDSHIP_REQUESTS);
  const { data } = yield call(friendshipService.fetchFriendshipRequests);
  yield put(putFriendshipRequests(data));
}

export function* updateFriendshipRequest() {
  const { payload } = yield take(UPDATE_FRIENDSHIP_REQUEST);
  yield call(friendshipService.updateFriendshipStatus, payload);
  payload.callback();
}

export function* removeFriend() {
  const { payload } = yield take(REMOVE_FRIEND);
  yield call(friendshipService.removeFriend, payload.friendshipId);
  yield put(putRemovedFriend(payload.friendshipId))
  payload.callback();

}

export function* fetchUserVehiclesReservation() {
  yield take(FETCH_USER_VEHICLES_RESERVATION);
  const { data } = yield call(reservationService.fetchUserVehiclesReservation);
  yield put(putVehicleReservations(data));
}
