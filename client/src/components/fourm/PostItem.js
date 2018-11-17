import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "../../actions/postActions";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

class PostItem extends Component {
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  render() {
    const { post, showActions } = this.props;

    return (
      <tr>
        <td style={{fontSize:'10pt'}}>
          <b>{post.name}</b>
        </td>
        <td style={{fontSize:'10pt'}}>
          <Link to={`/post/${post._id}`}>
            {post.text}
          </Link>
        </td>
        <td>
          <button
            onClick={this.onLikeClick.bind(this, post._id)}
            type="button"
            className="button button4"
            style={{width:'100px'}}
          >
            <FaThumbsUp/>
            <span className="badge badge-light">{post.likes.length}</span>
          </button>
          <button
            onClick={this.onUnlikeClick.bind(this, post._id)}
            type="button"
            className="button button4"
            style={{width:'100px'}}
          >
            <FaThumbsDown/>
          </button>
        </td>
      </tr>

    );
  }
}
PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  addLike: propTypes.func.isRequired,
  removeLike: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(PostItem);
