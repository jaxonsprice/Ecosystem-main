import p5 from "p5";
var Water = /** @class */ (function () {
    function Water(x, y, w, h, p) {
        this.position = p.createVector(x, y);
        this.w = w;
        this.h = h;
        this.density = 1;
    }
    Water.prototype.show = function (p) {
        p.fill('#162a90ff');
        p.rect(this.position.x, this.position.y, this.w, this.h);
    };
    Water.prototype.buoyancyForce = function (vol, gravity, submergedRatio) {
        if (submergedRatio === void 0) { submergedRatio = 1; }
        return p5.Vector
            .mult(gravity, vol * submergedRatio)
            .mult(this.density)
            .mult(-1);
    };
    Water.prototype.contains = function (i) {
        if (i.position.y >= this.position.y) {
            return true;
        }
    };
    return Water;
}());
export { Water };
