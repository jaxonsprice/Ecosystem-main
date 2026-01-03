import p5 from "p5";
var Mover = /** @class */ (function () {
    function Mover(x, y, r, p) {
        this.r = r;
        this.mass = 3;
        this.volume = 6;
        this.position = p.createVector(x, y);
        this.x = this.position.x;
        this.y = this.position.y;
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
        this.maxSpeed = 15;
        this.maxForce = 0.5;
        this.debugMode = false;
        this.isDead = false;
        this.isEdible = false;
    }
    Mover.prototype.setMass = function (mass) {
        this.mass = mass;
    };
    Mover.prototype.setVolume = function (v) {
        this.volume = v;
    };
    Mover.prototype.setRadius = function (r) {
        this.r = r;
    };
    Mover.prototype.setMaxForce = function (maxForce) {
        this.maxForce = maxForce;
    };
    Mover.prototype.setmaxSpeed = function (maxSpeed) {
        this.maxSpeed = maxSpeed;
    };
    /**
     * Description
     * @returns {Vector} The current position of the object.
     */
    Mover.prototype.getPosition = function () {
        return this.position;
    };
    /**
     * Increases the acceleration according to the force being applied.
     * @param {Vector} force
     * @returns {null}
     */
    Mover.prototype.deathCheck = function (world, array) {
        var i = array.indexOf(this);
        if (this.isDead && i !== -1) {
            if (i !== -1)
                array.splice(i, 1);
            var w = world.contents.indexOf(this);
            if (w !== -1)
                world.contents.splice(w, 1);
        }
    };
    Mover.prototype.addForce = function (force, p) {
        var _this = this;
        this.acceleration.add(force);
        this.wireframe(function (d) {
            var direction = p5.Vector.add(_this.position, _this.velocity);
            p.line(_this.position.x, _this.position.y, direction.x, direction.y);
        }, p);
    };
    /**
     *
     * @param {Number} offset
     */
    Mover.prototype.boundaries = function (offset, str, p) {
        var desired = null;
        if (this.position.x < offset) {
            desired = p.createVector(this.maxSpeed, this.velocity.y);
        }
        else if (this.position.x > p.width - offset) {
            desired = p.createVector(-this.maxSpeed, this.velocity.y);
        }
        if (this.position.y < offset) {
            desired = p.createVector(this.velocity.x, this.maxSpeed);
        }
        else if (this.position.y > p.height - offset) {
            desired = p.createVector(this.velocity.x, -this.maxSpeed);
        }
        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxSpeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(str);
            this.addForce(steer, p);
        }
    };
    Mover.prototype.forces = function (world, water, p) {
        // weight = gravity * mass
        var weight = p5.Vector.mult(world.gravity, this.mass);
        // buoyancy = volume * gravity
        var buoyancy = water.buoyancyForce(this.volume, world.gravity);
        // add forces
        this.addForce(weight, p);
        this.addForce(world.current, p);
        if (water.contains(this)) {
            this.addForce(buoyancy, p);
            this.applyDrag(p);
        }
    };
    Mover.prototype.die = function () {
        this.isDead = true;
    };
    /**
     * Adds any acceleration, updates the position, then sets acceleration to zero.
     * @returns {null}
     */
    Mover.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };
    /**
     * Requires a debug variable
     * @param {String} string 'on' or 'off'. when set to 'on', the debug function will activate
     */
    Mover.prototype.debug = function (string) {
        if (string === 'on') {
            this.debugMode = true;
        }
        else {
            this.debugMode = false;
        }
    };
    /**
     * A debugging function. Automatically styled and only activated when debug is set to 'on'
     * @param {Function} drawing a function to draw
     * @returns
     */
    Mover.prototype.wireframe = function (drawing, p) {
        if (this.debugMode == true) {
            p.strokeWeight(1.5);
            p.noFill();
            p.stroke('green');
            drawing();
        }
        else
            return;
    };
    Mover.prototype.applyDrag = function (p) {
        var speed = this.velocity.mag();
        if (speed > 0) {
            var dragMag = 0.02 * speed * speed;
            var drag = this.velocity.copy();
            drag.normalize();
            drag.mult(-dragMag);
            this.addForce(drag, p);
        }
    };
    return Mover;
}());
export { Mover };
