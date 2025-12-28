class Food extends Mover {

    constructor(x, y, r) {
        super(x, y, r)
        this.mass = .9
        this.volume = 1
        this.maxSpeed = 5
        this.maxForce = 2
        this.isEdible = true;
        this.nutrients = .05;
        this.type = 'food'
    }

    show() {
        fill('orange')
        circle(this.position.x, this.position.y, this.r)
    }
    run() {
        this.show();
        this.forces(world, water)
        this.addForce(p5.Vector.mult(world.gravity, this.mass))

        this.boundaries(0)
        this.update()



        world.addThis(this);



    }
}