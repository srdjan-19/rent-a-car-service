import { take, put, call } from "redux-saga/effects";

import {
  FETCH_RENT_A_CARS,
  CREATE_RENT_A_CAR,
  DELETE_RENT_A_CAR,
  FETCH_RENT_A_CAR_DETAILS,
  UPDATE_RENT_A_CAR_DETAILS,
  FETCH_OFFICES,
  FETCH_RENT_A_CAR_OFFICES,
  CREATE_RENT_A_CAR_OFFICE,
  DELETE_RENT_A_CAR_OFFICE,
  SEARCH_RENT_A_CARS,
  SORT_RENT_A_CARS,
  FETCH_RENT_A_CAR_LOCATION_INFORMATION,
  RATE_RENT_A_CAR,
  FETCH_RENT_A_CAR_VEHICLES_INCOME,
  FETCH_RENT_A_CAR_VEHICLES_BUSYNESS,
  FETCH_RENT_A_CAR_VEHICLES_AVAILABILITY
} from "./constants";
import {
  putRentACars,
  putCreatedRentACar,
  putUpdatedRentACar,
  putDeletedRentACar,
  putRentACarDetails,
  putRentACarOffices,
  putCreatedRentACarOffice,
  putDeletedRentACarOffice,
  putRentACarLocationInformation,
  putRentACarVehiclesIncome,
  putRentACarVehiclesBusyness,
  putRentACarVehiclesAvailability,
  putOffices
} from "./actions";
import { putSearchInformation } from "../vehicle/actions";
import rentACarService from "../../services/api/RentACar";
import locationService from "../../services/LocationService";
import ratingService from "../../services/api/Rating";

export function* fetchRentACars() {
  yield take(FETCH_RENT_A_CARS);
  const { data } = yield call(rentACarService.fetchRentACars);
  yield put(putRentACars(data));
  yield put(putRentACarDetails(data[0]));
}

export function* createRentACar() {
  const { payload } = yield take(CREATE_RENT_A_CAR);
  const location = yield call(locationService.getLocationBasedOnLatLong, {
    lat: payload.location.latlng.lat,
    lng: payload.location.latlng.lng
  });

  const address = {
    street: payload.street,
    city: location.data.geonames[0].name,
    state: location.data.geonames[0].countryName,
    longitude: payload.location.latlng.lng,
    latitude: payload.location.latlng.lat
  };

  const rentACar = {
    address: address,
    name: payload.name,
    description: payload.description
  };

  const { data } = yield call(rentACarService.create, rentACar);
  yield put(putCreatedRentACar(data))
  payload.callback()
}

export function* updateRentACar() {
  const { payload } = yield take(UPDATE_RENT_A_CAR_DETAILS);

  const location = yield call(locationService.getLocationBasedOnLatLong, {
    lat: payload.location.latlng.lat,
    lng: payload.location.latlng.lng
  });

  const address = {
    street: payload.street,
    city: location.data.geonames[0].name,
    state: location.data.geonames[0].countryName,
    longitude: payload.location.latlng.lng,
    latitude: payload.location.latlng.lat
  };

  const rentACar = {
    address: address,
    id: payload.id,
    name: payload.name,
    description: payload.description
  };

  const { data } = yield call(rentACarService.update, rentACar);

  yield put(putUpdatedRentACar(data));

  payload.callback();
}

export function* deleteRentACar() {
  const { payload } = yield take(DELETE_RENT_A_CAR);
  yield call(rentACarService.delete, payload);
  yield put(putDeletedRentACar(payload.id));
  payload.callback();
}

export function* fetchRentACarDetails() {
  const { payload } = yield take(FETCH_RENT_A_CAR_DETAILS);
  const { data } = yield call(rentACarService.fetchRentACarDetails, payload);
  yield put(putRentACarDetails(data));
}

//TODO refresh rate in the list
export function* rateRentACar() {
  const { payload } = yield take(RATE_RENT_A_CAR);
  yield call(ratingService.rateRentACar, payload);
  payload.callback();
}

export function* showRentACarVegiclesIncome() {
  const { payload } = yield take(FETCH_RENT_A_CAR_VEHICLES_INCOME);
  const { data } = yield call(rentACarService.showRentACarIncome, payload);
  yield put(putRentACarVehiclesIncome(data));
}

export function* showRentACarVehiclesBusyness() {
  const { payload } = yield take(FETCH_RENT_A_CAR_VEHICLES_BUSYNESS);
  const { data } = yield call(rentACarService.showRentACarBusyness, payload);
  yield put(putRentACarVehiclesBusyness(data));
}

export function* showRentACarVehiclesAvailability() {
  const { payload } = yield take(FETCH_RENT_A_CAR_VEHICLES_AVAILABILITY);
  const { data } = yield call(
    rentACarService.showAvailableRentACarVehicles,
    payload
  );
  yield put(putRentACarVehiclesAvailability(data));
}

export function* fetchRentACarLocationInformation() {
  const { payload } = yield take(FETCH_RENT_A_CAR_LOCATION_INFORMATION);
  yield put(putRentACarLocationInformation(payload));
}

export function* createRentACarOffice() {
  const { payload } = yield take(CREATE_RENT_A_CAR_OFFICE);

  const location = yield call(locationService.getLocationBasedOnLatLong, {
    lat: payload.location.latlng.lat,
    lng: payload.location.latlng.lng
  });

  const address = {
    street: payload.street,
    city: location.data.geonames[0].name,
    state: location.data.geonames[0].countryName,
    longitude: payload.location.latlng.lng,
    latitude: payload.location.latlng.lat
  };

  const office = {
    rentACarId: payload.rentACarId,
    address: address
  };

  const { data } = yield call(rentACarService.createRentACarOffice, office);
  yield put(putCreatedRentACarOffice(data));
  payload.callback();
}

export function* deleteRentACarOffice() {
  const { payload } = yield take(DELETE_RENT_A_CAR_OFFICE);
  yield call(rentACarService.deleteOffice, payload);
  yield put(putDeletedRentACarOffice(payload.id));
}

export function* fetchOffices() {
  yield take(FETCH_OFFICES);
  const { data } = yield call(rentACarService.fetchOffices);
  yield put(putOffices(data));
}

export function* fetchRentACarOffices() {
  const { payload } = yield take(FETCH_RENT_A_CAR_OFFICES);
  const { data } = yield call(
    rentACarService.fetchRentACarOffices,
    payload.rentACarId
  );
  yield put(putRentACarOffices(data));
}

export function* searchRentACars() {
  const { payload } = yield take(SEARCH_RENT_A_CARS);
  const { data } = yield call(rentACarService.searchRentACars, payload);
  yield put(putRentACars(data));

  const info = {
    pickUpDate: payload.pickUpDate,
    dropOffDate: payload.dropOffDate,
    pickUpLocation: payload.city,
    dropOffLocation: payload.city
  };

  yield put(putSearchInformation(info));

}

export function* sortRentACars() {
  const { payload } = yield take(SORT_RENT_A_CARS);
  const { data } = yield call(rentACarService.sortRentACars, payload);
  yield put(putRentACars(data));
}

