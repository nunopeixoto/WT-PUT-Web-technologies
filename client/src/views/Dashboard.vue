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
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="Revenue"
          value="$34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="Used Space"
          value="49/50"
          small-value="GB"
          sub-icon="mdi-alert"
          sub-icon-color="error"
          sub-text="Get More Space..."
          sub-text-color="text-primary"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="Fixed Issues"
          value="75"
          sub-icon="mdi-tag"
          sub-text="Tracked from Github"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex> -->
      <v-flex
        md12
        lg12
      >
        <material-card
          color="green"
          title="Your books"
          text="Manage all the books you have from all librarys you're a member."
        >
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          style="max-width:200px;"
          hide-details
        ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="books"
            :search="search"
          >
<template slot="headerCell" slot-scope="{ header }">
  <span class="font-weight-light text-warning text--darken-3" v-text="header.text" />
</template>

<template slot="items" slot-scope="props">
  <td>
    {{ props.item.personalReadingId }}</td>
  <td>{{ props.item.title }}</td>
  <td>{{ props.item.authors }}</td>
  <td>{{ props.item.numberpages }}</td>
  <td>{{ props.item.library }}</td>
  <td>
    <v-icon small @click="editItem(props.item)" color="indigo">edit</v-icon> {{ props.item.reading }} </td>
  <td>{{ props.item.comment }}</td>
</template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
    <!-- <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Use Google's location service?</v-card-title>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout> -->
    <v-dialog v-model="dialog" max-width="700px">
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
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
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
        dialog: false,
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
            sortable: false,
            text: 'Id',
            value: 'personalReadingId'
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
      editItem(item) {
        this.editedIndex = this.books.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      async save() {
        try {
          if (this.editedIndex > -1) {
            let updatedReading = (this.editedItem).reading
            let reading = null
            let dateToSend = ''
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
          this.close()
        } catch (err) {
          alert(err)
        }
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    },
    async mounted() {
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
          comment: obj['comment'],
        })
      }
    }
  }
</script>
