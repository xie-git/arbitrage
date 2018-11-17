import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { FaThumbsUp } from "react-icons/fa";
class HomeBottomNewsItem extends Component {
    render() {
        const news = this.props;
        const image = news.pp.thread.main_image;
        return (
            <div className="col-md-4">
                {image ? (<img src={image} alt="image" className = "newspics" />) : <br />}
                <a href={news.pp.url} target="_blank" style={{ color: "black", fontSize: "8pt" }}><b>{news.pp.title}</b></a>
                <br />
                <div className="row">
                    <span className="col-md-8 open" style={{ fontSize: "8pt" }}>
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
                        <FaThumbsUp size={10} />
                        {news.pp.thread.social.facebook.likes}
                    </span>
                </div>
               
                <br />
            </div>
        );
    }
}

HomeBottomNewsItem.propTypes = {
    news: propTypes.object.isRequired
};
const mapStateToProps = state => ({
    news: state.news
});
export default connect(mapStateToProps)(HomeBottomNewsItem);
