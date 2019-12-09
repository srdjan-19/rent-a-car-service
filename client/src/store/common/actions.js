import { PUT_ERROR, FETCH_ADDRESSES, PUT_ADDRESSES } from "./constants";

export const putError = payload => ({
  type: PUT_ERROR,
  payload
});

export const fetchAddresses = payload => ({
  type: FETCH_ADDRESSES,
  payload
});

export const putAddresses = payload => ({
  type: PUT_ADDRESSES,
  payload
});
