/**
 * @interface ILogRule 日志定义器
 */
export default interface ILogRule {
  _$name: string,
  keys: string[]
  analyse(str: string): any
}

export enum LogLevel {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL",
  UNKNOW = "UNKNOW"
}


class Log4JSBasic implements ILogRule {
  _$name: string = "log4js_basic"
  keys = ["timestamp", "level", "module", "message"]

  // [2017-03-30 07:57:00.113] [ERROR] cheese - Cheese is too ripe!
  // [timestamp] [level] [module] - [message]
  analyse(str: string) {
    const [logInfo, message] = str.split(' - ')
    const [timestamp, level, module] = logInfo.replace(/\[/g, '').replace(/\]/g, '').split(" ")

    const result: any = new Object()
    result["timestamp"] = timestamp

    switch (level) {
      case LogLevel.TRACE:
        result['level'] = LogLevel.TRACE
        break;
      case LogLevel.DEBUG:
        result['level'] = LogLevel.DEBUG
        break;
      case LogLevel.INFO:
        result['level'] = LogLevel.INFO
        break;
      case LogLevel.WARN:
        result['level'] = LogLevel.WARN
        break;
      case LogLevel.ERROR:
        result['level'] = LogLevel.ERROR
        break;
      case LogLevel.FATAL:
        result['level'] = LogLevel.FATAL
        break;
    }

    result['module'] = module
    result['message'] = message

    return result
  }
}

const log4JSBasic = new Log4JSBasic()

export {
  log4JSBasic
}