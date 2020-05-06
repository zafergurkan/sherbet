import {
  SET_SCREAMS,
  LOADING_DATA,
  LOADING_UI,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  POST_SCREAM,
  SET_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";

import axios from "axios";
//tüm gönderileri çek
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getGonderiler")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/addgonderi/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING_UI,
      });
    })
    .catch((err) => console.log(err));
};

//post
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/addGonderi", newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Like a scream
export const likeScream = (screamId) => (dispatch) => {
  console.log(screamId);
  axios
    .get(`/addgonderi/${screamId}/like`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  console.log(screamId);
  axios
    .get(`/addgonderi/${screamId}/unlike`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//submit comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/addgonderi/${screamId}/yorumlar`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/addgonderi/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
