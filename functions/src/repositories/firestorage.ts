const { Storage } = require("@google-cloud/storage");

export class AumFirestorageRepository {
  storage: any;
  constructor() {
    this.storage = new Storage();
  }
  getFile(bucketName, imageGCS, imagePath) {
    return this.storage.bucket(bucketName).file(imageGCS).download({ destination: imagePath });
  }
}