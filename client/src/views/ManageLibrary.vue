<script>
/*eslint-disable */
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Manage Library">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <h4>Library: {{$store.state.library.name}} </h4>
                  <v-btn dark class="cyan" @click="dialog = true">
                    Invite someone
                  </v-btn>
                </v-flex>
                <v-flex xs12 text-xs-right>
                </v-flex>
              </v-layout>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Invite someone to {{$store.state.library.name}}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-text-field label="Email" required :rules="[required]" v-model="invitation.email"></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="invite">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LibraryService from '@/services/LibraryService'
  import {
    mapState
  } from 'vuex'
  export default {
    computed: {
      ...mapState([
        'user'
      ])
    },
    data() {
      return {
        invitation: {
          email: null
        },
        error: null,
        dialog: false,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async invite() {
        try {
          this.error = null
          const areAllFieldsFilledIn = Object
            .keys(this.invitation)
            .every(key => !!this.invitation[key])
          if (!areAllFieldsFilledIn) {
            this.error = 'Please fill all the required fields'
            this.dialog = false
            return
          }
          const response = await LibraryService.invite({
            usernameInviter: this.$store.state.user.username,
            emailInvited: this.invitation.email,
            libraryId: this.$store.state.library.id
          })
  
          // this.$store.dispatch('setLibrary', response.data)
          // this.$store.dispatch('setHasLibrary', true)
          alert(response.data.message)
          this.dialog = false
  
          // this.$router.push({
          //   name: 'dashboard'
          // })
  
        } catch (error) {
          alert(error)
          alert('Some error happened. Please try again.')
          this.dialog = false
        }
      }
    }
  }
</script>
