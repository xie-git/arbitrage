import React, { Component } from "react";
import { connect } from "react-redux";
import { GLoginUser } from "../../actions/authActions";
//@ google login library
import { GoogleLogin } from "../../../../node_modules/react-google-login";


class Glogin extends Component {
  constructor() {
    super();
  }

  //google login Handler
  responseGoogle = response => { 
   
    const profile = response.profileObj;
    const email = profile.email;
    const name = profile.givenName;
    const id = profile.googleId;
    const avatar = profile.imageUrl;

    const gUser = {
      id: id,
      name: name,
      email: email,
      Avatar: avatar
    }
    this.props.GLoginUser(gUser);
  }


  render() {
    return (
        <GoogleLogin clientId="792731254152-ffh8030sg3959dj5k9ulsilsbh6ln798.apps.googleusercontent.com"
        className="btn btn-block btn-danger"
        scope="profile"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        buttonText="Login With Google" />
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { GLoginUser }
)(Glogin);
