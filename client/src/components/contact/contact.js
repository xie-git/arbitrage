import React, { Component } from "react";
import TextFieldGroup from "../../common/Textfieldgroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";


class contactus extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center rale">CONTACT US</h1>
            <p className="lead text-left rale">
              Contact us with questions or concerns
            </p>
            <form action="mailto:dnr@gmail.com" method="post" encType="text/plain">
                <input className="form-control" placeholder="*name" type="text" name="name"/>
                <br></br>
                <input className="form-control" placeholder="*email" type="text" name="mail"/>
                <br></br>
                <input className="form-control" placeholder="*comment" type="text" name="comment"/>
                <br></br>
                <button className="btn btn-info btn-block" type="submit" value="send">send email</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default contactus;
