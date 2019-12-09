import {
  FETCH_RENT_A_CAR_VEHICLES,
  PUT_RENT_A_CAR_VEHICLES,
  FETCH_RENT_A_CAR_DISCOUNTED_VEHICLES,
  PUT_RENT_A_CAR_DISCOUNTED_VEHICLES,
  PUT_RENT_A_CAR_DELETED_VEHICLE,
  CREATE_RENT_A_CAR_VEHICLE,
  PUT_RENT_A_CAR_CREATED_VEHICLE,
  UPDATE_RENT_A_CAR_VEHICLE,
  PUT_RENT_A_CAR_UPDATED_VEHICLE,
  DELETE_RENT_A_CAR_VEHICLE,
  PUT_VEHICLE_SEARCH_INFORMATION,
  SORT_RENT_A_CAR_VEHICLES,
  SEARCH_RENT_A_CAR_VEHICLES,
  RATE_RENT_A_CAR_VEHICLE,
  DISCOUNT_RENT_A_CAR_VEHICLE,
  CREATE_VEHICLE_RESERVATION,
  CREATE_QUICK_VEHICLE_RESERVATION,
  CANCEL_VEHICLE_RESERVATION
} from "./constants";

export const fetchRentACarVehicles = payload => ({
  type: FETCH_RENT_A_CAR_VEHICLES,
  payload
});

export const putRentACarVehicles = payload => ({
  type: PUT_RENT_A_CAR_VEHICLES,
  payload
});

export const createRentACarVehicle = payload => ({
  type: CREATE_RENT_A_CAR_VEHICLE,
  payload
});

export const putRentACarCreatedVehicle = payload => ({
  type: PUT_RENT_A_CAR_CREATED_VEHICLE,
  payload
});

export const updateVehicleDetails = payload => ({
  type: UPDATE_RENT_A_CAR_VEHICLE,
  payload
});

export const putRentACarUpdatedVehicle = payload => ({
  type: PUT_RENT_A_CAR_UPDATED_VEHICLE,
  payload
});

export const deleteRentACarVehicle = payload => ({
  type: DELETE_RENT_A_CAR_VEHICLE,
  payload
});

export const putRentACarDeletedVehicle = payload => ({
  type: PUT_RENT_A_CAR_DELETED_VEHICLE,
  payload
});

export const fetchRentACarDiscountedVehicles = payload => ({
  type: FETCH_RENT_A_CAR_DISCOUNTED_VEHICLES,
  payload
});

export const putRentACarDiscountedVehicles = payload => ({
  type: PUT_RENT_A_CAR_DISCOUNTED_VEHICLES,
  payload
});

export const discountVehicle = payload => ({
  type: DISCOUNT_RENT_A_CAR_VEHICLE,
  payload
});

export const rateVehicle = payload => ({
  type: RATE_RENT_A_CAR_VEHICLE,
  payload
});

export const sortVehicles = payload => ({
  type: SORT_RENT_A_CAR_VEHICLES,
  payload
});

export const searchVehicles = payload => ({
  type: SEARCH_RENT_A_CAR_VEHICLES,
  payload
});

export const putSearchInformation = payload => ({
  type: PUT_VEHICLE_SEARCH_INFORMATION,
  payload
});

export const createVehicleReservation = payload => ({
  type: CREATE_VEHICLE_RESERVATION,
  payload
});

export const createQuickVehicleReservation = payload => ({
  type: CREATE_QUICK_VEHICLE_RESERVATION,
  payload
});

export const cancelVehicleReservation = payload => ({
  type: CANCEL_VEHICLE_RESERVATION,
  payload
});


