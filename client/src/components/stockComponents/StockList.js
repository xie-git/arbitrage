import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";

class StockList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockData: [],
      time: ""
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      axios
        .get(
          "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=LLY&apikey=UQOF040MM8G60RVG"
        )
        .then(res => {
          let stocks = _.flattenDeep(
            Array.from(res.data["Stock Quotes"]).map(stock => [
              {
                symbol: stock["1. symbol"],
                price: stock["2. price"],
                volume: stock["3. volume"],
                timestamp: stock["4. timestamp"]
              }
            ])
          );
          this.setState({ stockData: stocks });
        })
        .catch(error => console.log(error));
    }, 60000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.state.time);
    return (
      <div>
        <ul>
          {this.state.stockData.map(seatchStock => (
            <li key={seatchStock.symbol}>
              {seatchStock.symbol}
              <br /> {seatchStock.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StockList;
