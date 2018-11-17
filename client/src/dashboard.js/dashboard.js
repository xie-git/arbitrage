import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileActions";
import { getStocks } from "../actions/StockActions";
import { Link } from "react-router-dom";
import axios from "axios";
import StockFeed from "../components/stockComponents/StockFeed";
import StockSearch from "../components/stockComponents/StockSearch";
import NewsFeed from "../components/GetNews/NewsFeed";
import HomeNewsFeed from "../components/GetNews/HomeNewsFeed";
import HomeBottomNewsFeed from "../components/GetNews/HomeBottomNewsFeed";
import { getNews } from "../actions/getNewsActions";
import propTypes from "prop-types";
import HomeBottomNewsItem from "../components/GetNews/HomeBottomNewsItem";

class Dashboard extends Component {
  //When the dashboard is called get the current profile
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getCurrentProfile();
    this.props.getStocks(user.id);
    this.props.getNews();

    var clockElement = document.getElementById("clock");
    function updateClock(clock) {
      clock.innerHTML = new Date().toLocaleTimeString();
    }
    setInterval(function() {
      updateClock(clockElement);
    }, 1000);
    var dt = new Date();
    document.getElementById("date").innerHTML =
      dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { stocks, loading } = this.props.stocks;
    const newsLoading = this.props.news.newsLoading;
    const news = this.props.news;

    let dashboardContent;
    let stockContent;
    let newsContent;
    let homeNewsFeed;
    let homeBottomNewsFeed;

    let allNews = news.newsData.posts;
    console.log(allNews);

    if (profile === null) {
      dashboardContent = (
        <h4
          className="open spacing"
          style={{ fontSize: "13pt", textAlign: "center" }}
        >
          <b>WELCOME TO ARBITRAGE</b>
        </h4>
      );
      if (stocks === null || loading) {
        stockContent = "Add your favorite stocks here";
      } else {
        stockContent = <StockFeed stocks={stocks} />;
      }
    } else {
      //if user is logged in
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>Welcome: {user.name}!</h4>;
        if (stocks === null || loading || stocks.length === 0) {
          stockContent = "Stock data is loading";
        } else {
          stockContent = <StockFeed stocks={stocks} />;
        }
        if (news === null || news.newsData.length === 0) {
          newsContent = "News is loading ";
          homeNewsFeed = "News is loading ";
          homeBottomNewsFeed = "News is loading ";
        } else {
          newsContent = "News is loading ";
          homeNewsFeed = "News is loading ";
          homeBottomNewsFeed = "News is loading ";
          // newsContent = <NewsFeed news={news} />;
          // homeNewsFeed = <HomeNewsFeed news={news} />;
          //homeBottomNewsFeed = <HomeBottomNewsFeed news={news} />;
        }
      } else {
        //User is logged in but has no profile

        dashboardContent = (
          <div>
            <h4
              className="open spacing"
              style={{ fontSize: "10pt", textAlign: "left" }}
            >
              WELCOME: {user.name}
            </h4>
          </div>
        );
        if (stocks === null || loading) {
          stockContent = "Stock data is loading";
        } else {
          stockContent = <StockFeed stocks={stocks} />;
        }
        if (news === null || news.newsData.length === 0) {
          newsContent = "News is loading ";
        } else {
          newsContent = <NewsFeed news={news} />;
          homeNewsFeed = <HomeNewsFeed news={news} />;
          homeBottomNewsFeed = <HomeBottomNewsFeed news={news} />;
        }
      }
    }

    return (
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row">
            {/* within the sidebar */}
            <div
              id="sidebar-container"
              className="sidebar-expanded d-none d-md-block col-md-3"
            >
              <ul class="list-group sticky-top">
                <div className="row datetime">
                  <div className="col-md-6" style={{ textAlign: "left" }}>
                    <span id="date" />
                  </div>
                  <div className="col-md-6" style={{ textAlign: "right" }}>
                    <span id="clock" />
                  </div>
                </div>
                <br />
                {dashboardContent}
                <br />

                {/* begin sidebar stocks */}
                <div className="container-fluid stocktext sidebarbg">
                  <br />
                  <p>Markets</p>
                  {/* aggregate stocks */}
                  <table>
                    <tr>
                      <td>DOW</td>
                    </tr>
                    <tr>
                      <td>S&P</td>
                    </tr>
                    <tr>
                      <td>NASDAQ</td>
                    </tr>
                  </table>

                  {/* begin user favorite stocks */}
                  <hr />
                  <p>Watchlist </p>
                  <table>{stockContent}</table>
                  <br />
                </div>
                <br/>
                <StockSearch />
                {/* <iframe
                    allow="microphone;"
                    width="300"
                    height="250"
                    src="https://console.dialogflow.com/api-client/demo/embedded/e6b4b742-726f-435e-8d27-189b9dc1e6d1"
                  /> */}
              </ul>
            </div>

            {/* everything outside of the sidebar */}
            <div
              className="col-md-9"
              style={{ overflowY: "auto", overflowX: "hidden", height: "50%" }}
            >
              <div className="row" style={{ height: "950px" }}>
                <div className="col-md-8">{homeNewsFeed}</div>{" "}
                {/*middle section end*/}
                <div
                  className="col-md-4 open newstitle parentYScroll"
                  style={{ fontSize: "8pt" }}
                >
                  <div className="row datetime">
                    <div className="col-md-6" style={{ textAlign: "left" }}>
                      <span id="date" />
                    </div>
                    <div className="col-md-6" style={{ textAlign: "right" }}>
                      <span id="clock" />
                    </div>
                  </div>
                  
                  <h5 style={{ textAlign: "center" }}>TRENDING STORIES</h5>
                  <hr />
                  <div className="childYScroll">{newsContent}</div>
                </div>
              </div>
              <br />
              <hr />
              <br />

              <div className="row">{homeBottomNewsFeed}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  getStocks: propTypes.func.isRequired,
  stocks: propTypes.object.isRequired,
  news: propTypes.object.isRequired,
  getNews: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  stocks: state.stocks,
  news: state.news
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, getStocks, getNews }
)(Dashboard);
