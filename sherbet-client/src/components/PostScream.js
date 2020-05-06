//React
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//Util
import MyButton from "../util/MyButton";
//MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//Redux Stuff
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative",
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps){
      if(nextProps.UI.errors){
          this.setState({
            errors:nextProps.UI.errors
          });
      }
      if(!nextProps.UI.errors && !nextProps.UI.loading){
          this.setState({
              body : ''
          });
          this.handleClose();
      }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false , errors:{}});
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
      event.preventDefault();
      this.props.postScream({
          body:this.state.body
      });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Gönderi Ekle">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Kapat"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Yeni bir gönderi ekle</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Gönderi Ekle"
                multiline
                rows="3"
                placeholder="Bir gönderi eklemek için yazmaya başlayın"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textFieşd}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Ekle
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postScream })(
  withStyles(styles)(PostScream)
);
