"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AumFirebaseRepository = void 0;
const admin = require("firebase-admin");
class AumFirebaseRepository {
    constructor() {
        this.db = admin.firestore();
    }
    /**
     * @description Public method
     */
    async getAllAsanas() {
        return this.db.collection('asanas').get().then(snapshot => snapshot.docs.map(doc => (Object.assign({ block: doc.id }, doc.data()))));
    }
    /**
     * @description Public method
     */
    async getAsana({ name, block }) {
        return this.db.collection('asanas').doc(block).get().then(doc => doc.data()[name]);
    }
    /**
     * @description Public method
     */
    async setUserResult(updates) {
        const resultRef = this.db.collection('results_test_compare').doc('result_test');
        const doc = await resultRef.get();
        if (!doc.exists) {
            await resultRef.set({ [`${updates.name}_${updates.block}`]: updates });
        }
        else {
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
    async getUserModel(id) {
        return this.db.collection('users').doc(id).get().then(snapshot => snapshot.data());
    }
    ;
    /**
     * @description Public method
     */
    async updateUserModel(id, updates) {
        const userRef = await this._getUserRef(id);
        const [key, value] = Object.entries(updates);
        await userRef.update({ [`${key}`]: value });
    }
    /**
     * @description Private method
     */
    _getUserRef(id) { return this.db.collection('users').doc(id); }
}
exports.AumFirebaseRepository = AumFirebaseRepository;
//# sourceMappingURL=firebase.js.map