import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/Textfieldgroup";
// import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
// import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      location: "",
      status: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    //update the profile state
    const profileData = {
      handle: this.state.handle,
      status: this.state.status,
      location: this.state.location
    };
    //create profile and redirect
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    //selection for status
    const options = [
      {
        label: "*What type of trader are you,",
        value: "*What type of trader are you"
      },
      { label: "Broke Noob", value: "Broke Noob" },
      { label: "Penny Stock Trader", value: "Penny Stock Trader" },
      { label: "Options Trader", value: "Options Trader" },
      { label: "Futures Trader", value: "Futures Trader" },
      { label: "Forex Trader", value: "Forex Trader" },
      { label: "Whartonite ", value: "Whartonite" },
      { label: "Super Rich Dude", value: "Super Rich Dude" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Tell us about yourself newcomer!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="*Username"
                  name="handle"
                  value={this.state.value}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.handle}
                />
                <TextFieldGroup
                  placeholder="*Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <input
                  className="btn btn-info btn-block mt-4"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.PropTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
