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
                    <v-text-field label="Library name"  required :rules="[required]" v-model="library.name"></v-text-field>
                </v-flex>
                
                <v-alert v-if="success" :value="true" type="success">
                  {{success}}.
                </v-alert>
                <v-alert  v-if="error" :value="true" type="error">
                 {{error}}
                </v-alert>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" @click="dialog = true" color="success">
                    Create library
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Warning</v-card-title>
                        <v-card-text>Are you sure you want to create {{library.name}} library?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" flat @click="createLibrary">Yes</v-btn>
                            <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
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
  import {mapState} from 'vuex'
  export default {
      computed: {
        ...mapState([
          'user'
        ])
      },
      data() {
        return {
          library: {
            name: null,
            UserId: this.$store.state.user.id,
          },
          error: null,
          success: null,
          dialog: false,
          required: (value) => !!value || 'Required.'
        }
      },
      methods: {
        async createLibrary() {
          try {
            this.error = null
            const areAllFieldsFilledIn = Object
            .keys(this.library)
            .every(key => !!this.library[key])
            if (!areAllFieldsFilledIn){
              this.error= 'Please fill all the required fields'
              this.dialog = false
              return
            }
            const response = await LibraryService.create(this.library)
            this.$store.dispatch('setLibrary', response.data)
            this.$store.dispatch('setHasLibrary', true)
            this.dialog = false
            
            this.success = `${response.data.name} has been created`

          } catch (error) {
            alert(error)
            this.success = null
            this.error = 'Some error happened. Please try again.'
            this.dialog = false
          }
        }
      }
  }
</script>