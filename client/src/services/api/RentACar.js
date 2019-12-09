import HttpBaseClient from "../HttpBaseClient";
import { format } from "util";

const ENDPOINTS = {
  RENT_A_CARS: "/rent-a-cars",
  RENT_A_CAR_DETAILS: "/rent-a-cars/%s",
  RENT_A_CAR_VEHICLES: "/rent-a-cars/%s/vehicles",
  RENT_A_CAR_VEHICLES_ON_DISCOUNT:
    "/rent-a-cars/%s/vehicles/discount?pickUpDate=%s&dropOffDate=%s",
  RENT_A_CAR_VEHICLES_BUSYNESS:
    "/rent-a-cars/%s/busyness?startDate=%s&endDate=%s",
  RENT_A_CAR_VEHICLES_AVAILABILITY:
    "/rent-a-cars/%s/vehicles/availability?startDate=%s&endDate=%s&available=%s",
  RENT_A_CAR_OFFICES: "/rent-a-car-offices/%s",
  RENT_A_CAR_INCOME: "/rent-a-cars/%s/income?startDate=%s&endDate=%s",
  SEARCH_RENT_A_CARS:
    "/rent-a-cars/search?&city=%s&state=%s&name=%s&pickUpDate=%s&dropOffDate=%s",
  SORT_RENT_A_CARS: "/rent-a-cars/sort?&by=%s",
  DELETE_RENT_A_CAR: "/rent-a-cars/delete/%s",
  OFFICES: "/rent-a-car-offices",
  DELETE_OFFICE: "/rent-a-car-offices/%s"
};

class RentACarService extends HttpBaseClient {

  fetchRentACars = () => {
    return this.getApiClient().get(ENDPOINTS.RENT_A_CARS);
  };

  create = rentACar => {
    return this.getApiClient().post(ENDPOINTS.RENT_A_CARS, rentACar);
  };

  update = rentACar => {
    return this.getApiClient().put(ENDPOINTS.RENT_A_CARS, rentACar);
  };

  delete = payload => {
    return this.getApiClient().delete(
      format(ENDPOINTS.DELETE_RENT_A_CAR, payload.id)
    );
  };

  showRentACarIncome = incomePeriod => {
    return this.getApiClient().get(
      format(
        ENDPOINTS.RENT_A_CAR_INCOME,
        incomePeriod.id,
        incomePeriod.startDate,
        incomePeriod.endDate
      )
    );
  };

  showRentACarBusyness = busynessPeriod => {
    return this.getApiClient().get(
      format(
        ENDPOINTS.RENT_A_CAR_VEHICLES_BUSYNESS,
        busynessPeriod.id,
        busynessPeriod.startDate,
        busynessPeriod.endDate
      )
    );
  };

  showAvailableRentACarVehicles = availabilityPeriod => {
    return this.getApiClient().get(
      format(
        ENDPOINTS.RENT_A_CAR_VEHICLES_AVAILABILITY,
        availabilityPeriod.id,
        availabilityPeriod.startDate,
        availabilityPeriod.endDate,
        availabilityPeriod.available
      )
    );
  };

  fetchRentACarDetails = rentACarId => {
    return this.getApiClient().get(
      format(ENDPOINTS.RENT_A_CAR_DETAILS, rentACarId)
    );
  };

  fetchRentACarVehicles = rentACarId => {
    return this.getApiClient().get(
      format(ENDPOINTS.RENT_A_CAR_VEHICLES, rentACarId)
    );
  };

  fetchRentACarVehiclesOnDiscount = payload => {
    return this.getApiClient().get(
      format(
        ENDPOINTS.RENT_A_CAR_VEHICLES_ON_DISCOUNT,
        payload.rentACarId,
        payload.pickUpDate,
        payload.dropOffDate
      )
    );
  };

  fetchRentACarOffices = rentACarId => {
    return this.getApiClient().get(
      format(ENDPOINTS.RENT_A_CAR_OFFICES, rentACarId)
    );
  };

  createRentACarOffice = office => {
    return this.getApiClient().post(ENDPOINTS.OFFICES, office);
  };

  fetchOffices = () => {
    return this.getApiClient().get(ENDPOINTS.OFFICES);
  };

  deleteOffice = payload => {
    return this.getApiClient().delete(
      format(ENDPOINTS.DELETE_OFFICE, payload.id)
    );
  };

  searchRentACars = payload => {
    return this.getApiClient().get(
      format(
        ENDPOINTS.SEARCH_RENT_A_CARS,
        payload.city,
        payload.state,
        payload.name,
        payload.pickUpDate,
        payload.dropOffDate
      )
    );
  };

  sortRentACars = payload => {
    return this.getApiClient().get(
      format(ENDPOINTS.SORT_RENT_A_CARS, payload.by)
    );
  };


}

export default new RentACarService();
