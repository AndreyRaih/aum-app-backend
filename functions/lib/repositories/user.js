"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataRepository = void 0;
const admin = require("firebase-admin");
const constants_1 = require("../utils/constants");
class UserDataRepository {
    constructor() {
        this.db = admin.firestore();
        this.collection = this.db.collection(constants_1.USERS_COLLECTION_NAME);
    }
    /**
     * User methods
     */
    async getUserModel(id) {
        const userSnapshot = await this.collection.doc(id).get();
        if (!userSnapshot.exists)
            throw new Error("User doesnt exist");
        return userSnapshot.data();
    }
    ;
    async setUserModel(id, data) {
        console.log(id, data);
        return this.collection.doc(id).set(data);
    }
    async updateUserModel(id, updates) {
        var e_1, _a;
        const userRef = await this.collection.doc(id);
        const instance = await userRef.get();
        if (!instance.exists)
            throw new Error("User doesnt exist");
        try {
            try {
                for (var _b = __asyncValues(Object.entries(updates)), _c; _c = await _b.next(), !_c.done;) {
                    const [key, value] = _c.value;
                    const basicObject = instance.data()[`${key}`];
                    if (typeof value === 'object' && !Array.isArray(value)) {
                        const merged = Object.assign(Object.assign({}, basicObject), value);
                        await userRef.update({ [`${key}`]: merged });
                    }
                    else if (typeof value === 'object' && Array.isArray(value)) {
                        const merged = [...basicObject, ...value];
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
}
exports.UserDataRepository = UserDataRepository;
//# sourceMappingURL=user.js.map