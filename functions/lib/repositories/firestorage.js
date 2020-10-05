"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AumFirestorageRepository = void 0;
const storage_1 = require("@google-cloud/storage");
// FS utils
const path = require("path");
const os = require("os");
const fs = require("fs");
class AumFirestorageRepository {
    constructor() {
        this.storage = new storage_1.Storage();
        this.tmpFilesPathList = [];
    }
    getFile(bucket, filename) {
        const tmpPath = path.join(os.tmpdir(), filename);
        return this.storage.bucket(bucket).file(filename).download({ destination: tmpPath }).then(() => {
            if (!this.tmpFilesPathList.includes(tmpPath))
                this.tmpFilesPathList.push(tmpPath);
        }).then(() => tmpPath);
    }
    clearFilesTmp() {
        this.tmpFilesPathList.forEach(tmpPath => fs.unlinkSync(tmpPath));
    }
}
exports.AumFirestorageRepository = AumFirestorageRepository;
//# sourceMappingURL=firestorage.js.map