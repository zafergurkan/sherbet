const functions = require("firebase-functions");
const express = require("express");
const firebase = require("firebase");
const { db } = require("./util/admin");
const FBAuth = require("./util/fbAuth");

const app = express();

const cors = require('cors');
app.use(cors());

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
    return db.doc("gonderiler/" + snapshot.data().screamId)
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().userHandle!== snapshot.data().userHandle) {
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
      .catch(err => {
        console.error(err);
      });
  });
exports.deleteNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete(snapshot => {
  return  db.doc("/notifications/" + snapshot.id)
      .delete()
      .catch(err =>{
        console.log(err);
        });
  });

exports.createNotificationOnComment = functions.
  region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate(snapshot => {
   return db.doc("/gonderiler/" + snapshot.data().screamId)
      .get()
      .then(doc => {
        if (doc.exists && doc.data().userHandle!== snapshot.data().userHandle) {
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
      .catch(err =>{
        console.error(err);});
  });


exports.onUserImageChange = functions
.region("europe-west1")
.firestore.document("/users/{userId}")
.onUpdate((change)=>{
  console.log(change.before.data());
  console.log(change.after.data());
  if(change.before.data().imageUrl !== change.after.data().imageUrl){
    console.log('Resim değiştirildi');
    const batch = db.batch();
  return db.collection('gonderiler').where('userHandle','==',change.before.data().handle).get()
  .then(data=>{
    data.forEach(doc => {
      const gonderi = db.doc('/gonderiler/'+doc.id);
      batch.update(gonderi,{userImage:change.after.data().imageUrl});
    });
    return batch.commit();
  });
  }else return true;
});


exports.onGonderiDelete = functions
.region("europe-west1")
.firestore.document("/gonderiler/{screamId}")
.onDelete((snapshot,context)=>{
  const screamId = context.params.screamId;
  const batch = db.batch();

  return db.collection('comments').where('screamId','==',screamId).get()
  .then(data=>{
    data.forEach(doc => {
      batch.delete(db.doc('/comments/'+doc.id));      
    });
    return db.collection('likes').where('screamId','==',screamId).get()
    })
    .then(data=>{
    data.forEach(doc => {
      batch.delete(db.doc('/likes/'+doc.id));      
    });
    return db.collection('notifications').where('screamId','==',screamId).get()
    })
    .then(data=>{
    data.forEach(doc => {
      batch.delete(db.doc('/notifications/'+doc.id));      
    });
    return batch.commit();
  })
  .catch(err=>{console.error(err);} )
})

