/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Store functionality
// import actions from './actions'
import getters from './getters'
import modules from './modules'
// import mutations from './mutations'
// import state from './state'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  getters,
  modules,
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    hasLibrary: null,
    library: null,
    userHasLibrary: false,
    isPartOfLibrary: null,
    userIsPartOfLibrary: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setHasLibrary (state, hasLibrary) {
      state.hasLibrary = hasLibrary
      if (hasLibrary) {
        state.userHasLibrary = true
      } else {
        state.userHasLibrary = false
      }
    },
    setIsPartOfLibrary (state, isPartOfLibrary) {
      state.isPartOfLibrary = isPartOfLibrary
      if (isPartOfLibrary) {
        state.userIsPartOfLibrary = true
      } else {
        state.userIsPartOfLibrary = false
      }
    },
    setLibrary (state, library) {
      state.library = library
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setHasLibrary ({ commit }, hasLibrary) {
      commit('setHasLibrary', hasLibrary)
    },
    setIsPartOfLibrary ({ commit }, isPartOfLibrary) {
      commit('setIsPartOfLibrary', isPartOfLibrary)
    },
    setLibrary ({ commit }, library) {
      commit('setLibrary', library)
    }
  }
})

export default store
