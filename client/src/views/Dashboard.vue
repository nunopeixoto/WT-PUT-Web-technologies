<script>
/* eslint-disable */
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-snackbar color="success"  :top="top" v-model="snackbar" dark>
        <!-- <v-icon color="white" class="mr-3">mdi-check</v-icon> -->
        <div>Hello <b>@{{this.$store.state.user.username}}</b>! Welcome to myLibrary app. </div>
        <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
      </v-snackbar>

      <!-- stats card -->
      <v-flex sm6 xs12 md6 lg3 >
        <material-stats-card color="info" icon="mdi-book-open" title="Average pages read per day" :value="this.averageBooksCard.averagePagesDay" sub-icon="mdi-update" :sub-text="this.averageBooksCard.averagePagesMonth"/>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card color="orange" icon="mdi-library" title="Books read from libraries" :value="this.booksReadFromLibrariesCard.valueText" small-value="Books" sub-icon="mdi-read" :sub-text="this.booksReadFromLibrariesCard.subtext"/>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-tooltip bottom>
          <material-stats-card slot="activator" color="red" icon="mdi-book" title="Currently reading" :value="this.currentlyReadingCard.bookName" sub-icon="mdi-library" :sub-text="this.currentlyReadingCard.libraryName"/>
          <span style="font-size:20px; color:white;">{{this.currentlyReadingCard.bookNameComplete}}</span>
        </v-tooltip>
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <v-tooltip bottom>
          <material-stats-card slot="activator" color="green" icon="mdi-check" title="Last finished book" :value="this.lastFinishedBook.title" sub-icon="mdi-calendar" :sub-text="this.lastFinishedBook.endDate"/>
          <span style="font-size:20px; color:white;">{{this.lastFinishedBook.titleComplete}}</span>
        </v-tooltip>
      </v-flex>
      <!-- search texfield + datatable -->
      <v-flex md12 lg12>
        <material-card color="green" title="Your loans" text="Manage all the loans you're a part of.">
        <v-text-field v-model="search" append-icon="search" label="Search" single-line style="max-width:200px;" hide-details></v-text-field>
          <v-data-table :headers="headers" :items="activeLoans" :search="search"> 
<template slot="headerCell" slot-scope="{ header }">
  <span class="font-weight-light text-warning text--darken-3" v-text="header.text" />
</template>

<template slot="items" slot-scope="props">
  <td style="display:none;">
    {{ props.item.loanId }}</td>
  <td>{{ props.item.bookTitle }}</td>
  <td>{{ props.item.from }}</td>
  <td>{{ props.item.to }}</td>
  <td>{{ props.item.startDate }}</td>
</template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PersonalReadingService from '@/services/PersonalReadingService'
  import BookService from '@/services/BookService'
  import LoanService from '@/services/LoanService'
  import LibraryService from '@/services/LibraryService'
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    data() {
      return {
        snackbar: false,
        top:true,
        averageBooksCard: {
          averagePagesMonth: '',
          averagePagesDay: '',
        },
        lastFinishedBook: {
          endDate: '',
          title: '',
          titleComplete: ''
        },
        currentlyReadingCard: {
          bookName: '',
          bookNameComplete: '',
          libraryName: ''
        },
        booksReadFromLibrariesCard : {
          valueText: null,
          subtext: null,
        },
        dialogReading: false,
        dialogComment: false,
        search: '',
        date: new Date().toISOString().substr(0, 10),
        modalStart: false,
        modalEnd: false,
        editedItem: {
          title: '',
          authors: '',
          reading: '',
          startDate: '',
          endDate: ''
        },
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
            ]
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: []
          },
          options: {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                }
              }
            }]
          ]
      },
        headers: [{
            class: 'idcolumn',
            sortable: true,
            text: 'Id',
            value: 'loanId',
          },
          {
            sortable: false,
            text: 'Book',
            value: 'booktitle'
          },
          {
            sortable: false,
            text: 'From',
            value: 'from'
          },
          {
            sortable: true,
            text: 'To',
            value: 'to'
          },
          {
            sortable: true,
            text: 'Start date',
            value: 'startDate'
          }
        ],
        activeLoans: [],
        list: {
          0: false,
          1: false,
          2: false
        },
        defaultItem: {
          title: '',
          authors: '',
          reading: '',
          comment: ''
        },
        editedIndex: -1
      }
    },
    methods: {
      complete(index) {
        this.list[index] = !this.list[index]
      },
      editReading(item) {
        this.editedIndex = this.books.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogReading = true
      },
      editComment(item) {
        this.editedIndex = this.books.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogComment = true
      },
      async saveReading() {
        try {
          if (this.editedIndex > -1) {
            let updatedReading = (this.editedItem).reading
            let reading = null
            let dateToSend = null
            let personalReadingId = (this.editedItem).personalReadingId
            if (updatedReading == 'Not read') {
              reading = 0
            } else if (updatedReading.substring(0, 8) == 'Finished') {
              reading = 1
              dateToSend = this.date
              this.editedItem.reading = 'Finished in ' + dateToSend
            } else if (updatedReading == 'Reading in progress') {
              reading = 2
              dateToSend = this.date
              this.editedItem.reading = 'Started at ' + dateToSend
            }
            await PersonalReadingService.updateReading(personalReadingId, reading, dateToSend)
            Object.assign(this.books[this.editedIndex], this.editedItem)
          } else {
            this.books.push(this.editedItem)
          }
          this.closeDialogReading()
        } catch (err) {
          alert(err)
        }
      },
      async saveComment() {
        try {
          if (this.editedIndex > -1) {
            let updatedComment = (this.editedItem).comment
            let personalReadingId = (this.editedItem).personalReadingId
            await PersonalReadingService.updateComment(personalReadingId, updatedComment)
            Object.assign(this.books[this.editedIndex], this.editedItem)
          } else {
            this.books.push(this.editedItem)
          }
          this.closeDialogComment()
        } catch (err) {
          alert(err)
        }
      },
      closeDialogReading() {
        this.dialogReading = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      closeDialogComment() {
        this.dialogComment = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      async findLastFinishedBook(){
        try {
            const lastFinishedPersonalReading = await PersonalReadingService.findLastFinishedPersonalReading(this.$store.state.user.id)
            if (lastFinishedPersonalReading.data.length==1){
            const lastBook = (await BookService.getBookById(lastFinishedPersonalReading.data[0].BookId)).data
            this.lastFinishedBook.titleComplete = lastBook.title
            let bookTitle = null
            if(lastBook.title.length > 24){
              bookTitle = lastBook.title.substring(0,20) +'...'
            } else {
              bookTitle = lastBook.title
            }
            this.lastFinishedBook.title = bookTitle
            this.lastFinishedBook.endDate = 'Finished in ' +lastFinishedPersonalReading.data[0].endDate
          } else {
            this.lastFinishedBook.title = 'No finished book.'
            this.lastFinishedBook.endDate = 'None'
          }
        } catch (err) {
         
         alert(err)
        }
      },
      async findCurrentlyReadingBook(){
        try {
          const currentlyReadingPersonalReading = await PersonalReadingService.findCurrentlyReadingPersonalReading(this.$store.state.user.id)
          if (currentlyReadingPersonalReading.data.length==1){
            const currentBook = (await BookService.getBookById(currentlyReadingPersonalReading.data[0].BookId)).data
            const currentLibrary = (await LibraryService.getLibraryById(currentlyReadingPersonalReading.data[0].LibraryId)).data 
            this.currentlyReadingCard.bookNameComplete = currentBook.title
            let BookName = null
            if(currentBook.title.length > 24) {
              BookName = currentBook.title.substring(0, 19) + '...'
            } else {
              BookName = currentBook.title
            }
            this.currentlyReadingCard.bookName =  BookName
            this.currentlyReadingCard.libraryName = 'From ' +currentLibrary.name
          } else {
            this.currentlyReadingCard.bookName =  'None'
            this.currentlyReadingCard.libraryName = 'None'
          }
        } catch (err) {
          alert(err)
        }
      },
      async findBooksReadFromLibraries(){
        try {
          const booksReadFromLibraries = (await PersonalReadingService.findBooksReadFromLibraries(this.$store.state.user.id)).data
          let booksRead = booksReadFromLibraries.booksRead
          let totalBooks = booksReadFromLibraries.totalBooks
          let percentage = Math.round((booksRead / totalBooks ) * 100)
          this.booksReadFromLibrariesCard.valueText= booksRead+'/'+totalBooks
          this.booksReadFromLibrariesCard.subtext = `It looks like you've read ${percentage}% of your books.`
        } catch (err) {
          alert(err)
        }
      },
      async findAverages(){
        try {
          const averages = (await PersonalReadingService.findAverages(this.$store.state.user.id)).data
          this.averageBooksCard.averagePagesDay = averages.averagePagesDay+''
          this.averageBooksCard.averagePagesMonth = `Which means you've been reading ${averages.averagePagesMonth} pages per month.`
          
        } catch (err) {
          alert(err)
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.path === '/login') {
          vm.snackbar=true
        } else {
          vm.snackbar = false
        }

        next()
      })
    }, 
    async mounted() {
      this.findLastFinishedBook()
      this.findCurrentlyReadingBook()
      this.findBooksReadFromLibraries()
      this.findAverages()
      this.activeLoans = []
      const response = (await LoanService.getLoansByUserId(this.$store.state.user.id, 0)).data
      for (var i = 0; i < response.length; i++) {
        var obj = response[i]
        if (obj['ExternalBookId'] == null) {
          var personalReading = (await PersonalReadingService.getPersonalReadingById(obj['PersonalReadingId'])).data
          var bookId = personalReading.BookId
          const book = (await BookService.getBookById(bookId)).data
          var from = (await AuthenticationService.getUserById(obj['UserLenterId'])).data
          var to = (await AuthenticationService.getUserById(obj['UserBorrowerId'])).data
          var toUsername = ''
          if (obj['UserBorrowerId'] == null ) {
            toUsername = obj['status'].substring(8, obj['status'].length)
          } else {
            toUsername = '@'+to.username
          }
          var startDate = obj['startDate']
          this.activeLoans.push({
            loanId: obj['id'],
            bookTitle: book.title,
            from: '@'+from.username,
            to: toUsername,
            startDate: startDate.substring(0,10)
          })
        } else {
          const book = (await BookService.getBookById(obj['ExternalBookId'])).data
          var from = obj['status'].substring(10, obj['status'].length)
          var to = '@'+this.$store.state.user.username
          var startDate = obj['startDate']
          this.activeLoans.push({
            loanId: obj['id'],
            bookTitle: book.title,
            from: from,
            to: to,
            startDate: startDate.substring(0,10)
          })
        }
      }
      var x = document.getElementsByClassName("idcolumn")
      x[0].style.display = "none"
    }
  }
</script>

<style scoped>
  
</style>
