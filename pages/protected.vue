<template>
  <div class="flex content-center flex-wrap  h-screen items-center">
    <div class="m-auto">
      <h1 class="text-3xl text-center">
        Protected Page
      </h1>
      <h2 class="mt-4">
        My <strong><u>protected</u></strong> Nuxt.js project page
      </h2>
      <div class="mt-4">
        <nuxt-link to="/" class="">
          <a>Home
          </a>
        </nuxt-link>
        <div class="" @click="triggerNetlifyIdentityAction('logout')">
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'
import { mapActions } from 'vuex'

export default {
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
  },
  middleware ({ store, redirect }) {
    if (!store.state.user.currentUser) {
      return redirect('/')
    }
  }
}
</script>
