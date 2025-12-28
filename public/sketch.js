
/**
 * @name Ecosystem
 *  @file the main p5.js runtime
 * this is a personal project to develop a fish simulation. Everything in this program has been coded by hand.
 *
 * @version 0.1
 * @author Jaxon Price
 * @copyright 2025
 */

// ==Global variables==
// Objects
let sound;
let file;
let world;
let predator;
let water;
let flock;
let foods = [];

//  variable
let randomizer;
let maxFish = 50;

// == Asynchronous setup ==
async function setup() {

  // Create the canvas. Fits to the screen size.
  createCanvas(windowWidth, windowHeight);
  sound = new Sound();
  file = new File();
  world = new World();
  flock = new Flock();
  water = new Water(0, height / 3, width, height);

  // let sounds = await sound.soundFiles
  //  sound.loadSounds(sounds)

// load the image files.
let images = await file.loadImageList()
let addresses = file.getAddresses(images)

for (let i = 0; i < addresses.length; i++) {
  file.images[i] = await file.loadFish(addresses, i)
}

  predator = new Predator(
    random(0, width),
    random(0, height),
    75,
    file.getFish(1)
  );

  for (let i = 0; i < maxFish; i++) {
    flock.addBoid(
      new SchoolFish(
        random(0, width),
        random(0, height),
        35,
        file.getRandomFish()
      )
    );
  }
}

function draw() {
  if (mouseIsPressed) {
    foods.push(new Food(mouseX, mouseY, 5));
  }

  background("#e9d87bff");
  noStroke();

  water.show();
  predator.run(world, water);
  world.run();
  flock.run(world, water);

  for (let food of foods) {
    food.run(world, water);
    food.deathCheck(world, foods);
  }

  //  track the 'king' stats (for testing)
  king = flock.boids[0];

  fill("green");
  circle(king.position.x, king.position.y - 15, 15);
  text(
    `
    health: ${king.getHealth()}% \n
    hunger: ${king.getHunger()}% 
  `,
    200,
    200
  );
}

/**
 * tests a function
 * @param {string} label the error message. set to 'testing' to check the testing environment
 * @param {function} body the function to test
 * @returns {null}
 */
function test(label, body) {
  if (body() && label == "testing") {
    console.log("Testing Environment Initialized");
    return;
  } else if (!body()) console.log(`Failed: ${label}`);
}
