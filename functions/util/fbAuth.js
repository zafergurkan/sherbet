
const {admin, db}  = require('../util/admin');
module.exports = (req,res,next)=>{
  let idToken;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    idToken = req.headers.authorization.split('Bearer ')[1];
  }else{
    console.log('No token found');
    return res.status(403).json({error:'İzinsiz giriş'})
  }

  admin.auth().verifyIdToken(idToken)
  .then((result) => {
    req.user = result;
    console.log(result);
    return db.collection('users')
    .where('userId', '==',req.user.uid)
    .limit(1)
    .get();
  })
  .then((data)=>{
    console.log({data : data});
    
    req.user.handle=data.docs[0].data().handle;
    return next();
  })
  .catch((err) => {
    console.error('Doğrulamayan token');
    return res.status(403).json(err);    
  });
}