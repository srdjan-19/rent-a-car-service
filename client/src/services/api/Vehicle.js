import HttpBaseClient from "../HttpBaseClient";
import { format } from "util";

const ENDPOINTS = {
    VEHICLES: "/vehicles",
    SEARCH_VEHICLES:
        "/vehicles/search?&pickUpDate=%s&dropOffDate=%s&pickUpLocation=%s&dropOffLocation=%s&type=%s&seats=%d&startRange=%d&endRange=%d&rentACarId=%s",
    SORT_VEHICLES: "/vehicles/sort?by=%s&rentACarId=%s",
    DELETE_VEHICLE: "/vehicles/%s",
    CREATE_VEHICLE_DISCOUNT: "/discounts/vehicle"
};

class VehicleService extends HttpBaseClient {

    fetch = () => {
        return this.getApiClient().get(ENDPOINTS.VEHICLES);
    };

    search = payload => {
        return this.getApiClient().get(
            format(
                ENDPOINTS.SEARCH_VEHICLES,
                payload.pickUpDate,
                payload.dropOffDate,
                payload.pickUpLocation,
                payload.dropOffLocation,
                payload.type,
                payload.seats,
                payload.startRange,
                payload.endRange,
                payload.rentACarId
            )
        );
    };

    sort = payload => {
        return this.getApiClient().get(
            format(ENDPOINTS.SORT_VEHICLES, payload.by, payload.rentACarId)
        );
    };

    createRentACarVehicle = payload => {
        return this.getApiClient().post(ENDPOINTS.VEHICLES, payload);
    };

    update = payload => {
        return this.getApiClient().put(ENDPOINTS.VEHICLES, payload);
    };

    delete = payload => {
        return this.getApiClient().delete(
            format(ENDPOINTS.DELETE_VEHICLE, payload.id)
        );
    };

    createDiscount = payload => {
        return this.getApiClient().post(ENDPOINTS.CREATE_VEHICLE_DISCOUNT, payload);
    };
}

export default new VehicleService();