'use strict';
module.exports = (io) => {
    const express = require('express');
    const router = express.Router();
    const fs = require('fs');
    require('@tensorflow/tfjs-node');
    const tf = require('@tensorflow/tfjs');
    const {
        promisify
    } = require('util');
    const readFile = promisify(fs.readFile);

    const Conv2dNetwork = require('../lib/Conv2dNetwork.js');
    const Conv2dLayer = require('../lib/Conv2dLayer.js');
    const DenseLayer = require('../lib/DenseLayer.js');
    const FlattenLayer = require('../lib/FlattenLayer.js');
    const MaxPooling2dLayer = require('../lib/MaxPooling2dLayer.js');
    const Conv2dConfig = require('../lib/Conv2dConfig.js');
    const User = require('../lib/User.js');

    let users = {};
    let dataArrays = null;
    let network = createConvolutionalModel();
    let training = false;

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', {
            title: 'Express'
        });
    });

    io.on('connection', (socket) => {
        console.log("New user " + socket.id);
        users[socket.id] = new User(socket.id, network);

        socket.on('trainnetwork', () => {
            trainModel(socket);
        });

        socket.on('userdigit', (pixels) => {
            predict(socket, pixels);
        });


    });

    io.on('disconnected', (socket) => {
        let user = users[socket.id];
        console.log("User disconnected " + user.id);
    });

    async function predict(socket, pixels) {
        let predictDataArray = await loadDataIntoArrayDetermineRowsAndColumns(pixels, 28, 28);

        let predictionTensor = await network.tf.tensor3d(predictDataArray, [1, 28, 28], 'float32');
        let prediction = await network.modelSequential.predict(predictionTensor.reshape([1, 28, 28, 1])).data();
        socket.emit('prediction', prediction);
        predictionTensor.dispose();
    }

    async function trainModel(socket) {
        if (training) {
            console.log('Training is ongoing');
            return;
        }

        training = true;
        let user = users[socket.id];
        const data = await getData();
        let segmentSize = data.trainingData.dataArray.length / 10;
        let arrayLength = data.trainingData.dataArray.length;


        let tTestXs = await network.tf.tensor3d(data.testData.dataArray, [data.testData.dataArray.length, 28, 28]);
        let tTestYs = await network.tf.tensor2d(data.testData.labelArray, [data.testData.labelArray.length, 10]);

        for (let segment = 0; segment < arrayLength; segment += segmentSize) {
            let datAarraySegment = data.trainingData.dataArray.slice(segment, segment + segmentSize);
            let dataLabelSegment = data.trainingData.labelArray.slice(segment, segment + segmentSize);

            let tTrainXs = network.tf.tensor3d(datAarraySegment, [datAarraySegment.length, 28, 28]);
            let tTrainYs = network.tf.tensor2d(dataLabelSegment, [dataLabelSegment.length, 10]);
            let traningResult = await trainNetwork(socket, user, tTrainXs, tTrainYs, tTestXs, tTestYs);
            const used = process.memoryUsage();
            console.log(used);
            tTrainXs.dispose();
            tTrainYs.dispose();
        }
        tTestXs.dispose();
        tTestYs.dispose();
        training = false;
        dataArrays = null;
    }

    function trainNetwork(socket, user, tTrainfXs, tTrainfYs, tTestXs, tTestYs) {
        return new Promise((resolve, reject) => {
            try {
                let shapeTrainingX = tTrainfXs.shape;
                shapeTrainingX.push(1);

                let shapeTestX = tTestXs.shape;
                shapeTestX.push(1);

                const response = network.modelSequential.fit(tTrainfXs.reshape(shapeTrainingX), tTrainfYs, {
                    shuffle: true,
                    epochs: 10,
                    validationdata: [tTestXs.reshape(shapeTestX), tTestYs],
                    callbacks: {
                        onEpochEnd: async (epoch, log) => {
                            socket.emit("epochend", log);
                        }
                    }
                });
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }

    function createConvolutionalModel() {
        let layers = [];
        layers.push(new Conv2dLayer([28, 28, 1], 5, 8, 1, false, 'relu', 'VarianceScaling'));
        layers.push(new MaxPooling2dLayer([2, 2], [2, 2]));
        layers.push(new Conv2dLayer(null, 5, 16, 1, true, 'relu', 'VarianceScaling'));
        layers.push(new MaxPooling2dLayer([2, 2], [2, 2]));
        layers.push(new FlattenLayer());
        layers.push(new DenseLayer(10, 'softmax', 'VarianceScaling'));

        let config = new Conv2dConfig(0.15, layers);
        return new Conv2dNetwork(tf, config);
    }

    function getData() {
        return new Promise((resolve, reject) => {
            try {

                if (dataArrays != null)
                    resolve(dataArrays);

                const trainingData = {
                    dataArray: {
                        name: 'trainBufferArray',
                        path: './mnist/train-images.idx3-ubyte',
                        slice: 16
                    },
                    labelArray: {
                        name: 'trainLabelBufferArray',
                        path: './mnist/train-labels.idx1-ubyte',
                        slice: 8
                    }
                };

                const testData = {
                    dataArray: {
                        name: 'testBufferArray',
                        path: './mnist/t10k-images.idx3-ubyte',
                        slice: 16
                    },
                    labelArray: {
                        name: 'testLabelBufferArray',
                        path: './mnist/t10k-labels.idx1-ubyte',
                        slice: 8
                    }
                };

                let testDataArray, testLabelArray, trainDataArray, trainLabelArray;
                readFile(testData.dataArray.path).then((result) => {
                    testDataArray = loadDataIntoArrayDetermineRowsAndColumns(result.slice(16), 28, 28);
                }).then(() => {
                    readFile(testData.labelArray.path).then((result) => {
                        testLabelArray = loadLabelDataIntoArray(result.slice(8), 1);
                    }).then(() => {

                        readFile(trainingData.dataArray.path).then((result) => {
                            trainDataArray = loadDataIntoArrayDetermineRowsAndColumns(result.slice(16), 28, 28);
                        }).then(() => {
                            readFile(trainingData.labelArray.path).then((result) => {
                                trainLabelArray = loadLabelDataIntoArray(result.slice(8), 1);
                            }).then(() => {

                                dataArrays = {
                                    trainingData: {
                                        dataArray: trainDataArray,
                                        labelArray: trainLabelArray
                                    },
                                    testData: {
                                        dataArray: testDataArray,
                                        labelArray: testLabelArray
                                    }
                                };
                                resolve(dataArrays);

                            });

                        });
                    });

                });
            } catch (e) {
                reject(e);
            }
        });

    }

    function loadLabelDataIntoArray(arrayBuffer, arraySegment) {
        let train_index = 0;
        let dataArray = [];
        while (train_index < arrayBuffer.length) {
            let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let arrayIndex = arrayBuffer[train_index];
            array[arrayIndex] = 1;
            dataArray.push(array);
            train_index += arraySegment;
        }
        return dataArray;
    }

    function loadDataIntoArrayDetermineRowsAndColumns(arrayBuffer, rows, columns) {
        let train_index = 0;
        let dataArray = [];
        while (train_index < arrayBuffer.length) {
            let array = [];

            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
                array.push([]);
                for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                    array[rowIndex][columnIndex] = arrayBuffer[(rowIndex * rows) + train_index + columnIndex] / 255;
                }
            }

            dataArray.push(array);
            train_index += rows * columns;
        }

        return dataArray;
    }

    return router;
};