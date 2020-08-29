const express = require("express");
const route = express.Router();
const axios = require("axios");

const {
  fillINRData,
  getcurrencyConverted
} = require("../dataBase/currencyDataBase.js");

route.get("/api/reFreshCurrency", async (req, res) => {
  var arr = ["INR", "AUD", "CAD", "JPY"];
  let status = "";
  for (let i = 0; i < arr.length; i++) {
    try {
      const curency = await axios.get(
        `https://api.exchangeratesapi.io/latest?base=${arr[i]}`
      );
      await fillINRData(curency.data);
    } catch (e) {
      status = status + e.response.data.error;
    }
  }
  res.json(status);
});

route.post("/api/convertCurrency", async (req, res) => {
  const data = await getcurrencyConverted(req.body);
  res.json({
    success: data.status,
    result: data.message
  });
});

module.exports = route;
