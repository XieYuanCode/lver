import ILogRule from "./iLogRule";

/**
 * @interface ILog 日志接口
 */
export default interface ILog {
  /**
   * 日志名称
   */
  name: string
  /**
   * 日志id
   */
  uuid: number
  /**
   * 日志文件路径
   */
  file: string | null
  /**
   * 日志md5码
   */
  hash: string
  /**
   * 记录时间
   */
  recordDate: Date
  /**
   * 是否分析成功表示
   */
  analyseSuccessful: boolean

  /**
   * 根据特定的日志定义器分析日志
   * @param { ILogRulefiniens 日志定义器
   */
  analyse: (rule: ILogRule) => void

  /**
   * 自动根据现有日志定义器尝试分析
   * @returns { Boolean } 是否分析成功
   */
  autoAnalyse: () => Boolean
}