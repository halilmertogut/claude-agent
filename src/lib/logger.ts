export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Logger {
  debug: (message: string, ...args: unknown[]) => void;
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
}

function getTimestamp(): string {
  return new Date().toISOString();
}

function log(level: LogLevel, message: string, args: unknown[]): void {
  const timestamp = getTimestamp();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  const output = args.length > 0 ? [prefix, message, ...args] : [prefix, message];

  switch (level) {
    case 'debug':
      console.debug(...output);
      break;
    case 'info':
      console.info(...output);
      break;
    case 'warn':
      console.warn(...output);
      break;
    case 'error':
      console.error(...output);
      break;
  }
}

export const logger: Logger = {
  debug: (message: string, ...args: unknown[]): void => log('debug', message, args),
  info: (message: string, ...args: unknown[]): void => log('info', message, args),
  warn: (message: string, ...args: unknown[]): void => log('warn', message, args),
  error: (message: string, ...args: unknown[]): void => log('error', message, args),
};
