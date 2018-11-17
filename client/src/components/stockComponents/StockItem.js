import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { updatePrice, deleteStock } from "../../actions/StockActions";

class StockItem extends Component {
  componentDidMount() {
    const { pp } = this.props;
    const { test } = this.props.stocks;

    let keyword = pp.symbol;
    let stockId = pp._id;
    let DETRICH_GET_THE_PRICE;
    let priceChange;

    this.interval = setInterval(() => {
      axios
        .get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${keyword}&apikey=UQOF040MM8G60RVG`
        )
        .then(res => {
          //   "Global Quote": {
          //     "01. symbol": "LLY",
          //     "02. open": "107.4500",
          //     "03. high": "109.0400",
          //     "04. low": "107.4900",
          //     "05. price": "108.2100",
          //     "06. volume": "1018187",
          //     "07. latest trading day": "2018-10-29",
          //     "08. previous close": "106.3900",
          //     "09. change": "1.8200",
          //     "10. change percent": "1.7107%"
          // }
          //console.log(res.data["Global Quote"]["08. previous close"]);
          DETRICH_GET_THE_PRICE = res.data["Global Quote"]["05. price"];
          priceChange = res.data["Global Quote"]["09. change"];
          this.props.updatePrice(stockId, DETRICH_GET_THE_PRICE, priceChange);
        })
        .catch(error => console.log(error));
    }, 60000);
  }

  removeStock(event, id) {
    event.preventDefault();
    console.log(id);
    this.props.deleteStock(id);
  }

  render() {
    const { pp } = this.props;
    console.log(pp);
    return (
      <tr>
        <td className={pp.change < 0 ? "negative" : "positive"}>
          <b>{pp.symbol}</b>
        </td>
        <td className={pp.change < 0 ? "negative" : "positive"}>
          ${pp.change}{" "}
        </td>
        <td className={pp.change < 0 ? "negative" : "positive"}>${pp.price}</td>
        <td style={{ textAlign: "right" }}>
          <button
            className="btn btn-danger stockbuttons"
            type="submit"
            onClick={e => this.removeStock(e, pp._id)}
          />
        </td>
      </tr>
    );
  }
}
StockItem.propTypes = {
  stocks: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  updatePrice: propTypes.func.isRequired,
  deleteStock: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  stocks: state.stocks,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { updatePrice, deleteStock }
)(StockItem);
