 /**
  * Fish class
  */
class Fish{
     /**
     * Fish class constructor.
     * @param {string} img file path to the image
     * @param {number} x the x-coordinate to initiate the fish
     * @param {any} y the y-coordinate to initiate the fish
     * @param {any} r the radius of the fish
     * @property {Object} P5.Vector 
     * @returns {Object} Fish 
     * @todo 
     * - I need to re-integrate the physics system, and create a seek method, and a way to update the rotation based on the current velocity heading.
     */
    constructor(img, x, y, r) {
        this.r = r;
        this.img = img
        this.x = x
        this.y = y
        this.position = createVector(this.x, this.y)
        this.velocity = createVector(0, 0)
        this.acceleration = createVector(0,0)
    }

    /**
     * Description
     * @returns {Vector} The current position of the object.
     */

    getPosition(){
        return this.position;
    }
    /**
     * Draws the Fish object.
     * @returns {any}
     */
    show(){
        image(this.img, 0, 0, this.r, this.r)
    }

    /**
     * Increases the acceleration according to the force being applied.
     * @param {Vector} force
     * @returns {null}
     */
    addForce(force){
        this.acceleration.add(force)
    }

    /**
     * Adds any acceleration, updates the position, then sets acceleration to zero.
     * @returns {null}
     */
    update(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0)
    }
}

