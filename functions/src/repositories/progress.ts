import * as admin from 'firebase-admin';
import { ProgressRepository } from '../typings';

export class ProgressDataRepository implements ProgressRepository {
  collection: FirebaseFirestore.CollectionReference;
  
  constructor() {
    this.collection = admin.firestore().collection('progress')
  }

  getHistory() {
    return Promise.resolve();
  }

  getStatistic() {
    return Promise.resolve();
  }
}
