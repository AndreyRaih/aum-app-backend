'use strict';

// Init firebase app
import * as admin from 'firebase-admin';
admin.initializeApp()
const db = admin.firestore();

export const build_queue = async () => {
  const source = await db.collection('asanas').get().then(snapshot => snapshot.docs); 
  const blockBindedList = source.map(doc => Object.values(doc.data()).map(note => ({...note, block: doc.id})));
  const queueBase = blockBindedList.reduce((full, block) => full.concat(Object.values(block)), []);
  const queue = queueBase.filter(asana => asana.isCheck);
  return queue;
};

export const get_result = async () => await db.collection('results_test_compare').doc('result_test').get().then(snapshot => snapshot.data()).then(source => Object.values(source));