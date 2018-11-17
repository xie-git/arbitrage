import React, { Component } from "react";
import propTypes from "prop-types";
import HomeBottomNewsItem from "./HomeBottomNewsItem";

class HomeBottomNewsFeed extends Component {
  render() {
    const news = this.props;
    var daNews;
    let trending = [];

    daNews = news.news.newsData.posts;

    let postsCount = 1;
    let storedCounter = 0;
    let inCounter = 0;
    let testC = 0;


    while (postsCount < daNews.length) {

      if (inCounter < 10) {
        trending.push(daNews[postsCount]);
        inCounter++;
      }
      else {
        while (storedCounter < 10) {
          if (
            trending[storedCounter]["thread"]["social"]["facebook"]["likes"] <
            daNews[postsCount]["thread"]["social"]["facebook"]["likes"]
          ) {
            trending.push(daNews[postsCount]);
            break;
          }

          storedCounter++;
        }

        storedCounter = 0;
      }
      postsCount++;
    }

    var newsArr = Object.keys(trending).map(function (i) {
      return trending[i];
    });

    return newsArr.map(pp => <HomeBottomNewsItem key={pp.uuid} pp={pp} />);
  }
}

HomeBottomNewsFeed.propTypes = {
  news: propTypes.array.isRequired
};

export default HomeBottomNewsFeed;
