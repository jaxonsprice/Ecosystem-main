class Water {
    constructor(x, y, w, h) {
        this.position = createVector(x, y)
        this.w = w;
        this.h = h;
        this.density = 1;
    }
    show() {
        fill('#162a90ff');
        rect(this.position.x, this.position.y, this.w, this.h)
    }
   buoyancyForce(vol, gravity, submergedRatio = 1) {
  return p5.Vector
    .mult(gravity, vol * submergedRatio)
    .mult(this.density)
    .mult(-1);
}

	
	contains(i) {
		if (i.position.y >= this.position.y) {
			return true;
		}
	}
}