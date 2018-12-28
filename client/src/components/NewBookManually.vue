<script>
/* eslint-disable */
</script>
<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <h2> You are adding a new book to {{$store.state.library.name}} </h2>
            <br>
          <v-toolbar flat dense class="blue" dark>
            <v-toolbar-title white>Add a new</v-toolbar-title>
          </v-toolbar>
              <v-text-field label="Title"  required :rules="[required]" v-model="book.title"></v-text-field>
              <v-text-field label="Subtitle"  v-model="book.subtitle"></v-text-field>
              <v-text-field label="Authors"  required :rules="[required]" v-model="book.authors"></v-text-field>
              <v-flex xs12 sm6 md4>
                <v-menu :close-on-content-click="false" v-model="datepicker" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field slot="activator" v-model="book.publishDate" label="Publish date" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="book.publishDate" @input="datepicker = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-text-field label="Number of pages" type="number" required :rules="[required]"  v-model="book.nrPages"></v-text-field>
              <v-text-field label="Publisher"  v-model="book.publisher"></v-text-field>
              <v-text-field label="Language" required :rules="[required]"  v-model="book.language"></v-text-field>
              <v-text-field label="Thumbnail URL" required :rules="[required]"  v-model="book.thumbnailUrl"></v-text-field>
              <br> 
            <br>
            <!-- <div class="error" v-html="error" /> -->
            <v-alert v-if="success" :value="true" type="success">
              {{success}}.
            </v-alert>
            <v-alert  v-if="error" :value="true" type="error">
              {{error}}
            </v-alert>
            <br>
            <v-btn dark class="cyan" @click="dialog = true">
              Submit
            </v-btn>
          </v-flex>
         
      </v-layout>
        <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Warning</v-card-title>
          <v-card-text>Are you sure you want to add {{book.title}} to your library?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="createBook">Yes</v-btn>
            <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import BookService from '@/services/BookService'
  import PersonalReadingService from '@/services/PersonalReadingService'
  export default {
      data() {
        return {

          book: {
            title: null,
            subtitle: null,
            authors: null,
            publishDate: null,
            nrPages: null,
            publisher: null,
            language: null,
            thumbnailUrl : null
          },
          error: null,
          success: null,
          dialog: false,
          datepicker : false,
          required: (value) => !!value || 'Required.'
        }
      },
      methods: {
        async createBook() {
          this.error = null
          const areAllFieldsFilledIn = Object
            .keys(this.book)
            .every(key => !!this.book[key])
            if (!areAllFieldsFilledIn){
              this.error= 'Please fill all the required fields'
              this.dialog = false
              return
            }
          try {
            const response = await BookService.createBook(this.book)
            await PersonalReadingService.createPersonalReading({
              LibraryId : this.$store.state.library.id,
              UserId : this.$store.state.user.id,
              BookId : response.data.id
            })
            this.success = `${this.book.title} added to your library`
            this.dialog = false
          } catch (error) {
            this.success = null
            this.dialog = false
            this.error = error.response.data.error
          }
        }
      },
      rules: {
        required: (value) => !!value || 'Required.'
      }
  }
</script>

<style scoped>

</style>
