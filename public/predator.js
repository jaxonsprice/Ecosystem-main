class Predator extends Fish {
  constructor(x, y, r, img) {
    super(x, y, r, img);
    this.type = "predator";
    this.prey = "schoolfish";
    this.mass = 10;
    this.volume = 10;
    this.maxSpeed = 7;
    this.maxForce = 0.15;
    this.isDead = false;
    this.isEdible = false;
    this.vision = 300;
  }
}
