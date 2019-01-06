<script>/*eslint-disable */ </script>
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Login">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field label="Username" required :rules="[required]" v-model="username" class='purple-input' ></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                <v-text-field label="Password" required :rules="[required]" type="password" v-model="password" class='purple-input' ></v-text-field>
                </v-flex>
                <v-alert v-if="success" :value="true" type="success">
                  {{success}}.
                </v-alert>
                <v-alert  v-if="error" :value="true" type="error">
                 {{error}}
                </v-alert>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="login" color="success">
                    Login
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
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
            path: '/dashboard'
          })
        } catch (error) {
          this.success = null
          this.error = error.response.data.error
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
    },
    async mounted () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setHasLibrary', null)
      this.$store.dispatch('setIsPartOfLibrary', null)
      this.$store.dispatch('setLibrary', null)
    }
}
</script>
