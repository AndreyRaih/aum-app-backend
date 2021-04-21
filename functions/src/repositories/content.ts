import * as admin from 'firebase-admin';
import { ContentRepository, IUserLevels } from '../typings';

export class ContentDataRepository implements ContentRepository {
  collection: FirebaseFirestore.CollectionReference;
  
  constructor() {
    this.collection = admin.firestore().collection('content');
  }

  async getTags() {
    const tagsObj = await this.collection.doc('tags').get();
    return Object
      .values(tagsObj.data())
      .reduce((list, item) => list = [...list, ...item], []);
  }

  getFeed() {
    return Promise.resolve();
  }

  getMediaByFeedItem() {
    return Promise.resolve();
  }
}
