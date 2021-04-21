import * as admin from 'firebase-admin';
import { ProgressRepository } from '../typings';

export class ProgressDataRepository implements ProgressRepository {
  historyCollection: FirebaseFirestore.CollectionReference;
  statisticCollection: FirebaseFirestore.CollectionReference;
  
  constructor() {
    this.historyCollection = admin.firestore().collection('')
    this.statisticCollection = admin.firestore().collection('')
  }

  getHistory() {
    return Promise.resolve();
  }

  getStatistic() {
    return Promise.resolve();
  }
}
