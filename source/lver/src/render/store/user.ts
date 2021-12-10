
export interface IUserState {
  name: string
  avatar: string
  logined: boolean
}

const user = {
  state() {
    return {
      name: "xieyuan",
      avatar: "",
      logined: false
    }
  },
  mutations: {
    login(state: IUserState) {
      state.logined = true
    },
    logout(state: IUserState) {
      state.logined = false
    }
  }
}

export default user