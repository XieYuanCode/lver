export enum LoginType {
  Github,
  Gitee
}
export interface IUserCloudInfo {
  /**
   * 日志数量
   */
  log_counts: number
  /**
   * 已用
   */
  used_size: number
  /**
   * 总量
   */
  total_size: number
  /**
   * 已用百分比
   */
  used_percent: number
}
export interface IUserState {
  /**
   * 登录类型
   */
  type: LoginType
  /**
   * 用户名
   */
  name: string
  /**
   * 用户头像
   */
  avatar: string
  /**
   * 登录状态
   */
  logined: boolean

  /**
   * 主页
   */
  html_url: string,
  /**
   * 云储存详情
   */
  cloud: IUserCloudInfo,
  registry_date: Date
  login_times: number

}

const user = {
  state() {
    return {
      type: LoginType.Github,
      name: "xieyuan",
      registry_date: new Date(),
      login_times: 14,
      avatar: "",
      logined: false,
      cloud: {
        log_counts: 15,
        used_size: 125670,
        total_size: 1048576,
        used_percent: 11
      }
    }
  },
  mutations: {
    login(state: IUserState, { type, name, avatar, html_url }) {
      state.logined = true
      state.avatar = avatar
      state.name = name
      state.type = type
      state.html_url = html_url
    },
    logout(state: IUserState) {
      state.type = LoginType.Github
      state.logined = false
      state.avatar = ""
      state.name = ""
      state.html_url = ""
    }
  }
}

export default user