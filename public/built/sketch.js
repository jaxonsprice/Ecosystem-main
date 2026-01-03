import p5 from "p5";
import { World } from "./world/world";
/**
 * @name Ecosystem
 *  @file the main p5.js runtime
 * this is a personal project to develop a fish simulation. Everything in this program has been coded by hand.
 *
 * @version 0.1
 * @author Jaxon Price
 * @copyright 2025
 */
var myp5 = new p5(function (sketch) {
    // This code sets up the sketch
    var world;
    // == Asynchronous setup ==
    sketch.setup = function () {
        world = new World(sketch);
        world.setup();
    };
    // Run the sketch
    sketch.draw = function () {
        world.draw();
        world.predator.setMass(1);
        // world.setPredators(3)
    };
});
