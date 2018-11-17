import React, { Component } from "react";
import propTypes from "prop-types";
import StockItem from "./StockItem";

class StockFeed extends Component {
  render() {
    const { stocks } = this.props;
    console.log(stocks);
    return stocks.map(pp => <StockItem key={pp._id} pp={pp} />);
  }
}

StockFeed.propTypes = {
  stocks: propTypes.array.isRequired
};

export default StockFeed;
