<script>
/* eslint-disable */
</script>

<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <!-- search texfield + datatable -->
      <v-flex md12 lg12>
        <material-card color="green" title="Your books" text="Manage all the books you have from all librarys you're a member.">
        <v-text-field v-model="search" append-icon="search" label="Search" single-line style="max-width:200px;" hide-details></v-text-field>
          <v-data-table
            :headers="headers"
            :items="books"
            :search="search"
          >
          
<template slot="headerCell" slot-scope="{ header }">
  <span class="font-weight-light text-warning text--darken-3" v-text="header.text" />
</template>

<template slot="items" slot-scope="props">
  <td style="display:none;">
    {{ props.item.personalReadingId }}</td>
  <td>{{ props.item.title }}</td>
  <td>{{ props.item.authors }}</td>
  <td>{{ props.item.numberpages }}</td>
  <td>{{ props.item.library }}</td>
  <td>
    <v-icon small @click="editReading(props.item)" color="indigo">edit</v-icon> {{ props.item.reading }}
  </td>
  <td>
    <v-icon small @click="editComment(props.item)" color="indigo">edit</v-icon> {{ props.item.comment }}
  </td>
</template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialogReading" max-width="700px">
          <v-card>
            <v-card-title>
              <span class="headline">Change the read status of {{editedItem.title}}</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <!-- <v-text-field v-model="editedItem.reading" label="Calories"></v-text-field> -->
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
        </v-dialog>
  </v-container>
</template>

<script>
  import PersonalReadingService from '@/services/PersonalReadingService'
  import BookService from '@/services/BookService'
  import LibraryService from '@/services/LibraryService'
  export default {
    data() {
      return {
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
        headers: [{
            class: 'idcolumn',
            sortable: true,
            text: 'Id',
            value: 'personalReadingId',
          },
          {
            sortable: false,
            text: 'Title',
            value: 'title'
          },
          {
            sortable: false,
            text: 'Author(s)',
            value: 'authors'
          },
          {
            sortable: true,
            text: 'Number of pages',
            value: 'numberpages'
          },
          {
            sortable: true,
            text: 'Library',
            value: 'library'
          },
          {
            sortable: false,
            text: 'Read status',
            value: 'reading',
            align: 'right'
          },
          {
            sortable: false,
            text: 'Comment',
            value: 'comment',
            align: 'right'
          }
        ],
        books: [],
        optionsRead: ['Not read', 'Finished', 'Reading in progress'],
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
      }
    },
    async mounted() {

      //this.findAverages()
      this.books = []
      const response = (await PersonalReadingService.getPersonalReadingByLibraryUser(this.$store.state.user.id, 0)).data
      for (var i = 0; i < response.length; i++) {
        var obj = response[i]
        var bookId = obj['BookId']
        const book = (await BookService.getBookById(bookId)).data
        let reading = ''
        if (obj['reading'] == 0) {
          reading = 'Not read'
        } else if (obj['reading'] == 1) {
          reading = 'Finished in ' + obj['endDate']
        } else if (obj['reading'] == 2) {
          reading = 'Started in ' + obj['startDate']
        }
        this.books.push({
          personalReadingId: obj['id'],
          title: book.title,
          authors: book.authors,
          numberpages: book.nrPages,
          library: (await LibraryService.getLibraryById(obj['LibraryId'])).data.name,
          reading: reading,
          comment: obj['comment'].substring(0, 25),
        })
      }
      var x = document.getElementsByClassName("idcolumn")
      x[0].style.display = "none"
    }
  }
</script>

<style scoped>
  
</style>
