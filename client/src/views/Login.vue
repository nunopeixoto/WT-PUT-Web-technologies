<script>/*eslint-disable */ </script>
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-snackbar color="success"  top v-model="snackbar" dark>
      <v-icon color="white" class="mr-3">mdi-check</v-icon>
      <div> {{snackbarMessage}} </div>
      <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
    </v-snackbar>
    <v-layout justify-center wrap>
      <v-flex xs12 md6>
        <material-card color="green" title="Login">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4></v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="Username" required :rules="[required]" v-model="username" class='purple-input' ></v-text-field>
                </v-flex>
                <v-flex xs12 md4></v-flex>
                <v-flex xs12 md4></v-flex>
                <v-flex xs12 md4>
                <v-text-field label="Password" required :rules="[required]" type="password" v-model="password" class='purple-input' ></v-text-field>
                </v-flex>
                <v-alert outline  v-if="error" :value="true" type="error">
                 {{error}}
                </v-alert>
                <v-flex xs12 text-xs-center>
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
        snackbar: false,
        snackbarMessage : null,
        username: '',
        password: '',
        error: null,
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
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.path.substring(0,18) === '/register-enhanced') {
          vm.snackbarMessage = 'You\'ve registered successefully. Please sign in into your account.'
          vm.snackbar=true
        } else {
          vm.snackbar = false
        }

        next()
      })
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
