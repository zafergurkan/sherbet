import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  large: {
    width: "120px ",
    height: "120px ",
    margin: 10,
  },
};

class Scream extends Component {
    likedScream = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.screamId === this.props.scream.screamId
          )
        )
          return true;
        else return false;
      };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };
  render() {
    let defaultImg =
      "https://firebasestorage.googleapis.com/v0/b/sherbetapp-66fc8.appspot.com/o/img.png?alt=media&token=2fdc0026-5443-4036-921c-e97a739268e1";
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user:{
          authenticated
      }
    } = this.props;
    const likeButton = !authenticated ? (
        <MyButton tip = "Beğen">
            <Link to="/login">
                <FavoriteBorder color="primary"/>
            </Link>
        </MyButton>
    ) : (
        this.likedScream() ? (
            <MyButton tip = "Beğenmekten Vazgeç" onClick={this.unlikeScream}>
                <FavoriteIcon color="primary"/>
            </MyButton>
        ) : (
            <MyButton tip = "Beğen" onClick={this.likeScream}>
                <FavoriteBorder color="primary"/>
            </MyButton>
        )
    );
    return (
      <Card className={classes.card}>
        <Avatar
          alt="Remy Sharp"
          src={userImage === null ? defaultImg : userImage}
          className={classes.large}
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${userHandle}`}
            color="primary"
          >
            {" "}
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {" "}
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {" "}
            {body}
          </Typography>
          {likeButton}
          <span>{likeCount} Beğeni</span>
          <MyButton tip="Yorumlar">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Yorum</span>{" "}
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeScream,
  unlikeScream,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
