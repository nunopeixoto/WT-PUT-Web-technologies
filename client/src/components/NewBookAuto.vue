<script> /* eslint-disable */ </script>
<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3 >
          <h1> Search book </h1>
            <v-text-field label="Search by title or author" v-model="search.text"></v-text-field>
            <v-btn dark class="cyan" @click="find">
              Submit
            </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import BookService from '@/services/BookService'
export default {
  data () {
    return {
      search : {
        text: null
      }
    }
  },
  methods: {
    async find() {
        try {
            const response = await BookService.findBook(this.search.text)
            console.log(response)
        } catch (error) {
            console.log(error)
        }        
    }
  }
}
</script>

<style scoped>

</style>
