import * as admin from 'firebase-admin';
import { AsanaItem, AumFirebase, AumRepository, IUserModelUpdates, UserModel } from './typings';
import { ASANA_COLLECTION_NAME, USERS_COLLECTION_NAME } from './utils/constants';

export class AumFirebaseRepository implements AumRepository {
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

  async getAsanaList (blocks: string[]): Promise<AumFirebase.AsanaBlockItem[]> {
    try {
      const { docs } = await this.asanasCollection.get();
      return docs
        .map(doc => ({ block: doc.id, ...doc.data()} as AumFirebase.AsanaBlockItem))
        .filter(({block}) => blocks.includes(block));
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getAsana({ id, block }: AumFirebase.AsanaBlockQuery): Promise<AumFirebase.AsanaBlockItem> {
    try {
      const blockSnapshot = await this.asanasCollection.doc(block).get();
      const { value: list } = blockSnapshot.data();
      return list.find(asana => asana.id === id) || null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * User methods
  */

  async getUserModel (id: string) {
    const userSnapshot = await this._getUserRef(id).get();
    return userSnapshot.data() as UserModel;
  };

  async setUserModel(id: string, data: UserModel) {
    const userRef = await this._getUserRef(id);
    return userRef.set(data);
  }

  async updateUserModel (id: string, updates: IUserModelUpdates) {
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
  private _getUserRef(id: string): FirebaseFirestore.DocumentReference {
    return this.usersCollection.doc(id);
  }
}
