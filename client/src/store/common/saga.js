import { take, put, call } from "redux-saga/effects";
import { FETCH_ADDRESSES } from "./constants";
import { putAddresses } from "./actions";
import addressService from "../../services/api/Address";

export function* fetchAddresses() {
    yield take(FETCH_ADDRESSES)
    const { data } = yield call(addressService.fetchAddresses);

    yield put(putAddresses(data));
}
