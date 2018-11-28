const learningRate = 0.2;
const modelSequential = tf.sequential();
const resolution = 50;
let inputs = [];
let xs;
const trainingDataXs =
    [[0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
    ];

const trainingDataYs =
    [[0],
    [1],
    [1],
    [0]];

const tfXs = tf.tensor2d(trainingDataXs);
const tfYs = tf.tensor2d(trainingDataYs);

function setup() {
    createCanvas(750, 750);
    setupTensor();
    createInputs();
}
function train() {
    trainModel().then(result => {
        //       console.log(result.history.loss[0]);
        setTimeout(train, 10);
    });
}

async function trainModel() {
    try {
        let response = await modelSequential.fit(tfXs, tfYs, {
            shuffle: true,
            epochs: 10
        });
        return response;
    } catch (e) {
        console.log(e);
    }
}

function createInputs() {
    let columns = width / resolution;
    let rows = height / resolution;
    for (var rowColm = 0; rowColm < columns; rowColm++) {
        var j = rowColm / columns;
        for (var rowNmbr = 0; rowNmbr < rows; rowNmbr++) {
            var i = rowNmbr / rows;
            inputs.push([i, j]);
        }
    }
    xs = tf.tensor2d(inputs);
}

function setupTensor() {
    //
    // Antal input & objekt i det gömda lagret
    //
    let hidden = tf.layers.dense({
        inputShape: [2],
        units: 4,
        activation: 'sigmoid'
    });

    //
    // Antal resultat
    //
    let output = tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    });

    modelSequential.add(hidden);
    modelSequential.add(output);

    //
    // Skapa tränings objektet
    //
    const optimizer = tf.train.adagrad(learningRate);
    modelSequential.compile({
        optimizer: optimizer,
        loss: 'meanSquaredError'
    });

    setTimeout(train, 10);
}

function draw() {
    background(0);
    let columns = width / resolution;
    let rows = height / resolution;

    tf.tidy(() => {
        let ys = modelSequential.predict(xs).dataSync();
        let index = 0;
        for (var rowColm = 0; rowColm < columns; rowColm++) {
            for (var rowNmbr = 0; rowNmbr < rows; rowNmbr++) {
                let br = ys[index];
                stroke(255);
                fill(br * 255);
                rect(rowNmbr * resolution, rowColm * resolution, resolution, resolution);
                index++;
            }
        }
    });
}