const {db} = require('../util/admin');

exports.getGonderiler = (req, res) => {
  db.collection("gonderiler")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let gonderiler = [];
      data.forEach(doc => {
        gonderiler.push({
          gonderiId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(gonderiler);
    })
    .catch(err => console.console.error(err));
}

exports.addOneGonderi = (req, res) => {

if(req.body.body.trim()===''){
  return res.status(400).json({body:'Boş bırakılamaz.'})
}

  const yeniGonderi = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };
  var docID = "";
  db.collection("gonderiler")
    .add(yeniGonderi)
    .then(doc => {
      res.json({ message: "document başarılı" });
    })
    .catch(err => {
      res.status(500).json("Hata aldı");
      console.error(err);
    });
}