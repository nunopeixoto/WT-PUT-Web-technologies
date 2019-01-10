<script>/*eslint-disable */ </script>
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Register">
          <v-form>
            <v-container py-0>  
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-select :items="optionFrom" v-model="selectFrom" label="From"></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select :items="optionsTo"  v-model="selectTo" label="To"></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field label="From"  v-if="!lenterIsUser && lenterIsUser != null"  placeholder="Person name and surname" required :rules="[required]" type="text" v-model="Loan.externalUserName"></v-text-field>    
                    <v-text-field label="From"  v-if="this.selectFrom=='Me'" v-model="userLoggedInUsername" disabled type="text" ></v-text-field>        
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field label="To"  v-if="borrowerIsUser" placeholder="User e-mail or @username" required :rules="[required]" type="text" v-model="Loan.UserBorrowerUsernameOrEmail"></v-text-field>
                    <v-text-field label="To" v-if="!borrowerIsUser && borrowerIsUser != null" placeholder="Person name and surname" required :rules="[required]" type="text" v-model="Loan.externalUserName"></v-text-field>
                    <v-text-field label="From"  v-if="this.selectTo=='Me'" v-model="userLoggedInUsername" disabled type="text" ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-autocomplete v-if="selectFrom=='Me'" v-model="bookNamesSelect" :items="Books" :label="`Book`" persistent-hint>
                    <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
                    </v-slide-x-reverse-transition>
                    </v-autocomplete>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field v-if="!lenterIsUser && lenterIsUser != null" label="Book" required :rules="[required]" v-model="book.title" @click="dialogBook=true" ></v-text-field>
                  </v-flex>
                <br>
               <v-flex xs12 md6>
                <v-menu :close-on-content-click="false" v-model="datepickerStart" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                  <v-text-field slot="activator" v-model="Loan.startDate" label="Start date" prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="Loan.startDate" @input="datepickerStart = false"></v-date-picker>
                </v-menu>
               </v-flex>            
                <br>
                <v-alert v-if="success" :value="true" type="success">
                {{success}}.
                </v-alert>
                <v-alert  v-if="error" :value="true" type="error">
                {{error}}
                </v-alert>
                <br>
                <v-flex xs12 text-xs-right>
                <v-btn color="success" v-if="!lenterIsUser && lenterIsUser != null" dark @click="dialogBook = true">Edit book </v-btn> 
                    <v-btn color="success" @click="addLoan"> Submit </v-btn>
                    </v-flex>
              <v-dialog v-model="dialogBook" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
                <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click="dialogBook = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Book information</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="dialogBook = false">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            <v-card-text>
              <v-flex xs6 offset-xs3>
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
                <v-btn dark flat class="blue" @click="dialogBook = false">Save</v-btn>
              </v-flex>
            </v-card-text>
  
            <div style="flex: 1 1 auto;"></div>
          </v-card>
        </v-dialog>
                </v-layout>
</v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import AddBookManuallyPanel from './AddBookManuallyPanel'
  import PersonalReadingService from '@/services/PersonalReadingService'
  import BookService from '@/services/BookService'
  import AuthenticationService from '@/services/AuthenticationService'
  import LoanService from '@/services/LoanService'

  export default {
    components: {
      AddBookManuallyPanel
    },
    data() {
      return {
        dialogBook: false,
        optionFrom: ['Me', 'External user'],
        optionsTo: ['Me', 'Other user', 'External user'],
        Books: [],
        PersonalReadingIds: [],
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
        Loan : {
            UserLenterId: null,
            UserBorrowerUsernameOrEmail: null,
            PersonalReadingId: null,
            BookId: null,
            startDate: new Date().toISOString().substr(0, 10),
            externalUserName: null,
            status: null
        },
        userLoggedInUsername: '@'+this.$store.state.user.username,
        bookNamesSelect: null,
        lenterIsUser: null,
        borrowerIsUser: null,
        selectFrom: null,
        selectTo: null,
        datepickerStart: false,
        datepickerEnd: false,
        datepicker: null,
        dialogLenter: false,
        dialogBorrower: false,
        userLabel: false,
        error: null,
        success: null,
        required: (value) => !!value || 'Required.'
      }
    },
    methods: {
      async addLoan() {
        try {
         if (this.selectFrom=="Me"){
           this.Loan.IdLenter = this.$store.state.user.id
           if(this.borrowerIsUser){
             const UserBorrower = (await AuthenticationService.getUserByEmailOrUsername(this.Loan.UserBorrowerUsernameOrEmail)).data
             this.Loan.status = 'Lent to @'+UserBorrower.username
             this.Loan.UserBorrowerId = UserBorrower.id
           }
           if(!(this.borrowerIsUser)){
           this.Loan.status = 'Lent to '+ this.Loan.externalUserName + '[outside user]'
           }

          let selectedIndex = this.Books.indexOf(this.bookNamesSelect)      //searching for the PersonalReadingId
          const personalReadingId = this.PersonalReadingIds[selectedIndex]  //of the select option books

          const response = await LoanService.addLoan({
            PersonalReadingId : personalReadingId,
            UserLenterId: this.$store.state.user.id ,
            UserBorrowerId: this.Loan.UserBorrowerId,
            ExternalBookId: null,
            startDate: this.Loan.startDate,
            status: this.Loan.status
         })
         this.Loan.UserBorrowerId = null
         this.error= ''
         this.success = 'Loan added to your list.'
         } else if (this.selectFrom == 'External user') {
           this.Loan.status = 'Lent from '+ this.Loan.externalUserName + '[outside user]'
        
          //creating the book
          if (!(this.subtitle)){
            this.book.subtitle = 'No subtitle'
          }
          const areAllFieldsFilledIn = Object
            .keys(this.book)
            .every(key => !!this.book[key])
            if (!areAllFieldsFilledIn){
              this.error= 'Please fill all the required fields about the book.'
              this.dialog = false
              return
            }
            const responseBook = await BookService.createBook(this.book)
            //creating the loan
           const response = await LoanService.addLoan({
            PersonalReadingId : null,
            UserLenterId: null,
            UserBorrowerId: this.$store.state.user.id,
            ExternalBookId: responseBook.data.id,
            startDate: this.Loan.startDate,
            status: this.Loan.status
         })
          this.success = 'Loan added to your list'
         } else {
           this.error = 'Some error has occured. Please try again later.'
         }
        } catch (error) {
          this.success = null
          this.error = error.response.data.error
        }
      }
      // lenterIsUserMethod(){
      //     this.lenterIsUser = true
      //     this.dialogLenter = false
      // },
      // lenterIsNotUserMethod(){
      //     this.lenterIsUser = false
      //     this.dialogLenter = false
      // },
      // borrowerIsUserMethod(){
      //     this.borrowerIsUser = true
      //     this.dialogBorrower = false
      // },
      // borrowerIsNotUserMethod(){
      //     this.borrowerIsUser = false
      //     this.dialogBorrower = false
      // }
    },
    watch: {
        'selectFrom': async function(newVal) {
            if (this.selectTo == newVal){
                this.selectFrom = ''
                this.selectTo = ''
                
            }
            if (newVal == 'Other user'){
                    this.selectTo = 'Me'
                    this.lenterIsUser = true
                    this.borrowerIsUser = null                   
                   // this.dialogLenter=true
            } else if (newVal == 'Me') {
                    this.Books = [] //clears the array, in case the user changed library
                    //this.selectTo = ''  
                    this.lenterIsUser = null  
                    this.UserLenterId = this.$store.state.user.id
                    //Search on the backend for book names from user that's logged in, in the library that he has open
                    const personalReadingsId = (await PersonalReadingService.getPersonalReadingByLibraryUser(this.$store.state.user.id, this.$store.state.library.id)).data
                    for(var i = 0; i < personalReadingsId.length; i++) {
                      var obj = personalReadingsId[i];
                      const bookName = await BookService.getBookById(obj.BookId)
                       this.Books.push(bookName.data.title);
                       this.PersonalReadingIds.push(bookName.data.id);
                    }
                    // const bookName = await BookService.getBookById(personalReadingsId.data.BookId)
                    // alert(JSON.stringify(bookName))
                    
            } else if (newVal == 'External user'){

                this.selectTo='Me'
                this.lenterIsUser = false             
            }
        },
        'selectTo': function (newVal) {
          //  if (this.selectFrom == newVal){
          //       this.selectTo = ''
          //       this.selectFrom = ''
          //       return
          //   }
            // if (newVal == 'Other user'){
            //     this.borrowerIsUser = true
            //     this.selectFrom = 'Me'
            // } else 
            if (newVal == 'Me') {
                this.UserBorrowerId = this.$store.state.user.id
                this.borrowerIsUser = null
            } else  if (newVal == 'External user'){
              this.Loan.UserBorrowerUsernameOrEmail = ''
              this.selectFrom = 'Me'
              this.borrowerIsUser = false
            } else if (newVal == 'Other user'){
              this.Loan.externalUserName = ''
              this.selectFrom = 'Me'
              this.borrowerIsUser = true
              //IMPLEMENT HERE -> TONS OF BUGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
            }

            if (this.selectFrom == newVal){
                    this.selectFrom = ''
            } 
            
          },
          '$store.state.library': function (newVal) {
            this.selectTo = ''
            this.selectFrom = ''
            this.lenterIsUser = null
            this.borrowerIsUser = null
            this.bookNamesSelect = ''
          }

    }
  }
  
</script>

<style scoped>

</style>
