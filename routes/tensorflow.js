'use strict';
const express = require('express');
const router = express.Router();
//const fs = require('fs');
//const tf = require('@tensorflow/tfjs');
//const async = require('async');

//require('@tensorflow/tfjs-node');
//const Conv2dNetwork = require('../lib/Conv2dNetwork.js');
//const Conv2dLayer = require('../lib/Conv2dLayer.js');
//const DenseLayer = require('../lib/DenseLayer.js');
//const FlattenLayer = require('../lib/FlattenLayer.js');
//const MaxPooling2dLayer = require('../lib/MaxPooling2dLayer.js');
//const Conv2dConfig = require('../lib/Conv2dConfig.js');
//let network;
////setup();

//console.log(router);
//function setup() {
//    //const trainDataFileBuffer = fs.readFileSync('./public/train/train-images.idx3-ubyte').slice(16);
//    //const testDataFileBuffer = fs.readFileSync('./public/train/t10k-images.idx3-ubyte').slice(16);
//    //const trainLabelFileBuffer = fs.readFileSync('./public/train/train-labels.idx1-ubyte').slice(8);
//    //const testLabelFileBuffer = fs.readFileSync('./public/train/t10k-labels.idx1-ubyte').slice(8);

//    let buffers = {
//        trainDataFileBuffer: "./mnist/train-images.idx3-ubyte",
//        testDataFileBuffer: "./mnist/t10k-images.idx3-ubyte",
//        trainLabelFileBuffer: "./mnist/train-labels.idx1-ubyte",
//        testLabelFileBuffer: "./mnist/t10k-labels.idx1-ubyte"
//    };

//    async.forEachOf(buffers, (value, key, callback) => {
//        fs.readFile(value, (err, data) => {
//            if (err) return callback(err);
//            try {
//                configs[key] = data;
//            } catch (e) {
//                return callback(e);
//            }
//            callback();
//        });
//    }, err => {
//        if (err) console.error(err.message);

//        //trainDataArray = loadDataIntoArrayDetermineRowsAndColumns(configs.trainDataFileBuffer.slice(16), 28, 28);
//        //trainLabelArray = loadLabelDataIntoArray(configs.trainLabelFileBuffer.slice(8), 1);

//        //testDataArray = loadDataIntoArrayDetermineRowsAndColumns(configs.testDataFileBuffer.slice(16), 28, 28);
//        //testLabelArray = loadLabelDataIntoArray(configs.testLabelFileBuffer.slice(8), 1);
//        //loadTensors(configs);
//        let layers = [];
//        layers.push(new Conv2dLayer([28, 28, 1], 5, 8, 1, false, 'relu', 'VarianceScaling'));
//        layers.push(new MaxPooling2dLayer([2, 2], [2, 2]));
//        layers.push(new Conv2dLayer(null, 5, 16, 1, true, 'relu', 'VarianceScaling'));
//        layers.push(new MaxPooling2dLayer([2, 2], [2, 2]));
//        layers.push(new FlattenLayer());
//        layers.push(new DenseLayer(10, 'softmax', 'VarianceScaling'));

//        let config = new Conv2dConfig(0.15, layers);
//        network = new Conv2dNetwork(tf, config);
//        //const flattenLayer = new FlattenLayer();
//        //const flattenLayer = new FlattenLayer();
//        //const flattenLayer = new FlattenLayer();
//        // configs is now a map of JSON data
//        //doSomethingWith(configs);
//    });

//    //let config = new Conv2dConfig(x, x, x, x, x, x);
//}

//async function loadTrainAndTestDataIntoTensor(configs) {
//    trainDataArray = loadDataIntoArrayDetermineRowsAndColumns(configs.trainDataFileBuffer.slice(16), 28, 28);
//    trainLabelArray = loadLabelDataIntoArray(configs.trainLabelFileBuffer.slice(8), 1);

//    testDataArray = loadDataIntoArrayDetermineRowsAndColumns(configs.testDataFileBuffer.slice(16), 28, 28);
//    testLabelArray = loadLabelDataIntoArray(configs.testLabelFileBuffer.slice(8), 1);
//    tTrainfXs = tf.tensor3d(trainDataArray, [60000, 28, 28], 'float32');
//    tTrainfYs = tf.tensor2d(trainLabelArray, [60000, 10], 'float32');
//    tTestfXs = tf.tensor3d(testDataArray, [10000, 28, 28], 'float32');
//    tTestfYs = tf.tensor2d(testLabelArray, [10000, 10], 'float32');
//}

//const learningRate = 0.15;
//const modelSequential = tf.sequential();
//let trainDataArray = [];
//let trainLabelArray = [];
//let testDataArray = [];
//let testLabelArray = [];
//let tTrainfXs = [];
//let tTrainfYs = [];
//let tTestfXs = [];
//let tTestfYs = [];

///* GET tensorflow listing. */
//router.get('/', (req, res) => {
//    res.render('tensorflow', {
//    });
//    //res.send('/?values=' + JSON.stringify(pixelValues));
//});

//router.post("/", (req, res, next) => {
//    if (Array.isArray(req.body.picturePixels)) {
//        console.log('Predicition ');
//        console.log('It is number ' + indexOfMax(predict(req.body.picturePixels, true)));
//        //next();
//        console.log(next);

//        res.writeHead(200, { 'Content-Type': 'text/html' });
//        res.end('post received');
//    }
//    else {
//        console.log('Data is not an array');
//        next('Not an array');
//    }
//});

//module.exports = router;

////setupConvolutionalData();
////setupTrainingData();
////setupTensor();
////setupConvolutionalModel();
//////loadModel('Model_2/model.json');
////setTimeout(train, 10);

//function setupTrainingData() {
//    //const trainDataFileBuffer = fs.readFileSync('./public/train/train-images.idx3-ubyte').slice(16);
//    //const testDataFileBuffer = fs.readFileSync('./public/train/t10k-images.idx3-ubyte').slice(16);
//    //const trainLabelFileBuffer = fs.readFileSync('./public/train/train-labels.idx1-ubyte').slice(8);
//    //const testLabelFileBuffer = fs.readFileSync('./public/train/t10k-labels.idx1-ubyte').slice(8);

//    //const trainDataFileBuffer = fs.readFileSync('./public/train/c-train-images-idx3-ubyte');
//    //const testDataFileBuffer = fs.readFileSync('./public/train/c-t10k-images-idx3-ubyte');
//    //const trainLabelFileBuffer = fs.readFileSync('./public/train/c-train-labels-idx1-ubyte');
//    //const testLabelFileBuffer = fs.readFileSync('./public/train/c-t10k-labels-idx1-ubyte');

//    trainDataArray = loadDataIntoArray(trainDataFileBuffer, 784);
//    trainLabelArray = loadLabelDataIntoArray(trainLabelFileBuffer, 1);

//    testDataArray = loadDataIntoArray(testDataFileBuffer, 784);
//    testLabelArray = loadLabelDataIntoArray(testLabelFileBuffer, 1);
//}

//function setupConvolutionalData() {
//    //const trainDataFileBuffer = fs.readFileSync('./public/train/train-images.idx3-ubyte').slice(16);
//    //const testDataFileBuffer = fs.readFileSync('./public/train/t10k-images.idx3-ubyte').slice(16);
//    //const trainLabelFileBuffer = fs.readFileSync('./public/train/train-labels.idx1-ubyte').slice(8);
//    //const testLabelFileBuffer = fs.readFileSync('./public/train/t10k-labels.idx1-ubyte').slice(8);

//    //const trainDataFileBuffer = fs.readFileSync('./public/train/c-train-images-idx3-ubyte');
//    //const testDataFileBuffer = fs.readFileSync('./public/train/c-t10k-images-idx3-ubyte');
//    //const trainLabelFileBuffer = fs.readFileSync('./public/train/c-train-labels-idx1-ubyte');
//    //const testLabelFileBuffer = fs.readFileSync('./public/train/c-t10k-labels-idx1-ubyte');

//    trainDataArray = loadDataIntoArrayDetermineRowsAndColumns(trainDataFileBuffer, 28, 28);
//    trainLabelArray = loadLabelDataIntoArray(trainLabelFileBuffer, 1);

//    testDataArray = loadDataIntoArrayDetermineRowsAndColumns(testDataFileBuffer, 28, 28);
//    testLabelArray = loadLabelDataIntoArray(testLabelFileBuffer, 1);

//    //console.log([testDataArray.length, testDataArray[0].length, testDataArray[0][0].length]);
//}

//function loadDataIntoArrayDetermineRowsAndColumns(arrayBuffer, rows, columns) {
//    let train_index = 0;
//    let dataArray = [];
//    while (train_index < arrayBuffer.length) {
//        let array = [];

//        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
//            array.push([]);
//            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
//                array[rowIndex][columnIndex] = arrayBuffer[(rowIndex * rows) + train_index + columnIndex] / 255;
//            }
//        }
//        dataArray.push(array);
//        train_index += rows * columns;
//    }

//    return dataArray;
//}

//function loadDataIntoArray(arrayBuffer, arraySegment) {
//    let train_index = 0;
//    let dataArray = [];
//    while (train_index < arrayBuffer.length) {
//        let array = [];
//        for (let index = 0; index < arraySegment; index++) {
//            array[index] = arrayBuffer[index + train_index] / 255;
//        }

//        dataArray.push(array);
//        train_index += arraySegment;
//    }

//    return dataArray;
//}

//function loadLabelDataIntoArray(arrayBuffer, arraySegment) {
//    let train_index = 0;
//    let dataArray = [];
//    while (train_index < arrayBuffer.length) {
//        let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//        //for (let index = 0; index < arraySegment; index++) {
//        let arrayIndex = arrayBuffer[train_index];
//        array[arrayIndex] = 1;

//        //if (arrayIndex === 0) {
//        //console.log('Nbr ' + arrayIndex);
//        //console.log(array);
//        //}
//        //}

//        dataArray.push(array);
//        train_index += arraySegment;
//    }
//    return dataArray;
//}

//function setupConvolutionalModel() {
//    // Antal input & objekt i det gömda lagret
//    //
//    let conv1 = tf.layers.conv2d({
//        inputShape: [28, 28, 1],
//        kernelSize: 5,
//        filters: 8,
//        strides: 1,
//        useBias: true,
//        activation: 'relu',
//        kernelInitializer: 'VarianceScaling'
//    });

//    let pooling1 = tf.layers.maxPooling2d({
//        poolSize: [2, 2],
//        strides: [2, 2]
//    });

//    let conv2 = tf.layers.conv2d({
//        kernelSize: 5,
//        filters: 16,
//        strides: 1,
//        useBias: true,
//        activation: 'relu',
//        kernelInitializer: 'VarianceScaling'
//    });

//    let pooling2 = tf.layers.maxPooling2d({
//        poolSize: [2, 2],
//        strides: [2, 2]
//    });
//    let dense = tf.layers.dense({
//        units: 10,
//        kernelInitializer: 'VarianceScaling',
//        activation: 'softmax'
//    });

//    modelSequential.add(conv1);
//    modelSequential.add(pooling1);
//    modelSequential.add(conv2);
//    modelSequential.add(pooling2);
//    modelSequential.add(tf.layers.flatten());
//    modelSequential.add(dense);

//    //
//    // Skapa tränings objektet
//    //
//    const optimizer = tf.train.sgd(learningRate);
//    modelSequential.compile({
//        optimizer: optimizer,
//        loss: 'categoricalCrossentropy',
//        metrics: ['accuracy']
//    });

//    tTrainfXs = tf.tensor3d(trainDataArray, [60000, 28, 28], 'float32');
//    tTrainfYs = tf.tensor2d(trainLabelArray, [60000, 10], 'float32');
//    tTestfXs = tf.tensor3d(testDataArray, [10000, 28, 28], 'float32');
//    tTestfYs = tf.tensor2d(testLabelArray, [10000, 10], 'float32');
//}

//function setupTensor() {
//    //
//    // Antal input & objekt i det gömda lagret
//    //
//    let hidden = tf.layers.dense({
//        inputShape: [784],
//        useBias: true,
//        //kernelInitializer: 'leCunNormal',
//        //biasInitializer: 'randomNormal',
//        units: 16,
//        activation: 'relu'
//    });

//    //
//    // Antal resultat
//    //
//    let output = tf.layers.dense({
//        units: 10,
//        activation: 'softmax'
//    });

//    modelSequential.add(hidden);
//    modelSequential.add(output);

//    //
//    // Skapa tränings objektet
//    //
//    const optimizer = tf.train.sgd(learningRate);
//    modelSequential.compile({
//        optimizer: optimizer,
//        loss: 'meanSquaredError'
//    });

//    tTrainfXs = tf.tensor2d(trainDataArray, [60000, 784], 'float32');
//    tTrainfYs = tf.tensor2d(trainLabelArray, [60000, 10], 'float32');
//    tTestfXs = tf.tensor2d(testDataArray, [10000, 784], 'float32');
//    tTestfYs = tf.tensor2d(testLabelArray, [10000, 10], 'float32');
//}

//function train() {
//    console.log('Training has started!');
//    trainingConvolutionalModel().then(result => {
//        setTimeout(train, 10);
//        console.log(result);

//        ////for (let index = 0; index < testDataArray.length; index++) {
//        //let prediction = predict(testDataArray[0], false);
//        //console.log('This is the prediction ' + indexOfMax(prediction) + ' This is the label ' + testLabelArray[0]);
//        ////}

//        ////modelSequential.save('file://TensorModels/NewModel');
//    });
//}

//async function trainingConvolutionalModel() {
//    try {
//        console.log(tTrainfXs.length);
//        const response = await modelSequential.fit(tTrainfXs.reshape([trainDataArray.length, 28, 28, 1]), tTrainfYs, {
//            shuffle: true,
//            epochs: 10,
//            validationData: [tTestfXs.reshape([testDataArray.length, 28, 28, 1]), tTestfYs]
//        });
//        return response;
//    } catch (e) {
//        console.log(e);
//    }
//    //const loss = history.history.loss[0];
//    //const accuracy = history.history.acc[0];
//}

//async function trainModel() {
//    try {
//        let response = await modelSequential.fit(tTrainfXs, tTrainfYs, {
//            shuffle: true,
//            epochs: 10,
//            validationData: [tTestfXs, tTestfYs]
//        });
//        return response;
//    } catch (e) {
//        console.log(e);
//    }
//}

//function predict(pixels, loadToArray) {
//    return tf.tidy(() => {
//        try {
//            let predictDataArray;
//            if (loadToArray)
//                predictDataArray = loadDataIntoArrayDetermineRowsAndColumns(pixels, 28, 28);
//            else
//                predictDataArray = pixels;
//            let predictionTensor = tf.tensor3d(predictDataArray, [1, 28, 28], 'float32');

//            let prediction = network.modelSequential.predict(predictionTensor.reshape([1, 28, 28, 1]));
//            return prediction.dataSync();
//        } catch (e) {
//            console.log(e);
//            return e;
//        }
//    });
//}

//function loadModel(fileName) {
//    tf.loadModel('file://' + fileName);
//    console.log(tf);
//}
//function indexOfMax(arr) {
//    if (arr.length === 0) {
//        return -1;
//    }

//    var max = arr[0];
//    var maxIndex = 0;

//    for (var i = 1; i < arr.length; i++) {
//        if (arr[i] > max) {
//            maxIndex = i;
//            max = arr[i];
//        }
//    }

//    return maxIndex;
//}

module.exports = router;