'use strict';
// Modules for pose analyzing
const admin = require('firebase-admin');
const db = admin.firestore();
const posenet = require('@tensorflow-models/posenet');
const { getKeypoints } = require('./pose-estimation');
// FS utils
const path = require('path');
const os = require('os');
const fs = require('fs');

function _resizePose(bBox, keypoints) {
  let newKeypoints = [].concat(keypoints);
  for (let i = 0; i < newKeypoints.length; i++) {
    newKeypoints[i].position.x = newKeypoints[i].position.x -bBox.minX;
    newKeypoints[i].position.y = newKeypoints[i].position.y -bBox.minY;
  }
  return keypoints;
}

function _findAngle (a, b, c) {
  const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));    
  const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2)); 
  const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  return Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
}

async function getAsanaRules ({ name, block }) {
  const rules = await db.collection('asanas').doc(block).get().then(doc => doc.data());
  console.log(rules, block, name);
  return rules ? rules[name] : { rules: [] };
}

function _checkDiffByAngle (rule, pose) {
  const getKeypointValue = (name) => pose.find(keypoint => new RegExp(name, 'ig').test(keypoint.part)).position
  const [a, b, c] = rule.line;
  const angleRad = _findAngle(getKeypointValue(a), getKeypointValue(b), getKeypointValue(c));
  const angleDeg = Math.round(angleRad * (180/Math.PI));
  const offset = Object.assign({}, {
    max: rule.angle + (rule.offset.max !== null ? rule.offset.max  : 10),
    min: rule.angle - (rule.offset.min !== null ? rule.offset.min  : 10)
  });
  const isDone = angleDeg <= offset.max && angleDeg >= offset.min;
  return {
    angleDeg,
    isDone
  };
}

async function getAnalyzeModel (keypoints, asana) {
  const boundingBox = posenet.getBoundingBox(keypoints);
  const { rules } = await getAsanaRules(asana);
  const poseResized = _resizePose(boundingBox, keypoints);
  const result = rules.map(rule => {
    return Object.assign({}, {
      chain: rule.line.join(', '),
      result: _checkDiffByAngle(rule, poseResized)
    }) 
  });
  return result;
}

exports.analyze = async (imgFromBucket) => {
  const attrs = imgFromBucket.split('/');
  const bucketName = attrs[2];
  const filename = attrs[attrs.length - 1];
  const imageGCS = imgFromBucket.replace(`gs://${bucketName}/`, "");
  const imagePath = path.join(os.tmpdir(), filename);
  const [name, block] = filename.split('-')
  const asana = {
    name: name.replace(' ', '_'),
    block: block.split('.')[0]
  }
  const userKeypoints = await getKeypoints({bucketName, imageGCS, imagePath});
  const result = await getAnalyzeModel(userKeypoints, asana);
  fs.unlinkSync(imagePath);
  return { name, block, result };
}