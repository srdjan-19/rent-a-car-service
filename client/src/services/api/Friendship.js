import HttpBaseClient from "../HttpBaseClient";
import { format } from "util";

const ENDPOINTS = {
    FRIENDSHIPS: "/friendships",
    FRIENDSHIPS_DELETE: "/friendships/%s",
    FRIENDSHIP_REQUESTS: "/friendships/requests",
};

class FriendshipService extends HttpBaseClient {

    sendRequest = payload => {
        return this.getApiClient().post(ENDPOINTS.FRIENDSHIPS, payload);
    }

    fetchFriendshipRequests = () => {
        return this.getApiClient().get(ENDPOINTS.FRIENDSHIP_REQUESTS);
    }

    fetchFriends = () => {
        return this.getApiClient().get(ENDPOINTS.FRIENDSHIPS);
    }

    updateFriendshipStatus = payload => {
        return this.getApiClient().put(ENDPOINTS.FRIENDSHIPS, payload);
    }

    removeFriend = friendshipId => {
        return this.getApiClient().delete(format(ENDPOINTS.FRIENDSHIPS_DELETE, friendshipId))
    }


}

export default new FriendshipService();