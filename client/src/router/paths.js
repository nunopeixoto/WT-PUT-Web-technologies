/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/register',
    name: 'Register',
    view: 'Register'
  },
  {
    path: '/register-enhanced/:email/:libraryId',
    name: 'Register Enhanced',
    view: 'RegisterEnhanced'
  },
  {
    path: '/',
    name: 'Homepage',
    view: 'Homepage'
  },
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/create-library',
    name: 'Create Library',
    view: 'CreateLibrary'
  },
  {
    path: '/manage-library',
    name: 'Manage Library',
    view: 'ManageLibrary'
  },
  {
    path: '/add-book',
    name: 'Add a book',
    view: 'AddBook'
  },
  {
    path: '/add-book/:BookId',
    name: 'Add book auto',
    view: 'AddBook'
  },
  {
    path: '/add-book/api/:Book',
    name: 'Add book auto from api',
    view: 'AddBook'
  },
  {
    path: '/newbookauto',
    name: 'newbookauto',
    view: 'AddBookAutomaticPanel'
  },
  {
    path: '/your-books',
    name: 'Your books',
    view: 'YourBooks'
  },
  {
    path: '/add-loan',
    name: 'Add a loan',
    view: 'AddLoan'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]
