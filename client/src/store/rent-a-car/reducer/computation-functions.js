export function putRentACars(state, rentACars) {
  return {
    ...state,
    rentACars
  };
}

export function putCreatedRentACar(state, rentACar) {
  return {
    ...state,
    ...state.rentACars.push(rentACar)
  };
}

export function putUpdatedRentACar(state, rentACar) {
  const index = state.rentACars.findIndex(rac => rac.id === rentACar.id);
  state.rentACars.splice(index, 1, rentACar);
  const refresh = state.rentACars.slice();

  return {
    ...state,
    rentACars: refresh
  };
}

export function putDeletedRentACar(state, rentACarId) {
  const index = state.rentACars.findIndex(rac => rac.id === rentACarId);
  state.rentACars.splice(index, 1);
  const refresh = state.rentACars.slice();

  return {
    ...state,
    rentACars: refresh
  }
}


export function putRentACarVehiclesIncome(state, rentACarVehiclesIncome) {
  return {
    ...state,
    rentACarVehiclesIncome
  };
}

export function putRentACarVehiclesBusyness(state, rentACarVehiclesBusyness) {
  return {
    ...state,
    rentACarVehiclesBusyness
  };
}

export function putRentACarVehiclesAvailability(state, rentACarVehiclesAvailability) {
  return {
    ...state,
    rentACarVehiclesAvailability
  };
}

export function putRentACarOffices(state, rentACarOffices) {
  return {
    ...state,
    rentACarOffices
  };
}

export function putRentACarCreatedOffice(state, office) {
  return {
    ...state,
    ...state.rentACarOffices.push(office)
  };
}

export function putRentACarDeletedOffice(state, officeId) {
  const index = state.rentACarOffices.findIndex(office => office.id === officeId);
  state.rentACarOffices.splice(index, 1);
  const refresh = state.rentACarOffices.slice();

  return {
    ...state,
    rentACarOffices: refresh
  }
}

export function putRentACarDetails(state, rentACarDetails) {
  return {
    ...state,
    rentACarDetails
  };
}

export function putRentACarLocationInformation(
  state,
  rentACarLocationInformation
) {
  return {
    ...state,
    rentACarLocationInformation
  };
}

export function putOffices(state, offices) {
  return {
    ...state,
    offices
  };
}
