import HttpBaseClient from "../HttpBaseClient";
import { format } from "util";

const ENDPOINTS = {
  FETCH_USERS: "/users",
  FETCH_USER: "/users/%s",
  UPDATE_USER: "/users",
  FETCH_FRIENDS: "/users/list-of-friends",
  CHANGE_PASSWORD: "/users/password/update",
  SEARCH: "/users/search/userName=%s"
};

class UserService extends HttpBaseClient {

  saveUser = payload => {
    return this.getApiClient().put(ENDPOINTS.UPDATE_USER, payload);
  };

  changePassword = request => {
    return this.getApiClient().put(ENDPOINTS.CHANGE_PASSWORD, request);
  };

  searchByName = userName => {
    return this.getApiClient().get(format(ENDPOINTS.SEARCH, userName));
  };

  fetchUsers = () => {
    return this.getApiClient().get(ENDPOINTS.FETCH_USERS);
  };

  fetchUser = payload => {
    return this.getApiClient().get(format(ENDPOINTS.FETCH_USER, payload));
  };

}

export default new UserService();
