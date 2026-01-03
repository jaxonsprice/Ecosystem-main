export {}

declare global {
  interface Window {
    api: {
      getImages: () => Promise<any>
    }
  }
}