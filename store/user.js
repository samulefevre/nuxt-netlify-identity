import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init({
  APIUrl: 'https://mongodb-graphql.netlify.app/.netlify/identity'// Absolute url to endpoint.  ONLY USE IN SPECIAL CASES!
})
const currentUser = netlifyIdentity.currentUser()

export const state = () => ({
  currentUser
})

export const mutations = {
  SET_USER (state, currentUser) {
    state.currentUser = currentUser
  }
}

export const actions = {
  setUser: ({ commit }, payload) => {
    commit('SET_USER', payload)
  }
}
