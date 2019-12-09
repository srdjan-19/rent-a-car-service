import { all, spawn, call, put } from "redux-saga/effects";
import flatten from "lodash.flatten";
import * as userSaga from "./user/saga";
import * as rentACarSaga from "./rent-a-car/saga";
import * as vehicleSaga from "./vehicle/saga";
import * as commonSaga from "./common/saga";

import { putError } from "./common/actions";

export default function* rootSaga() {
  let sagas = flatten(
    [userSaga, rentACarSaga, vehicleSaga, commonSaga].map(saga =>
      Object.keys(saga).map(sagaFunctionName => saga[sagaFunctionName])
    )
  );

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
          } catch (error) {
            yield put(putError(error.response.data.message));
          }
        }
      })
    )
  );
}
