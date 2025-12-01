/**
 * @name Ecosystem
 *  @file the main p5.js runtime 
 * this is a personal project to develop a fish simulation. *Thank you for visiting.*
 * 
 * @version 0.1
 * @author Jaxon Price
 * @copyright 2025
*/


test('testing',()=>{
   return true
}
)

// ==Global variables==


// Objects
let world;
let fishes = []

// image files
let images = [];
let img;
let imges;
let files;
let filteredFiles;

// sound files
let soundEffects = []
let soundFiles;
let SOUNDS;
let sounds;
let filteredSounds;

//  variable
let randomizer;
let maxFish = 10;

// Sound effects
let spawnSound;

// time variable
let t = 0;

let spawnButton = {
    radius : 15,
    fill: 'green',
    stroke: [0, 0, 0, 0]
 };


// == Asynchronous setup ==
async function setup() {

     // Create the canvas. Fits to the screen size.
   createCanvas(500, 500);

    world = new World();
    // load the JSON object containing the image files located in the get request for /images
    img = await loadJSON("/images");
    imges = Object.values(img);

    soundFiles = await loadJSON("/Sound_Effects");
    SOUNDS = Object.values(soundFiles);

    // Store the array containing the file paths
    files = imges[0]
    sounds = SOUNDS[0]
    console.log(sounds)

    //  filter out the files that end in .png
    filteredFiles = files.filter(item => item.endsWith('.png'))
    // console.log(filteredFiles)

    filteredSounds = sounds.filter(item => item.endsWith('.wav'))
    // console.log(filteredSounds)

   spawnButton = new Button("circle", width/2, 100)
    
   // Iterate through the array of files, and make a promise for each
    for (let i=0; i < filteredFiles.length; i++){
      images[i] = await loadImage('/images/' + filteredFiles[i])
      // console.log('/images/' + filteredFiles[i])
    } 

    for (let i=0; i < filteredSounds.length; i++){
      soundEffects[i] = await loadSound('/Sound_Effects/' + filteredSounds[i])
      // console.log(`[${i}]/Sound_Effects/` + filteredSounds[i])
    } 

    // Assign sound effect values
   spawnSound = soundEffects[38];
}



function draw() { // the p5.js runtime

  world.draw();
  let n = noise(t);
    // Increment the noise value 
  t += 0.1;

  // Set the background color
  background(220);
  
  
  // Run each instance of the fish object.
  for (let fish of fishes) {
    
    fish.show();
  
    
  }

  // activate spawn buttons
  spawnButton.render();
  spawnButton.check();
  spawnButton.update();

  // spawn button default state
  spawnButton.radius = 15;
  spawnButton.fill = 'green';
  spawnButton.stroke = [0, 0, 0, 0];
  spawnButton.active = true;

  // Spawn button hover state
  if (spawnButton.hover == true) {
  spawnButton.fill = "red"
  spawnButton.radius += 5
  }

  // Spawn a img when the button is pressed!
  spawnButton.onPressBegin = function() {
  // random variable
  randomizer = floor(random(images.length))
  // randomly choose an image for the object from the array.
  let fishSize = 35
  let fishWeight = 10
  console.log(fishes)
    fishes.push(new Fish(images[randomizer], spawnButton.x, spawnButton.y, fishWeight,fishSize ));
  spawnSound.play();
  // physics.addParticle(fish);
  
  }
  // ==text==
  // spawnButton text
  fill('black')
  text('spawn a new fish!', spawnButton.x - 40, spawnButton.y + 30)

  spawn()
 
}



/**
 * tests a function 
 * @param {string} label the error message. set to 'testing' to check the testing environment
 * @param {function} body the function to test
 * @returns {null}
 */
function test(label, body) {
    if(body() && label == 'testing') {
      console.log('Testing Environment Initialized')
      return
    }
    else if(!body()) console.log(`Failed: ${label}`)
}



/**
 * checks each tick if the maximum fish is reached, if not, spawns a new one.
 * @returns {null}
 */
function spawn() {
    for (let i=0; i< maxFish; i++){
    fishes.push(new Fish(images[randomizer], random(0, width), random(0, height)))
 }
}

