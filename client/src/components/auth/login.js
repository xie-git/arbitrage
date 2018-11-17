import React, { Component } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { LoginUser } from "../../actions/authActions";
import TextFieldGroup from "../../common/Textfieldgroup";
import FBlogin from "./facebooklogin";
import Glogin from "./googlelogin";

class login extends Component {
  constructor() {
    super();
    this.state = {

      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  // can I push
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.LoginUser(userData);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container rale">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-left rale">LOGIN</h1>
              <p className="lead text-left rale">
                Sign in to your Arbitrage account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="email address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <br />
              <div className = "row">
                <div className = "col-md-6">
                  <FBlogin />
                </div>
                <div className = "col-md-6">
                  <Glogin />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

login.propTypes = {
  LoginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { LoginUser }
)(login);
