<template>
  <div class="flex content-center flex-wrap  h-screen w-screen items-center">
    <div class="m-auto">
      <h1 class="text-3xl text-center">
        Protected Page {{ user.token }}
      </h1>
      <h2 class="mt-4">
        My <strong><u>protected</u></strong> Nuxt.js project page
      </h2>
      <p v-if="user">
        Logged as {{ user.user_metadata.full_name }}
      </p>
      <ul class="mt-4">
        <li v-for="todo in allTodos" :key="todo._id">
          {{ todo.title }}
        </li>
      </ul>
      <ul class="mt-4">
        <li v-for="author in allAuthors" :key="author._id">
          {{ author.name }}
        </li>
      </ul>
      <div class="mt-4">
        <nuxt-link to="/" class="">
          <a>Home
          </a>
        </nuxt-link>
        <div class="" @click="logout()">
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import allTodos from '~/graphql/allTodos.gql'
import allAuthors from '~/graphql/allAuthors.gql'
import useAuth from '~/components/use-auth'
import useLogin from '~/components/use-login'

export default {
  middleware: ['authenticated'],
  setup (_, ctx) {
    const { user, loading, error } = useAuth()
    const loginState = useLogin()

    return {
      user,
      loading,
      error: computed(() => (loginState.error || error).value),
      logout: loginState.logout,
      login: loginState.login

    }
  },
  apollo: {
    allTodos: {
      prefetch: true,
      query: allTodos
    },
    allAuthors: {
      prefetch: true,
      query: allAuthors
    }
  },
  watch: {
    user (val) {
      if (!val) {
        this.$router.push('/')
      }
    }
  }
}
</script>
