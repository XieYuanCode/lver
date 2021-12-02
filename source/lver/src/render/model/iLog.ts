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
   * 文件名
   */
  filename: string
  /**
   * 日志id
   */
  uuid: string
  /**
   * 日志文件路径
   */
  file: string
  /**
   * 日志md5码
   */
  hash: string
  /**
   * 记录时间
   */
  recordDate: Date
  /**
   * 最后修改时间
   */
  lastModifiedData?: Date
  /**
   * 是否分析成功表示
   */
  analyseSuccessful: boolean
  /**
   * 绑定的规则
   */
  rule?: ILogRule

  [key: string]: any

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

export class Log implements ILog {
  filename: string;
  name: string;
  uuid: string;
  file: string;
  hash: string;
  recordDate: Date;
  analyseSuccessful: boolean = false;
  lastModifiedData?: Date;
  rule?: ILogRule;

  constructor(filename: string, uuid: string, file: string) {
    this.filename = filename
    this.uuid = uuid
    this.name = filename
    this.file = file
    this.hash = "todo"
    this.recordDate = new Date()
  }

  public analyse(rule: ILogRule) { }

  public autoAnalyse() {
    return true
  }
}