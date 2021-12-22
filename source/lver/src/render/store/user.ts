import { electronStore } from "../utils/electronStore";

export enum LoginType {
  Github = "Github",
  Gitee = "Gitee"
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
   * 登录状态
   */
  logined: boolean
  /**
   * 登录类型
   */
  type: LoginType | null
  /**
   * 用户名
   */
  name: string | null
  /**
   * 用户头像
   */
  avatar: string | null

  /**
   * 个性签名
   */
  bio: string | null

  /**
   * 博客
   */
  blog: string | null

  /**
   * 主页
   */
  html_url: string | null
  /**
   * 云储存详情
   */
  cloud: IUserCloudInfo,
}

const user = {
  state() {
    return {
      logined: electronStore.store.get("user.logined", false),
      type: electronStore.store.get("user.type", null),
      name: electronStore.store.get("user.name", null),
      avatar: electronStore.store.get("user.avatar", null),
      bio: electronStore.store.get("user.bio", null),
      blog: electronStore.store.get("user.blog", null),
      html_url: electronStore.store.get("user.html_url", null),
      cloud: {
        log_counts: 15,
        used_size: 125670,
        total_size: 1048576,
        used_percent: 11
      }
    }
  },
  mutations: {
    login(state: IUserState, { type, name, avatar, html_url, bio, blog }: { type: LoginType, name: string, avatar: string, html_url: string, bio: string, blog: string }) {
      state.logined = true
      electronStore.store.set("user.logined", true)
      state.avatar = avatar
      electronStore.store.set("user.avatar", avatar)
      state.name = name
      electronStore.store.set("user.name", name)
      state.type = type
      electronStore.store.set("user.type", type)
      state.html_url = html_url
      electronStore.store.set("user.html_url", html_url)
      state.bio = bio
      electronStore.store.set("user.bio", bio)
      state.blog = blog
      electronStore.store.set("user.blog", blog)
    },
    logout(state: IUserState) {
      state.type = null
      electronStore.store.set("user.type", null)
      state.logined = false
      electronStore.store.set("user.logined", false)
      state.avatar = null
      electronStore.store.set("user.avatar", null)
      state.name = null
      electronStore.store.set("user.name", null)
      state.html_url = null
      electronStore.store.set("user.html_url", null)
      state.bio = null
      electronStore.store.set("user.bio", null)
      state.blog = null
      electronStore.store.set("user.blog", null)
    }
  }
}

export default user