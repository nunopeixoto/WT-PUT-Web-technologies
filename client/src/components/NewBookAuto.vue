<script> /* eslint-disable */ </script>
<template>
  <v-form>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6 offset-xs3 >
            <div class="search-wrapper">
            <h1> Search book </h1>
            <v-text-field label="Search by title or author" v-model="search"></v-text-field>
            <v-btn dark class="cyan" @click="changeContainers"> Didn't find what you were looking for? </v-btn>
  </div>
  <br>
  <v-container v-if="this.dbContainer">
  <h3> Books added by other users</h3>
  <div class="wrapper">
    <div class="card" v-for="book in filteredListDb" :key="book.title">
      <small>Author(s): {{ book.author }}</small>
      <a v-bind:href="book.link" target="_blank">
        <img v-bind:src="book.img"/>
        
        {{ book.title }}
        
      </a>
    </div>
  </div>
  </v-container>
  <v-container v-if="this.apiContainer">
    <h3> Books on our database </h3>
  <div class="wrapper">
    <div class="card" v-for="book in filteredListAPI" :key="book.title">
      <a v-bind:href="book.link" target="_blank">
        <img v-bind:src="book.img"/>
        <small>posted by: {{ book.author }}</small>
        {{ book.title }} 
      </a>
    </div>
  </div>
  <v-btn dark class="cyan" router to='newbookmanually'> Still can't find it? Add it manually </v-btn>
  </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import BookService from '@/services/BookService'
import _ from 'lodash'
export default {
  data () {
    return {
      search: '',
      dbContainer: true,
      apiContainer: false,
      bookListDb : [],
      bookListAPI : []
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
    changeContainers () {
      if(this.apiContainer === false){
        this.apiContainer = true
        this.dbContainer = false
      } else {
        this.apiContainer = false
        this.dbContainer = true
      }
    }
  },
  watch : {
    search: _.debounce(async function (value) {
      this.bookListDb = []
      const route = {
        name : 'newbookauto'
      }
      //do nothing when search is empty
      if (this.search !== '') {
        route.query = {
          //puts search on the query (URL)
          search: this.search
        }
        this.$router.push(route)
        const results = (await BookService.search(this.search)).data
        for (var i = 0; i < results.length; i++){
         var obj = results[i]
         var BookId = obj['id']
        //  const UserId = this.$store.state.user.id
        //  const LibraryId = this.$state.store.library.id
         var URL = `http://localhost:8080/#/newbookmanually/${BookId}`
         var dbbook = new Book(
           obj['title'],
           URL, 
           obj['authors'],
           obj['thumbnailUrl']
         )

         
         this.bookListDb.push(dbbook)
        }

      }
      
    }, 700),
    '$route.query.search' : {
      immediate: true,
      async handler (value) {
        this.search = value
      }
    }
  },
  computed: {
    filteredListDb() {
      return this.bookListDb.filter(book => {
          return book.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredListAPI() {
      return this.bookListAPI.filter(book => {
        return book.title.toLowerCase().includes(this.search.toLowerCase())
      })
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
    //max-width: 444px;
    width: 900px;
    flex-wrap: wrap;
    padding-top: 12px;
  }

  .card {
    box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
    max-width: 300px;
    max-height: 300px;
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
        height: 100px;
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
