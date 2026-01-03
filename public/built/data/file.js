var File = /** @class */ (function () {
    function File() {
        this.images = [];
        this.imageFiles = null;
    }
    // async loadImageList() {
    //   const response = await window.api.getImages()
    //   this.imageFiles = response
    //   return response
    // }
    File.prototype.getAddresses = function (f) {
        var imges = Object.values(f);
        var files = imges[0];
        return files.filter(function (item) { return item.endsWith('.png'); });
    };
    File.prototype.loadFish = function (addresses, i, p) {
        // IMPORTANT: remove leading slash
        return p.loadImage('images/' + addresses[i]);
    };
    File.prototype.getRandomFish = function (p) {
        var r = p.floor(p.random(this.images.length));
        return this.images[r];
    };
    File.prototype.getFish = function (n) {
        console.log(this.imageFiles);
        return this.images[n];
    };
    return File;
}());
export { File };
