<script>/* eslint-disable */ </script>
<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span v-if="!$store.state.isUserLoggedIn" class="home" @click="navigateTo({name: 'root'})">
          myLibrary
      </span>
      <span v-if="$store.state.isUserLoggedIn" class="home" @click="navigateTo({name: 'dashboard'})">
          myLibrary
      </span> 
    </v-toolbar-title>
    <v-toolbar-items>
        <v-btn v-if="$store.state.isUserLoggedIn && !$store.state.userHasLibrary" flat dark router to='createlibrary'>
          Create library
        </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn  && $store.state.userHasLibrary" flat dark router to='managelibrary'>
          Manage library
        </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn  && $store.state.userHasLibrary" flat dark router to='newbook'>
          New book
        </v-btn>
       </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
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
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      logout(){
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setHasLibrary', null)
        this.$store.dispatch('setLibrary', null)
        this.$router.push({
          name: 'root'
        })
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
</style>
