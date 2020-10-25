import VuexPersistence from 'vuex-persist';
import localforage from 'localforage';

const isProduction = (process.env.NODE_ENV === 'production');

const vuexPersistOptions = {
  strictMode: (!isProduction),
  storage: (localforage as unknown) as Storage,
  asyncStorage: true,
  modules: [
    'entities',
    'context',
  ],
};

export default new VuexPersistence(vuexPersistOptions);
