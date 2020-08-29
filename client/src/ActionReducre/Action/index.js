import axios from "axios";

export const reFreshingRates = () => {
  return async dispatch => {
    dispatch(loaderStart());
    const { data } = await axios.get("/api/reFreshCurrency");
    dispatch(loaderStop());
  };
};

export const convertRates = records => {
  return async dispatch => {
    dispatch(loaderStart());
    const { data } = await axios.post("/api/convertCurrency", records);
    dispatch(loaderStop());
    if (data.success) {
      return dispatch(amountDispatch(data.result));
    } else {
      return alert(data.result);
    }
  };
};

export const amountDispatch = data => {
  return {
    type: "AMOUNT_COVERTED",
    data
  };
};

export const loaderStart = () => {
  return {
    type: "LOADERSTART"
  };
};

export const loaderStop = () => {
  return {
    type: "LOADERSTOP"
  };
};
