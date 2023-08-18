// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/A_9x_gEUZ/";

let model, webcam, labelContainer, maxPredictions;

let classPredictions = [];
// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // or files from your local hard drive
  // Note: the pose library adds "tmImage" object to your window (window.tmImage)
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
  labelContainer = document.getElementById("label-container");
  for (let i = 0; i < maxPredictions; i++) {
    // and class labels
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}
// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  classPredictions = [];
  for (let i = 0; i < maxPredictions; i++) {
    const className = prediction[i].className;
    const probability = (prediction[i].probability * 100).toFixed(2);

    const classPrediction = `${className}: ${probability}%`;
    const classPrediction1 =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction1;
    classPredictions.push(classPrediction);
  }
//   console.log(classPredictions);
  const extractedData = []
  for (const prediction of classPredictions) {
    // Split the string by ':' to separate class name and probability
    const [className, probabilityString] = prediction.split(":");

    // Convert the probability string to a number (remove '%' and trim spaces)
    const probability = parseFloat(probabilityString.replace("%", "").trim());

    // Add the extracted data to the array
    extractedData.push({ className, probability });
  }

  // Now, extractedData array contains objects with class name and probability
  const rightContainer = document.getElementsByClassName('rightContainer')[0];
  let Familiar = extractedData[0].className;
  let probability = extractedData[0].probability;
  if(Familiar === 'Familiar' && probability > 50){
    console.log("You are a familiar")
    rightContainer.innerText = "You are in front of camera"
  }else{
    console.log("You are not there")
    rightContainer.innerText = " You are not in front of camera"
  }
  console.log(extractedData[0].className,extractedData[0].probability);
}
