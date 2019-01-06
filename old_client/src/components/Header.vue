<script>/* eslint-disable */ </script>
<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo({name: 'root'})">
          myLibrary
      </span> 
    </v-toolbar-title>
    <v-toolbar-items>
        <v-btn v-if="$store.state.isUserLoggedIn && !$store.state.userHasLibrary && !$store.state.userIsPartOfLibrary" flat dark router to='createlibrary'>
          Create library
        </v-btn>
        <v-menu v-if="$store.state.isUserLoggedIn  && $store.state.userHasLibrary || $store.state.userIsPartOfLibrary" open-on-hover top offset-y>
        <v-btn slot="activator" flat dark>
         Loans
        </v-btn>
        <v-list>
          <v-list-tile router to='manageloan'>
            <v-list-tile-title>Manage loans</v-list-tile-title>
          </v-list-tile>
          <v-list-tile router to='newloan'>
            <v-list-tile-title>Insert loans</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
        <!-- <v-btn v-if="$store.state.isUserLoggedIn  && $store.state.userHasLibrary || $store.state.userIsPartOfLibrary" flat dark router to='manageloan'>
          Loans
        </v-btn> -->
        <v-btn v-if="$store.state.isUserLoggedIn  && $store.state.userHasLibrary" flat dark router to='managelibrary'>
          Manage library
        </v-btn>
        <v-menu v-if="$store.state.library">
        <v-btn slot="activator" flat dark>
          New book
        </v-btn>
        <v-list>
          <v-list-tile router to='newbookmanually'>
            <v-list-tile-title>Manually</v-list-tile-title>
          </v-list-tile>
          <v-list-tile router to='newbookauto'>
            <v-list-tile-title>Automatically</v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-menu>
       </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn class="noHover" v-if="$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary" flat dark >
          {{`Now at ${this.$store.state.library.name}`}}
        </v-btn>
      <v-menu v-if="this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary" open-on-hover top offset-y>
        <v-btn slot="activator" flat dark>
         Change library
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="(libraryNames, index) in libraryNames"
            :key="index"
            @click="changeLibrary(libraryNames.name)"
          >
            <v-list-tile-title>{{ libraryNames.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark router to='login'>
        Login
      </v-btn>
  
      <v-btn v-if="!$store.state.isUserLoggedIn" flat dark router to='register'>
        Sign Up
      </v-btn>

      <v-btn v-if="$store.state.isUserLoggedIn" flat dark @click="logout">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import LibraryService from '@/services/LibraryService'
import store from '@/store/store'
import {mapState} from 'vuex'
  export default {
    data () {
      return {
        libraryNames : null
      }
    },
    computed: {
        ...mapState([
          'library'
        ])
      },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      logout(){
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setHasLibrary', null)
        this.$store.dispatch('setIsPartOfLibrary', null)
        this.$store.dispatch('setLibrary', null)
        this.$router.push({
          name: 'root'
        })
      },
      async changeLibrary(libraryName) {
        // alert(libraryName)
        const response = await LibraryService.getLibraryByName(libraryName)
        this.$store.dispatch('setLibrary', response.data)
        if (this.$store.state.user.id == response.data.UserId){
          this.$store.dispatch('setIsPartOfLibrary', false)
          this.$store.dispatch('setHasLibrary', true)
        } else {
          this.$store.dispatch('setIsPartOfLibrary', true)
          this.$store.dispatch('setHasLibrary', false)
        }
      }
    },
    watch : {
      async 'library'() {
        try {
        if(this.$store.state.user){
          const response = await LibraryService.getUserLibrarys(this.$store.state.user.id)
        //   alert(JSON.stringify(response))  
           var names = response.data
        //   for (var i=0; i<names.length; i++){
        //     alert(names[i].name)
        // }

        this.libraryNames = names
        }
        } catch (err) {
          alert(err)
        }
      }
    
  },
  async mounted(){
try {
        if(this.$store.state.user){
          const response = await LibraryService.getUserLibrarys(this.$store.state.user.id)
        //   alert(JSON.stringify(response))  
           var names = response.data
        //   for (var i=0; i<names.length; i++){
        //     alert(names[i].name)
        // }

        this.libraryNames = names
        }
        } catch (err) {
          alert(err)
        }
  }
}
</script>

<style scoped>
  .home {
    cursor: pointer;
  }
  
  .home:hover {
    color: #E9E;
  }
  
  .noHover{
    pointer-events: none;
}
</style>
