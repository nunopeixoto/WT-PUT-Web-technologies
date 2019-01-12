<script> /* eslint-disable */ </script>
<template>
<panel title="Add book automatically">
  <v-form><br>
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
    <div class="card" v-for="book in filteredListDb" :key="book.title" @click="changeCard(book)">
      <small><center>By: {{ book.author }}</center></small>
      <!--<a v-bind:href="book.link" target="_blank">-->
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
            <div class="card" v-for="book in filteredListApi" :key="book.title" @click="changeCard(book)">
              <small><center>By: {{ book.author }}</center></small>
              <!-- <a v-bind:href="book.link" target="_blank"> -->
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
  </v-form>
</panel>
</template>

<script>
import BookService from '@/services/BookService'
import _ from 'lodash'
export default {
  props: ['value'],
  data () {
    return {
      search: '',
      bookListDb : [],
      bookListApi : [],
      openExpansionPanel: 1
    }
  },
  methods: {
    async find() {
        try {
            const response = await BookService.findBook(this.search.text)
            console.log(JSON.stringify(response))
        } catch (error) {
            console.log(error)
        }        
    },
    changeCard(book) {
      alert(book)
      let tabs = 0
      this.$emit('input', tabs)
    }
  },
  watch : {
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
        const results = (await BookService.search(this.search)).data  //search the db for books with same title
        for (var i = 0; i < results.length; i++){
          var obj = results[i]
          var BookId = obj['id']
          let title = ''
          let authors = ''
          if (obj['title'].length > 49) {
            title = obj['title'].substring(0, 49)+'(...)' 
          } else {
            title = obj['title']
          }
          if (obj['authors'].length > 25) {
            authors = obj['authors'].substring(0, 20)+'(...)' 
          } else {
            authors = obj['authors']
          }
          var URL = `http://localhost:8080/add-book/${BookId}?tab=0`
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
          //alert(JSON.stringify(obj))
         // alert('cqdqdq'+obj['title'])
          // var BookId = obj['id']
          const cenas = Buffer.from(JSON.stringify(obj)).toString('base64')
          var URL = `http://localhost:8080/add-book/api/${cenas}`
          let authorsString = ''
          if (obj['authors'] != undefined) {
            authorsString = JSON.stringify(obj['authors']).replace(/"/g,'').replace(/\[/,'').replace(/\]/, '') //remove all brackets and quotations marks from string
          }
          let title = ''
          if (obj['title'].length > 49) {
            title = obj['title'].substring(0, 49)+'(...)' 
          } else {
            title = obj['title']
          }
          let authors = ''
          if (authorsString.length > 25) {
            authors = authorsString.substring(0, 20)+'(...)' 
          } else {
            authors = authorsString
          }
          var newBookApi = new Book(
              title,
              URL, 
              authors,
              obj['thumbnail']
          )
          this.bookListApi.push(newBookApi)       //add new book to the array
         // alert(obj['title']+URL)
        }
      }
      
    }, 700),
    '$route.query.search' : {    //puts the text of the query in the search textfield
      immediate: true,
      async handler (value) {
        this.search = value
      }
    }
  },
  computed: {
    filteredListDb() {
      return this.bookListDb.filter(book => {
          if (this.search != undefined) {
            return book.title.toLowerCase().includes(this.search.toLowerCase())
          } else {
            return ''
          }
      })
    },
    filteredListApi() {
      if (this.search != undefined) {
        return this.bookListApi.filter(book => {
          return book.title.toLowerCase().includes(this.search.toLowerCase())
        })
      } else {
        return ''
      }
    }
  }
}
class Book {
  constructor(title, link, author, img) {
    this.title = title;
    this.link = link;
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
