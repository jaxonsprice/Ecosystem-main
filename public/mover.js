class Mover {
    constructor(x, y, r) {
        this.r = r;
        this.mass = 3
        this.volume = 6
        this.position = createVector(x, y)
        this.x = this.position.x
        this.y = this.position.y
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0, 0)
        this.maxSpeed = 15;
        this.maxForce = 0.5;
        this.debugMode = false;
        this.isDead = false;
        this.isEdible = false;
    }

    /**
     * Description
     * @returns {Vector} The current position of the object.
     */

    getPosition() {
        return this.position;
    }

    /**
     * Increases the acceleration according to the force being applied.
     * @param {Vector} force
     * @returns {null}
     */

    deathCheck(world, array) {
        let i = array.indexOf(this);
        if (this.isDead && i !== -1) {

            if (i !== -1) array.splice(i, 1);

            let w = world.contents.indexOf(this);
            if (w !== -1) world.contents.splice(w, 1);
        }
    }

    addForce(force) {
        this.acceleration.add(force)
        this.wireframe(d => {

            let direction = p5.Vector.add(this.position, this.velocity)
            line(this.position.x, this.position.y, direction.x, direction.y)

        })
    }
    /**
     * 
     * @param {Number} offset 
     */
    boundaries(offset, str) {
        let desired = null;
        if (this.position.x < offset) {
            desired = createVector(this.maxSpeed, this.velocity.y);
        } else if (this.position.x > width - offset) {
            desired = createVector(-this.maxSpeed, this.velocity.y);
        }
        if (this.position.y < offset) {
            desired = createVector(this.velocity.x, this.maxSpeed);
        } else if (this.position.y > height - offset) {
            desired = createVector(this.velocity.x, -this.maxSpeed);
        }
        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxSpeed);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(str)
            this.addForce(steer)
        }
    }
    forces(world, water) {
        // weight = gravity * mass
        let weight = p5.Vector.mult(world.gravity, this.mass);

        // buoyancy = volume * gravity
        let buoyancy = water.buoyancyForce(this.volume, world.gravity)

        // add forces
        this.addForce(weight);
        this.addForce(world.current)
        if (water.contains(this)) {
            this.addForce(buoyancy)
            this.applyDrag()
        }
    }

    die() {
        this.isDead = true;
    }

    /**
     * Adds any acceleration, updates the position, then sets acceleration to zero.
     * @returns {null}
     */
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0)
    }

    /**
     * Requires a debug variable
     * @param {String} string 'on' or 'off'. when set to 'on', the debug function will activate
     */

    debug(string) {
        if (string === 'on') {
            this.debugMode = true;
        } else {
            this.debugMode = false;
        }
    }
    /**
     * A debugging function. Automatically styled and only activated when debug is set to 'on'
     * @param {Function} drawing a function to draw
     * @returns 
     */
    wireframe(drawing) {
        if (this.debugMode == true) {
            strokeWeight(1.5)
            noFill();
            stroke('green')
            drawing()
        } else return;
    }
    applyDrag() {
        let speed = this.velocity.mag();
        if (speed > 0) {
            let dragMag = 0.02 * speed * speed;
            let drag = this.velocity.copy();
            drag.normalize();
            drag.mult(-dragMag);
            this.addForce(drag);
        }
    }

}