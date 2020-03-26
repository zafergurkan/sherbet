const functions = require("firebase-functions");
const express = require("express");
const firebase = require("firebase");
const { db } = require("./util/admin");
const FBAuth = require("./util/fbAuth");

const {
  getGonderiler,
  addOneGonderi,
  getGonderi,
  commentOnScream,
  likeScream,
  unLikeScream,
  deleteScream
} = require("./handlers/gonderiler");
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthenicatedUser,
  getUserDetails,
  markNotificationsRead
} = require("./handlers/users");

const app = express();
//gonderi routes
app.get("/getGonderiler", getGonderiler);
app.post("/addGonderi", FBAuth, addOneGonderi);
app.get("/addgonderi/:screamId", getGonderi);

app.delete("/addgonderi/:screamId", FBAuth, deleteScream);
app.post("/addgonderi/:screamId/yorumlar", FBAuth, commentOnScream);
app.get("/addgonderi/:screamId/like", FBAuth, likeScream);
app.get("/addgonderi/:screamId/unlike", FBAuth, unLikeScream);

//users route
app.post("/signup", signUp);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenicatedUser);
app.get("/user/:handle",getUserDetails);
app.post("/notifications",FBAuth,markNotificationsRead);
exports.service = functions.region("europe-west1").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate(snapshot => {
    db.doc("gonderiler/" + snapshot.data().screamId)
      .get()
      .then(doc => {
        if (doc.exists) {
          return db.doc("/notifications/" + snapshot.id).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.error(err);
        return;
      });
  });
exports.deleteNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete(snapshot => {
    db.doc("/notifications/" + snapshot.id)
      .delete()
      .then(() => {
        return;
      })
      .catch(err => {
        console.log(err);
        return;
      });
  });

exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate(snapshot => {
    db.doc("/gonderiler/" + snapshot.data().screamId)
      .get()
      .then(doc => {
        if (doc.exists) {
          return db.doc("/notifications/" + snapshot.id).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.error(err);
        return;
      });
  });
