import * as admin from 'firebase-admin';
import { UserRepository, IUserModelUpdates, IUserModel } from '../typings';

export class UserDataRepository implements UserRepository {
  collection: FirebaseFirestore.CollectionReference;
  
  constructor() {
    this.collection = admin.firestore().collection('users');
  }

  async getUserModel (id: string) {
    const userSnapshot = await this.collection.doc(id).get();
    if (!userSnapshot.exists) throw new Error("User doesnt exist");
    return userSnapshot.data() as IUserModel;
  };

  async setUserModel(id: string, data: IUserModel) {
    return this.collection.doc(id).set(data);
  }

  async updateUserModel (id: string, updates: IUserModelUpdates) {
    const userRef = await this.collection.doc(id);
    const instance = await userRef.get();

    if (!instance.exists) throw new Error("User doesnt exist");

    for await (const [key, value] of Object.entries(updates)) {
      if (typeof value === 'object') {
        const basicObject = instance.data()[`${key}`];
        const merged = Array.isArray(value) ? [...basicObject, ...value ] : {...basicObject, ...value };
        await userRef.update({[`${key}`]: merged});
      } else {
        await userRef.update({[`${key}`]: value});
      }
    };
  }
};
