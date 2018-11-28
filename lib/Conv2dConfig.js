module.exports = class Conv2dConfig {
    //constructor(tf, learningRate, layers, trainDataXs, trainDataYs, testDataXs, testDataYs) {
    //    this.tf = tf;
    //    this.learningRate = learningRate;
    //    this.layers = layers;
    //    this.trainDataXs = trainDataXs;
    //    this.trainDataYs = trainDataYs;
    //    this.testDataXs = testDataXs;
    //    this.testDataYs = testDataYs;
    //}

    constructor(learningRate, layers) {
        this.learningRate = learningRate;
        this.layers = layers;
    }
}