import p5 from "p5"
import {File} from "../data/file"
import {Predator, SchoolFish, Flock} from "../creatures/fish"
import {Water} from "../world/water"
import {Food} from "../other/food"


/**
 * Holds the world info and it's methods.
 * @returns {World}
 */
export class World {
  gravity: p5.Vector
  current: any;
  contents: any[];
  isEdible: boolean;
  predator: any;
  water: any;
  flock: any;
  foods: any[];
  sound: any;
  file: any;

  private schoolFishImage:any;
  private predatorImage:any;
  private ready:boolean = false;
  constructor(private p:p5) {
    this.gravity = p.createVector(0, 0.5);
    this.current;
    this.contents = [];
    this.isEdible = false;
    this.predator;
    this.water;
    this.flock;
    this.foods = [];
    this.sound;
    this.file;
  }

  addThis(i) {
    if (!this.contents.includes(i) && i != this) {
      this.contents.push(i);
    }
  }

  run() {
    let str = 0.1;
    let n = this.p.noise(0.005 * this.p.frameCount);
    let dir = this.p.map(n, 0, 1, -str, str);
    this.current = this.p.createVector(dir, 0);
  }

  async setup() {
    this.p.createCanvas(this.p.windowWidth, this.p.windowHeight);
    this.file = new File(this.p);
    this.flock = new Flock();
    this.water = new Water(0, this.p.height / 3, this.p.width, this.p.height, this.p);

    this.predatorImage = await this.p.loadImage('images/fish.png')

    this.schoolFishImage = await this.p.loadImage('images/Shubunkin - Keith Lau (CookieUnleashed).png')

    // let images = await this.file.loadImageList();
    // let addresses = this.file.getAddresses(images);

    // for (let i = 0; i < addresses.length; i++) {
    //   this.file.images[i] = await this.file.loadFish(addresses, i);
      
    // }

    this.predator = new Predator(
      this.p.random(0, this.p.width),
      this.p.random(0, this.p.height),
      35,
      this.predatorImage
      , this.p
    );

    for (let i = 0; i < 200
        ; i++) {
      this.flock.addBoid(
        new SchoolFish(
          this.p.random(0, this.p.width),
          this.p.random(0,this.p.height),
          10,
          this.schoolFishImage
         ,this.p
        ), 
      );
    }
    this.ready = true;
  }
  draw() {
    if (!this.ready) return;
    let x = this.p.random(0,1)
    if (x < 0.05 && this.foods.length < 50) {
      this.foods.push(new Food(this.p.random(0, this.p.width),this.p.random(0, this.p.height), 1.5, this.p));
    }

    this.p.background("#e9d87bff");
    this.p.noStroke();

    this.water.show();
    this.predator.run(this, this.water);
    this.run();
    this.flock.run(this, this.water);

    for (let food of this.foods) {
      food.run(this, this.water);
      food.deathCheck(this, this.foods);
    }
  }
}
