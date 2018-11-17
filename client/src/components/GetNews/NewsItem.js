import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
class NewsItem extends Component {
  render() {
    const news = this.props;
    return (
      <div className = "open spacingoverride">
        <a href={news.pp.url} target="_blank" style={{ color: "black", fontSize: "9pt" }}><b>{news.pp.title}</b></a>
        <br />
        <div className="row">
          <span className="col-md-8" style={{ fontSize: "8pt" }}>
            {news.pp.thread.site_full}
          </span>
          <span
            className="col-md-4"
            style={{
              fontSize: "8pt",
              color: "green",
              textAlign: "right"
            }}
          >
            <FaThumbsUp size={8} />
            {news.pp.thread.social.facebook.likes}
          </span>
        </div>
        <br />
      </div>
    );
  }
}

NewsItem.propTypes = {
  news: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news
});
export default connect(mapStateToProps)(NewsItem);
