"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AumFirebaseRepository = void 0;
const admin = require("firebase-admin");
class AumFirebaseRepository {
    constructor() {
        /**
         * @description Private method
         */
        this._covertAsanaQueueResponseToList = (response) => response
            .map(doc => Object.values(doc.data())
            .map((note) => (Object.assign(Object.assign({}, note), { block: doc.id })))
            .reduce((full, block) => full.concat(Object.values(block)), []));
        this.db = admin.firestore();
    }
    /**
     * @description Public method
     */
    async getAllAsanas() {
        const source = await this.db.collection('asanas').get().then(snapshot => snapshot.docs);
        return this._covertAsanaQueueResponseToList(source);
    }
    /**
     * @description Public method
     */
    async getAsana({ name, block }) {
        return this.db.collection('asanas').doc(block).get().then(doc => doc.data()).then(data => data.name);
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