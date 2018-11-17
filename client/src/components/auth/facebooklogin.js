import React, { Component } from "react";
import { connect } from "react-redux";
import { FBLoginUser } from "../../actions/authActions";
//@ facebook login library
import FacebookProvider, {
  Login
} from "../../../../node_modules/react-facebook-sdk";
import { FaFacebookSquare } from "react-icons/fa";

class FBlogin extends Component {
  constructor() {
    super();
  }

  //fb Login Handler
  handleResponse = data => {
    const id = data.profile.id;
    const name = data.profile.first_name;
    const email = data.profile.email;

    const fbUser = {
      id: id,
      name: name,
      email: email
    };
    this.props.FBLoginUser(fbUser);
  };

  handleError = error => {
    this.setState({ error });
  };

  render() {
    return (
      <FacebookProvider appId="863646853837241">
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={this.handleError}
        >
          <button className="btn btn-block btn-primary btn-facebook">
            <FaFacebookSquare size={22} />
            Login via Facebook
          </button>
        </Login>
      </FacebookProvider>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { FBLoginUser }
)(FBlogin);
