import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
class CommentItem extends Component {
  render() {
    const { comment } = this.props;
    console.log(comment);

    return (
      <div className = "open">
        <div className="row">
          <div className="col-md-2">
            <p><a href="profile.html"></a><b>&nbsp;{comment.name}</b></p>
          </div>
          <div className="col-md-10">
            <p className="">{comment.text}</p>
          </div>
        </div>
      </div>
    );
  }
}
CommentItem.propTypes = {
  comment: propTypes.object.isRequired,
  postId: propTypes.string.isRequired,
  auth: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(CommentItem);
