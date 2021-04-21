"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentDataRepository = void 0;
const admin = require("firebase-admin");
class ContentDataRepository {
    constructor() {
        this.collection = admin.firestore().collection('content');
    }
    async getTags() {
        const tagsObj = await this.collection.doc('tags').get();
        return Object
            .values(tagsObj.data())
            .reduce((list, item) => list = [...list, ...item], []);
    }
    getFeed() {
        return Promise.resolve();
    }
    getMediaByFeedItem() {
        return Promise.resolve();
    }
}
exports.ContentDataRepository = ContentDataRepository;
//# sourceMappingURL=content.js.map