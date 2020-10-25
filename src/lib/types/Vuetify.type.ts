/**
 * TODO: Work in progress
 *
 * The idea is to get all the Vuetify components in here as types
 * so we know what kind of props to feed in through the form
 * schemas
 *
 * I don't think this has to be exhaustive, but it may be worth
 * generating these using the Vuetify API doc generator in their
 * repo:
 *
 * https://github.com/vuetifyjs/vuetify/tree/master/packages/api-generator
 *
 */

/**
 * Text Field type with props
 */
export type VTextField = {
  appendIcon: string;
  appendOuterIcon: string;
  autofocus: boolean;
  backgroundColor: string;
  clearIcon: string;
  clearable: boolean;
  color: string;
  counter: boolean | number | string;
  counterValue: (...args: any[]) => any | null;
  /**
   * Defaults to `false`
   */
  dark: boolean;
  /**
   * Defaults to `false`
   */
  dense: boolean;
  /**
   * Defaults to `false`
   */
  disabled: boolean;
  /**
   * Defaults to `false`
   */
  error: boolean;
  /**
   * Defaults to `1`
   */
  errorCount: number | string;
  /**
   * Defaults to `[]`
   */
  errorMessages: Array<string>;
  /**
   * Defaults to `false`
   */
  filled: boolean;
}
