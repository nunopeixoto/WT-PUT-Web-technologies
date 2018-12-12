<script>
/* eslint-disable */
</script>
<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <v-toolbar flat dense class="blue" dark>
            <v-toolbar-title white>Login</v-toolbar-title>
          </v-toolbar>
  
          <v-flex xs12 sm6 md12>
            <form name="tab-tracker-form" autocomplete="off">
              <v-text-field label="Email" v-model="email"></v-text-field>
              <br>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              <br>
              <v-alert v-if="success" :value="true" type="success">
              {{success}}.
            </v-alert>
            <v-alert  v-if="error" :value="true" type="error">
              {{error}}
            </v-alert>
              <v-btn dark class="cyan" @click="login">
                Login
              </v-btn>
            </form>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
        success: null
      }
    },
    methods: {
      async login() {
        try {
          this.error = null
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password
          })
          this.success = 'Logged in successfully.'
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        } catch (error) {
          this.success = null
          this.error = error.response.data.error
        }
      }
    }
  }
</script>

<style scoped>
</style>
