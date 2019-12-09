const reducer = "vehicleReducer";

export const selectVehicleSearchCriteria = state => {
  return state[reducer].rentACarSearchVehicleCriteria;
};

export const selectRentACarVehicles = state => {
  return state[reducer].rentACarVehicles;
};

export const selectRentACarVehiclesOnDiscount = state => {
  return state[reducer].rentACarDiscountedVehicles;
};
