import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reFreshingRates, convertRates } from "../../ActionReducre/Action";
function Calculate() {
  const dispatch = useDispatch();
  const { amount } = useSelector(state => state.currencyData);

  const [formCurrency, setFormCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [currency, setCurrency] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    setConvertedAmount(`${amount.toFixed(2)}  ${toCurrency}`);
  }, [amount]);

  const reFreshRates = () => {
    dispatch(reFreshingRates());
  };

  const convert = () => {
    if (
      (formCurrency != "" || toCurrency != "") &&
      formCurrency == toCurrency
    ) {
      setConvertedAmount(`${currency} ${toCurrency}`);
    } else if (formCurrency == "" || toCurrency == "") {
      alert("Please Select type of currency");
    } else {
      dispatch(
        convertRates({ from: formCurrency, to: toCurrency, amount: currency })
      );
    }
  };

  return (
    <div className="divInput">
      <input
        placeholder="Amount"
        onChange={e => {
          setCurrency(e.target.value);
        }}
        value={currency}
      />

      <select
        onChange={e => {
          setFormCurrency(e.target.value);
        }}
      >
        <option>Select</option>
        <option>INR</option>
        <option>AUD</option>
        <option>CAD</option>
        <option>JPY</option>
      </select>

      <select
        onChange={e => {
          setToCurrency(e.target.value);
        }}
      >
        <option>Select</option>
        <option>INR</option>
        <option>AUD</option>
        <option>CAD</option>
        <option>JPY</option>
      </select>
      <p>{convertedAmount}</p>

      <button className="convert" onClick={convert}>
        convert
      </button>

      <button className="convert refresh" onClick={reFreshRates}>
        reFreshRates
      </button>
    </div>
  );
}

export default Calculate;
