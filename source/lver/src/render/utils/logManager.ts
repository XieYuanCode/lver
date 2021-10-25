import ILog from "../model/iLog"

/**
 * @class 日志管理器
 */
class LogManager {
  /**
   * 日志集合
   */
  private _logs: Set<ILog> = new Set<ILog>()

  /**
   * 注册一个日志实例 
   * @param { ILog } log 日志实例 
   */
  public registerLog(log: ILog) {
    log.analyseSuccessful && this._logs.add(log)
  }

  /**
   * 注册多个日志实例 
   * @param logs 多个日志实例=集合
   */
  public registerLogs(logs: Set<ILog>) {
    logs.forEach(log => {
      log.analyseSuccessful && this._logs.add(log)
    })
  }

  /**
   * 根据名称获取日志示例
   * @param { string } name 日志名称
   */
  public getLogByName(name: string): ILog | null {
    let targetLog: ILog | null = null;
    this._logs.forEach(log => {
      targetLog = (log.name === name) ? log : null
    })
    return targetLog
  }

  /**
   * 根据uuid获取日志示例
   * @param { number } uuid 日志uuid
   */
  public getLogByUuid(uuid: string): ILog | null {
    let targetLog: ILog | null = null;
    this._logs.forEach(log => {
      targetLog = (log.uuid === uuid) ? log : null
    })
    return targetLog
  }

  /**
   * 获取一个时间间隔内的所有日志
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  public getLogByDateSpan(startDate: Date, endDate: Date): Set<ILog> {
    let targetLogs = new Set<ILog>();

    this._logs.forEach(log => {
      let startTime = startDate.getTime()
      let endTime = endDate.getTime()

      if (startTime < log.recordDate.getTime() && startTime < endTime) {
        targetLogs.add(log)
      }
    })

    return targetLogs
  }

  /**
   * 获取所有日志示例
   * @returns 
   */
  public getAllLog(): Set<ILog> {
    return this._logs
  }
}

export default new LogManager()