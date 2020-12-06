import * as admin from 'firebase-admin';
import { UserModelUpdates } from '../handlers';
import { UserModel } from '../handlers/endpoints/user';
import { ASANA_COLLECTION_NAME, USERS_COLLECTION_NAME } from '../utils/constants';

interface IFindObject {
  id: string,
  block: string
}

export class AumFirebaseRepository {
  db: FirebaseFirestore.Firestore;
  asanasCollection: FirebaseFirestore.CollectionReference;
  usersCollection: FirebaseFirestore.CollectionReference;
  constructor() {
    this.db = admin.firestore();
    this.asanasCollection = this.db.collection(ASANA_COLLECTION_NAME);
    this.usersCollection = this.db.collection(USERS_COLLECTION_NAME);
  }
  /**
   * Content methods
   */
  async getAllAsanas () {
    const { docs } = await this.asanasCollection.get();
    return docs.map(doc => ({ block: doc.id, ...doc.data() })); 
  }
  async getAsana({ id, block }: IFindObject) {
    const blockSnapshot = await this.asanasCollection.doc(block).get();
    const { value: list } = blockSnapshot.data();
    const result = list.find(asana => asana.id === id) || {};
    return result;
  }
  /**
   * User methods
   */
  async getUserModel (id: string): Promise<UserModel> {
    const userSnapshot = await this._getUserRef(id).get();
    return userSnapshot.data() as UserModel;
  };
  async setUserModel(id: string, data: UserModel) {
    const userRef = await this._getUserRef(id);
    return userRef.set(data);
  }
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
   * Private methods
   */
  _getUserRef(id: string): FirebaseFirestore.DocumentReference {
    return this.usersCollection.doc(id);
  }
}
