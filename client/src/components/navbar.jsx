import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";
import { getCurrentProfile } from "../actions/profileActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    //ONLY PEOPLE WHO ARE LOGGED ON CAN SEE THESE LINKS
    const authLinks = (
      <ul className="navbar-nav ml-auto container-fluid">
        <li className="nav-item">
          {profile == null ? (
            <Link className="nav-link navbuttons" to="/CreateProfile">
              create profile
            </Link>
          ) : (
            <Link className="nav-link navbuttons" to="/profile">
              profile
            </Link>
          )}
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.Avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You need a gravatar account to see your image"
            />{" "}
            logout
          </a>
        </li>
      </ul>
    );
    //YOU CAN SEE THESE LINKS IF YOU ARE LOGGED IN OR NOT
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link navbuttons" to="/register">
            sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link navbuttons" to="/login">
            login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-default mb-5">
        <div className="container rale">
          <a href="/" className="navbar-left logo resize">
            <img src={require("../images/darklogo.png")} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link rale navbuttons" to="/charts">
                  {" "}
                  charts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link rale navbuttons"
                  to="/SocialTraderFourm"
                >
                  forum
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link rale navbuttons" href="/game">
                  {" "}
                  game
                </a>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link rale navbuttons" to="/ar">
                  AR
                </Link>
              </li> */}
            </ul>
            <ul style={{ textAlign: "right" }}>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  getProfile: propTypes.func.isRequired,
  profile: propTypes.object.isRequired,
  getCurrentProfile: propTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getCurrentProfile }
)(Navbar);
