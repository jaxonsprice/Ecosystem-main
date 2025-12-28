/**
 * Fish class
 */
class Fish extends Mover {
  /**
   * Fish class constructor.
   * @param {string} img file path to the image
   * @param {number} x the x-coordinate to initiate the fish
   * @param {number} y the y-coordinate to initiate the fish
   * @param {number} r the radius of the fish
   * @property {Object} P5.Vector
   * @returns {Object} Fish
   * @todo
   * - I need to re-integrate the physics system, and create a seek method, and a way to update the rotation based on the current velocity heading.
   */
  constructor(x, y, r, img) {
    super(x, y, r);
    this.img = img;
    this.direction = "right";
    this.wanderRadius = 2;
    this.wanderTheta = PI / 2;
    this.hunger = 0.5;
    this.mass = 1.0;
    this.volume = 1.05;
    this.maxSpeed = 7;
    this.maxForce = 0.15;
    this.isHungry = false;
    this.minSpeed = 6;
    this.killRange = 18;
    this.vision = 200;
    this.target = null;
    this.health = 1;
    this.mode = "default";
  }

  /**
   * Sets the rate at which the hunger increases, using a number percentage as decay per framerate
   * @param {Number} amt
   * @returns the normalized rate
   */
  setHungerRate(amt = 0.0001) {
    return map(amt, 0, 100, 0, 1);
  }

  /**
   * get the health as a percentage value
   * @returns the health percentage
   */
  getHealth() {
    return floor(map(this.health, 0, 1, 0, 100));
  }

  /**
   * sets the target
   * @param {Object} target 
   */
  setTarget(target) {
    this.target = target;
  }
  /**
   * get the hunger as a percentage value 
   * @returns the hunger percentage
   */
  getHunger() {
    return floor(map(this.hunger, 0, 1, 0, 100));
  }

  /**
   * quickly chases after a position.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} speed
   * @returns p5.Vector
   */
  seek(target, speed) {
    // check the distance between the target and self 
    let direction = p5.Vector.sub(target, this.position);
    // get the magnitude of this vector
    let d = direction.mag();

    // // scale the magnitude based on distance
    // if (d < 100) {
    //   let m = map(d, 0, 100, 0, speed);
    //   direction.setMag(m);
    // } else {
    //   direction.setMag(speed);
    // }

    // create a vector from the current velocity to the desired velocity 
    // [!Note make this a separate function]
    let steer = p5.Vector.sub(direction, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  /**
   * Chases and then eats the target.
   * @param {Object} target
   * @param {Object} world
   */
  hunt(target, world) {
  
    let position = this.position;
    if (this.isHungry && !target.isDead) {
      let dis = dist(
        target.position.x,
        target.position.y,
        position.x,
        position.y
      );
      this.chase(p5.Vector.add(target.position, target.velocity));
      if (dis < this.killRange && !target.isDead && target !== world) {
        target.die();
        this.eat(target);
        // target = null;
      }
    }
  }

  /**
   * the fish wanders around
   */
  wander() {
    let wanderPoint = this.velocity.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.position);
    this.wireframe((d) =>
      line(this.position.x, this.position.y, wanderPoint.x, wanderPoint.y)
    );

    let wanderRadius = 50;
    this.wireframe((d) =>
      circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2)
    );

    let theta = this.wanderTheta + this.velocity.heading();
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);
    this.wireframe((d) =>
      line(this.position.x, this.position.y, wanderPoint.x, wanderPoint.y)
    );
    this.wireframe((d) => circle(wanderPoint.x, wanderPoint.y, 10));
    this.addForce(this.seek(wanderPoint, this.maxSpeed * 0.1));
    let displacementRange = random(0.2, 0.8);
    this.wanderTheta += random(-displacementRange, displacementRange);
  }

  chase(prey) {
    let force = this.seek(prey, this.maxSpeed);
    this.addForce(force);
    this.wireframe((d) =>
      line(prey.x, prey.y, this.position.x, this.position.y)
    );
    // console.log(dis)
  }

  eat(prey) {
    if (prey.nutrients) {
      this.hunger -= prey.nutrients;
    }
  }

  /**
   * runs the fish
   * @param {Array} flock the flock this fish belongs to.
   */
  run(world, water) {
    this.forces(world, water);
    this.update();
    this.show();
    this.boundaries(this.vision / 4, 0.1);
    this.debug("off");
    this.hungerEffects();
    this.healthEffects();
    this.search(world);
    world.addThis(this);
  }

  flock(boids) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohere(boids);

    separation.mult(1.2);
    alignment.mult(0.9);
    cohesion.mult(0.2);
    this.addForce(separation);
    this.addForce(cohesion);
    this.addForce(alignment);
  }

  align(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      let d = p5.Vector.dist(this.position, other.position);
      if (this != other && d < neighborDistance) {
        sum.add(other.velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  separate(fish) {
    let desiredSeparation = this.r;
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of fish) {
      let d = p5.Vector.dist(this.position, other.position);
      if (this !== other && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.setMag(1 / d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohere(boids) {
    let neighborDistance = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      let d = p5.Vector.dist(this.position, other.position);
      if (this != other && d < neighborDistance) {
        sum.add(other.position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum, this.maxSpeed);
    } else {
      return createVector(0, 0);
    }
  }

  closest(visible) {
    // check if the array is empty
    if (visible.length > 0) {
      let lowest = visible[0];
      let lowestDist = dist(
        lowest.position.x,
        lowest.position.y,
        this.position.x,
        this.position.y
      );

      // check each visible food, and determine the nearest one.
      for (let i = 1; i < visible.length; i++) {
        let o = visible[i];
        let d = dist(
          o.position.x,
          o.position.y,
          this.position.x,
          this.position.y
        );

        if (d < lowestDist) {
          lowest = visible[i];
          lowestDist = d;
        }
      }
      return lowest;
    }
  }

  visible(array) {
    let visible = [];

    //  check for visible food
    if (array.length > 0) {
      for (let x of array) {
        if (x != this) {
          let d = dist(
            x.position.x,
            x.position.y,
            this.position.x,
            this.position.y
          );
          if (d <= this.vision && x != this && !x.isDead) {
            visible.push(x);
          }
        }
      }
      return visible;
    }
  }

  sense(world) {
    let inRange = this.visible(world.contents);
    if (inRange) {
      return inRange;
    }
  }

  healthEffects() {
    const fullForce = this.maxForce;
    let test = random(0, 1);
    if (this.health <= 0.1) {
      // console.log('ow')
      if (this.maxForce >= 0) {
        this.maxForce -= 0.0005;
        // console.log('losing speed')
      }
      if (test < 0.0001) {
        this.die();
        console.log("died");
      }
    }
    if (this.maxSpeed < this.maxSpeed && this.hunger < 0.2) {
      this.maxForce += 0.002;
    }
  }

  hungerEffects() {
    if (this.hunger < 1) {
      this.hunger += this.setHungerRate();
    }

    if (this.hunger > 0.1) {
      this.isHungry = true;
    } else {
      this.isHungry = false;
    }

    if (this.hunger > 0.9 && this.health > 0) {
      this.health -= 0.0002;
    } else if (this.hunger < 0.5 && this.health < 1) {
      this.health += 0.001;
    }
  }

  flee(predator) {
    let desired = p5.Vector.sub(this.position, predator.position);
    let d = desired.mag();

    if (d === 0) return;

    desired.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce * 1.6);

    this.addForce(steer);
  }

  search(world) {
    const found = this.sense(world);
    if (!found || found.length === 0) {
      this.mode = "default";
      return;
    }

    // 1. Flee has highest priority
    const predator = found.find((x) => x.type === this.predator);
    if (predator) {
      this.target = predator;
      this.mode = "fleeing";
    }
    // 2. Hunt if hungry and safe
    else if (this.isHungry) {
      const prey = found.find((x) => x.type === this.prey);
      if (prey) {
        this.target = prey;
        this.mode = "hunting";
      } else {
        this.mode = "default";
      }
    }
    // 3. Default behavior
    else {
      this.mode = "default";
    }

    // Execute behavior
    if (this.mode === "fleeing") {
      this.flee(this.target);
    } else if (this.mode === "hunting") {
      this.hunt(this.target, world);
    } else {
      this.wander();
    }
  }

  show() {
    let angle = this.velocity.heading();
   
    push();
    // calibrate the fish position
    translate(this.position.x, this.position.y);
    push();
    translate(this.r, this.r);
    // the initial rotation to calibrate the fish
    rotate(HALF_PI);
    pop();
    // rotate in the direction of the current velocity
    rotate(angle);

    // wireframe the current position (debug)
    this.wireframe((d) => rect(-this.r, -this.r / 2, this.r, this.r));
    angleMode(RADIANS);

    // flip the image depending on the direction of the fish
    if (this.direction == "right") {
      image(this.img, -this.r, -this.r / 2, this.r, this.r);
    } else {
      scale(1, -1);
      image(this.img, -this.r, -this.r / 2, this.r, this.r);
    }
    pop();

    // check the direction
    if (angle > -1 && angle < 1) {
      this.direction = "right";
    } else {
      this.direction = "left";
    }

    // wireframe the kill range (debug)
    this.wireframe((d) =>
      circle(this.position.x, this.position.y, this.killRange)
    );
  }
}
