import { take, put, call } from "redux-saga/effects";
import {
  FETCH_RENT_A_CAR_VEHICLES,
  FETCH_RENT_A_CAR_DISCOUNTED_VEHICLES,
  CREATE_RENT_A_CAR_VEHICLE,
  UPDATE_RENT_A_CAR_VEHICLE,
  DELETE_RENT_A_CAR_VEHICLE,
  RATE_RENT_A_CAR_VEHICLE,
  DISCOUNT_RENT_A_CAR_VEHICLE,
  SORT_RENT_A_CAR_VEHICLES,
  SEARCH_RENT_A_CAR_VEHICLES,
  CREATE_VEHICLE_RESERVATION,
  CREATE_QUICK_VEHICLE_RESERVATION,
  CANCEL_VEHICLE_RESERVATION,
} from "./constants";
import {
  putSearchInformation,
  putRentACarVehicles,
  putRentACarDiscountedVehicles,
  putRentACarCreatedVehicle,
  putRentACarUpdatedVehicle,
  putRentACarDeletedVehicle
} from "./actions";
import { putCreatedVehicleReservation, putCanceledVehicleReservation } from "../user/actions";
import reservationService from "../../services/api/Reservation";
import vehicleService from "../../services/api/Vehicle";
import rentACarService from "../../services/api/RentACar";
import ratingService from "../../services/api/Rating";

export function* searchVehicles() {
  const { payload } = yield take(SEARCH_RENT_A_CAR_VEHICLES);
  const { data } = yield call(vehicleService.search, payload);
  yield put(putRentACarVehicles(data));

  const info = {
    pickUpDate: payload.pickUpDate,
    dropOffDate: payload.dropOffDate,
    pickUpLocation: payload.pickUpLocation,
    dropOffLocation: payload.dropOffLocation
  };

  yield put(putSearchInformation(info));

}

export function* sortVehicles() {
  const { payload } = yield take(SORT_RENT_A_CAR_VEHICLES);
  const { data } = yield call(vehicleService.sort, payload);
  yield put(putRentACarVehicles(data));

}

export function* createVehicle() {
  const { payload } = yield take(CREATE_RENT_A_CAR_VEHICLE);
  const { data } = yield call(vehicleService.createRentACarVehicle, payload);
  yield put(putRentACarCreatedVehicle(data));
  payload.callback();
}

export function* updateVehicle() {
  const { payload } = yield take(UPDATE_RENT_A_CAR_VEHICLE);
  const { data } = yield call(vehicleService.update, payload);
  yield put(putRentACarUpdatedVehicle(data));
  payload.callback();
}

export function* deleteVehicle() {
  const { payload } = yield take(DELETE_RENT_A_CAR_VEHICLE);
  yield call(vehicleService.delete, payload);
  yield put(putRentACarDeletedVehicle(payload.id));
  payload.callback();
}

export function* rateVehicle() {
  const { payload } = yield take(RATE_RENT_A_CAR_VEHICLE);
  yield call(ratingService.rateVehicle, payload);
  payload.callback();
}

export function* createVehicleDiscount() {
  const { payload } = yield take(DISCOUNT_RENT_A_CAR_VEHICLE);
  yield call(vehicleService.createDiscount, payload);
  payload.callback();
}

export function* fetchRentACarVehicles() {
  const { payload } = yield take(FETCH_RENT_A_CAR_VEHICLES);
  const { data } = yield call(
    rentACarService.fetchRentACarVehicles,
    payload.rentACarId
  );
  yield put(putRentACarVehicles(data));
}

export function* fetchRentACarVehiclesOnDiscount() {
  const { payload } = yield take(FETCH_RENT_A_CAR_DISCOUNTED_VEHICLES);
  const { data } = yield call(
    rentACarService.fetchRentACarVehiclesOnDiscount,
    payload
  );
  yield put(putRentACarDiscountedVehicles(data));
}

export function* createVehicleReservation() {
  const { payload } = yield take(CREATE_VEHICLE_RESERVATION);
  const { data } = yield call(reservationService.reserve, payload);
  yield put(putRentACarDeletedVehicle(data.vehicleId))
  payload.callback();
}

export function* createQuickVehicleReservation() {
  const { payload } = yield take(CREATE_QUICK_VEHICLE_RESERVATION);
  const { data } = yield call(reservationService.quickReserve, payload);
  payload.callback();
  yield put(putCreatedVehicleReservation(data));
}

export function* cancelVehicleReservation() {
  const { payload } = yield take(CANCEL_VEHICLE_RESERVATION);
  const { data } = yield call(
    reservationService.cancelVehicleReservation,
    payload
  );
  yield put(putCanceledVehicleReservation(data));
  payload.callback();
}


