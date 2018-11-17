import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import PostItem from "../fourm/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = "Loading";
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <table style = {{width:'100%',border:'1px solid #b3b3b346'}}>
            <CommentFeed postId={post._id} comments={post.comments} />
          </table>
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12" >
              <Link to="/SocialTraderFourm">
                <button className="button4" type="button">
                  Back
                </button><br/><br/>
              </Link>
              <div>
                
                  {postContent}
                
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
Post.propTypes = {
  getPost: propTypes.func.isRequired,
  post: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPost }
)(Post);
