//let user_digit;

//function setup() {
//    let canvas = createCanvas(224, 224);

//    // Move the canvas so it’s inside our <div id="sketch-holder">.
//    canvas.parent('sketch-holder');
//    background(255, 0, 200);

//    user_digit = createGraphics(224, 224);
//    user_digit.pixelDensity(1);

//    const socket = io('http://localhost:3000/tensorflow');
//    socket.on('connection', function (data) {
//        console.log(data);
//        socket.emit('my other event', { my: 'data' });
//    });
//}

//function draw() {
//    background(0);

//    image(user_digit, 0, 0);
//    if (mouseIsPressed) {
//        user_digit.stroke(255);
//        user_digit.strokeWeight(22);
//        user_digit.line(mouseX, mouseY, pmouseX, pmouseY);
//    }
//}

//function sendImageForPrediction() {
//    let image = user_digit.get();
//    image.resize(28, 28);
//    image.loadPixels();

//    image.updatePixels();
//    let pixels = [];
//    console.log(image.pixels.length);
//    for (let index = 0; index < image.pixels.length; index += 4) {
//        let red = image.pixels[index];
//        let green = image.pixels[index + 1];
//        let blue = image.pixels[index + 2];
//        let newPixel = (red + green + blue) / 3;
//        pixels.push(newPixel);
//    }

//    let pixelObject = {
//        name: "JEE",
//        picturePixels: pixels
//    };

//    $.ajax({
//        type: "POST",
//        url: "http://localhost:3000/tensorflow",
//        data: JSON.stringify(pixelObject),
//        contentType: "application/json",
//        dataType: "json"
//    }).done(function (o) {
//        console.log(o);
//        // If you want the file to be visible in the browser
//        // - please modify the callback in javascript. All you
//        // need is to return the url to the file, you just saved
//        // and than put the image in your browser.
//    });
//}

//function cleanUp() {
//    user_digit = createGraphics(224, 224);
//}

////var image = document.images[00];
////var downloadingImage = new Image();
////downloadingImage.onload = function () {
////    image.src = this.src;
////};
////downloadingImage.src = "http://an.image/to/aynchrounously/download.jpg";