import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let index1 = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      console.log("splice önce : "+state.screams);
      state.screams.splice(index1, 1);
      console.log("splice sonra : "+state.screams);
      return {
        ...state,
      };
    case POST_SCREAM:
      return{
        ...state,
        screams:[
          action.payload,
          ...state.screams
        ]
      }
    default:
      return state;
  }
}