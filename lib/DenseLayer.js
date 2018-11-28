module.exports = class DenseLayer {
    constructor(units, activation, kernelInitializer) {
        this.units = units;
        this.activation = activation;
        this.kernelInitializer = kernelInitializer;
    }
}