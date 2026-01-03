import p5 from "p5";
import {World} from "./world/world"
/**
 * @name Ecosystem
 *  @file the main p5.js runtime
 * this is a personal project to develop a fish simulation. Everything in this program has been coded by hand.
 *
 * @version 0.1
 * @author Jaxon Price
 * @copyright 2025
 */

const sketch = (p) => {
  // This code sets up the sketch
  let world;
  // == Asynchronous setup ==
  p.setup = () => {
    world = new World(p);
    world.setup();
  };

  // Run the sketch
  p.draw = () => {
    world.draw();
    // world.predator.setMass(1);
    // world.setPredators(3)
  };
} ;

const myp5 = new p5(sketch)


export function createSketch() {
  return myp5;
}

