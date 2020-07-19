<template>
  <div class="p-16">
    <div>
      <h1 class="text-center mt-4 font-bold text-2xl">
        nuxt-netlify-identity
      </h1>
    </div>
    <div v-if="isLoggedIn" class="mb-10">
      {{ this.$store.state.user.currentUser.user_metadata.full_name }}
    </div>
    <div class="links">
      <button v-if="isLoggedIn" class="border-gray-400 border-2 p-1" @click="triggerNetlifyIdentityAction('logout')">
        Logout
      </button>
      <button v-else class="border-gray-400 border-2 p-1" @click="triggerNetlifyIdentityAction('login')">
        Login
      </button>
      <nuxt-link to="/protected" class="block">
        Protected Page
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'
import { mapActions, mapState } from 'vuex'

export default {

  computed: mapState({
    isLoggedIn: state => state.user.currentUser
  }),
  methods: {
    ...mapActions({
      setUser: 'user/setUser'
    }),

    triggerNetlifyIdentityAction (action) {
      if (action === 'login' || action === 'signup') {
        netlifyIdentity.open(action)
        netlifyIdentity.on(action, (user) => {
          this.setUser(user)
          netlifyIdentity.close()
        })
      } else if (action === 'logout') {
        this.setUser(null)
        netlifyIdentity.logout()
        this.$router.push('/')
      }
    }
  }
}
</script>
