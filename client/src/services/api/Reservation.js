import HttpBaseClient from "../HttpBaseClient";
import { format } from "util";

const ENDPOINTS = {
  USER_VEHICLES_RESERVATION: "/vehicle-reservations/user/",
  VEHICLE_RESERVATIONS: "/vehicle-reservations",
  QUICK_VEHICLE_RESERVATIONS: "/vehicle-reservations/quick",
  CANCEL_VEHICLE_RESERVATION: "/vehicle-reservations/%s",

};

class ReservationService extends HttpBaseClient {

  fetchUserVehiclesReservation = () => {
    return this.getApiClient().get(ENDPOINTS.USER_VEHICLES_RESERVATION);
  };

  reserve = reservation => {
    return this.getApiClient().post(
      ENDPOINTS.VEHICLE_RESERVATIONS,
      reservation
    );
  };

  quickReserve = reservation => {
    return this.getApiClient().post(
      ENDPOINTS.QUICK_VEHICLE_RESERVATIONS,
      reservation
    );
  };

  cancelVehicleReservation = payload => {
    return this.getApiClient().delete(
      format(ENDPOINTS.CANCEL_VEHICLE_RESERVATION, payload.reservationId)
    );
  };

}

export default new ReservationService();
