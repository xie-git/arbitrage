import express from "express";
import axios from "axios";
import Stock from "../../models/Stocks";

const router = express.Router();

router.post("/getStocksForBot", (req, response) => {
  //console.log(req.body);

  //   const test = req.params.foo;
  //   console.log(test);
  var action = req.body.queryResult.action;

  //input.getStockPrice
  //input.getFavStock

  if (action == "input.getStockPrice") {
    var date = req.body.queryResult.parameters.date.split("T")[0];
    var priceType = req.body.queryResult.parameters.price_type;
    var companyName = req.body.queryResult.parameters.company_name;

    console.log(date);
    console.log(priceType);
    console.log(companyName);

    var tickerMap = {
      apple: "AAPL",
      microsoft: "MSFT",
      ibm: "IBM",
      google: "GOOG",
      amazon: "AMZN",
      visa: "V",
      infosys: "INFY",
      tesla: "TSLA",
      snapchat: "SNAP"
    };

    //map the price types
    var priceMap = {
      opening: "open_price",
      closing: "close_price",
      maximum: "high_price",
      high: "high_price",
      low: "low_price",
      minimum: "low_price"
    };

    var stockTicker = tickerMap[companyName.toLowerCase()];
    var priceTypeCode = priceMap[priceType.toLowerCase()];

    console.log(priceTypeCode);
    console.log(stockTicker);

    let username = "c38f27d60d04a23fcf574d622e0cdcf2";
    let password = "e851e58fa652902abd53d8a2241dc4b5";

    var auth =
      "Basic " + new Buffer(username + ":" + password).toString("base64");

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: auth
    };
    console.log("I'm at axios");
    axios
      .get(
        `https://api.intrinio.com//historical_data?ticker=${stockTicker}&item=${priceTypeCode}&start_date=${date}&end_date=${date}`
      )
      .then(res => {
        let stockPrice = res.data["data"][0].value;
        console.log(stockPrice);

        var chat =
          " The " +
          priceType +
          " price for " +
          companyName +
          " on " +
          date +
          " was " +
          stockPrice;

        response.send(buildChatResponse(chat));
      })
      .catch(err => console.log);
  }
  if (action == "input.getFavStock") {
    console.log(req.params);

    return console.log("stocks incoming");
  }
});

function buildChatResponse(chat) {
  return JSON.stringify({ fulfillmentText: chat });
}

export default router;
