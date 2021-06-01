import { isNil as _isNil, isEmpty as _isEmpty } from 'lodash';
export type LogLevelType = 'debug' | 'info' | 'warn' | 'error' | 'none';

const LogLevels = [
  { level: 1, type: 'debug' },
  { level: 10, type: 'info' },
  { level: 20, type: 'warn' },
  { level: 30, type: 'error' },
  { level: 99, type: 'none' },
];

export class Logger {
  public static debug(message: string | number, params?: object) {
    if (this.shouldPrintLog('debug')) {
      params
        ? console.log(`[DEBUG]${message}`, JSON.stringify(params))
        : console.log(`[DEBUG]${message}`);
    }
  }

  public static info(message: string | number, params?: object) {
    if (this.shouldPrintLog('info')) {
      params
        ? console.log(`[INFO]${message}`, JSON.stringify(params))
        : console.log(`[INFO]${message}`);
    }
  }

  public static warn(message: string | number, params?: object) {
    if (this.shouldPrintLog('warn')) {
      params
        ? console.log(`[WARN]${message}`, JSON.stringify(params))
        : console.log(`[WARN]${message}`);
    }
  }

  public static error(message: string | number, params?: object) {
    if (this.shouldPrintLog('error')) {
      params
        ? console.log(`[ERROR]${message}`, JSON.stringify(params))
        : console.log(`[ERROR]${message}`);
    }
  }

  public static exception(error: any) {
    if (this.shouldPrintLog('error')) {
      console.log(error);
    }
  }

  private static shouldPrintLog(type: LogLevelType): boolean {
    try {
      const currentLogLevel = process.env.REACT_APP_LOG_LEVEL
        ? LogLevels.find((e) => e.type === process.env.REACT_APP_LOG_LEVEL)
            ?.level
        : 10;
      const printLogLevel = LogLevels.find((e) => e.type === type)?.level;
      return (
        !_isNil(currentLogLevel) &&
        !_isNil(printLogLevel) &&
        currentLogLevel <= printLogLevel
      );
    } catch (e) {}
    return false;
  }
}
