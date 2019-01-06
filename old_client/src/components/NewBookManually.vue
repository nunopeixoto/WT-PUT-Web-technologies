<script>
/* eslint-disable */
</script>
<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <h2 v-if="!(this.$route.params.BookId)"> You are adding a new book to {{$store.state.library.name}} </h2>
            <h2 v-if="this.$route.params.BookId"> Please confirm the data about the book you want to insert into {{$store.state.library.name}}   </h2>
            <br>
            <v-toolbar flat dense class="blue" dark>
            <v-toolbar-title white>Add a new</v-toolbar-title>
          </v-toolbar>
         <new-book-manually-panel />
          </v-flex>
         
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>

  import NewBookManuallyPanel from './NewBookManuallyPanel'
  export default {
    components: {
      NewBookManuallyPanel 
    },
      data() {
        return {
        }
    }
  }
</script>

<style scoped>

</style>
