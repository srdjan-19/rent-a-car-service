import {
  FETCH_RENT_A_CARS,
  PUT_RENT_A_CARS,
  CREATE_RENT_A_CAR,
  PUT_CREATED_RENT_A_CAR,
  PUT_UPDATED_RENT_A_CAR,
  PUT_DELETED_RENT_A_CAR,
  FETCH_RENT_A_CAR_DETAILS,
  PUT_RENT_A_CAR_DETAILS,
  UPDATE_RENT_A_CAR_DETAILS,
  FETCH_RENT_A_CAR_LOCATION_INFORMATION,
  PUT_RENT_A_CAR_LOCATION_INFORMATION,
  FETCH_OFFICES,
  PUT_OFFICES,
  FETCH_RENT_A_CAR_OFFICES,
  PUT_RENT_A_CAR_OFFICES,
  CREATE_RENT_A_CAR_OFFICE,
  PUT_CREATED_RENT_A_CAR_OFFICE,
  DELETE_RENT_A_CAR_OFFICE,
  PUT_DELETED_RENT_A_CAR_OFFICE,
  RATE_RENT_A_CAR,
  DELETE_RENT_A_CAR,
  SEARCH_RENT_A_CARS,
  SORT_RENT_A_CARS,
  FETCH_RENT_A_CAR_VEHICLES_INCOME,
  PUT_RENT_A_CAR_VEHICLES_INCOME,
  FETCH_RENT_A_CAR_VEHICLES_BUSYNESS,
  PUT_RENT_A_CAR_VEHICLES_BUSYNESS,
  FETCH_RENT_A_CAR_VEHICLES_AVAILABILITY,
  PUT_RENT_A_CAR_VEHICLES_AVAILABILITY,
} from "./constants";

export const fetchRentACars = payload => ({
  type: FETCH_RENT_A_CARS,
  payload
});

export const putRentACars = payload => ({
  type: PUT_RENT_A_CARS,
  payload
});

export const createRentACar = payload => ({
  type: CREATE_RENT_A_CAR,
  payload
});

export const putCreatedRentACar = payload => ({
  type: PUT_CREATED_RENT_A_CAR,
  payload
});

export const fetchRentACarDetails = payload => ({
  type: FETCH_RENT_A_CAR_DETAILS,
  payload
});

export const putRentACarDetails = payload => ({
  type: PUT_RENT_A_CAR_DETAILS,
  payload
});

export const updateRentACarDetails = payload => ({
  type: UPDATE_RENT_A_CAR_DETAILS,
  payload
});

export const putUpdatedRentACar = payload => ({
  type: PUT_UPDATED_RENT_A_CAR,
  payload
});

export const deleteRentACar = payload => ({
  type: DELETE_RENT_A_CAR,
  payload
});

export const putDeletedRentACar = payload => ({
  type: PUT_DELETED_RENT_A_CAR,
  payload
});

export const fetchOffices = payload => ({
  type: FETCH_OFFICES,
  payload
});

export const putOffices = payload => ({
  type: PUT_OFFICES,
  payload
});

export const fetchRentACarOffices = payload => ({
  type: FETCH_RENT_A_CAR_OFFICES,
  payload
});

export const putRentACarOffices = payload => ({
  type: PUT_RENT_A_CAR_OFFICES,
  payload
});

export const createRentACarOffice = payload => ({
  type: CREATE_RENT_A_CAR_OFFICE,
  payload
});

export const putCreatedRentACarOffice = payload => ({
  type: PUT_CREATED_RENT_A_CAR_OFFICE,
  payload
});

export const deleteRentACarOffice = payload => ({
  type: DELETE_RENT_A_CAR_OFFICE,
  payload
});

export const putDeletedRentACarOffice = payload => ({
  type: PUT_DELETED_RENT_A_CAR_OFFICE,
  payload
});

export const fetchRentACarVehiclesIncome = payload => ({
  type: FETCH_RENT_A_CAR_VEHICLES_INCOME,
  payload
});

export const putRentACarVehiclesIncome = payload => ({
  type: PUT_RENT_A_CAR_VEHICLES_INCOME,
  payload
});

export const fetchRentACarVehiclesBusyness = payload => ({
  type: FETCH_RENT_A_CAR_VEHICLES_BUSYNESS,
  payload
});

export const putRentACarVehiclesBusyness = payload => ({
  type: PUT_RENT_A_CAR_VEHICLES_BUSYNESS,
  payload
});

export const fetchRentACarVehiclesAvailability = payload => ({
  type: FETCH_RENT_A_CAR_VEHICLES_AVAILABILITY,
  payload
});

export const putRentACarVehiclesAvailability = payload => ({
  type: PUT_RENT_A_CAR_VEHICLES_AVAILABILITY,
  payload
});

export const fetchRentACarLocationInformation = payload => ({
  type: FETCH_RENT_A_CAR_LOCATION_INFORMATION,
  payload
});

export const putRentACarLocationInformation = payload => ({
  type: PUT_RENT_A_CAR_LOCATION_INFORMATION,
  payload
});

export const rateRentACar = payload => ({
  type: RATE_RENT_A_CAR,
  payload
});

export const searchRentACars = payload => ({
  type: SEARCH_RENT_A_CARS,
  payload
});

export const sortRentACars = payload => ({
  type: SORT_RENT_A_CARS,
  payload
});
