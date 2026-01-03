var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import p5 from "p5";
import { Mover } from "../physics/mover";
/**
 * Fish class
 */
var Fish = /** @class */ (function (_super) {
    __extends(Fish, _super);
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
    function Fish(x, y, r, img, p) {
        var _this = _super.call(this, x, y, r, p) || this;
        _this.img = img;
        _this.direction = "right";
        _this.wanderRadius = 2;
        _this.wanderTheta = p.PI / 2;
        _this.hunger = 0.5;
        _this.mass = 1.0;
        _this.volume = 1.05;
        _this.maxSpeed = 7;
        _this.maxForce = 0.07;
        _this.isHungry = false;
        _this.minSpeed = 6;
        _this.killRange = 18;
        _this.vision = 200;
        _this.target = null;
        _this.health = 1;
        _this.mode = "default";
        _this.fleeStrength = 0.15;
        return _this;
    }
    Fish.prototype.setFleeStrength = function (str) {
        this.fleeStrength = str;
    };
    Fish.prototype.setVision = function (vision) {
        this.vision = vision;
    };
    /**
     * Sets the rate at which the hunger increases, using a number percentage as decay per framerate
     * @param {Number} amt
     * @returns the normalized rate
     */
    Fish.prototype.setHungerRate = function (amt, p) {
        if (amt === void 0) { amt = 0.001; }
        return p.map(amt, 0, 100, 0, 1);
    };
    /**
     * get the health as a percentage value
     * @returns the health percentage
     */
    Fish.prototype.getHealth = function (p) {
        return p.floor(p.map(this.health, 0, 1, 0, 100));
    };
    /**
     * sets the target
     * @param {Object} target
     */
    Fish.prototype.setTarget = function (target) {
        this.target = target;
    };
    /**
     * get the hunger as a percentage value
     * @returns the hunger percentage
     */
    Fish.prototype.getHunger = function (p) {
        return p.floor(p.map(this.hunger, 0, 1, 0, 100));
    };
    /**
     * quickly chases after a position.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} speed
     * @returns p5.Vector
     */
    Fish.prototype.seek = function (target, speed) {
        // check the distance between the target and self 
        var direction = p5.Vector.sub(target, this.position);
        // get the magnitude of this vector
        var d = direction.mag();
        // // scale the magnitude based on distance
        // if (d < 100) {
        //   let m = map(d, 0, 100, 0, speed);
        //   direction.setMag(m);
        // } else {
        //   direction.setMag(speed);
        // }
        // create a vector from the current velocity to the desired velocity 
        // [!Note make this a separate function]
        var steer = p5.Vector.sub(direction, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    };
    /**
     * Chases and then eats the target.
     * @param {Object} target
     * @param {Object} world
     */
    Fish.prototype.hunt = function (target, world, p) {
        var position = this.position;
        if (this.isHungry && !target.isDead) {
            var dis = p.dist(target.position.x, target.position.y, position.x, position.y);
            this.chase(p5.Vector.add(target.position, target.velocity), p);
            if (dis < this.killRange && !target.isDead && target !== world) {
                target.die();
                this.eat(target);
                // target = null;
            }
        }
    };
    /**
     * the fish wanders around
     */
    Fish.prototype.wander = function (p) {
        var _this = this;
        var wanderPoint = this.velocity.copy();
        wanderPoint.setMag(100);
        wanderPoint.add(this.position);
        this.wireframe(function (d) {
            return p.line(_this.position.x, _this.position.y, wanderPoint.x, wanderPoint.y);
        }, p);
        var wanderRadius = 50;
        this.wireframe(function (d) {
            return p.circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2);
        }, p);
        var theta = this.wanderTheta + this.velocity.heading();
        var x = wanderRadius * p.cos(theta);
        var y = wanderRadius * p.sin(theta);
        wanderPoint.add(x, y);
        this.wireframe(function (d) {
            return p.line(_this.position.x, _this.position.y, wanderPoint.x, wanderPoint.y);
        }, p);
        this.wireframe(function (d) { return p.circle(wanderPoint.x, wanderPoint.y, 10); }, p);
        this.addForce(this.seek(wanderPoint, this.maxSpeed * 0.1), p);
        var displacementRange = p.random(0.2, 0.8);
        this.wanderTheta += p.random(-displacementRange, displacementRange);
    };
    Fish.prototype.chase = function (prey, p) {
        var _this = this;
        var force = this.seek(prey, this.maxSpeed);
        this.addForce(force, p);
        this.wireframe(function (d) {
            return p.line(prey.x, prey.y, _this.position.x, _this.position.y);
        }, p);
        // console.log(dis)
    };
    Fish.prototype.eat = function (prey) {
        if (prey.nutrients) {
            this.hunger -= prey.nutrients;
        }
    };
    /**
     * runs the fish
     * @param {Array} flock the flock this fish belongs to.
     */
    Fish.prototype.run = function (world, water, p) {
        this.forces(world, water, p);
        this.update();
        this.show(p);
        this.boundaries(0, 0.5, p);
        this.debug("off");
        this.hungerEffects(p);
        this.healthEffects(p);
        this.search(world, p);
        world.addThis(this);
        // Execute behavior
        if (this.mode === "fleeing") {
            this.flee(this.target, p);
        }
        else if (this.mode === "hunting") {
            this.hunt(this.target, world, p);
        }
        else {
            this.wander(p);
        }
    };
    Fish.prototype.flock = function (boids, p) {
        var separation = this.separate(boids, p);
        var alignment = this.align(boids, p);
        var cohesion = this.cohere(boids, p);
        separation.mult(1.2);
        alignment.mult(0.9);
        cohesion.mult(0.2);
        this.addForce(separation, p);
        this.addForce(cohesion, p);
        this.addForce(alignment, p);
    };
    Fish.prototype.align = function (boids, p) {
        var neighborDistance = 50;
        var sum = p.createVector(0, 0);
        var count = 0;
        for (var _i = 0, boids_1 = boids; _i < boids_1.length; _i++) {
            var other = boids_1[_i];
            var d = p5.Vector.dist(this.position, other.position);
            if (this != other && d < neighborDistance) {
                sum.add(other.velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.setMag(this.maxSpeed);
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        }
        else {
            return p.createVector(0, 0);
        }
    };
    Fish.prototype.separate = function (fish, p) {
        var desiredSeparation = this.r;
        var sum = p.createVector(0, 0);
        var count = 0;
        for (var _i = 0, fish_1 = fish; _i < fish_1.length; _i++) {
            var other = fish_1[_i];
            var d = p5.Vector.dist(this.position, other.position);
            if (this !== other && d < desiredSeparation) {
                var diff = p5.Vector.sub(this.position, other.position);
                diff.setMag(1 / d);
                sum.add(diff);
                count++;
            }
        }
        if (count > 0) {
            sum.setMag(this.maxSpeed);
            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        }
        else {
            return p.createVector(0, 0);
        }
    };
    Fish.prototype.cohere = function (boids, p) {
        var neighborDistance = 50;
        var sum = p.createVector(0, 0);
        var count = 0;
        for (var _i = 0, boids_2 = boids; _i < boids_2.length; _i++) {
            var other = boids_2[_i];
            var d = p5.Vector.dist(this.position, other.position);
            if (this != other && d < neighborDistance) {
                sum.add(other.position);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum, this.maxSpeed);
        }
        else {
            return p.createVector(0, 0);
        }
    };
    Fish.prototype.closest = function (visible, p) {
        // check if the array is empty
        if (visible.length > 0) {
            var lowest = visible[0];
            var lowestDist = p.dist(lowest.position.x, lowest.position.y, this.position.x, this.position.y);
            // check each visible food, and determine the nearest one.
            for (var i = 1; i < visible.length; i++) {
                var o = visible[i];
                var d = p.dist(o.position.x, o.position.y, this.position.x, this.position.y);
                if (d < lowestDist) {
                    lowest = visible[i];
                    lowestDist = d;
                }
            }
            return lowest;
        }
    };
    Fish.prototype.visible = function (array, p) {
        var visible = [];
        //  check for visible food
        if (array.length > 0) {
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var x = array_1[_i];
                if (x != this) {
                    var d = p.dist(x.position.x, x.position.y, this.position.x, this.position.y);
                    if (d <= this.vision && x != this && !x.isDead) {
                        visible.push(x);
                    }
                }
            }
            return visible;
        }
    };
    Fish.prototype.sense = function (world, p) {
        var inRange = this.visible(world.contents, p);
        if (inRange) {
            return inRange;
        }
    };
    Fish.prototype.healthEffects = function (p) {
        var fullForce = this.maxForce;
        var test = p.random(0, 1);
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
    };
    Fish.prototype.hungerEffects = function (p) {
        if (this.hunger < 1) {
            this.hunger += 0.001;
        }
        if (this.hunger > 0.1) {
            this.isHungry = true;
        }
        else {
            this.isHungry = false;
        }
        if (this.hunger > 0.9 && this.health > 0) {
            this.health -= 0.0002;
        }
        else if (this.hunger < 0.5 && this.health < 1) {
            this.health += 0.001;
        }
    };
    Fish.prototype.flee = function (predator, p) {
        var desired = p5.Vector.sub(this.position, predator.position);
        var d = desired.mag();
        if (d === 0)
            return;
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.fleeStrength);
        this.addForce(steer, p);
    };
    Fish.prototype.search = function (world, p) {
        var _this = this;
        var found = this.sense(world, p);
        if (!found || found.length === 0) {
            this.mode = "default";
            return;
        }
        // 1. Flee has highest priority
        var predator = found.find(function (x) { return x.type === _this.predator; });
        if (predator) {
            this.target = predator;
            this.mode = "fleeing";
        }
        // 2. Hunt if hungry and safe
        else if (this.isHungry) {
            var prey = found.find(function (x) { return x.type === _this.prey; });
            if (prey) {
                this.target = prey;
                this.mode = "hunting";
            }
            else {
                this.mode = "default";
            }
        }
        // 3. Default behavior
        else {
            this.mode = "default";
        }
    };
    Fish.prototype.show = function (p) {
        var _this = this;
        var angle = this.velocity.heading();
        p.push();
        // calibrate the fish position
        p.translate(this.position.x, this.position.y);
        p.push();
        p.translate(this.r, this.r);
        // the initial rotation to calibrate the fish
        p.rotate(p.HALF_PI);
        p.pop();
        // rotate in the direction of the current velocity
        p.rotate(angle);
        // wireframe the current position (debug)
        this.wireframe(function (d) { return p.rect(-_this.r, -_this.r / 2, _this.r, _this.r); }, p);
        p.angleMode(p.RADIANS);
        // flip the image depending on the direction of the fish
        if (this.direction == "right") {
            p.image(this.img, -this.r, -this.r / 2, this.r, this.r);
        }
        else {
            p.scale(1, -1);
            p.image(this.img, -this.r, -this.r / 2, this.r, this.r);
        }
        p.pop();
        // check the direction
        if (angle > -1 && angle < 1) {
            this.direction = "right";
        }
        else {
            this.direction = "left";
        }
        // wireframe the kill range (debug)
        this.wireframe(function (p) {
            return p.circle(_this.position.x, _this.position.y, _this.killRange);
        }, p);
    };
    return Fish;
}(Mover));
var SchoolFish = /** @class */ (function (_super) {
    __extends(SchoolFish, _super);
    function SchoolFish(x, y, r, img, p) {
        var _this = _super.call(this, x, y, r, img, p) || this;
        _this.type = 'schoolfish';
        _this.prey = 'food';
        _this.predator = 'predator';
        _this.nutrients = 0.3;
        return _this;
    }
    return SchoolFish;
}(Fish));
export { SchoolFish };
var Predator = /** @class */ (function (_super) {
    __extends(Predator, _super);
    function Predator(x, y, r, img, p) {
        var _this = _super.call(this, x, y, r, img, p) || this;
        _this.type = "predator";
        _this.prey = "schoolfish";
        _this.mass = 0.1;
        _this.volume = 1;
        _this.maxSpeed = 7;
        _this.maxForce = 0.15;
        _this.isDead = false;
        _this.isEdible = false;
        _this.vision = 100;
        _this.killRange = r / 2;
        return _this;
    }
    return Predator;
}(Fish));
export { Predator };
/**
 * Flock class
 */
var Flock = /** @class */ (function () {
    /**
     * constructor
     */
    function Flock() {
        this.boids = [];
    }
    /**
     * runs the boids
     */
    Flock.prototype.run = function (world, water) {
        for (var _i = 0, _a = this.boids; _i < _a.length; _i++) {
            var boid = _a[_i];
            boid.run(world, water);
            boid.flock(this.boids);
            boid.debug('off');
            boid.deathCheck(world, this.boids);
            // TESTING
            boid.setFleeStrength(0.07);
        }
    };
    /**
     * adds a boid to the array
     * @param {Object} boid
     */
    Flock.prototype.addBoid = function (boid) {
        this.boids.push(boid);
    };
    return Flock;
}());
export { Flock };
