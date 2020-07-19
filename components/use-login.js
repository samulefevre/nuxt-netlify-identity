import { toRefs, reactive, computed } from '@vue/composition-api'
import netlifyIdentity from 'netlify-identity-widget'

export default function () {
  const state = reactive({
    error: null,
    username: null,
    password: null,
    user: null
  })

  const isValid = computed(() => {
    const { username, password } = state
    return (
      username !== null &&
        username.length !== 0 &&
        password !== null &&
        password.length !== 0
    )
  })

  const login = () => {
    netlifyIdentity.open('login')
    netlifyIdentity.on('login', (user) => {
      state.user = user
      netlifyIdentity.close()
    })
  }

  const logout = () => {
    netlifyIdentity.logout()
    state.user = null
  }

  return {
    ...toRefs(state),
    isValid,
    login,
    logout
  }
}
