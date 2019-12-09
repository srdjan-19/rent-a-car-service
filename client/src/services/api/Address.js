import HttpBaseClient from "../HttpBaseClient";

const ENDPOINTS = {
    ADDRESSES: "/addresses"
}

class AddressService extends HttpBaseClient {

    fetchAddresses = () => {
        return this.getApiClient().get(ENDPOINTS.ADDRESSES)
    };

}

export default new AddressService();