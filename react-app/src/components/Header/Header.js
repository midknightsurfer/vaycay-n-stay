import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
// import ImageUploadModal from "../ImageUploadModal"; --> replacing with link to create a spot
import * as sessionActions from "../../store/session";
// import Search from "../Search/Search";

import "./Header.css";

function Header({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    history.push("/");
  };

  let defaultLinks;
  let loggedInLinks;
  if (sessionUser) {
    defaultLinks = (
      <>
        <h2 className="greeting-message-nav">
          Hello, {sessionUser.first_name}!
        </h2>
        <div>
          {/* <ImageUploadModal /> --> replace with link to create a spot!*/}
          <button className="logout-button" onMouseDown={logout}>
            <i className="fas fa-power-off"></i>
          </button>
        </div>
      </>
    );

    loggedInLinks = (
      <ul>
        <li className="nav-button">
          <NavLink activeClassName="active-link" exact to="/">
            Discover
          </NavLink>
        </li>
        <li className="favorites-nav nav-button">
          <NavLink activeClassName="active-link" to={`/your-spots`}>
            My Spots{" "}
          </NavLink>
        </li>
        <li className="favorites-nav nav-button">
          <NavLink
            activeClassName="active-link"
            to={`/profiles/${sessionUser.id}`}
          >
            Trips{" "}
          </NavLink>
        </li>
        <li className="nav-button my-page-link">
          <NavLink activeClassName="active-link" to={`/spot/new`}>
            Post A Spot
          </NavLink>
        </li>

        {/* <Search /> */}
      </ul>
    );
  } else {
    defaultLinks = (
      <>
        <li id="login">
          <LoginFormModal />
        </li>
        <li id="signup">
          <button id="signup">
            <SignupFormModal />
          </button>
        </li>
      </>
    );

    loggedInLinks = <></>;
  }

  return (
    <header>
      <nav className="nav-bar">
        <div className="navbar-element" id="left-container">
          <NavLink exact to="/">
            <img
              className="home-button"
              src="/logo-images/logo-large.png"
              alt="logo"
            />
          </NavLink>
        </div>

        <div className="navbar-element" id="center-container">
          <ul className="links">{isLoaded && loggedInLinks}</ul>
        </div>

        <div className="navbar-element" id="right-container">
          <ul className="links">{isLoaded && defaultLinks}</ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;