const adminConfig = {
  type: "service_account",
  project_id: "sherbetapp-66fc8",
  private_key_id: "141e4012505292dc6e48d4d9fa94461f48279eaf",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnDh/f1dy+zsJb\nnDHz7UdTK7dlR++ntOVuGUd1E5H1x6mV/2P/5n5guL2Iq58mQYUufN1FRKLyZFM+\nVCEsCQJRDTcJC9+8VLxExDAEbzE3aL4/JQQUzIwhOARSzLdCKyaAXQ/pELbws2ad\ndy2Mo2Q74vF8pShEoFF2vDJvbrtUnQLs3oIYGowEY7gfXGJR6Y6UTjeHTOJUqh/+\nnm+fBja6U//iNkGeMMNkMB2WRQy16dsFLP+dH/tbmF8dWcnGtj5wxATP7A06lHmR\nnY2wBghBN+xFr+hBjby8p1+KYT/GtPJYRsZ5BUQbGoezO4cCmiFQlGdrwQ+e9Xyn\nhbiOAMTlAgMBAAECggEAEDcHgoE+bjng9SXt1lSpd+n2IOtQ2IkvPNbQ0A0gfYgO\nDqxtryzXBvnfkcjAx6ST8g12J89P9rGkv9fIKX9NXYMoHKVtp9jctlsJoyCM2Sk+\nUCA+a2toTaAjkUrkHdTU5aBC11dDPo1XUED9Z5mDdOmkEXpxdGnQRnNhfN31anKz\n63oHu0p8q15l3n9byJ4kF4CBkil4T/0v328+o3brg0s+giwJu5/B2vQd1n2U4ft5\nkFOtgw3etrLY9mYg+e1JjXobqrKjxGfalgL5RTFjlhO0pJNqI2YF2T1K6HPtwmH2\n2rf3E+1jHsT/Md16lcEpfElzEkmJc986zndHiucGwQKBgQDSNw5iwG/ZPmKzMjmE\nOHv7j4gXExSLwc3EqEDRZjVU75Qez2GKImA3V31wxvELQ5g2tpqdNhq7TcUl7ZI9\nZQ6cyxUFxilgK7kxKiCTOK+KKE6NsVbIxDf/KrPc3FhXBrelwO2ZpbQrO+kc/ENC\nucm2zR3K+y0mLlzb53YYlhs0JQKBgQDLcJsfinIMAm/r1BsE0I9R+qilNggq5A1o\nyK7jHugfpeBAy+ZMBsvo6daHzTA78Cqk0/hHG55i/ihkglNcIIerMcZ+JT6eKoJY\nPEjCzW7J23zvIiocG0jpt4h5/MSeAUQHJ0l8/sLfx6flSEhdGvoJ2a2MpQfx3+H5\nkffw7mgRwQKBgQCrwmhyr6Gz85FZsXPlYPGMvd4IXIKxHo0uXft4HPb+izKPagrc\nfvH2xfmsqCBTf8tjCRiT051L5WNsdgzDNUsXOafXq+4qsg8C6NTs9agYTo7An2G1\ncP3/87g6gZ98m/R57oU0wXvQx4bVNBkQ8BSs1DO/ojNluwQMeba4qA1aMQKBgAbn\nW1xGpngh3QpzuDcBnNt7Vh3FJ6HM+2eC5+xtMBNi3alVQgtyb5kH1m/lVq2yCMBv\nMQ24sjdJyLUgdxO5RuFYXxQIz4cuih3UbeOudQQEnsi+sA8kHeVQhSEeos153YUg\noC3Nt29Ap0HwogQG1lVfPbR4JTzgDBscCP30GTQBAoGANPd9snV6OLkN/CiNcIYQ\nDOoGwEjhZzFV31ROAbDRqk9yXG+GWCbrNr/B3beQC6pmOW7Qk6aLgS5XlrlQUa+h\nCJyV4UXobQPt3ZGgwAQlH3UQlZ6UmBrdwCqFZVSwTqhU5HsjPP1rw9GYeOrRVvwv\n28em1kHmRxi9JYk8zIU20WE=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-g7cit@sherbetapp-66fc8.iam.gserviceaccount.com",
  client_id: "100051585493053501579",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g7cit%40sherbetapp-66fc8.iam.gserviceaccount.com"
};

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(adminConfig),
  databaseURL: "https://sherbetapp-66fc8.firebaseio.com",
  storageBucket: "sherbetapp-66fc8.appspot.com"
});

const db = admin.firestore();

module.exports={admin,db};