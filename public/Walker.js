class Walker {
  constructor(img, x, y) {

  //  local variables for this object.
    this.img = img;
    this.x = width / 2;
    this.y = height / 2;
    this.position = createVector(x, y);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0, 0);
    this.mass = 2
    this.r = 1
  }

  addForce(force) {
    this.acceleration.add(force);
  }

  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show() {
    image(this.img, this.position.x, this.position.y, 50, 50);
    // stroke(0);
    // circle(this.x, this.y, 10);
  }

run() {
    let gravity = createVector(0,.1*this.mass)
      this.borders()
    this.addForce(gravity)
  
    this.update();
    this.show();  
  }

borders() {
  if (this.position.y > height - this.r) {
    if (abs(this.velocity.y) < 1) {
      this.velocity.y = 0; // stop bouncing
    } else {
      this.velocity.y *= - 0.9; // dampened bounce
    }
    this.position.y = height - this.r;
  }

  if (this.position.x > width - this.r) {
    this.velocity.x *= -0.9;
    this.position.x = width - this.r;
  }

  if (this.position.x < 0 + this.r) {
    this.velocity.x *= -0.9;
    this.position.x = 0 + this.r;
  }
}
}








