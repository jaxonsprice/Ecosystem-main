import p5 from "p5"

export class File {
  images: any[]
  imageFiles: null
  constructor(private p:p5) {
    this.images = []
    this.imageFiles = null
  }

  // async loadImageList() {
  //   let window: Window;
  //   const response = await window.api.getImages()
  //   this.imageFiles = response
  //   return response
  // }

  getAddresses(f) {
    let imges = Object.values(f)
    let files:any= imges[0]
    return files.filter(item => item.endsWith('.png'))
  }

  loadFish(addresses, i) {
    // IMPORTANT: remove leading slash
    return this.p.loadImage('images/' + addresses[i])
  }

  getRandomFish() {
    let r = this.p.floor(this.p.random(this.images.length))
    return this.images[r]
  }

  getFish(n) {
    console.log(this.imageFiles)
    return this.images[n]
  }
}
