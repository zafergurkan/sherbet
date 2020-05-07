import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//MUI stuff

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import PostScream from "../scream/PostScream";

import HomeIcon from "@material-ui/icons/Home";
import Notifications from "./Notifications";

import MyButton from "../../util/MyButton";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
             <PostScream/>
              <Link to="/">
                <MyButton tip="Anasayfa">
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>
             
                <Notifications/>
          
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Giriş Yap
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Kayıt Ol
              </Button>
              <Button color="inherit" component={Link} to="/">
                Anasayfa
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
