import ILogRule from "../model/iLogRule";

class LogRuleManager {
  private _logRules: ILogRule[] = []

  /**
   * 注册一个日志规则
   * @param logRule 日志规则
   */
  registerLogRule(logRule: ILogRule) {
    const isExist = this.isExist(logRule)

    !isExist && this._logRules.push(logRule)
  }

  /**
   * 判断日志规则是否存在
   * @param targetLogRule 
   * @returns 
   */
  isExist(targetLogRule: ILogRule): boolean {
    return !!this._logRules.find(logRule => logRule._$name === targetLogRule._$name)
  }

  getLogRuleByName(name: string): ILogRule | undefined {
    return this._logRules.find(logRule => logRule._$name === name)
  }
}

const logRuleManager = new LogRuleManager()

export { logRuleManager }