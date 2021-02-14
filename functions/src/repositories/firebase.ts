import * as admin from 'firebase-admin';
import { IBlock } from '../data/practices';
import { UserModelUpdates } from '../handlers';
import { UserModel } from '../handlers/endpoints/user';
import { ASANA_COLLECTION_NAME, USERS_COLLECTION_NAME } from '../utils/constants';

interface IFindObject {
  id: string,
  block: string
}

interface IQueueItem {
  block: string,
  value: any[]
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
  async getAsanas (blocks: string[]) {
    const { docs } = await this.asanasCollection.get();
    const queue = docs.map(doc => ({ block: doc.id, ...doc.data() } as IQueueItem));
    return blocks.map(block => queue.find(item => item.block === block));
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
    console.log(`logged updates: ${updates}`);
    const userRef = await this._getUserRef(id);
    try {
      for await (const [key, value] of Object.entries(updates)) {
        const instance = await userRef.get();
        const basicObject = instance.data()[`${key}`];
        if (typeof value === 'object' && !Array.isArray(value)) {
          const merged = {...basicObject, ...value };
          await userRef.update({[`${key}`]: merged});
        } else if (typeof value === 'object' && Array.isArray(value)) {
          const merged = [...basicObject, ...value ];
          await userRef.update({[`${key}`]: merged});
        } else {
          await userRef.update({[`${key}`]: value});
        }
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
