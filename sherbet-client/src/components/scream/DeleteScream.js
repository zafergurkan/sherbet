import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const styles = {
    deleteButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    }
};

class DeleteScream extends Component {
    state = {
        open: false
    }
    handleOpen = ()=>{
        this.setState({open:true});
    }
    handleClose = ()=>{
        this.setState({open:false});
    }
    deleteScream = ()=>{
        this.props.deleteScream(this.props.screamId);
        this.setState({open:false});
    }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Sil"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth ="sm">
                <DialogTitle>
                    Gönderiyi silmek istediğinize emin misiniz?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">İptal Et</Button>
                    <Button onClick={this.deleteScream} color="secondary">Sil</Button>
                </DialogActions>
            </Dialog>
      </Fragment>
    );
  }
}
DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(
  withStyles(styles)(DeleteScream)
);
