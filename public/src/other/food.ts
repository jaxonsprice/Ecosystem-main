import {Mover} from "../physics/mover"
import p5 from "p5"


export class Food extends Mover {
  mass: number;
  volume: number;
  maxSpeed: number;
  maxForce: number;
  isEdible: boolean;
  nutrients: number;
  type: string;
  position: any;
  constructor(x, y, r, public p:p5) {
    super(x, y, r, p);
    this.mass = 0.02;
    this.volume = .01;
    this.maxSpeed = 7;
    this.maxForce = 0;
    this.isEdible = true;
    this.nutrients = 0.05;
    this.type = "food";
  }

  show() {
    this.p.fill("orange");
    this.p.circle(this.position.x, this.position.y, this.r);
  }
  // r(x: any, y: any, r: any) {
  //   throw new Error("Method not implemented.");
  // }
  run(world, water) {
    this.show();
    this.forces(world, water);
    this.addForce(p5.Vector.mult(world.gravity, this.mass));
    this.addForce(world.current)
    this.boundaries(0, 0.5);
    this.update();

    world.addThis(this);
  }

}
