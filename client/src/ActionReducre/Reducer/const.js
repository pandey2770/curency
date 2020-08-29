export default (state = { loader: false }, action) => {
  switch (action.type) {
    case "LOADERSTART":
      return { ...state, loader: true };
    case "LOADERSTOP":
      return { ...state, loader: false };
    default:
      return state;
  }
};
