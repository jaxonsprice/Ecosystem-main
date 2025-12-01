class Liquid {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.w = displayWidth ;
        this.h = displayHeight;
       
        // coefficient of drag
        this.c = 0.1
    }

    // checks if the object is within the liquid object
    contains(mover){
        let pos = mover.position;
        return (pos.x > this.x 
            && pos.x < this.x + this.w 
            && pos.y > this.y 
            && pos.y < this.y + this.h)
    }

    applyForces(mover){
        if (this.contains(mover)) {

            console.log(mover + 'is in the water')
            let speed = mover.velocity.mag();
            let dragMagnitude = 0.5 * this.c * speed * speed;
            let dragForce = mover.velocity.copy();
            dragForce.mult(-1);
            dragForce.setMag(dragMagnitude);
            mover.addForce(dragForce)

            // calculate buoyancy
            let density = 0.1
            let buoyancyMag = density ;
            let buoyancy = createVector(0, -buoyancyMag);
            mover.addForce(buoyancy)
        }
    }

    show() {
        noStroke()
        rectMode(CORNER)
        fill(0, 100, 255)
        rect(this.x, this.y, this.w, this.h)
       
    }
}