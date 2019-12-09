const reducer = "rentACarReducer";

export const selectRentACars = state => {
  return state[reducer].rentACars;
};

export const selectRentACarDetails = state => {
  return state[reducer].rentACarDetails;
};

export const selectRentACarLocationInformation = state => {
  return state[reducer].rentACarLocationInformation;
};

export const selectRentACarVehiclesIncome = state => {
  return state[reducer].rentACarVehiclesIncome;
};

export const selectRentACarVehiclesBusyness = state => {
  return state[reducer].rentACarVehiclesBusyness;
};

export const selectRentACarAvailableVehicles = state => {
  return state[reducer].rentACarVehiclesAvailability;
};

export const selectRentACarOffices = state => {
  return state[reducer].rentACarOffices;
};

export const selectOffices = state => {
  return state[reducer].offices;
};
