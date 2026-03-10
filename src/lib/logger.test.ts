import { logger } from './logger';

describe('logger', () => {
  let debugSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('log levels', () => {
    it('calls console.debug for debug level', () => {
      logger.debug('debug message');
      expect(debugSpy).toHaveBeenCalledTimes(1);
    });

    it('calls console.info for info level', () => {
      logger.info('info message');
      expect(infoSpy).toHaveBeenCalledTimes(1);
    });

    it('calls console.warn for warn level', () => {
      logger.warn('warn message');
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('calls console.error for error level', () => {
      logger.error('error message');
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('timestamp prefix', () => {
    it('includes a timestamp prefix in the log output', () => {
      logger.info('test message');
      const firstArg: string = infoSpy.mock.calls[0][0] as string;
      expect(firstArg).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('includes the log level in the prefix', () => {
      logger.warn('test message');
      const firstArg: string = warnSpy.mock.calls[0][0] as string;
      expect(firstArg).toContain('[WARN]');
    });

    it('includes DEBUG in the prefix for debug level', () => {
      logger.debug('test message');
      const firstArg: string = debugSpy.mock.calls[0][0] as string;
      expect(firstArg).toContain('[DEBUG]');
    });

    it('includes ERROR in the prefix for error level', () => {
      logger.error('test message');
      const firstArg: string = errorSpy.mock.calls[0][0] as string;
      expect(firstArg).toContain('[ERROR]');
    });

    it('includes INFO in the prefix for info level', () => {
      logger.info('test message');
      const firstArg: string = infoSpy.mock.calls[0][0] as string;
      expect(firstArg).toContain('[INFO]');
    });
  });

  describe('additional arguments', () => {
    it('passes additional arguments to console methods', () => {
      const extra = { key: 'value' };
      logger.info('message', extra);
      expect(infoSpy).toHaveBeenCalledWith(
        expect.any(String),
        'message',
        extra
      );
    });

    it('passes multiple additional arguments', () => {
      logger.error('error occurred', 'detail1', 42);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.any(String),
        'error occurred',
        'detail1',
        42
      );
    });

    it('calls with only prefix and message when no extra args', () => {
      logger.debug('simple message');
      expect(debugSpy).toHaveBeenCalledWith(
        expect.any(String),
        'simple message'
      );
    });
  });
});
