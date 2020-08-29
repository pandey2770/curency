const uuidv1 = require("uuidv1");
const DB = require("./db");

async function fillINRData(data) {
  const id = uuidv1();
  const getData = await DB.get({
    text: "select * from currencybase where base=$1",
    values: [data.base]
  });
  if (!getData.length > 0) {
    const queryInsert = {
      text: "insert into currencyBase (id, base) VALUES ($1, $2)",
      values: [id, data.base]
    };
    await DB.mutate(queryInsert);

    for (const [base, rate] of Object.entries(data.rates)) {
      const idRates = uuidv1();
      const queryInsertRates = {
        text:
          "insert into rates (id, lastUpdated,countryCode,rate,base) VALUES ($1, $2, $3,$4,$5)",
        values: [idRates, data.date, base, rate, id]
      };
      await DB.mutate(queryInsertRates);
    }
  } else {
    for (const [base, rate] of Object.entries(data.rates)) {
      const queryUpdate = {
        text:
          "update rates set lastUpdated=$1 ,rate=$2 where base=$3 and countrycode=$4",
        values: [data.date, rate, getData[0].id, base]
      };
      await DB.mutate(queryUpdate);
    }
  }
}

async function getcurrencyConverted(data) {
  const getData = await DB.get({
    text:
      "select rates.id,rates.countrycode, rates.rate from rates join currencybase on rates.base= currencybase.id where currencybase.base=$1 and rates.countrycode=$2",
    values: [data.from, data.to]
  });
  if (!getData.length > 0) {
    const getDataReverse = await DB.get({
      text:
        "select rates.id,rates.countrycode, rates.rate from rates join currencybase on rates.base= currencybase.id where currencybase.base=$1 and rates.countrycode=$2",
      values: [data.to, data.from]
    });

    if (!getDataReverse.length > 0) {
      return { status: false, message: "Curreny not supported" };
    } else {
      return {
        status: true,
        message: Number(data.amount) / Number(getDataReverse[0].rate)
      };
    }
  } else {
    return {
      status: true,
      message: Number(getData[0].rate) * Number(data.amount)
    };
  }
}

module.exports = {
  fillINRData,
  getcurrencyConverted
};
