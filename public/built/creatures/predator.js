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
var Predator = /** @class */ (function (_super) {
    __extends(Predator, _super);
    function Predator(x, y, r, img) {
        var _this = _super.call(this, x, y, r, img) || this;
        _this.type = "predator";
        _this.prey = "schoolfish";
        _this.mass = 0.1;
        _this.volume = 1;
        _this.maxSpeed = 7;
        _this.maxForce = 0.15;
        _this.isDead = false;
        _this.isEdible = false;
        _this.vision = 100;
        _this.killRange = r / 2;
        return _this;
    }
    return Predator;
}(Fish));
