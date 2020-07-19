import { toRefs, reactive } from '@vue/composition-api'
import netlifyIdentity from 'netlify-identity-widget'

netlifyIdentity.init({
  APIUrl: 'https://mongodb-graphql.netlify.app/.netlify/identity'// Absolute url to endpoint.  ONLY USE IN SPECIAL CASES!
})

export default function () {
  const state = reactive({
    user: null,
    loading: true,
    error: null
  })

  const currentUser = netlifyIdentity.currentUser()
  if (currentUser) { state.user = currentUser }

  netlifyIdentity.on('login', (user) => {
    if (user) {
      state.user = user
    } else {
      state.user = null
    }
    state.loading = false
  })

  netlifyIdentity.on('logout', () => {
    state.user = null
  })

  return {
    ...toRefs(state)
  }
}
