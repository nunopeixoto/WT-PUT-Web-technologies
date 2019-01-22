<script>
/*eslint-disable */
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-snackbar :color="this.color"  top v-model="snackbar" dark>
        <v-icon v-if="snackbarSuccess" color="white" class="mr-3">mdi-check</v-icon>
        <v-icon v-if="snackbarError" color="white" class="mr-3">mdi-alert-circle</v-icon>
        <div> {{this.snackbarMessage}}  </div>
        <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
      </v-snackbar>
      <v-flex xs12 md8>
        <material-card color="green" title="Manage Library">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                  <v-spacer></v-spacer>
                    <v-flex xs12 md3>
                    <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                    </v-flex> 
                    <v-flex xs12 md6></v-flex>
                    <v-flex xs12 md3>
                      <v-btn color="green" dark class="mb-2" @click="dialog = true">
                        Invite someone
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-data-table :headers="headers" :items="users" :search="search">
                        <template slot="headerCell" slot-scope="{ header }">
                          <span class="font-weight-light text-warning text--darken-3" v-text="header.text" />
                        </template>
                        <template slot="items" slot-scope="props">
                          <td style="display: none;">
                            {{ props.item.userId }}</td>
                          <td>{{ props.item.name }}</td>
                          <td>{{ props.item.surname }}</td>
                          <td>{{ props.item.username }}</td>
                          <td>{{ props.item.email }}</td>
                          <td><center><v-icon @click="deleteItem(props.item)">mdi-delete</v-icon></center></td>
                        </template>  
                      </v-data-table>
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
  import AuthenticationService from '@/services/AuthenticationService'

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
        snackbar: false,
        snackbarSuccess: false,
        snackbarError: false,
        color: null,
        snackbarMessage : '',
        invitation: {
          email: null
        },
        error: null,
        dialog: false,
        dialogRemove: false,
        required: (value) => !!value || 'Required.',
        users: [],
        search: '',
        headers: [{
            class: 'idcolumn',
            sortable: true,
            text: 'Id',
            value: 'userId',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name'
          },
          {
            sortable: false,
            text: 'Surname',
            value: 'surname'
          },
          {
            sortable: true,
            text: 'Username',
            value: 'username'
          },
          {
            sortable: true,
            text: 'E-mail',
            value: 'email'
          },
          {
            sortable: true,
            text: 'Remove',
            align: 'center'
          }
        ],
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
            return
          }
          const response = await LibraryService.invite({
            usernameInviter: this.$store.state.user.username,
            emailInvited: this.invitation.email,
            libraryId: this.$store.state.library.id
          })
          this.color = "success"
          this.snackbarError = false
          this.snackbarSuccess = true
          this.snackbarMessage = 'Invitation sent'
          this.snackbar= true
          this.dialog = false

        } catch (error) {
          alert('Some error happened. Please try again.')
          this.color = "error"
          this.snackbarSuccess = false
          this.snackbarError = true
          this.snackbarMessage = "Some error happened. Please try again later."
          this.snackbar= true
          this.dialog = false
        }
      },
      async deleteItem (item) {
        const index = this.users.indexOf(item)

          var r = confirm(`Are you sure you want to delete @${item.username} from your library?`) && this.users.splice(index, 1)
          if (r) {
            const response = (await LibraryService.removeUserFromLibrary(this.$store.state.library.id, item.userId)).data
            if (response) {
              this.color = "success"
              this.snackbarError = false
              this.snackbarSuccess = true
              this.snackbarMessage = "User deleted successfully."
              this.snackbar= true
            }
          }
      }
    },
    async mounted () {
      const libraryInvitations = (await LibraryService.getAllLibraryInvitationsByLibraryId(this.$store.state.library.id)).data
          for (var i = 0; i < libraryInvitations.length; i++) {
            var obj=libraryInvitations[i]
            const user = (await AuthenticationService.getUserById(obj.UserId)).data
            this.users.push({
              userId: user.id,
              name: user.name,
              surname: user.surname,
              username: user.username,
              birthDate: user.birthDate,
              email: user.email
            })
           }
      var x = document.getElementsByClassName("idcolumn")
      x[0].style.display = "none"
    }
  }
</script>
