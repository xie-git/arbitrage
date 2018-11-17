import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getNews } from "../../actions/getNewsActions";
import isEmpty from "../../validation/is-empty";
import propTypes from "prop-types";

class Profile extends Component {
  //When the dashboard is called get the current profile
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const { user } = this.props.auth;
    this.props.getCurrentProfile();
  }

  render() {
    // const { user } = this.props.auth;
    const { profile } = this.props.profile;
    console.log("Profileee: ", profile);
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            {profile.user.Avatar ? (
              <img
                src={profile.user.Avatar}
                alt=""
                className="rounded-circle"
              />
            ) : null}
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              <span>Status: {profile.status} </span>
              {isEmpty(profile.company) ? null : (
                <span>Company: {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>Location: {profile.location}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
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
  { getCurrentProfile }
)(Profile);
