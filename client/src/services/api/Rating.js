import HttpBaseClient from "../HttpBaseClient";

const ENDPOINTS = {
    RATING_RENT_A_CAR: "/ratings/rent-a-cars",
    RATING_VEHICLE: "/ratings/vehicles"
}

class AddressService extends HttpBaseClient {

    rateRentACar = rateData => {
        return this.getApiClient().post(ENDPOINTS.RATING_RENT_A_CAR, rateData);
    };


    rateVehicle = rateData => {
        return this.getApiClient().post(ENDPOINTS.RATING_VEHICLE, rateData);
    };

}

export default new AddressService();