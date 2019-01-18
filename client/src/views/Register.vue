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
                  <v-text-field label="Email" required :rules="[required]" v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Name" required :rules="[required]" v-model="name"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="Surname" required :rules="[required]" v-model="surname"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                  <v-menu :close-on-content-click="false" v-model="datepicker" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field slot="activator" v-model="birthDate" label="Birth date" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="birthDate" @input="datepicker = false"></v-date-picker>
                </v-menu>
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
export default {
    data() {
      return {
        email: '',
        name: '',
        surname: '',
        birthDate: '',
        password: '',
        username: '',
        error: null,
        success: null,
        datepicker: false,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async register() {
        try {
          this.error = null
          const response = await AuthenticationService.register({
            email: this.email,
            username: this.username,
            password: this.password,
            name: this.name, 
            surname: this.surname,
            birthDate: this.birthDate
          })
          // this.$store.dispatch('setTokegitn', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.success = 'Your account was registered successfully. Please verify your e-mail.'
        } catch (error) {
          this.success = null
          this.error = error.response.data.error
        }
      }
    },
    mounted () {
      if (this.$store.state.isUserLoggedIn){
        this.$router.push('Dashboard')
      }

    }
  }
</script>
