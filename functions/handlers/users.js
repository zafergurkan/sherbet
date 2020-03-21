const {db} = require('../util/admin');

const firebase = require("firebase");
const configFirebase = require('../util/config')
firebase.initializeApp(configFirebase);

const {validateSignupData, validateLoginData} = require('../util/validators');

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };
  
    const{valid,errors} = validateSignupData(newUser);

    if(!valid)  return res.status(400).json(errors);
  let token, userId;

  db.doc("/users/" + newUser.handle)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ handle: "mevcutta var olan bir kullanıcı" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId
      };
      return db.doc("/users/" + newUser.handle).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email kullanımda." });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
}

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const{valid,errors} = validateLoginData(user);

    if(!valid)  return res.status(400).json(errors);
  
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((data)=>{
    return data.user.getIdToken();
  })
  .then((token)=>{
    return res.json({token});
  })
  .catch((err) =>{
    console.log(err);
    if(err.code === 'auth/user-not-found'){
      return res.status(403).json({Genel:'Hatalı kullanıcı bilgileri. Kontrol ediniz.'});
    }else
    return res.status(500).json({error:err.code});
  })
}