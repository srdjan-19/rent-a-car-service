import {
  PUT_CREATED_RENT_A_CAR,
  PUT_UPDATED_RENT_A_CAR,
  PUT_DELETED_RENT_A_CAR,
  PUT_RENT_A_CARS,
  PUT_RENT_A_CAR_DETAILS,
  PUT_RENT_A_CAR_OFFICES,
  PUT_CREATED_RENT_A_CAR_OFFICE,
  PUT_DELETED_RENT_A_CAR_OFFICE,
  PUT_RENT_A_CAR_LOCATION_INFORMATION,
  PUT_RENT_A_CAR_VEHICLES_INCOME,
  PUT_RENT_A_CAR_VEHICLES_BUSYNESS,
  PUT_RENT_A_CAR_VEHICLES_AVAILABILITY,
  PUT_OFFICES,
} from "../constants";
import * as computationFunctions from "./computation-functions";

const initialState = {
  rentACars: [{
    name: "Deluxe",
    address: {
      city: "Sremska Mitrovica",
      state: "Serbia",
      street: "Bulevar Kralja Petra I",
      latitude: 44.97639,
      longitude: 19.6122
    },
    description: "Dostupna vozila",
    rating: 9.5
  },
  {
    name: "Kodak",
    address: {
      city: "Novi Sad",
      state: "Serbia",
      street: "Bulevar Oslobodjenja 147",
      latitude: 45.25167,
      longitude: 19.83694
    },
    description: "Pristupačna vozila",
    rating: 7.5
  }],
  rentACarDetails: {
    name: "Kodak",
    address: {
      city: "Novi Sad",
      state: "Serbia",
      street: "Bulevar Oslobodjenja 147",
      latitude: 44.22,
      longitude: 19.22
    },
    description: "Pristupačna vozila",
    rating: 7.5
  },
  rentACarVehiclesIncome: [],
  rentACarVehiclesBusyness: [],
  rentACarVehiclesAvailability: [],
  rentACarOffices: [],
  offices: []
};

const rentACarReducer = (state = initialState, { type, payload }) => {
  if (actionHandler.hasOwnProperty(type)) {
    return actionHandler[type](state, payload);
  }
  return state;
};

const actionHandler = {
  [PUT_CREATED_RENT_A_CAR]: computationFunctions.putCreatedRentACar,
  [PUT_UPDATED_RENT_A_CAR]: computationFunctions.putUpdatedRentACar,
  [PUT_DELETED_RENT_A_CAR]: computationFunctions.putDeletedRentACar,
  [PUT_RENT_A_CARS]: computationFunctions.putRentACars,
  [PUT_RENT_A_CAR_DETAILS]: computationFunctions.putRentACarDetails,
  [PUT_RENT_A_CAR_OFFICES]: computationFunctions.putRentACarOffices,
  [PUT_CREATED_RENT_A_CAR_OFFICE]: computationFunctions.putRentACarCreatedOffice,
  [PUT_DELETED_RENT_A_CAR_OFFICE]: computationFunctions.putRentACarDeletedOffice,
  [PUT_RENT_A_CAR_LOCATION_INFORMATION]:
    computationFunctions.putRentACarLocationInformation,
  [PUT_RENT_A_CAR_VEHICLES_INCOME]:
    computationFunctions.putRentACarVehiclesIncome,
  [PUT_RENT_A_CAR_VEHICLES_BUSYNESS]:
    computationFunctions.putRentACarVehiclesBusyness,
  [PUT_RENT_A_CAR_VEHICLES_AVAILABILITY]:
    computationFunctions.putRentACarVehiclesAvailability,
  [PUT_OFFICES]: computationFunctions.putOffices
};

export default rentACarReducer;
