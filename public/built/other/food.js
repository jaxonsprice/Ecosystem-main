var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Mover } from "../physics/mover";
import p5 from "p5";
var Food = /** @class */ (function (_super) {
    __extends(Food, _super);
    function Food(x, y, r, p) {
        var _this = _super.call(this, x, y, r, p) || this;
        _this.mass = 0.02;
        _this.volume = .01;
        _this.maxSpeed = 7;
        _this.maxForce = 0;
        _this.isEdible = true;
        _this.nutrients = 0.05;
        _this.type = "food";
        return _this;
    }
    Food.prototype.show = function (p) {
        p.fill("orange");
        p.circle(this.position.x, this.position.y, this.r);
    };
    // r(x: any, y: any, r: any) {
    //   throw new Error("Method not implemented.");
    // }
    Food.prototype.run = function (world, water, p) {
        this.show(p);
        this.forces(world, water);
        this.addForce(p5.Vector.mult(world.gravity, this.mass));
        this.addForce(world.current);
        this.boundaries(0, 0.5);
        this.update();
        world.addThis(this);
    };
    Food.prototype.forces = function (world, water) {
        throw new Error("Method not implemented.");
    };
    Food.prototype.addForce = function (arg0) {
        throw new Error("Method not implemented.");
    };
    Food.prototype.boundaries = function (arg0, arg1) {
        throw new Error("Method not implemented.");
    };
    Food.prototype.update = function () {
        throw new Error("Method not implemented.");
    };
    return Food;
}(Mover));
export { Food };
