import React, { Component } from "react";
import propTypes from "prop-types";
import HomeNewsItem from "./HomeNewsItem";

class HomeNewsFeed extends Component {
  render() {
    const news = this.props;
    var daNews;
    let trending = [];

    daNews = news.news.newsData.posts;

    let postsCount = 0;
    let storedCounter = 0;
    let inCounter = 0;
    let testC = 0;

    while (postsCount < 1) {
   
      if (inCounter < 1 ) {
        trending.push(daNews[postsCount]);
        inCounter++;
      }
      else {
        while (storedCounter < 1) {
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

    var newsArr = Object.keys(trending).map(function(i) {
        
      return trending[i];
    });

    return newsArr.map(pp => <HomeNewsItem key={pp.uuid} pp={pp} />);
  }
}

HomeNewsFeed.propTypes = {
  news: propTypes.array.isRequired
};

export default HomeNewsFeed;
