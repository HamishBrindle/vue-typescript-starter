import { make } from 'vuex-pathify';

const state = {
  player: null,
};

const getters = {
  ...make.getters(state),
};

const mutations = {
  ...make.mutations(state),
};

const actions = {
  ...make.actions(state),
  // setVolume (_context: any, volume: number) {},
};

// export store
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
