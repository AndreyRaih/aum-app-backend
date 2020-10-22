'use strict';

import { AumFirestorageRepository } from '../repositories/firestorage';
import { AumFirebaseRepository } from '../repositories/firebase';
// Tensorflow
import tf from '@tensorflow/tfjs-node';
import posenet from '@tensorflow-models/posenet';
// Image and canvas
import { Image } from 'canvas';
import { createCanvas } from 'canvas';

class PoseEstimator {
  constructor ({ bucket, filename}) {
    this.storageRepository = new AumFirestorageRepository();
    this.bucket = bucket;
    this.filename = filename;
    this.keypoints = null;
    this.estimationFileTmpPath = null;
  }
  async getEstimation () {
    try {
      this.estimationFileTmpPath = await this.storageRepository.getFile(this.bucket, this.filename);
    } catch (err) {
      console.log(err.message);
      return new Error({ message: "File not found" });
    }
    const rawKeypoints = await this._estimatePose(this.estimationFileTmpPath);
    this.keypoints = await this._optimizeKeypoints(rawKeypoints);
    this.storageRepository.clearFilesTmp();
  }
  async _estimatePose () {
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
  _buildCanvasWithImg () {
    if (!this.estimationFileTmpPath) return null;
    const img = new Image();
    img.src = this.estimationFileTmpPath;
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas;
  }
  async _optimizeKeypoints (keypoints) {
    const boundingBox = posenet.getBoundingBox(keypoints);
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


export class PoseAnalyser extends PoseEstimator {
  constructor(data) {
    super(data);
    this.firebaseRepository = new AumFirebaseRepository();
    this.asana = this._buildAsanaBasicObjectByFilename(data.filename)
  }
  async getAnalyse () {
    await this.getEstimation();
    if (!this.keypoints) return new Error('Something wrong with keypoints module. Please try again');
    const result = await this._analysePose();
    return { ...this.asana, result };
  }
  
  async _analysePose () {
    return this.firebaseRepository.getAsana(this.asana).then(rules => rules.map(rule => ({
      chain: rule.line.join(', '),
      result: this._checkDiffByAngle(rule, this.keypoints)
    })));
  }

  _buildAsanaBasicObjectByFilename (filename) {
    const [name, block] = filename.split('-')
    return {
      name: name.replace(' ', '_'),
      block: block.split('.')[0]
    }
  }

  _checkDiffByAngle ({ line, angle, offset }) {
    const getKeypointValue = (name) => this.keypoints.find(keypoint => new RegExp(name, 'ig').test(keypoint.part)).position
    const [a, b, c] = line;
    const angleRad = this._findAngle(getKeypointValue(a), getKeypointValue(b), getKeypointValue(c));
    const angleDeg = Math.round(angleRad * (180/Math.PI));
    const offset = {
      max: angle + (offset.max !== null ? offset.max  : 10),
      min: angle - (offset.min !== null ? offset.min  : 10)
    };
    const isDone = angleDeg <= offset.max && angleDeg >= offset.min;
    return {
      angleDeg,
      isDone
    };
  }

  _findAngle (a, b, c) {
    const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));    
    const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2)); 
    const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
    return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
  }
}