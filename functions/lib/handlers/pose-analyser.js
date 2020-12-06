'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoseAnalyser = void 0;
const firestorage_1 = require("../repositories/firestorage");
const firebase_1 = require("../repositories/firebase");
// Tensorflow
const tf = require("@tensorflow/tfjs-node");
const posenet = require("@tensorflow-models/posenet");
// Image and canvas
const canvas_1 = require("canvas");
const canvas_2 = require("canvas");
class PoseEstimator {
    constructor({ bucket, name }) {
        this.storageRepository = new firestorage_1.AumFirestorageRepository();
        this.bucket = bucket;
        this.filepath = name;
        this.keypoints = null;
        this.estimationFileTmpPath = null;
    }
    async getEstimation() {
        try {
            this.estimationFileTmpPath = await this.storageRepository.getFile(this.bucket, this.filepath);
            console.log('get file');
        }
        catch (err) {
            console.log(err.message);
            return new Error({ message: "File not found" });
        }
        const rawKeypoints = await this._estimatePose();
        this.keypoints = await this._optimizeKeypoints(rawKeypoints);
        this.storageRepository.clearFilesTmp();
    }
    async _estimatePose() {
        const net = await posenet.load({
            architecture: 'ResNet50',
            outputStride: 32,
            quantBytes: 1
        });
        const canvas = this._buildCanvasWithImg();
        const { keypoints } = await net.estimateSinglePose(tf.browser.fromPixels(canvas), {
            flipHorizontal: false
        });
        return keypoints;
    }
    _buildCanvasWithImg() {
        if (!this.estimationFileTmpPath)
            return null;
        const img = new canvas_1.Image();
        img.src = this.estimationFileTmpPath;
        const canvas = canvas_2.createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return canvas;
    }
    async _optimizeKeypoints(keypoints) {
        const boundingBox = posenet.getBoundingBox(keypoints);
        return this._resizePose(boundingBox, keypoints);
    }
    _resizePose(boundingBox, keypoints) {
        let newKeypoints = [].concat(keypoints);
        for (let i = 0; i < newKeypoints.length; i++) {
            newKeypoints[i].position.x = newKeypoints[i].position.x - boundingBox.minX;
            newKeypoints[i].position.y = newKeypoints[i].position.y - boundingBox.minY;
        }
        return keypoints;
    }
}
class PoseAnalyser extends PoseEstimator {
    constructor(data) {
        super(data);
        this.firebaseRepository = new firebase_1.AumFirebaseRepository();
        this.basic = this._buildBasicObjectByFilename(data.name);
    }
    async getAnalyse() {
        await this.getEstimation();
        console.log('get file');
        if (!this.keypoints)
            return new Error('Something wrong with keypoints module. Please try again');
        const result = await this._analysePose();
        return Object.assign(Object.assign({}, this.basic), { result });
    }
    async _analysePose() {
        const findObj = {
            id: `${this.basic.name} ${this.basic.block}`.replace(new RegExp(' ', 'ig'), '_').toLowerCase(),
            block: this.basic.block
        };
        return this.firebaseRepository.getAsana(findObj).then((result) => result && result.rules ? result.rules.map(rule => (Object.assign({ chain: rule.line.join(', ') }, this._checkDiffByAngle(rule, this.keypoints)))) : []);
    }
    _buildBasicObjectByFilename(filename) {
        const [folder, file] = filename.split('/');
        const [name, block] = file.split('-');
        return {
            id: folder,
            name: name.replace(' ', '_'),
            block: block.split('.')[0]
        };
    }
    _checkDiffByAngle({ line, angle, offset }) {
        const getKeypointValue = (name) => this.keypoints.find(keypoint => new RegExp(name, 'ig').test(keypoint.part)).position;
        const [a, b, c] = line;
        const angleRad = this._findAngle(getKeypointValue(a), getKeypointValue(b), getKeypointValue(c));
        const angleDeg = Math.round(angleRad * (180 / Math.PI));
        const offset = {
            max: angle + (offset.max !== null ? offset.max : 10),
            min: angle - (offset.min !== null ? offset.min : 10)
        };
        const isDone = angleDeg <= offset.max && angleDeg >= offset.min;
        return {
            angleDeg,
            isDone
        };
    }
    _findAngle(a, b, c) {
        const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
        const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
        const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
        return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
    }
}
exports.PoseAnalyser = PoseAnalyser;
//# sourceMappingURL=pose-analyser.js.map