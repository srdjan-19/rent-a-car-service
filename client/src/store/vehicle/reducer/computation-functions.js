export function putVehicleDetails(state, vehicleDetails) {
    return {
        ...state,
        vehicleDetails
    };
}

export function putVehicleSearchInformation(
    state,
    rentACarSearchVehicleCriteria
) {
    return {
        ...state,
        rentACarSearchVehicleCriteria
    };
}

export function putRentACarDeletedVehicle(state, vehicleId) {
    const index = state.rentACarVehicles.findIndex(v => v.id === vehicleId);
    state.rentACarVehicles.splice(index, 1);
    const refresh = state.rentACarVehicles.slice();

    return {
        ...state,
        rentACarVehicles: refresh
    }
}

export function putRentACarVehicles(state, rentACarVehicles) {
    return {
        ...state,
        rentACarVehicles
    };
}

export function putRentACarCreatedVehicle(state, vehicle) {
    return {
        ...state,
        ...state.rentACarVehicles.push(vehicle)
    };
}

export function putRentACarUpdatedVehicle(state, vehicle) {
    const index = state.rentACarVehicles.findIndex(v => v.id === vehicle.id);
    state.rentACarVehicles.splice(index, 1, vehicle);
    const refresh = state.rentACarVehicles.slice();

    return {
        ...state,
        rentACarVehicles: refresh

    };
}

export function putRentACarVehiclesOnDiscount(state, rentACarDiscountedVehicles) {
    return {
        ...state,
        rentACarDiscountedVehicles
    };
}

