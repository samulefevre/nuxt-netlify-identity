<template>
  <div class="p-16">
    <div>
      <h1 class="text-center mt-4 font-bold text-2xl">
        nuxt-netlify-identity
      </h1>
    </div>
    <div v-if="user" class="mb-10">
      {{ user.user_metadata.full_name }}
    </div>
    <div class="links">
      <button v-if="user" class="border-gray-400 border-2 p-1" @click="logout()">
        Logout
      </button>
      <button v-else class="border-gray-400 border-2 p-1" @click="login()">
        Login
      </button>
      <nuxt-link to="/protected" class="block">
        Protected Page
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import useAuth from '~/components/use-auth'
import useLogin from '~/components/use-login'

export default {

  setup () {
    const { user, loading, error } = useAuth()
    const loginState = useLogin()
    return {
      user,
      loading,
      error: computed(() => (loginState.error || error).value),
      logout: loginState.logout,
      login: loginState.login
    }
  }
}
</script>
