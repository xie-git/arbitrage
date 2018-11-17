import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    console.log(posts);
    let postContent;

    if (posts === null || loading) {
      postContent = "Loading...";
    } else {
      postContent = <PostFeed posts={posts}/>;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12 open">
              <PostForm />
              <br/>
              <table style = {{width:'100%',border:'1px solid #b3b3b346', fontSize:'8pt'}}>
                <thead className = "spacing">
                  <td width = "150px"><b>TOPICS</b></td>
                  <td width = "150px"><b>POST COUNT</b></td>
                  <td><b>LAST POST</b></td>
                </thead>
                <tr style = {{fontSize:'10pt'}}>
                  <td>GENERAL</td>
                  <td>100</td>
                  <td>1 hour ago by BRIAN TEST POST TEST POST</td>
                </tr>
                <tr style = {{fontSize:'10pt'}}>
                  <td>STOCKS</td>
                  <td>100</td>
                  <td>1 hour ago by BRIAN TEST POST TEST POST</td>
                </tr>
                <tr style = {{fontSize:'10pt'}}>
                  <td>INVESTMENT</td>
                  <td>100</td>
                  <td>1 hour ago by BRIAN TEST POST TEST POST</td>
                </tr>
                <tr style = {{fontSize:'10pt'}}>
                  <td>OPTIONS</td>
                  <td>100</td>
                  <td>1 hour ago by BRIAN TEST POST TEST POST</td>
                </tr>
              </table>
              <br/>
              <table style = {{width:'100%',border:'1px solid #b3b3b346'}}>
                <thead className = "spacing" style={{fontSize:'8pt'}}>
                <td width = "150px"><b>POSTED BY</b></td>
                  <td width = "750px"><b>SUBJECT</b></td>
                  <td ><b>LIKES</b></td>
                </thead>

                {postContent}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  getPosts: propTypes.func.isRequired,
  post: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  post: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
