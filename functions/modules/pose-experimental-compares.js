const similarity = require('compute-cosine-similarity');
/**
 * resize a pose to the given bounding box
 *
 * @param {Object} bBox - The posenet boundingbox data
 * @param {Object} keypoints - The posenet keypoints
 * @return {Object}
 */
function resizePose(bBox, keypoints) {
  let newKeypoints = [].concat(keypoints);
  for (let i = 0; i < newKeypoints.length; i++) {
    newKeypoints[i].position.x = newKeypoints[i].position.x -bBox.minX;
    newKeypoints[i].position.y = newKeypoints[i].position.y -bBox.minY;
  }
  return keypoints;
}

/**
 * normalize pose
 * based on https://medium.com/tensorflow/move-mirror-an-ai-experiment-with-pose-estimation-in-the-browser-using-tensorflow-js-2f7b769f9b23
 * @param {Object} keypoints - The posenet keypoints
 * @return {Object}
 */
function normalizePose(boundingBox, keypoints) {
  let newKeypoints = keypoints;
  for (let i = 0; i < newKeypoints.length; i++) {
    newKeypoints[i].position.x = l2normalize(newKeypoints[i].position.x,
      boundingBox.maxX, boundingBox.minX);
    newKeypoints[i].position.y = l2normalize(newKeypoints[i].position.y,
      boundingBox.maxY, boundingBox.minY);
  }
  return keypoints;
}

/**
 * normalize the given value
 * @param {number} val - ...
 * @param {number} max - ...
 * @param {number} min - ...
 * @return {Object}
 */
function l2normalize(val, max, min) {
  return (val - min) / (max - min);
}

function keypointsOneDimensional(keypoints) {
  let oneDimensional = []
  keypoints.forEach(keypoint => {
    oneDimensional.push(keypoint.position.x)
    oneDimensional.push(keypoint.position.y)
  });
  return oneDimensional
}


function compareVectors(poseVector1, poseVector2) {
  let cosineSimilarity = similarity(poseVector1, poseVector2);
  let distance = 2 * (1 - cosineSimilarity);
  return Math.sqrt(distance);
}

function weightedDistanceMatching(poseVector1, poseVector2) {
  let vector1PoseXY = poseVector1.slice(0, 34);
  let vector1Confidences = poseVector1.slice(34, 51);
  let vector1ConfidenceSum = poseVector1.slice(51, 52);

  let vector2PoseXY = poseVector2.slice(0, 34);

  // First summation
  let summation1 = 1 / vector1ConfidenceSum;

  // Second summation
  let summation2 = 0;
  for (let i = 0; i < vector1PoseXY.length; i++) {
    let tempConf = Math.floor(i / 2);
    let tempSum = vector1Confidences[tempConf] * Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
    summation2 = summation2 + tempSum;
  }

  return summation1 * summation2;
}

function getPoseVectors (keypoints) {
  const boundingBox = posenet.getBoundingBox(keypoints);
  const poseResized = resizePose(boundingBox, keypoints)
  const poseNormalized = normalizePose(posenet.getBoundingBox(poseResized), poseResized)
  const poseOneDimensionalArray = keypointsOneDimensional(poseNormalized)
  return { vectors: poseOneDimensionalArray, details: {boundingBox, poseResized, poseNormalized} };
}