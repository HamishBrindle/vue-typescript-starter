import { AxiosResponse, AxiosRequestConfig } from 'axios';
import {
  PREFIX_STYLE,
  CLEAR_STYLE,
  INFO_STYLE,
  EVENT_STYLE,
  REQ_STYLE,
  RES_STYLE,
  WARN_STYLE,
  ERROR_STYLE,
  SILLY_STYLE,
  SILLY_STYLE_BODY,
} from './styles';

const DEBUG = (process.env.VUE_APP_ENV !== 'production');

type LoggerConstructorOptions = {
  /**
   * Context from which logger is being instantiated (i.e which component/file/etc.)
   */
  context: string;
  /**
   * Whether logger is in debug mode (defaults to whether the `NODE_ENV` is set to `production`)
   */
  debug?: boolean;
}

/**
 * Basic Logger
 */
export class Logger {
  /**
   * Debug flag turns logging on/off
   */
  private debug: boolean = DEBUG;

  /**
   * Context of where logger instance is being used
   */
  private readonly context: string = 'Logger';

  /**
   * Constructor
   */
  constructor(options: LoggerConstructorOptions) {
    if (typeof options.debug !== 'undefined') {
      this.debug = options.debug;
    }
    this.context = options.context;
  }

  /**
   * Stringify with respect to formatting.
   *
   * @param {any} input
   * @returns {string} Output
   */
  private static stringify(input: any) {
    if (input instanceof Error) {
      const obj = {
        ...input,
        name: input.name,
        message: input.message,
      };
      return JSON.stringify(obj, null, 2);
    }

    if (typeof input === 'string') {
      return input;
    }

    return JSON.stringify(input, null, 2);
  }

  /**
   * Silly
   *
   * @param input
   */
  public silly(input: any) {
    if (!this.debug) {
      return;
    }
    window.console.info(
      `%c${this.context}%cSilly%c ${Logger.stringify(input)}%c`,
      PREFIX_STYLE,
      SILLY_STYLE,
      SILLY_STYLE_BODY,
      CLEAR_STYLE,
    );
  }

  /**
   * Info
   *
   * @param input
   */
  public info(input: any) {
    if (!this.debug) {
      return;
    }
    window.console.info(
      `%c${this.context}%cInfo%c ${Logger.stringify(input)}`,
      PREFIX_STYLE,
      INFO_STYLE,
      CLEAR_STYLE,
    );
  }

  /**
   * Error
   *
   * @param input
   */
  public error(input: any) {
    if (!this.debug) {
      return;
    }
    window.console.error(
      `%c${this.context}%cError%c ${Logger.stringify(input)}`,
      PREFIX_STYLE,
      ERROR_STYLE,
      CLEAR_STYLE,
    );
  }

  /**
   * Warning
   *
   * @param input
   */
  public warn(input: any) {
    if (!this.debug) {
      return;
    }
    window.console.warn(
      `%c${this.context}%cWarning%c ${Logger.stringify(input)}`,
      PREFIX_STYLE,
      WARN_STYLE,
      CLEAR_STYLE,
    );
  }

  /**
   * Event
   *
   * @param input
   */
  public event(input: any) {
    if (!this.debug) {
      return;
    }
    window.console.info(
      `%c${this.context}%cEvent%c ${Logger.stringify(input)}`,
      PREFIX_STYLE,
      EVENT_STYLE,
      CLEAR_STYLE,
    );
  }

  /**
   * Request
   */
  public request(config: AxiosRequestConfig) {
    if (!this.debug) {
      return;
    }
    window.console.groupCollapsed(
      `%c${this.context}%cRequest%c ${config.method} %c: ${config.url}`,
      PREFIX_STYLE,
      REQ_STYLE,
      'font-weight: bold;',
      CLEAR_STYLE,
    );
    window.console.info(config);
    window.console.groupEnd();
  }

  /**
   * Response
   */
  public response(response: AxiosResponse<any>) {
    if (!this.debug) {
      return;
    }
    window.console.groupCollapsed(
      `%c${this.context}%cResponse%c ${response.config.method?.toLocaleUpperCase()} %c: ${response.config.url}`,
      PREFIX_STYLE,
      RES_STYLE,
      'font-weight: bold;',
      CLEAR_STYLE,
    );
    window.console.info({
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
    window.console.groupEnd();
  }
}

export default Logger;
