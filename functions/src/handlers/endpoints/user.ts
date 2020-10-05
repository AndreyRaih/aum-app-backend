import * as admin from 'firebase-admin';
admin.initializeApp()
const db = admin.firestore();

export const lastResult = () => db.collection('results_test_compare').doc('result_test').get()
  .then(snapshot => snapshot.data())
  .then(source => Object.values(source));