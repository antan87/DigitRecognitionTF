module.exports = class Conv2dLayer {
    constructor(inputShape, kernelSize, filters, strides, useBias, activation, kernelInitializer) {
        this.inputShape = inputShape;
        this.kernelSize = kernelSize;
        this.filters = filters;
        this.strides = strides;
        this.useBias = useBias;
        this.activation = activation;
        this.kernelInitializer = kernelInitializer;
    }
}