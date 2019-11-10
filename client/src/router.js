import Vue from 'vue'
import VueRouter from 'vue-router'

/* Import main layouts */
import Dashboard from './Layout/Dashboard.vue';
import Home from './Layout/Home.vue';

/* Import views */
import Movies from './Layout/Views/Dashboard/Movies.vue';
import Profile from './Layout/Views/Dashboard/Profile.vue';


Vue.use(VueRouter)

const routes = [
	{
		path: '/Dashboard',
		name: '',
		component: Dashboard,
		children: [
			{
				name: 'Profile',
				path: 'Profile',
				component: Profile
			},
			{
				name: 'Movies',
				path: 'Movies',
				component: Movies
			}
		],
		meta: {
			requiresAuth: true
		}
	},

	// DEFAULT ROUTE WHEN USER ARE NOT AUTHENTICATED (HOME PAGE)
	{
		path: '/',
		name: '/',
		component: Home,
		meta: {
			checkAuth: true
		}
	}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



// Used to check if users are authenticated when trying to navigate to 
// frontpage, if they are they should be send to the dashboard instead
router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.checkAuth)) {
		if (store.getters.isLoggedIn) {
		  next('/Dashboard/Profile') 
		  return
		}
		next() 
	  } else {
		next()
	  }
  })
  
  
  // Used to check if users are authenticated when trying to navigate to auth 
  // protected routes, if they are not they should be send to frontpage
  router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.requiresAuth)) {
	  if (store.getters.isLoggedIn) {
		next()
		return
	  }
	  next('/') 
	} else {
	  next() 
	}
  })



export default router
