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
