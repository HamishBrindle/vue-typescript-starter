import { ICustomStore } from '@/lib/interfaces';
import pathify from '@/plugins/vuex-pathify';
import vuexPersist from '@/plugins/vuex-persist';
import Vuex from 'vuex';
import { ORMDatabase } from 'vuex-orm-decorators';
import * as modules from './modules';

const isProduction = (process.env.NODE_ENV === 'production');

/**
 * Creates and initializes a Vuex Store.
 */
async function init() {
  const storeOptions = {
    plugins: [
      pathify.plugin,
      ORMDatabase.install({}),
      vuexPersist.plugin,
    ],
    strict: (!isProduction),
    state: {
      version: '1.0.0',
    },
    mutations: {
      RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    },
    actions: {},
    modules,
  };

  const vuexStore = new Vuex.Store(storeOptions as any) as ICustomStore;

  await vuexStore.restored;

  return vuexStore;
}

export default {
  init,
  ...Vuex,
};
