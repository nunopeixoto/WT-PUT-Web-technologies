<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
          <h1> Dashboard here </h1>
          <h2 v-if="$store.state.userHasLibrary">Your library: {{$store.state.library.name}} </h2>
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
