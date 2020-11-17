import * as admin from 'firebase-admin';
import { UserModelUpdates } from '../handlers';

export class AumFirebaseRepository {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }
  /**
   * @description Public method 
   */
  async getAllAsanas () {
    return this.db.collection('asanas').get().then(snapshot => snapshot.docs.map(doc => ({ block: doc.id, ...doc.data() }))); 
  }
  /**
   * @description Public method 
   */
  async getAsana({ id, block }) {
    return this.db.collection('asanas').doc(block).get().then(doc => (doc.data().value.find((asana) => asana.id === id) || {}));
}
  /**
   * @description Public method 
   */
  async setUserResult (updates) {
    const resultRef = this.db.collection('results_test_compare').doc('result_test');
    const doc = await resultRef.get();
    if (!doc.exists) {
      await resultRef.set({ [`${updates.name}_${updates.block}`]: updates });
    } else {
      await resultRef.update({ [`${updates.name}_${updates.block}`]: updates });
    }
  }
  /**
   * @description Public method 
   */
  async setUserModel(id, data) {
    const userRef = await this._getUserRef(id);
    await userRef.set(data);
  }
  /**
   * @description Public method 
   */
  async getUserModel (id) {
    return this.db.collection('users').doc(id).get().then(snapshot => snapshot.data())
  };

  /**
   * @description Public method 
   */
  async updateUserModel (id: string, updates: UserModelUpdates) {
    const userRef = await this._getUserRef(id);
    try {
      for await (const [key, value] of Object.entries(updates)) {
        await userRef.update({[`${key}`]: value});
      };
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
  /**
   * @description Private method
   */
  _getUserRef (id) {
    return this.db.collection('users').doc(id);
  }
}
