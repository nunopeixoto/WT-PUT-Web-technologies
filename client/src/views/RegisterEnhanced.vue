<script>/*eslint-disable */ </script>
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Register">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field label="Email" required :rules="[required]" disabled v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Username" required :rules="[required]" type="text" v-model="username"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Password" required :rules="[required]" type="password" v-model="password" autocomplete="new-password"></v-text-field>
                </v-flex>
                <v-alert outline v-if="success" :value="true" type="success">
                  {{success}}.
                </v-alert>
                <v-alert outline  v-if="error" :value="true" type="error">
                 {{error}}
                </v-alert>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="register" color="success">
                    Register
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
  import LibraryService from '@/services/LibraryService'
  export default {
    data() {
      return {
        email: this.$route.params.email,
        password: null,
        username: null,
        confirmed: true,
        error: null,
        success: null,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async register() {
        try {
          this.error = null
          const response = await AuthenticationService.enhancedregister({
            email: this.email,
            username: this.username,
            password: this.password,
            confirmed : true
          })
         const cenas = await LibraryService.becomeLibraryGuest(this.$route.params.email, this.$route.params.libraryId)     
          this.success = 'Your account was registered successfully'
          if((cenas.data.message) == 'Success'){
            this.$router.push({
              path:'/login'
            })
          }
        } catch (error) {
          this.success = null
          if(error.response.data.error){
          this.error = error.response.data.error
          }else{
            this.error = 'Error'
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
