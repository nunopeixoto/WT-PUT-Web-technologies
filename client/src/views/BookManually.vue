<script>
/* eslint-disable */
</script>
<template>
  <panel title="AddBookManuallyPanel">
    <v-flex xs12 md12>
      <v-text-field label="Title"  required :rules="[required]" v-model="book.title"></v-text-field>
    </v-flex>
    <v-flex xs12 md12>
      <v-text-field label="Subtitle"  v-model="book.subtitle"></v-text-field>
    </v-flex> 
    <v-flex xs12 md12>
      <v-text-field label="Authors"  required :rules="[required]" v-model="book.authors"></v-text-field>   
    </v-flex>
    <!-- <v-flex xs12 md12>
        <v-text-field slot="beforeCalendarHeader" v-model="book.publishDate" label="Publish date"  readonly></v-text-field>
        <datepicker v-model="book.publishDate" placeholder="Publish date"></datepicker>
    </v-flex> -->
    <v-flex xs12 sm6 md4>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
          <v-text-field slot="activator"   v-model="date" label="Picker in dialog" prepend-icon="event" readonly>
          </v-text-field>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
    <v-flex xs12 md12>
      <v-text-field label="Number of pages" type="number" required :rules="[required]"  v-model="book.nrPages"></v-text-field>
    </v-flex>
    <v-flex xs12 md12>
      <v-text-field label="Publisher"  v-model="book.publisher"></v-text-field>
    </v-flex>
    <v-flex xs12 md12>
      <v-text-field label="Language" required :rules="[required]"  v-model="book.language"></v-text-field>
    </v-flex>
    <v-flex xs12 md12>
      <v-text-field label="Thumbnail URL" required :rules="[required]"  v-model="book.thumbnailUrl"></v-text-field>
    </v-flex>
    <v-flex xs12 ms6 md4>
      <v-select :items="optionsReading" v-model="reading" label="Reading status"></v-select>
      <v-dialog v-if="this.reading==this.optionsReading[0] || this.reading==this.optionsReading[2]" ref="dialogStart" v-model="modalStart" :return-value.sync="date" persistent lazy full-width width="290px">
          <v-text-field slot="activator" v-model="dateStart" label="Start date" prepend-icon="event" readonly>
          </v-text-field>
          <v-date-picker v-model="dateStart" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalStart = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogStart.save(date)">OK</v-btn>
          </v-date-picker>
      </v-dialog>
      <v-dialog v-if="this.reading==this.optionsReading[0]" ref="dialogEnd" v-model="modalEnd" :return-value.sync="date" persistent lazy full-width width="290px">
          <v-text-field slot="activator" v-model="dateEnd" label="Finish date" prepend-icon="event" readonly>
          </v-text-field>
          <v-date-picker v-model="dateEnd" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modalEnd = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dialogEnd.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>  
    </v-flex>
    <br><br>
    <v-alert v-if="success" :value="true" type="success">
      {{success}}.
    </v-alert>
    <v-alert  v-if="error" :value="true" type="error">
      {{error}}
    </v-alert>
    <br>
    <v-flex xs12 text-xs-right>
    <v-btn color="success" @click="dialog = true">
      Submit
    </v-btn>
    </v-flex>
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
  </panel>
</template>

<script>
  import BookService from '@/services/BookService'
  import PersonalReadingService from '@/services/PersonalReadingService'
  import Datepicker from 'vuejs-datepicker'
  
  export default {
    name: 'book-manually',
    components: {
      Datepicker
    },
      data() {
        return {
          book: {
            title: null,
            subtitle: null,
            authors: null,
            publishDate: 'Please fill',
            nrPages: null,
            publisher: null,
            language: null,
            thumbnailUrl : null
          },
          reading: null,
          optionsReading : ['I already have read this book', 'I haven\'t started it yet.', 'I\'ve started but I haven\'t finshed yet.'],
          date: null,
          dateStart: null,
          dateEnd: null,
          modal: false,
          modalStart: null,
          modalEnd: null,
          error: null,
          success: null,
          dialog: false,
          dialogStart: false,
          //datepicker : false,
          required: (value) => !!value || 'Required.'
        }
      },
      methods: {
        async createBook() {
          this.error = null
          if (!(this.subtitle)){
            this.book.subtitle = 'No subtitle'
          }
          const areAllFieldsFilledIn = Object
            .keys(this.book)
            .every(key => !!this.book[key])
            if (!areAllFieldsFilledIn){
              this.error= 'Please fill all the required fields'
              this.dialog = false
              return
            }
          let readingStatus = 0
          let startDate = null
          let endDate = null
          if (this.reading == this.optionsReading[0]){
            readingStatus = 1
            startDate = this.dateStart
            endDate = this.dateEnd
          } else if (this.reading == this.optionsReading[1]) {
            readingStatus = 0
          } else if (this.reading == this.optionsReading[2]) {
            readingStatus = 2
            startDate = this.dateStart
          }
          alert(readingStatus )
          try {
            const responseBook = await BookService.createBook(this.book)
            let personalReadingResponse = null
            if (responseBook.data.message){
              personalReadingResponse = await PersonalReadingService.createPersonalReading({
              LibraryId : this.$store.state.library.id,
              UserId : this.$store.state.user.id,
              BookId : this.$route.params.BookId,
              reading: readingStatus,
              startDate: startDate,
              endDate: endDate
            })
            } else {
            personalReadingResponse = await PersonalReadingService.createPersonalReading({
              LibraryId : this.$store.state.library.id,
              UserId : this.$store.state.user.id,
              BookId : responseBook.data.id,
              reading: readingStatus,
              startDate: startDate,
              endDate: endDate
            })
            
            }
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
      },
      watch: {
        'this.$route.params.book': {
          immediate: true,
          async handler(value) {
            alert(value)
            alert('hey')
          // const bookApi = (Buffer.from(this.$route.params.Book, 'base64').toString('ascii'))
          // const bookJson = JSON.parse(bookApi)
          // this.book.title = bookJson.title
          // this.book.subtitle = bookJson.subtitle
          // this.book.authors =  JSON.stringify(bookJson.authors).replace(/"/g,'').replace(/\[/,'').replace(/\]/, '').replace(/,/,', ')
          // this.book.publishDate = bookJson.publishedDate.substring(0,10)
          // this.book.nrPages = bookJson.pageCount
          // this.book.publisher =bookJson.publisher
          // this.book.language = bookJson.language
          // this.book.thumbnailUrl = bookJson.thumbnail
          }
        }
      },
      async mounted () {
        alert('tabs'+this.$parent.tabs)
        if (this.$route.params.BookId){
          let bookId = this.$route.params.BookId
          const book = await BookService.getBookById(bookId)
          this.book.title = book.data.title
          this.book.subtitle = book.data.subtitle
          this.book.authors = book.data.authors
          this.book.publishDate = book.data.publishDate.substring(0,10)
          this.book.nrPages = book.data.nrPages
          this.book.publisher = book.data.publisher
          this.book.language = book.data.language
          this.book.thumbnailUrl = book.data.thumbnailUrl
        } else if (this.$route.params.Book){
          const bookApi = (Buffer.from(this.$route.params.Book, 'base64').toString('ascii'))
          const bookJson = JSON.parse(bookApi)
          this.book.title = bookJson.title
          this.book.subtitle = bookJson.subtitle
          this.book.authors =  JSON.stringify(bookJson.authors).replace(/"/g,'').replace(/\[/,'').replace(/\]/, '').replace(/,/,', ')
          this.book.publishDate = bookJson.publishedDate.substring(0,10)
          this.book.nrPages = bookJson.pageCount
          this.book.publisher =bookJson.publisher
          this.book.language = bookJson.language
          this.book.thumbnailUrl = bookJson.thumbnail
        }
      }
  }
</script>

