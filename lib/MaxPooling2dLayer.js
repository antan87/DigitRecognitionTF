module.exports = class MaxPooling2dLayer {
    constructor(poolSize, strides) {
        this.poolSize = poolSize;
        this.strides = strides;
    }
}