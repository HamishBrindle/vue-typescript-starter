import moment from 'moment';

/**
 * Utilities to be shared across application.
 */
export class Utilities {
  /**
   * Convert a string to title-case.
   * @param input String to convert
   */
  public static titleCase(input: string): string {
    if (!input) return '';
    const pieces = [...input.toLowerCase().split(/[\s_-]/)];
    for (let i = 0; i < pieces.length; i += 1) {
      pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
    }
    return pieces.join(' ');
  }

  /**
   * Format a phone number using regular expressions
   * @param phone
   */
  public static formatPhone(phone: string): string {
    if (!phone) return '';
    const regExp = /^(\d{3})(?:-|\s)?(\d{3})(?:-|\s)?(\d{4})(?:\s)?(E?XT?\s?\d{1,})?$/;
    const m = phone.match(regExp);
    if (m) {
      let base = `(${m[1]}) ${m[2]}-${m[3]}`;
      if (m[4]) base += ` [EXT. ${m[4].replace(/\D/g, '')}]`;
      return base;
    }
    return phone;
  }

  /**
   * Format a date string
   * @param date
   * @param withTime Format the date with time. Optional.
   */
  public static formatDate(date: string, withTime = false) {
    const d = moment(date);
    if (withTime) return d.format('YYYY-MM-DD @ hh:mma');
    return moment(date).format('YYYY-MM-DD');
  }

  /**
   * Checks if the current browser is IE
   */
  public static isUsingIEBrowser() {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    if (msie > -1 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
      return true;
    }
    return false;
  }

  /**
   * Create a timestring from millismseconds
   * @param ms
   */
  public static msToTime(value: number) {
    let milliseconds = value;

    /**
     * Pad a number with specified number of places
     * @param n Number to pad
     * @param precision How many places to pad to. Defaults to 2.
     */
    const pad = (n: number, precision = 2) => (`00${n}`).slice(-precision);

    const ms = milliseconds % 1000;
    milliseconds = (milliseconds - ms) / 1000;
    const secs = milliseconds % 60;
    milliseconds = (milliseconds - secs) / 60;
    const mins = milliseconds % 60;
    const hrs = (milliseconds - mins) / 60;

    if (hrs) {
      return `${hrs}.${pad(mins)}.${pad(secs)}`;
    }

    return `${mins}.${pad(secs)}`;
  }
}

export default Utilities;
