import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { addStocks } from "../../actions/StockActions";

class StockSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockData: [],
      stockQuery: [],
      value: "",
      btnValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  addStock(event, index) {
    event.preventDefault();
    let keyword;
    let getPrice;
    let getChange;
    const newPost = {
      symbol: this.state.stockQuery[index].symbol
    };
    keyword = newPost.symbol;

    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${keyword}&apikey=UQOF040MM8G60RVG`
      )
      .then(res => {
        console.log(res.data);

        getPrice = res.data["Global Quote"]["05. price"];
        getChange = res.data["Global Quote"]["09. change"];
        this.props.addStocks(keyword, getPrice, getChange);
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const keyword = this.state.value;
    axios
      .get(
        `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${keyword}&apikey=UQOF040MM8G60RVG`
      )
      .then(res => {
        let stocks = _.flattenDeep(
          Array.from(res.data["Stock Quotes"]).map(stockinfo => [
            {
              symbol: stockinfo["1. symbol"],
              price: stockinfo["2. price"],
              volume: stockinfo["3. volume"],
              timestamp: stockinfo["4. timestamp"]
            }
          ])
        );
        this.setState({
          stockData: stocks
        });
      })
      .catch(error => console.log(error));
    event.preventDefault();
  }
  handleBlur() {
    let save = this.state.stockQuery;
    let keyword = this.state.value;
    console.log(keyword);
    console.log(keyword.length);
    if (keyword.length < 1) {
      this.setState({
        value: keyword
      });
    }
    if (keyword != null)
      axios
        .get(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=UQOF040MM8G60RVG`
        )
        .then(res => {
          console.log(res.data);
          let stocksinfo = _.flattenDeep(
            Array.from(res.data["bestMatches"]).map(stock => [
              {
                symbol: stock["1. symbol"],
                name: stock["2. name"],
                type: stock["3. type"]
              }
            ])
          );
          this.setState({
            stockQuery: stocksinfo
          });
        })
        .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <span className = "open" style = {{fontSize:'8pt'}}>Find Stock: &nbsp;</span>
            <input
              type="text"
              placeholder="Search for stock (AAPL)"
              value={this.state.value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              style = {{width:'170px', height:'20px', fontSize:'8pt'}}
            />
          </label>
          &nbsp;
          <button
            className="button button5"
            type="submit"
            value="Search Stocks"
          >
            <span style={{ fontSize: "9px", textAlign: "center" }}>Search</span>
          </button>
        </form>
        <ul>
          {this.state.stockData.map(stockInfo => (
            <li key={stockInfo.symbol}>
              <b className = "open" style = {{fontSize:'10pt'}}>
                <table>
                  <td style={{ width: "50%" }}>{stockInfo.symbol}</td>
                  <td style={{ textAlign: "right", width: "50%" }}>
                    {stockInfo.price}
                  </td>
                </table>
              </b>
            </li>
          ))}
        </ul>
        <br/>
        <ul style = {{fontSize:'10pt'}}>
          {this.state.stockQuery.map((searchStock, index) => (
            <li key={searchStock.symbol}>
              <table>
                <tr>
                  <td style={{ width: "30%" }}>{searchStock.symbol}</td>
                  <td style={{ textAlign: "left", width: "50%" }}>
                    {searchStock.name}
                  </td>
                  <td style={{ textAlign: "right", width: "20%" }}>
                    <button
                      className="btn btn-success stockbuttons"
                      type="submit"
                      onClick={e => this.addStock(e, index)}
                    >
                      <span style={{ textAlign: "center" }}>+</span>
                    </button>
                  </td>
                </tr>
              </table>
            </li>
          ))}
        </ul>
        
      </div>
    );
  }
}
StockSearch.propTypes = {
  stocks: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  addStocks: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  stocks: state.stocks,
  auth: state.auth
});
export default connect(
  mapStateToProps,

  { addStocks }
)(StockSearch);
