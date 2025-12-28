class File {
  constructor() {
    this.images = []
    this.imageFiles = null
  }

  async loadImageList() {
    const response = await window.api.getImages()
    this.imageFiles = response
    return response
  }

  getAddresses(f) {
    let imges = Object.values(f)
    let files = imges[0]
    return files.filter(item => item.endsWith('.png'))
  }

  loadFish(addresses, i) {
    // IMPORTANT: remove leading slash
    return loadImage('images/' + addresses[i])
  }

  getRandomFish() {
    let r = floor(random(this.images.length))
    return this.images[r]
  }

  getFish(n) {
    return this.images[n]
  }
}
