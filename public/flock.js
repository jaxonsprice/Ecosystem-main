/**
 * Flock class
 */
class Flock {
    /**
     * constructor
     */
    constructor() {
        this.boids = []
    }
    /**
     * runs the boids
     */
    run(world, water) {
        for (let boid of this.boids) {
            boid.run(world, water)
            boid.flock(this.boids)
            boid.debug('off')
            boid.deathCheck(world, this.boids)
        }

    }
    /**
     * adds a boid to the array
     * @param {Object} boid 
     */
    addBoid(boid) {
        this.boids.push(boid)
    }
}