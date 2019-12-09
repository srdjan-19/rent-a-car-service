import dateFormat from "dateformat";
import {
  PUT_VEHICLE_SEARCH_INFORMATION,
  PUT_RENT_A_CAR_CREATED_VEHICLE,
  PUT_RENT_A_CAR_UPDATED_VEHICLE,
  PUT_RENT_A_CAR_DELETED_VEHICLE,
  PUT_RENT_A_CAR_DISCOUNTED_VEHICLES,
  PUT_RENT_A_CAR_VEHICLES,
} from "../constants";
import * as computationFunctions from "./computation-functions";

const initialState = {
  vehicleDetails: {
    id: "1234",
    brand: "Mercedes",
    model: "E200",
    yearOfProduction: 2018,
    numberOfSeats: 4,
    pricePerDay: 450,
    rating: 9.5
  },
  rentACarVehicles: [{
    id: "1234",
    brand: "Mercedes",
    model: "E200",
    yearOfProduction: 2018,
    numberOfSeats: 4,
    price: 470,
    rating: 9.8
  },
  {
    id: "4545",
    brand: "BMW",
    model: "M8",
    yearOfProduction: 2018,
    numberOfSeats: 4,
    price: 450,
    rating: 8.8
  }],
  rentACarDiscountedVehicles: [],
  rentACarSearchVehicleCriteria: {
    pickUpDate: dateFormat(new Date(), "yyyy-mm-dd"),
    dropOffDate: dateFormat(new Date(), "yyyy-mm-dd"),
    pickUpLocation: "",
    dropOffLocation: ""
  }
};

const vehicleReducer = (state = initialState, { type, payload }) => {
  if (actionHandler.hasOwnProperty(type)) {
    return actionHandler[type](state, payload);
  }
  return state;
};

const actionHandler = {
  [PUT_VEHICLE_SEARCH_INFORMATION]: computationFunctions.putVehicleSearchInformation,
  [PUT_RENT_A_CAR_VEHICLES]: computationFunctions.putRentACarVehicles,
  [PUT_RENT_A_CAR_CREATED_VEHICLE]: computationFunctions.putRentACarCreatedVehicle,
  [PUT_RENT_A_CAR_UPDATED_VEHICLE]: computationFunctions.putRentACarUpdatedVehicle,
  [PUT_RENT_A_CAR_DELETED_VEHICLE]: computationFunctions.putRentACarDeletedVehicle,
  [PUT_RENT_A_CAR_DISCOUNTED_VEHICLES]: computationFunctions.putRentACarVehiclesOnDiscount
};

export default vehicleReducer;
