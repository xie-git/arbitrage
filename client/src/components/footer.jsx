import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <footer className="mt-5 p-4 footer">
      Copyright &copy; {new Date().getFullYear()} Infosys DX/Indianapolis<br/>
      <Link className="open" style = {{color:'white'}} to="/contactus">
        contact us
      </Link> &nbsp;|&nbsp;
      <Link className="open" style = {{color:'white'}} to="/terms">
        terms
      </Link> &nbsp;|&nbsp;
      <Link className="open" style = {{color:'white'}} to="/privacy">
        privacy
      </Link>
    </footer>
  );
};
