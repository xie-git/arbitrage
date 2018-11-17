import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
// import Landing from "./components/landing";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./common/PrivateRoute";
import Dashboard from "./dashboard.js/dashboard";
import { clearCurrentProfile } from "./actions/profileActions";
import CreateProfile from "./components/create-profile/CreateProfile";
import Profile from "./components/profile/Profile";
import Posts from "./components/fourm/Posts";
import Post from "./components/forumPost/Post";
import News from "./components/News/News";
import contact from "./components/contact/contact";
import charts from "./components/charts/charts";
import Game from "./components/Game/game";
import AR from "./components/AR/ar";
import terms from "./components/termsandprivacy/terms"
import privacy from "./components/termsandprivacy/privacy"
//check for token

if (localStorage.jwtToken) {
  //set auth token auth header
  setAuthToken(localStorage.jwtToken);
  //decode the token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    //redirect to login
    window.location.href = "/dashboard";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* Landing page */}
            <Route exact path="/" component={Login} />
            <div className="container-fluid">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/SocialTraderNews" component={News} />
              <Route exact path="/contactus" component={contact} />
              <Route exact path="/charts" component={charts} />
              <Route exact path="/CreateProfile" component={CreateProfile} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/terms" component={terms}/>
              <Route exact path="/privacy" component={privacy}/>
              {/* <Route exact path="/ar" component={AR} /> */}
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              {/* <Switch>
                <PrivateRoute
                  exact
                  path="/profile"
                  component={Profile}
                />
              </Switch> */}
              <Switch>
                <PrivateRoute
                  exact
                  path="/SocialTraderFourm"
                  component={Posts}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/game" component={Game} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
