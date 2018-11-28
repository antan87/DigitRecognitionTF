const Conv2dLayer = require('./Conv2dLayer.js');
const DenseLayer = require('./DenseLayer.js');
const FlattenLayer = require('./FlattenLayer.js');
const MaxPooling2dLayer = require('./MaxPooling2dLayer.js');

module.exports = class Conv2dNetwork {
    constructor(tf, config) {
        this.tf = tf;
        this.config = config;
        this.modelSequential = tf.sequential();
        this.setupNetwork();
        this.compileModel();
    }

    compileModel() {
        //
        // Create training object
        //
        const optimizer = this.tf.train.sgd(this.config.learningRate);
        this.modelSequential.compile({
            optimizer: optimizer,
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
    }

    createConv2dLayer(layerConfig) {
        return this.tf.layers.conv2d({
            inputShape: layerConfig.inputShape,
            kernelSize: layerConfig.kernelSize,
            filters: layerConfig.filters,
            strides: layerConfig.strides,
            useBias: layerConfig.useBias,
            activation: layerConfig.activation,
            kernelInitializer: layerConfig.kernelInitializer
        });
    }

    createDenseLayer(layerConfig) {
        return this.tf.layers.dense({
            units: layerConfig.units,
            kernelInitializer: layerConfig.kernelInitializer,
            activation: layerConfig.activation
        });
    }
    createFlattenLayer(layerConfig) {
        return this.tf.layers.flatten();
    }

    createMaxPooling2dLayer(layerConfig) {
        return this.tf.layers.maxPooling2d({
            poolSize: layerConfig.poolSize,
            strides: layerConfig.strides
        });
    }

    predict(predictData, shape) {
        return this.tf.tidy(() => {
            try {
                let predictionTensor = tf.tensor3d(predictData, shape, 'float32');
                let prediction = modelSequential.predict(predictionTensor.reshape(shape.push(1)));
                return prediction.dataSync();
            } catch (e) {
                console.log(e);
                return e;
            }
        });
    }

    setupNetwork() {
        this.config.layers.forEach((layer) => {
            if (layer instanceof Conv2dLayer)
                this.modelSequential.add(this.createConv2dLayer(layer));

            if (layer instanceof MaxPooling2dLayer)
                this.modelSequential.add(this.createMaxPooling2dLayer(layer));

            if (layer instanceof FlattenLayer)
                this.modelSequential.add(this.createFlattenLayer(layer));

            if (layer instanceof DenseLayer)
                this.modelSequential.add(this.createDenseLayer(layer));
        });
    }

    async train() {
    }
}