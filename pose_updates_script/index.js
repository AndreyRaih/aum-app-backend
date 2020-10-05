const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const { asanas } = require('./asanas');

exports.rules_deploy = functions.https.onRequest(async (request, response) => {
  for (let [doc, value] of Object.entries(asanas)) {
    await admin.firestore().collection('asanas').doc(doc).set(value);
  };
});
