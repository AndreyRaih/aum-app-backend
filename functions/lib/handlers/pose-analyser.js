'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AumPoseAnalyser = void 0;
const firestorage_1 = require("../repositories/firestorage");
const firebase_1 = require("../repositories/firebase");
// Tensorflow
const tfjs_node_1 = require("@tensorflow/tfjs-node");
const posenet_1 = require("@tensorflow-models/posenet");
// Image and canvas
const canvas_1 = require("canvas");
const canvas_2 = require("canvas");
class AumPoseEstimate {
    constructor({ bucket, filename }) {
        this.storageRepository = new firestorage_1.AumFirestorageRepository();
        this.bucket = bucket;
        this.filename = filename;
        this.keypoints = null;
        this.estimationFileTmpPath = null;
    }
    async getEstimation() {
        try {
            this.estimationFileTmpPath = await this.storageRepository.getFile(this.bucket, this.filename);
        }
        catch (err) {
            console.log(err.message);
            return new Error({ message: "File not found" });
        }
        const rawKeypoints = await this._estimatePose(this.estimationFileTmpPath);
        this.keypoints = await this._optimizeKeypoints(rawKeypoints);
        this.storageRepository.clearFilesTmp();
    }
    async _estimatePose() {
        const net = await posenet_1.default.load({
            architecture: 'ResNet50',
            outputStride: 32,
            quantBytes: 1
        });
        const canvas = this._buildCanvasWithImg();
        const { keypoints } = await net.estimateSinglePose(tfjs_node_1.default.browser.fromPixels(canvas), {
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
        const boundingBox = posenet_1.default.getBoundingBox(keypoints);
        return _resizePose(boundingBox, keypoints);
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
class AumPoseAnalyser extends AumPoseEstimate {
    constructor(data) {
        super(data);
        this.firebaseRepository = new firebase_1.AumFirebaseRepository();
        this.asana = this._buildAsanaBasicObjectByFilename(data.filename);
    }
    async getAnalyse() {
        await this.getEstimation();
        if (!this.keypoints)
            return new Error('Something wrong with keypoints module. Please try again');
        const result = await this._analysePose();
        return Object.assign(Object.assign({}, this.asana), { result });
    }
    async _analysePose() {
        return this.firebaseRepository.getAsana(this.asana).then(rules => rules.map(rule => ({
            chain: rule.line.join(', '),
            result: this._checkDiffByAngle(rule, this.keypoints)
        })));
    }
    _buildAsanaBasicObjectByFilename(filename) {
        const [name, block] = filename.split('-');
        return {
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
exports.AumPoseAnalyser = AumPoseAnalyser;
//# sourceMappingURL=pose-analyser.js.map