'use strict';
// Module with pose estimation
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
// Tensorflow
const tf = require('@tensorflow/tfjs-node');
const posenet = require('@tensorflow-models/posenet');
// Image and canvas
const { Image } = require('canvas');
const { createCanvas } = require('canvas');
async function estimatePose(imagePath) {
    const net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        quantBytes: 1
    });
    const img = new Image();
    img.src = imagePath;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const input = tf.browser.fromPixels(canvas);
    const raw = await net.estimateSinglePose(input, {
        flipHorizontal: false
    });
    return raw.keypoints;
}
exports.getKeypoints = async ({ bucketName, imageGCS, imagePath }) => {
    try {
        await storage.bucket(bucketName).file(imageGCS).download({ destination: imagePath });
    }
    catch (err) {
        console.log(err.message);
        return new Error({ message: "File not found" });
    }
    const pose = await estimatePose(imagePath);
    return pose;
};
//# sourceMappingURL=pose-estimation.js.map