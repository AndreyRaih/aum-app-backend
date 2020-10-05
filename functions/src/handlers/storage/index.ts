'use strict';

import { analyze } from '../../posenet_modules/pose-analyzer';

import * as admin from 'firebase-admin';
admin.initializeApp()
const db = admin.firestore();

export const analyseImg = async (file) => {
  try {
    const updates = await analyze(`gs://${file.bucket}/${file.name}`);
    const resultRef = db.collection('results_test_compare').doc('result_test');
    const doc = await resultRef.get();
    if (!doc.exists) {
      await resultRef.set({ [`${updates.name}_${updates.block}`]: updates });
    } else {
      await resultRef.update({ [`${updates.name}_${updates.block}`]: updates });
    }
  } catch (err) {
    console.log(err);
  }
};