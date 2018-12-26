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
            <form name="auth-form" autocomplete="off">
              <v-text-field label="Username" required :rules="[required]" v-model="username" ></v-text-field>
              <br>
              <v-text-field label="Password" required :rules="[required]" type="password" v-model="password"></v-text-field>
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
  import LibraryService from '@/services/LibraryService'
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
        success: null,
        required: (value) => !!value || 'Required.'
      }
    },
    async mounted () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setHasLibrary', null)
      this.$store.dispatch('setIsPartOfLibrary', null)
      this.$store.dispatch('setLibrary', null)
    },
    methods: {
      async login() {
        try {
          this.error = null
          const response = await AuthenticationService.login({
            username: this.username,
            password: this.password
          })
          const userid = response.data.user.id
          this.success = 'Logged in successfully.'
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          if(response.data.userHasLibrary){
          this.$store.dispatch('setHasLibrary', true)
          this.$store.dispatch('setLibrary', response.data.library)
          } else if(response.data.userIsPartOfLibrary) {
          this.$store.dispatch('setIsPartOfLibrary', true)
          this.$store.dispatch('setLibrary', response.data.library)
          }else{
          this.$store.dispatch('setHasLibrary', false)  
          this.$store.dispatch('setIsPartOfLibrary', false) 
          }
          
          this.$router.push({
            name: 'root'
          })
        } catch (error) {
          this.success = null
          this.error = "hey"+error.response.data.error
        }
        // try {
        //   const userHasLibrary = (await LibraryService.checkHasLibrary({
        //       userId: userid
        //     })).data
        //   alert(userHasLibrary)
        // }catch (err){
        //   alert(err)
        // }
      }
    }
  }
</script>

<style scoped>
</style>

