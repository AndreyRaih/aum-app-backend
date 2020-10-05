import * as admin from 'firebase-admin';
admin.initializeApp()

export class AumFirebaseRepository {
  db: FirebaseFirestore.Firestore;
  constructor() {
    this.db = admin.firestore();
  }
  async getAsanas () {
    const source = await this.db.collection('asanas').get().then(snapshot => snapshot.docs); 
    const blockBindedList = source.map(doc => Object.values(doc.data()).map((note: Object) => ({...note, block: doc.id})));
    const result = blockBindedList.reduce((full, block) => full.concat(Object.values(block)), []);
    return result;
  }
}
