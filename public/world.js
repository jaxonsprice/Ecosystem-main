/**
 * Holds the world info and it's methods.
 * @returns {World}
 */
class World {
	constructor() {
		this.gravity = createVector(0, .5);
        this.current;
        this.contents = [];
        this.isEdible = false;
	}
    addThis(i) {
		if (!this.contents.includes(i) && i != this) {
			this.contents.push(i)
		}
    }
    run() {
        let str = 0.01;
        let n = noise(0.005 * frameCount)
        let dir = map(n, 0, 1, -str, str)
        this.current = createVector( dir , 0)
    
        let windMarker = this.current.copy().mult(500)
        push()
        translate(200, 100)
        text('wind', -15, -15)
        stroke('black')
        line(0, 0, windMarker.x, windMarker.y)
        fill('red')
        circle(windMarker.x, windMarker.y, 10)
        pop()

    
    }

}