const reducer = "commonReducer";

export const selectError = state => {
  return state[reducer].error;
};

export const selectAddresses = state => {
  return state[reducer].addresses;
};
