<template>
  <v-form>
    <v-container v-if="$store.state.isUserLoggedIn">
      <v-layout row wrap>
        <v-flex xs6 offset-xs3 >
          <h1> Dashboard here </h1>
          <h2 v-if="$store.state.user">Your are {{$store.state.user.username}} </h2>
          <h2 v-if="$store.state.userHasLibrary">Your are the owner of: {{$store.state.library.name}} </h2>
          <h2 v-if="$store.state.userIsPartOfLibrary">Your are member of: {{$store.state.library.name}} </h2>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="!$store.state.isUserLoggedIn">
      <v-layout row wrap>
        <v-flex xs6 offset-xs3 >
          <h1> Homepage here </h1>
          <h2> information about app here </h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
