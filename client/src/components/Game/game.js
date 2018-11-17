import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import LeaderboardItem from "./LeaderboardItem";

class Game extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = "Profiles are loading";
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <LeaderboardItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4> No profiles found... </h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Arbitrage Leaderboard</h1>
              <p className="lead text-center">Here are our top players</p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  getProfile: propTypes.func.isRequired,
  profile: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfiles }
)(Game);
