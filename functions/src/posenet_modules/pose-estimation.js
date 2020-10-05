'use strict';
// Module with pose estimation
import { AumFirestorageRepository } from '../repositories/firestorage';
// Tensorflow
import tf from '@tensorflow/tfjs-node';
import posenet from '@tensorflow-models/posenet';
// Image and canvas
import { Image } from 'canvas';
import { createCanvas } from 'canvas';

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

export const getKeypoints = async ({bucketName, imageGCS, imagePath}) => {
  const repository = new AumFirestorageRepository();
  try {
    await repository.getFile(bucketName, imageGCS, imagePath);
  } catch (err) {
    console.log(err.message);
    return new Error({ message: "File not found" });
  }
  const pose = await estimatePose(imagePath);
  return pose;
}