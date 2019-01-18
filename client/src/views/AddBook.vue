<script>/*eslint-disable */ </script>
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md10>
          <material-card class="card-tabs" color="green">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white" >
              <span class="subheading font-weight-light mr-3" style="align-self: center">
                    Add a book to {{$store.state.library.name}}:
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
            <h4 v-if="this.$route.params.BookId"> Please confirm the data about the book you want to insert into {{$store.state.library.name}}   </h4>                
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
                      <v-text-field slot="activator"   v-model="book.publishDate" label="Publish date" prepend-icon="event" readonly>
                      </v-text-field>
                      <v-date-picker v-model="book.publishDate" scrollable>
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
                <v-alert outline v-if="success" :value="true" type="success">
                  {{success}}.
                </v-alert>
                <v-alert outline  v-if="error" :value="true" type="error">
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
                <!-- <datepicker v-model="date" name="cenas"></datepicker> -->
            </v-tab-item>
            <!-- book auto -->
            <v-tab-item :key="1">
                <panel title="Add book automatically">
                  <br>
                    <v-layout wrap>
                    <v-flex xs12 md4>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-text-field prepend-icon="mdi-magnify" label="Search book by title or author" v-model="search"></v-text-field> 
                    </v-flex>
                    </v-layout>
                    <v-flex xs12 md12>
                      <br>
                      <v-expansion-panel :value="this.openExpansionPanel">
                        <v-expansion-panel-content>
                            <div slot="header"><v-icon>mdi-account</v-icon> Added by our users</div>
                            <v-card>
                              <div class="wrapper">
                                <div class="card" v-for="book in filteredListDb" :key="book.title" @click="changeCard(book.bookData)">
                                  <small><center>By: {{ book.author }}</center></small>
                                  <a>
                                    <img v-bind:src="book.img"/>
                                    <h5>{{ book.title }}</h5>
                                  </a>
                                </div>
                              </div>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel focusable>
                          <v-expansion-panel-content>
                              <div slot="header"><v-icon>mdi-library-books</v-icon> Google Books database</div>
                              <v-card>
                                <div class="wrapper">
                                  <div class="card" v-for="book in filteredListApi" :key="book.title" @click="changeCard(book.bookData)">
                                    <small><center>By: {{ book.author }}</center></small>
                                    <a>
                                      <img v-bind:src="book.img"/>
                                      <h5>{{ book.title }}</h5>
                                    </a>
                                  </div>
                                </div>
                              <v-btn dark class="cyan" router to='newbookmanually'> Still can't find it? Add it manually </v-btn>
                              </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        </v-flex>
                </panel>
            </v-tab-item>
          </v-tabs-items>

        </material-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BookManually from './BookManually'
import Datepicker from 'vuejs-datepicker'
import PersonalReadingService from '@/services/PersonalReadingService'
import BookService from '@/services/BookService'
import _ from 'lodash'

export default {
    name: 'add-book',
    components: {
        BookManually,
        Datepicker,
    },
    data() {
      return {
      search: '',
      bookListDb : [],
      bookListApi : [],
      openExpansionPanel: 1,
      tabs: 0,
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
            this.book.title = ' '
            this.book.subtitle = ' '
            this.book.authors = ' '
            this.book.publishDate = ' '
            this.book.nrPages = ' '
            this.book.publisher = ' '
            this.book.language = ' '
            this.book.thumbnailUrl = ' '
            this.reading = ''
          } catch (error) {
            this.success = null
            this.dialog = false
            this.error = error.response.data.error
          }
        },
       async find() {
        try {
            const response = await BookService.findBook(this.search.text)
            console.log(JSON.stringify(response))
        } catch (error) {
            console.log(error)
        }        
      },
      async changeCard(bookClicked){
        if (bookClicked % 1 === 0){
          let bookId = bookClicked
          const book = await BookService.getBookById(bookId)
          this.book.title = book.data.title
          this.book.subtitle = book.data.subtitle
          this.book.authors = book.data.authors
          this.book.publishDate = book.data.publishDate.substring(0,10)
          this.book.nrPages = book.data.nrPages
          this.book.publisher = book.data.publisher
          this.book.language = book.data.language
          this.book.thumbnailUrl = book.data.thumbnailUrl
       } else {
          const bookApi = (Buffer.from(bookClicked, 'base64').toString('ascii'))
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
       this.tabs = 0
      }
    },
    rules: {
        required: (value) => !!value || 'Required.'
      },
    watch: {
      tabs: function (value) {
        const route = {
          name : 'Add a book'
        }
        route.query = {
          tab: value              
        }
        this.$router.push(route)    
       },
       search: _.debounce(async function (value) {
        this.bookListDb = []
        this.bookListApi = []
      
      if (this.search !== '') { //only proceed if search is not empty
        const route = {
        path : 'add-book?tab=1'
      }
        route.query = {
          search: this.search               
        }
        this.$router.push(route)        //puts search text on the query (URL)
        //Search DB
        const results = (await BookService.search(this.search)).data  //search the db for books with same title or author
        for (var i = 0; i < results.length; i++){
          var obj = results[i]
          var BookId = obj['id']
          let title = ''
          let authors = ''
          if (obj['title'].length > 51) {
            title = obj['title'].substring(0, 51)+'...' 
          } else {
            title = obj['title']
          }
          if (obj['authors'].length > 22) {
            authors = obj['authors'].substring(0, 22)+'...' 
          } else {
            authors = obj['authors']
          }
          var URL = BookId
          var dbbook = new Book(
              title,
              URL, 
              authors,
              obj['thumbnailUrl']
          )       
          this.bookListDb.push(dbbook)       //add new book to the array
          this.openExpansionPanel = 0
        }
        //SEARCH API
        const resultsApi = (await BookService.searchApi(this.search)).data  //search the db for books with same title
        for (var i = 0; i < resultsApi.length; i++){
          var obj = resultsApi[i]
          const bookContent = Buffer.from(JSON.stringify(obj)).toString('base64')
          let authorsString = ''
          if (obj['authors'] != undefined) {
            authorsString = JSON.stringify(obj['authors']).replace(/"/g,'').replace(/\[/,'').replace(/\]/, '') //remove all brackets and quotations marks from string
          }
          let title = ''
          if (obj['title'].length > 51) {
            title = obj['title'].substring(0, 51)+'...' 
          } else {
            title = obj['title']
          }
          let authors = ''
          if (authorsString.length > 25) {
            authors = authorsString.substring(0, 22)+'...' 
          } else {
            authors = authorsString
          }
          var newBookApi = new Book(
              title,
              bookContent, 
              authors,
              obj['thumbnail']
          )
          this.bookListApi.push(newBookApi)       //add new book to the array
        }
      }
      
    }, 700),
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
    },
    computed: {
    filteredListDb() {
      return this.bookListDb.filter(book => {
          if (this.search != undefined) {
            return book.title.toLowerCase().includes(this.search.toLowerCase()) || book.author.toLowerCase().includes(this.search.toLowerCase())
          } else {
            return ''
          }
      })
    },
    filteredListApi() {
      if (this.search != undefined) {
        return this.bookListApi.filter(book => {
          return book.title.toLowerCase().includes(this.search.toLowerCase()) || book.author.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        return ''
      }
    }
  }
}
class Book {
  constructor(title, bookData, author, img) {
    this.title = title;
    this.bookData = bookData;
    this.author = author;
    this.img = img;
  }
}
</script>

<style lang="scss" scoped>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 16px;
}

div#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .search-wrapper {
    position: relative;
    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }
    input {
      padding: 4px 12px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;
      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
  }

  .wrapper {
    display: flex;
    text-align:center;
    max-width: 100%;
    width: 1100px;
    margin:0 auto;
    flex-wrap: wrap;
    padding-top: 12px;
  }

  .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    width: 250px;
    height: 400px;
    max-width: 250px;
    max-height: 275px;
    margin: 12px;
    transition: .15s all ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
    a {
      text-decoration: none;
      padding: 12px;
      color: #03A9F4;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        height: 150px;
      }
      small {
        font-size: 10px;
        padding: 4px;
      }
    }
  }



  .hotpink {
    background: hotpink;
  }

  .green {
    background: green;
  }

  .box {
    width: 100px;
    height: 100px;
    border: 1px solid rgba(0,0,0,.12);
  }
}
</style>
