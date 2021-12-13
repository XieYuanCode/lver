export enum LoginType {
  Github,
  Gitee
}
export interface IUserState {
  type: LoginType
  name: string
  avatar: string
  logined: boolean
}

const user = {
  state() {
    return {
      type: LoginType.Github,
      name: "xieyuan",
      avatar: "",
      logined: false
    }
  },
  mutations: {
    login(state: IUserState, { type, name, avatar }) {
      state.logined = true
      state.avatar = avatar
      state.name = name
      state.type = type
    },
    logout(state: IUserState) {
      state.logined = false
    }
  }
}

export default user