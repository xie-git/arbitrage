import React, { Component } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { connect } from "react-redux";
import {
  AreaChart,
  BarChart,
  LineChart,
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import {
  getDaily,
  getIntra,
  getWeekly,
  getMonthly,
  getSMA,
  getSO,
  getMACD,
  getAD
} from "../../actions/chartActions";

const formatter = value => `$${value}`;

class StockSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      chartName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDaily = this.handleDaily.bind(this);
    this.intraChange = this.intraChange.bind(this);
    this.weeklyChange = this.weeklyChange.bind(this);
    this.monthlyChange = this.monthlyChange.bind(this);
    this.getSMA = this.getSMA.bind(this);
    this.getSO = this.getSO.bind(this);
    this.getMACD = this.getMACD.bind(this);
    this.getAD = this.getAD.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleDaily(event) {
    const keyword = this.state.value;
    this.setState({ chartName: "Daily" });
    console.log(keyword);
    this.props.getDaily(keyword);
    event.preventDefault();
  }
  intraChange(event) {
    const keyword = this.state.value;
    this.setState({ chartName: "Intraday" });
    console.log(keyword);
    this.props.getIntra(keyword);
    event.preventDefault();
  }
  weeklyChange(event) {
    const keyword = this.state.value;
    this.setState({ chartName: "Weekly" });
    console.log(keyword);
    this.props.getWeekly(keyword);
    event.preventDefault();
  }
  monthlyChange(event) {
    const keyword = this.state.value;
    this.setState({ chartName: "Monthly" });
    console.log(keyword);
    this.props.getMonthly(keyword);
    event.preventDefault();
  }
  getSMA(event) {
    const keyword = this.state.value;
    const chart = this.state.chartName;
    console.log(keyword);
    this.props.getSMA(keyword, chart);
    event.preventDefault();
  }
  getSO(event) {
    const keyword = this.state.value;
    console.log(keyword);
    this.props.getSO(keyword);
    event.preventDefault();
  }
  getMACD(event) {
    const keyword = this.state.value;
    console.log(keyword);
    this.props.getMACD(keyword);
    event.preventDefault();
  }
  getAD(event) {
    const keyword = this.state.value;
    console.log(keyword);
    this.props.getAD(keyword);
    event.preventDefault();
  }

  render() {
    var chartData = this.props.chart;
    console.log(this.state.value);
    console.log(chartData);

    return (
        <div className="container-fluid">
          <div className="row">
            {/* sticky search bar */}
            <div className="col-md-6">
              <label>
                <b>Find Stock:</b> &nbsp;
                <input
                  type="text"
                  placeholder="Search for stock (AAPL)"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <button
                className="button button4"
                onClick={this.handleDaily}
                value="Search Stocks"
                style={{ width: "100px" }}
              >
                <span style={{ fontSize: "9px", textAlign: "center" }}>
                  Search
                </span>
              </button>
              </div>
              </div>
            <div className = "row">
            <div className = "col-md-6">
              <p><b>{chartData.ticker}</b></p> [add full stock name][add current price]
              <br/>
              <br/>
              <table>
                <thead>
                  <b>Statistics</b>
                </thead>
                <tr>
                  <td>Previous Close</td>
                  <td>$1000</td>
                </tr>
                <tr>
                  <td>Open</td>
                  <td>$1000</td>
                </tr>
                <tr>
                  <td>Volume</td>
                  <td>$1000</td>
                </tr>
                <tr>
                  <td>Average Volume</td>
                  <td>$1000</td>
                </tr>
                <tr>
                  <td>52 Week Range</td>
                  <td>$1000</td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>$1000</td>
                </tr>
              </table>

                {/* <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownTiButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Technical Indicators
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownTiButton"
                  >
                    <a className="dropdown-item" onClick={this.getSMA}>
                      Simple Moving Average
                    </a>
                    <a className="dropdown-item" onClick={this.getMACD}>
                      Moving Average Convergence
                    </a>
                    <a className="dropdown-item" onClick={this.getSO}>
                      Stochastic Oscillator
                    </a>
                    <a className="dropdown-item" onClick={this.getAD}>
                      A/D
                    </a>
                  </div>
                </div> */}
              </div>
              <div className="col-md-6">
                <span><b>{this.state.chartName}</b></span>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle float-right"
                    type="button"
                    id="dropdownChartButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Chart Type
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownChartButton"
                  >
                    <a className="dropdown-item" onClick={this.intraChange}>
                      Intraday
                    </a>
                    <a className="dropdown-item" onClick={this.handleDaily}>
                      Daily
                    </a>
                    <a className="dropdown-item" onClick={this.weeklyChange}>
                      Weekly
                    </a>
                    <a className="dropdown-item" onClick={this.monthlyChange}>
                      Monthly
                    </a>
                  </div>
                </div>
                {/* chart here */}
                <ComposedChart
                  width={600}
                  height={150}
                  //data={chartData.TIData}
                  data={chartData.stockData}
                  margin={{ top: 5, bottom: 5 }}
                >
                  <XAxis dataKey="timeStamp" hide={true} />
                  <YAxis
                    dataKey="stocks"
                    type="number"
                    domain={[
                      lowprice => Math.floor((lowprice * 0.95) / 5) * 5,
                      highprice => Math.ceil((highprice * 1.05) / 5) * 5
                    ]}
                    tickFormatter={formatter}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="linear"
                    dataKey="stocks"
                    stroke="#8884d8"
                    fill="#008080"
                    animationEasing="ease-in-out"
                    animationDuration={2000}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="SMA" stroke="#ff7300" />
                </ComposedChart>
                <br/>
                <br/>
              {/* Volume graph */}
              <BarChart
                width={600}
                height={100}
                data={chartData.stockData}
                margin={{ top: 5, bottom: 5 }}
              >
                <XAxis dataKey="timeStamp" />
                <YAxis dataKey="volume" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="volume" fill="#008080" />
              </BarChart>
            </div>
          </div>
      </div>
    );
  }
}

StockSearch.propTypes = {
  chart: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  stocks: state.stocks,
  chart: state.chart
});
export default connect(
  mapStateToProps,
  { getDaily, getIntra, getWeekly, getMonthly, getSMA, getSO, getMACD, getAD }
)(StockSearch);
