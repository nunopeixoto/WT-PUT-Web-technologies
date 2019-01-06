<script> /* eslint-disable */ </script>
<template>
  <v-navigation-drawer id="app-drawer" v-model="inputValue" app dark floating persistent mobile-break-point="991" width="260">
    <v-img :src="image" height="100%">
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img :src="logo" height="34" contain />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            myLibrary
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-group no-action >
        <v-list-tile slot="activator" :active-class="color" avatar class="v-list-item" style="pointer-events: none;">
            <v-list-tile-action>
              <v-icon>mdi-library-books</v-icon>
            </v-list-tile-action>
            <v-list-tile-title> Change library </v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-for="(libraryNames, index) in libraryNames"
            :key="index"
            @click="changeLibrary(libraryNames.name)" avatar class="v-list-item">
          <v-list-tile-title>{{libraryNames.name}}</v-list-tile-title>
        </v-list-tile>
        </v-list-group>
        <br>
        <v-divider/>
        <v-list-tile  v-if="this.$store.state.isUserLoggedIn && !this.$store.state.userHasLibrary" to="/create-library" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-library-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Create library</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && this.$store.state.userHasLibrary" to="/manage-library" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-library</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Manage library</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && (this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary)" to="/add-book" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Add book</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  v-if="this.$store.state.isUserLoggedIn && (this.$store.state.userHasLibrary || this.$store.state.userIsPartOfLibrary)" to="/add-loan" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>mdi-book-plus</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Add loan</v-list-tile-title>
          </v-list-tile>
        <v-flex v-if="!this.$store.state.isUserLoggedIn">       
          <v-list-tile  v-for="(link, i) in linksNotLoggedIn" :key="i" :to="link.to" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="link.text" />
          </v-list-tile>
        </v-flex>
        <v-flex v-if="this.$store.state.isUserLoggedIn">       
        <v-list-tile v-for="(link, i) in linksLoggedIn" :key="i" :to="link.to" :active-class="color" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text" />
        </v-list-tile>
        </v-flex>
        <v-list-tile  :active-class="color" avatar class="v-list-item" @click="logout">
          <v-list-tile-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-tile-action>
           <v-list-tile-title> Logout </v-list-tile-title>
        </v-list-tile>

      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
import LibraryService from '@/services/LibraryService'
import store from '@/store/index'
  import {
    mapMutations,
    mapState
  } from 'vuex'
  
  export default {
    data: () => ({
      libraryNames: null,
      logo: 'https://madewithvuejs.com/mandant/madewithvuejs/images/logo-vuetify.png',
      linksNotLoggedIn: [
        {
          to: '/',
          icon: 'mdi-home',
          text: 'Home page'
        },
        {
          to: '/login',
          icon: 'mdi-account',
          text: 'Login'
        },
        {
          to: '/register',
          icon: 'mdi-account',
          text: 'Register'
        }

      ],
      linksLoggedIn: [
        {
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        {
          to: '/user-profile',
          icon: 'mdi-account',
          text: 'User Profile'
        },
        {
          to: '/table-list',
          icon: 'mdi-clipboard-outline',
          text: 'Table List'
        },
        {
          to: '/typography',
          icon: 'mdi-format-font',
          text: 'Typography'
        },
        {
          to: '/icons',
          icon: 'mdi-chart-bubble',
          text: 'Icons'
        },
        {
          to: '/maps',
          icon: 'mdi-map-marker',
          text: 'Maps'
        },
        {
          to: '/notifications',
          icon: 'mdi-bell',
          text: 'Notifications'
        }
      ],
      responsive: false
    }),
    computed: {
      ...mapState('app',['image', 'color']),
      inputValue: {
        get() {
          return this.$store.state.app.drawer
        },
        set(val) {
          this.setDrawer(val)
        }
      },
      items() {
        return this.$t('Layout.View.items')
      },
      ...mapState([
       'library',
       'user'
      ])
    },
    async mounted() {
      this.onResponsiveInverted()
      window.addEventListener('resize', this.onResponsiveInverted)
      try {
            if(this.$store.state.user){
              const response = await LibraryService.getUserLibrarys(this.$store.state.user.id)
              var names = response.data
              this.libraryNames = names
            }
      } catch (err) {
        alert(err)
      }


    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResponsiveInverted)
    },
    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true
        } else {
          this.responsive = false
        }
      },
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setHasLibrary', null)
        this.$store.dispatch('setIsPartOfLibrary', null)
        this.$store.dispatch('setLibrary', null)
        this.$router.push({
          name: 'Login'
        })
      },
      async changeLibrary(libraryName) {
        const response = await LibraryService.getLibraryByName(libraryName)
        this.$store.dispatch('setLibrary', response.data)
        if (this.$store.state.user.id == response.data.UserId){
          this.$store.dispatch('setIsPartOfLibrary', false)
          this.$store.dispatch('setHasLibrary', true)
        } else {
          this.$store.dispatch('setIsPartOfLibrary', true)
          this.$store.dispatch('setHasLibrary', false)
        }
      }
    },
    watch : {
      async 'library'() {
        try {
        if(this.$store.state.user){
          const response = await LibraryService.getUserLibrarys(this.$store.state.user.id)
           var names = response.data

        this.libraryNames = names
        }
        } catch (err) {
          alert(err)
        }
        // if (this.$store.state.userHasLibrary){
        //   this.linksLoggedIn.splice(1, 0, this.manageLib)
        // }
        // if (!(this.$store.state.userHasLibrary)){
        //   this.linksLoggedIn.splice(1, 0, this.createLib)
        // }
      }
    }
  }
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;
      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
