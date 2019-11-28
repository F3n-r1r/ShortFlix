import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

/* Import main layouts */
import Dashboard from './Layout/Dashboard.vue';
import Home from './Layout/Home.vue';

/* Import views */
import DashboardHome from './Layout/Views/Dashboard/Home.vue';
import Movies from './Layout/Views/Dashboard/Movies.vue';
import Talks from './Layout/Views/Dashboard/Talks.vue';
import Profile from './Layout/Views/Dashboard/Profile.vue';
import Admin from './Layout/Views/Dashboard/Admin.vue';
import Community from './Layout/Views/Dashboard/Community.vue';
import Network from './Layout/Views/Dashboard/Network.vue';



Vue.use(VueRouter)

const routes = [
	{
		path: '/Dashboard',
		name: '',
		component: Dashboard,
		children: [
			{
				name: 'DashboardHome',
				path: 'DashboardHome',
				component: DashboardHome
			},
			{
				name: 'Profile',
				path: 'Profile',
				component: Profile
			},
			{
				name: 'Movies',
				path: 'Movies',
				component: Movies
			},
			{
				name: 'Talks',
				path: 'Talks',
				component: Talks
			},
			{
				name: 'Network',
				path: 'Network',
				component: Network
			},
			{
				name: 'Community',
				path: 'Community',
				component: Community
			},
			{
				name: 'Admin',
				path: 'Admin',
				component: Admin,
			}
		],
		async beforeEnter(to, from, next) {
			try {
				if(store.getters.isLoggedIn) {
					next();		
				} else {
					next('/')
				}
			} catch(e) {
				console.log(e);
				next({
					name: '/',
					query: {
						redirectFrom: to.fullPath
					}
				})
			}
		}
	},

	// DEFAULT ROUTE WHEN USER ARE NOT AUTHENTICATED (HOME PAGE)
	{
		path: '/',
		name: '/',
		component: Home,
		async beforeEnter(to, from, next) {
			try {
				if(store.getters.isLoggedIn) {
					next('/Dashboard/Movies');
				} else {
					next();
				}
			} catch(e) {
				next();
			}
		}
	}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
