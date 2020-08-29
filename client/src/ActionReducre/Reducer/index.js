import { combineReducers } from "redux";
import CurrencyData from "./CurrencyData";
import Const from "./const";
export default combineReducers({
  currencyData: CurrencyData,
  constData: Const
});
