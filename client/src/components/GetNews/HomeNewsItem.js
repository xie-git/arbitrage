import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
class HomeNewsItem extends Component {
  render() {
    const news = this.props;
    const image = news.pp.thread.main_image;

    return (
      <div>
        <a href = {news.pp.url} target = "_blank" style = {{color:"black"}}><b style={{ fontSize: "18pt" }}>{news.pp.title}</b></a>
        {image ? (<img src={image} alt="image" />) : <br />}
        <br />
        <div className="row open" >
          <a href={news.pp.url} target="_blank" style={{ color: "black" }}>
            <div className="col-md-8" style={{ fontSize: "8pt" }}>
              {news.pp.thread.site_full}
            </div>
          </a>
          <div
            className="open col-md-4 offset-md-5"
            style={{
              fontSize: "8pt",
              color: "green",
              textAlign: "right"
            }}
          >
            <FaThumbsUp size={8} />
            {news.pp.thread.social.facebook.likes}
          </div>
        </div>
        <br/>
        <div>
          <p style={{fontSize: "12pt"}} className = "headline">{news.pp.text}</p>
        </div>
      </div>
    );
  }
}

HomeNewsItem.propTypes = {
  news: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  news: state.news
});
export default connect(mapStateToProps)(HomeNewsItem);
