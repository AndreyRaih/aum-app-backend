import * as admin from 'firebase-admin';
import { ContentRepository } from '../typings';

export class ContentDataRepository implements ContentRepository {
  tagCollection: FirebaseFirestore.CollectionReference;
  feedCollection: FirebaseFirestore.CollectionReference;
  mediaCollection: FirebaseFirestore.CollectionReference;
  
  constructor() {
    this.tagCollection = admin.firestore().collection('asanas');
    this.feedCollection = admin.firestore().collection('asanas');
    this.mediaCollection = admin.firestore().collection('asanas');
  }

  getTags() {
    return Promise.resolve();
  }

  getFeed() {
    return Promise.resolve();
  }

  getMediaByFeedItem() {
    return Promise.resolve();
  }
}
