<script>
/* eslint-disable */
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <!-- <v-flex
              md12
              sm12
              lg4
            >
              <material-chart-card
                :data="dailySalesChart.data"
                :options="dailySalesChart.options"
                color="info"
                type="Line"
              >
                <h4 class="title font-weight-light">Daily Sales</h4>
                <p class="category d-inline-flex font-weight-light">
                  <v-icon
                    color="green"
                    small
                  >
                    mdi-arrow-up
                  </v-icon>
                  <span class="green--text">55%</span>&nbsp;
                  increase in today's sales
                </p>
      
                <template slot="actions">
                  <v-icon
                    class="mr-2"
                    small
                  >
                    mdi-clock-outline
                  </v-icon>
                  <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
</template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="red"
          type="Bar"
        >
          <h4 class="title font-weight-light">Email Subscription</h4>
          <p class="category d-inline-flex font-weight-light">Last Campaign Performance</p>

<template slot="actions">
  <v-icon class="mr-2" small>
    mdi-clock-outline
  </v-icon>
  <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
</template>
        </material-chart-card>
      </v-flex>
      <v-flex
        md12
        sm12
        lg4
      >
        <material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          color="green"
          type="Line"
        >
          <h3 class="title font-weight-light">Completed Tasks</h3>
          <p class="category d-inline-flex font-weight-light">Last Last Campaign Performance</p>

<template slot="actions">
  <v-icon class="mr-2" small>
    mdi-clock-outline
  </v-icon>
  <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
</template>
        </material-chart-card>
      </v-flex> -->
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
   <!-- <v-dialog v-model="dialogReading" max-width="700px">
          <v-card>
            <v-card-title>
              <span class="headline">Change the read status of {{editedItem.title}}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <!-- <v-text-field v-model="editedItem.reading" label="Calories"></v-text-field> 
                          <v-select v-model="editedItem.reading" v-bind:items="this.optionsRead" label="Read status" ></v-select>
                          <v-dialog ref="dialogStart" v-if="editedItem.reading=='Reading in progress'" v-model="modalStart" :return-value.sync="date" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="date" label="Started in" prepend-icon="event" readonly></v-text-field>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalStart = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogStart.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                    <v-dialog ref="dialogEnd" v-if="editedItem.reading=='Finished'" v-model="modalEnd" :return-value.sync="date" persistent lazy full-width width="290px">
                      <v-text-field slot="activator" v-model="date" label="Finished in" prepend-icon="event" readonly></v-text-field>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modalEnd = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialogEnd.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="closeDialogReading">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="saveReading">Save</v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
    <v-dialog v-model="dialogComment" max-width="900px">
      <v-card>
        <v-card-title>
          <span class="headline">Comment {{editedItem.title}}</span>
        </v-card-title>
         <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-textarea v-model="editedItem.comment" label="Comment"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
         </v-card-text>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeDialogComment">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="saveComment">Save</v-btn>
         </v-card-actions>
        </v-card>
        </v-dialog> -->
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
        // dailySalesChart: {
        //   data: {
        //     labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        //     series: [
        //       [12, 17, 7, 17, 23, 18, 38]
        //     ]
        //   },
        //   options: {
        //     lineSmooth: this.$chartist.Interpolation.cardinal({
        //       tension: 0
        //     }),
        //     low: 0,
        //     high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        //     chartPadding: {
        //       top: 0,
        //       right: 0,
        //       bottom: 0,
        //       left: 0
        //     }
        //   }
        // },
        // dataCompletedTasksChart: {
        //   data: {
        //     labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
        //     series: [
        //       [230, 750, 450, 300, 280, 240, 200, 190]
        //     ]
        //   },
        //   options: {
        //     lineSmooth: this.$chartist.Interpolation.cardinal({
        //       tension: 0
        //     }),
        //     low: 0,
        //     high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        //     chartPadding: {
        //       top: 0,
        //       right: 0,
        //       bottom: 0,
        //       left: 0
        //     }
        //   }
        // },
        // emailsSubscriptionChart: {
        //   data: {
        //     labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
        //     series: [
        //       [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
  
        //     ]
        //   },
        //   options: {
        //     axisX: {
        //       showGrid: false
        //     },
        //     low: 0,
        //     high: 1000,
        //     chartPadding: {
        //       top: 0,
        //       right: 5,
        //       bottom: 0,
        //       left: 0
        //     }
        //   },
        //   responsiveOptions: [
        //     ['screen and (max-width: 640px)', {
        //       seriesBarDistance: 5,
        //       axisX: {
        //         labelInterpolationFnc: function (value) {
        //           return value[0]
        //         }
        //       }
        //     }]
        //   ]
        // },
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
              BookName = currentBook.title.substring(0, 20) + '...'
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
          var from = this.$store.state.user.username
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
            from: '@'+from,
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
