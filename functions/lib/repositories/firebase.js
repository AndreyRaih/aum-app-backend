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
        return this.db.collection('asanas').get().then(snapshot => snapshot.docs.map(doc => ({ block: doc.id, items: doc.data() })));
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
    async getLastResult() {
        return this.db.collection('results_test_compare').doc('result_test').get()
            .then(snapshot => snapshot.data())
            .then(source => Object.values(source));
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
}
exports.AumFirebaseRepository = AumFirebaseRepository;
//# sourceMappingURL=firebase.js.map