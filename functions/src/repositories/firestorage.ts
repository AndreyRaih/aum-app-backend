import { Storage } from "@google-cloud/storage";
// FS utils
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
export class AumFirestorageRepository {
  storage: Storage;
  tmpFilesPathList: any[];
  constructor() {
    this.storage = new Storage();
    this.tmpFilesPathList = [];
  }
  getFile (bucket, filepath) {
    const filename = filepath.split('/')[1];
    const tmpPath = path.join(os.tmpdir(), `${filename}.jpeg`);
    return this.storage.bucket(bucket).file(filepath).download({ destination: tmpPath }).then(() => {
      if (!this.tmpFilesPathList.includes(tmpPath)) this.tmpFilesPathList.push(tmpPath);
    }).then(() => tmpPath);
  }
  clearFilesTmp () {
    this.tmpFilesPathList.forEach(tmpPath => fs.unlinkSync(tmpPath));
  }
}