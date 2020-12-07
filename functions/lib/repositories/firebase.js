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
const constants_1 = require("../utils/constants");
class AumFirebaseRepository {
    constructor() {
        this.db = admin.firestore();
        this.asanasCollection = this.db.collection(constants_1.ASANA_COLLECTION_NAME);
        this.usersCollection = this.db.collection(constants_1.USERS_COLLECTION_NAME);
    }
    /**
     * Content methods
     */
    async getAllAsanas() {
        const { docs } = await this.asanasCollection.get();
        return docs.map(doc => (Object.assign({ block: doc.id }, doc.data())));
    }
    async getAsana({ id, block }) {
        const blockSnapshot = await this.asanasCollection.doc(block).get();
        const { value: list } = blockSnapshot.data();
        const result = list.find(asana => asana.id === id) || {};
        return result;
    }
    /**
     * User methods
     */
    async getUserModel(id) {
        const userSnapshot = await this._getUserRef(id).get();
        return userSnapshot.data();
    }
    ;
    async setUserModel(id, data) {
        const userRef = await this._getUserRef(id);
        return userRef.set(data);
    }
    async updateUserModel(id, updates) {
        var e_1, _a;
        console.log(`logged updates: ${updates}`);
        const userRef = await this._getUserRef(id);
        try {
            try {
                for (var _b = __asyncValues(Object.entries(updates)), _c; _c = await _b.next(), !_c.done;) {
                    const [key, value] = _c.value;
                    if (typeof value === 'object') {
                        const instance = await userRef.get();
                        const basicObject = instance.data()[`${key}`];
                        const merged = Object.assign(Object.assign({}, basicObject), value);
                        await userRef.update({ [`${key}`]: merged });
                    }
                    else {
                        await userRef.update({ [`${key}`]: value });
                    }
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
     * Private methods
     */
    _getUserRef(id) {
        return this.usersCollection.doc(id);
    }
}
exports.AumFirebaseRepository = AumFirebaseRepository;
//# sourceMappingURL=firebase.js.map