"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
    async getAsana({ id, block }) {
        console.log(block);
        return this.db.collection('asanas').doc(block).get().then(doc => (doc.data().value.find((asana) => asana.id === id) || {}));
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
        var e_1, _a;
        const userRef = await this._getUserRef(id);
        try {
            try {
                for (var _b = __asyncValues(Object.entries(updates)), _c; _c = await _b.next(), !_c.done;) {
                    const [key, value] = _c.value;
                    await userRef.update({ [`${key}`]: value });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            ;
            return Promise.resolve();
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * @description Private method
     */
    _getUserRef(id) {
        return this.db.collection('users').doc(id);
    }
}
exports.AumFirebaseRepository = AumFirebaseRepository;
//# sourceMappingURL=firebase.js.map