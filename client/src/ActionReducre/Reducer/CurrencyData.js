export default (state = { amount: 0 }, action) => {
  switch (action.type) {
    case "AMOUNT_COVERTED":
      return { ...state, amount: action.data };
    default:
      return state;
  }
};
