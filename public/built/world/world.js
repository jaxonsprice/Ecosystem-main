var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { File } from "../data/file";
import { Predator, SchoolFish, Flock } from "../creatures/fish";
import { Water } from "../world/water";
import { Food } from "../other/food";
/**
 * Holds the world info and it's methods.
 * @returns {World}
 */
var World = /** @class */ (function () {
    function World(p) {
        this.gravity = p.createVector(0, 0.5);
        this.current;
        this.contents = [];
        this.isEdible = false;
        this.predator;
        this.water;
        this.flock;
        this.foods = [];
        this.sound;
        this.file;
    }
    World.prototype.addThis = function (i) {
        if (!this.contents.includes(i) && i != this) {
            this.contents.push(i);
        }
    };
    World.prototype.run = function (p) {
        var str = 0.1;
        var n = p.noise(0.005 * p.frameCount);
        var dir = p.map(n, 0, 1, -str, str);
        this.current = p.createVector(dir, 0);
    };
    World.prototype.setup = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var images, addresses, i, _a, _b, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        p.createCanvas(p.windowWidth, p.windowHeight);
                        this.file = new File();
                        this.flock = new Flock();
                        this.water = new Water(0, p.height / 3, p.width, p.height, p);
                        return [4 /*yield*/, this.file.loadImageList()];
                    case 1:
                        images = _c.sent();
                        addresses = this.file.getAddresses(images);
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < addresses.length)) return [3 /*break*/, 5];
                        _a = this.file.images;
                        _b = i;
                        return [4 /*yield*/, this.file.loadFish(addresses, i)];
                    case 3:
                        _a[_b] = _c.sent();
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.predator = new Predator(p.random(0, p.width), p.random(0, p.height), 35, this.file.getFish(1), p);
                        for (i = 0; i < 200; i++) {
                            this.flock.addBoid(new SchoolFish(p.random(0, p.width), p.random(0, p.height), 10, this.file.getFish(3), p));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    World.prototype.draw = function (p) {
        var x = p.random(0, 1);
        if (x < 0.05 && this.foods.length < 50) {
            this.foods.push(new Food(p.random(0, p.width), p.random(0, p.height), 1.5, p));
        }
        p.background("#e9d87bff");
        p.noStroke();
        this.water.show();
        this.predator.run(this.world, this.water);
        this.world.run(p);
        this.flock.run(this.world, this.water);
        for (var _i = 0, _a = this.foods; _i < _a.length; _i++) {
            var food = _a[_i];
            food.run(this.world, this.water);
            food.deathCheck(this.world, this.foods);
        }
    };
    return World;
}());
export { World };
