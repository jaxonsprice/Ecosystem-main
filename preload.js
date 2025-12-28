const { contextBridge, ipcRenderer } = require('electron')

console.log('preload loaded')  // should appear in DevTools

contextBridge.exposeInMainWorld('api', {
  getImages: () => {
    console.log('getImages called') // should appear in DevTools
    return ipcRenderer.invoke('get-images')
  }
})