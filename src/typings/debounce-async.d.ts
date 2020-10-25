declare module 'debounce-async' {
  /**
  * Debounce an asychronous function
  *
  * @param func
  * @param wait
  * @param options
  * @returns New debounced function
  */
  function debounce(
    /**
     * The function to debounce.
     */
    func: (...args: any[]) => Promise<any>,
    /**
     * The number of milliseconds to delay.
     */
    wait?: number,
    /**
     * The options object.
     */
    options?: {
      /**
       * Specify invoking on the leading edge of the timeout.
       */
      leading: boolean;
      /**
       * Specify the error object to be rejected.
       */
      cancelObj: string;
    }
  ): (...args: any[]) => Promise<any>;
  export = debounce;
}
