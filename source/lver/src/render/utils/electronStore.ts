class ElectroeStoreManager {
  store: any
  init() {
    const Store = require('electron-store')

    this.store = new Store()
  }
}
const electronStore = new ElectroeStoreManager()
electronStore.init()
export {
  electronStore
}