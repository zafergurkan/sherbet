import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
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
        type: SET_SCREAMS,
        payload: [],
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
