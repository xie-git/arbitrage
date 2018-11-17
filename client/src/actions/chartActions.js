import axios from "axios";
import {
  GET_INTRADAY,
  GET_DAILY,
  GET_WEEKLY,
  GET_MONTHLY,
  GET_YEARLY,
  GET_SMA,
  GET_MACD,
  GET_SO,
  GET_AD
} from "./types";

export const getDaily = keyword => dispatch => {
  var stocks = [];
  var volume = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${keyword}&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Time Series (Daily)"];

      for (var key in timeSeriesData) {
        stocks.push({
          timeStamp: key,
          stocks: parseFloat(timeSeriesData[key]["1. open"]),
          volume: timeSeriesData[key]["5. volume"]
        });
      }
      stocks.reverse();
      dispatch({
        type: GET_DAILY,
        payload: stocks,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};

export const getIntra = keyword => dispatch => {
  var stocks = [];
  var volume = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${keyword}&interval=1min&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Time Series (1min)"];

      for (var key in timeSeriesData) {
        stocks.push({
          timeStamp: key,
          stocks: parseFloat(timeSeriesData[key]["1. open"]),
          volume: timeSeriesData[key]["5. volume"]
        });
      }
      stocks.reverse();
      dispatch({
        type: GET_INTRADAY,
        payload: stocks,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};
export const getWeekly = keyword => dispatch => {
  var stocks = [];
  var volume = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${keyword}&interval=60min&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Time Series (60min)"];
      console.log(timeSeriesData);

      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth();
      var hrs = 9;
      var mins = 30;

      var dateString =
        today.getFullYear() + "-" + (month + 1) + "-" + day + "T09:30";

      var temp = new Date(dateString);
      console.log(temp.getTime() - Math.floor(6.048 * Math.pow(10, 8)));

      var lastWeek = new Date(
        temp.getTime() - Math.floor(6.048 * Math.pow(10, 8))
      );

      for (var key in timeSeriesData) {
        stocks.push({
          timeStamp: key,
          stocks: parseFloat(timeSeriesData[key]["1. open"]),
          volume: timeSeriesData[key]["5. volume"]
        });
      }
      stocks.reverse();

      var result = stocks.filter(function(item) {
        var itemTime = new Date(item.timeStamp).getTime();
        return itemTime >= lastWeek;
      });

      dispatch({
        type: GET_WEEKLY,
        payload: result,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};
export const getMonthly = keyword => dispatch => {
  var stocks = [];
  var volume = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${keyword}&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Monthly Time Series"];

      for (var key in timeSeriesData) {
        stocks.push({
          timeStamp: key,
          stocks: parseFloat(timeSeriesData[key]["1. open"]),
          volume: timeSeriesData[key]["5. volume"]
        });
      }
      stocks.reverse();
      dispatch({
        type: GET_MONTHLY,
        payload: stocks,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};

export const getMACD = keyword => dispatch => {
  var MACD_Signal = [];
  var MACD = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=MACD&symbol=${keyword}&interval=daily&series_type=open&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Technical Analysis: MACD"];

      for (var key in timeSeriesData) {
        MACD_Signal.push({
          timeStamp: key,
          MACD_Signal: timeSeriesData[key]["MACD_Signal"],
          MACD: timeSeriesData[key]["MACD"]
        });
      }
      MACD_Signal.reverse();
      dispatch({
        type: GET_MACD,
        payload: MACD_Signal,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};

export const getSMA = (keyword, chartName) => dispatch => {
  var returnedTime = [];
  var SMA = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=SMA&symbol=${keyword}&interval=60min&time_period=10&series_type=open&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Technical Analysis: SMA"];
      console.log(timeSeriesData);

      if (chartName === "Weekly") {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth();
        var hrs = 9;
        var mins = 30;

        var dateString =
          today.getFullYear() + "-" + (month + 1) + "-" + day + "T09:30";

        var temp = new Date(dateString);
        console.log(temp.getTime() - Math.floor(6.048 * Math.pow(10, 8)));

        var lastWeek = new Date(
          temp.getTime() - Math.floor(6.048 * Math.pow(10, 8))
        );

        for (var key in timeSeriesData) {
          SMA.push({
            timeStamp: key,
            SMA: timeSeriesData[key]["SMA"]
          });
        }
        SMA.reverse();

        var result = SMA.filter(function(item) {
          var itemTime = new Date(item.timeStamp).getTime();
          return itemTime >= lastWeek;
        });
      }
      console.log(result);

      dispatch({
        type: GET_SMA,
        payload: result
      });
    })
    .catch(error => console.log(error));
};
export const getSO = keyword => dispatch => {
  var SO_Signal = [];
  var SO = [];
  axios
    .get(
      `https://www.alphavantage.co/query?function=STOCH&symbol=${keyword}&interval=daily&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Technical Analysis: STOCH"];

      for (var key in timeSeriesData) {
        SO_Signal.push({
          timeStamp: key,
          SO_Signal: timeSeriesData[key]["SlowK"],
          SO: timeSeriesData[key]["SlowD"]
        });
      }
      SO_Signal.reverse();
      dispatch({
        type: GET_SO,
        payload: SO_Signal,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};
export const getAD = keyword => dispatch => {
  var Chaikin = [];

  axios
    .get(
      `https://www.alphavantage.co/query?function=AD&symbol=${keyword}&interval=daily&apikey=UQOF040MM8G60RVG`
    )
    .then(res => {
      var timeSeriesData = res.data["Technical Analysis: Chaikin A/D"];

      for (var key in timeSeriesData) {
        Chaikin.push({
          timeStamp: key,
          Chaikin: timeSeriesData[key]["Chaikin A/D"]
        });
      }
      Chaikin.reverse();
      dispatch({
        type: GET_AD,
        payload: Chaikin,
        ticker: keyword.toLocaleUpperCase()
      });
    })
    .catch(error => console.log(error));
};
