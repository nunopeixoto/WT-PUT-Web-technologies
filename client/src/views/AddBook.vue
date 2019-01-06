<script>/*eslint-disable */ </script>
<template>
  <v-container fill-height fluid grid-list-xl>
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
          <material-card class="card-tabs" color="green">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white" >
              <span class="subheading font-weight-light mr-3" style="align-self: center">
                    Add a book:
              </span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-hand</v-icon>
                Manually
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-database</v-icon>
                Automatically
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-tabs-items v-model="tabs">
            <!-- book manually -->
            <v-tab-item :key="0">
                <h4 v-if="!(this.$route.params.BookId)"> You are adding a new book to {{$store.state.library.name}} </h4>
                <h4 v-if="this.$route.params.BookId"> Please confirm the data about the book you want to insert into {{$store.state.library.name}}   </h4>                
                <manual-panel/>
                <!-- <datepicker v-model="date" name="cenas"></datepicker> -->
            </v-tab-item>

            <!-- book auto -->
            <v-tab-item :key="1">
                <h4 v-if="!(this.$route.params.BookId)"> You are adding a new book to {{$store.state.library.name}} </h4>
                <automatic-panel/>
            </v-tab-item>
          </v-tabs-items>

        </material-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ManualPanel from './AddBookManuallyPanel'
import AutomaticPanel from './AddBookAutomaticPanel'
import Datepicker from 'vuejs-datepicker'

export default {
    components: {
        ManualPanel,
        Datepicker,
        AutomaticPanel
    },
    data() {
      return {
        tabs: 0
      }
    },
    watch: {
       tabs: function (value) {
         const route = {
        name : 'Add a book'
      }
        route.query = {
          tab: 0               
       }
       this.$router.push(route)    
    },
    '$route.query.tab' : {    //puts the text of the query in the search textfield
      immediate: true,
      async handler (value) {
        if(value==0){
          this.tabs = 0
        } else if (value==1){
          this.tabs = 1
        } 
      }
    }
  }
}
</script>
