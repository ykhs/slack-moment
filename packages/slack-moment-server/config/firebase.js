const admin = require('firebase-admin');

const databaseURL = process.env.FIREBASE_DATABASE_URL;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n');

module.exports = function init(param) {
  const cert = {
    client_email: clientEmail,
    private_key: privateKey
  };

  admin.initializeApp({
    credential: admin.credential.cert(cert),
    databaseURL: databaseURL
  });
};
