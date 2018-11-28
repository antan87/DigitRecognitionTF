const socket = io.connect('http://localhost:3000');
let user_prediction;

//
// DOM variables
//
let btnPredict;
let btnTrain;
let btnClean;

//
// Events
//
function setup() {
    let canvas = createCanvas(224, 224);

    // Move the canvas so it's inside our < div id = "sketch-holder" > .
    canvas.parent('sketch-holder');
    background(0);
    user_prediction = createGraphics(224, 224);
    user_prediction.pixelDensity(1);

    btnPredict = document.getElementById('btnPredict');
    btnPredict.addEventListener('click', () => {
        sendImageForPrediction();
    });

    btnTrain = document.getElementById('btnTrain');
    btnTrain.addEventListener('click', () => {
        socket.emit('trainnetwork', 'Hello');
    });

    btnClean = document.getElementById('btnClean');
    btnClean.addEventListener('click', () => {
        cleanUp();
    });
}

socket.on('content data', (buffer) => {
    console.log(buffer);
});

socket.on('epochend', (log) => {
    document.getElementById("accuracy-txt").innerHTML = log.acc;
    document.getElementById("loss-txt").innerHTML = log.loss;
});

socket.on('prediction', (prediction) => {
    document.getElementById("prediction-txt").innerHTML = indexOfMax(prediction);
});

function draw() {
    background(0);
    image(user_prediction, 0, 0);
    if (mouseIsPressed) {
        user_prediction.stroke(255);
        user_prediction.strokeWeight(22);
        user_prediction.line(mouseX, mouseY, pmouseX, pmouseY);
    }
}

function indexOfMax(predictionTensor) {
    let arr = Object.keys(predictionTensor).map(function (key) {
        return [Number(key), predictionTensor[key]];
    });


    if (arr.length === 0) {
        return -1;
    }

    let maxValue = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i][1] > maxValue[1]) {
            maxValue = arr[i];
        }
    }


    return maxValue[0];
}

function sendImageForPrediction() {
    let image = user_prediction.get();
    image.resize(28, 28);
    image.loadPixels();

    image.updatePixels();
    let pixels = [];
    for (let index = 0; index < image.pixels.length; index += 4) {
        let red = image.pixels[index];
        let green = image.pixels[index + 1];
        let blue = image.pixels[index + 2];
        let newPixel = (red + green + blue) / 3;
        pixels.push(newPixel);
    }
    document.getElementById("prediction-txt").innerHTML = "";
    socket.emit('userdigit', pixels);


}

function trainModel() {
    console.log('Train');
    console.log(socket);
    socket.emit('trainnetwork');
}

function cleanUp() {
    user_prediction = createGraphics(224, 224);
}