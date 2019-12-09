export function putError(state, error) {
  return {
    ...state,
    error
  };
}

export function putAddresses(state, addresses) {
  return {
    ...state,
    addresses
  };
}
