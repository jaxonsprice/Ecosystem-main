class SchoolFish extends Fish {
    constructor(x, y, r, img) {
        super(x, y, r, img)
        this.type = 'schoolfish'
        this.prey = 'food';
        this.predator = 'predator'
        this.nutrients = 0.05
    }


}