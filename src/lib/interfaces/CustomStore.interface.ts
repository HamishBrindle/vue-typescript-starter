import { Store } from 'vuex';

/**
 * Interface for the CustomStore's root-state
 */
interface IRootState {
  version: string;
}

/**
 * Interface for our App's root state
 */
export interface ICustomStore extends Store<IRootState> {
  /**
   * Indicates if the Vuex state has been loaded from local storage
   * and is ready to use
   */
  restored: Promise<boolean>;
}
