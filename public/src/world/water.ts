import p5 from "p5"

export class Water {
    position: any;
    w: any;
    h: any;
    density: number;
    constructor(x, y, w, h, private p:p5) {
        this.position = this.p.createVector(x, y)
        this.w = w;
        this.h = h;
        this.density = 1;
    }
    show() {
        this.p.fill('#162a90ff');
        this.p.rect(this.position.x, this.position.y, this.w, this.h)
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