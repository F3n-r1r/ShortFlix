import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

/* Import main layouts */
import Dashboard from './Layout/Dashboard.vue';
import Home from './Layout/Home.vue';

/* Import views */
import DashboardHome from './Layout/Views/Dashboard/Home.vue';
import Showcases from './Layout/Views/Dashboard/Showcases.vue';
import Movies from './Layout/Views/Dashboard/Movies.vue';
import Talks from './Layout/Views/Dashboard/Talks.vue';
import Profile from './Layout/Views/Dashboard/Profile.vue';
import PendingUsers from './Layout/Views/Dashboard/PendingUsers.vue';
import Community from './Layout/Views/Dashboard/Community.vue';
import Network from './Layout/Views/Dashboard/Network.vue';
import Cinema from './Layout/Views/Dashboard/Cinema.vue';
import News from './Layout/Views/Dashboard/News.vue';



Vue.use(VueRouter)

const routes = [
	{
		path: '/Dashboard',
		name: '',
		component: Dashboard,
		children: [
			{
				name: 'DashboardHome',
				path: 'Home',
				component: DashboardHome
			},
			{
				name: 'Profile',
				path: 'Profile',
				component: Profile
			},
			{
				name: 'Showcases',
				path: 'Showcases',
				component: Showcases
			},
			{
				name: 'Movies',
				path: 'Movies',
				component: Movies
			},
			{
				name: 'News',
				path: 'News',
				component: News
			},
			{
				name: 'Talks',
				path: 'Talks',
				component: Talks
			},
			{
				name: 'Cinema',
				path: 'Cinema',
				component: Cinema
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
				name: 'PendingUsers',
				path: 'PendingUsers',
				component: PendingUsers,
				async beforeEnter(to, from, next) {
					try {
						if(store.getters.user.role === 'Admin') {
							next();		
						} else {
							next('Dashboard/Home')
						}
					} catch(e) {
						next({
							name: '/',
							query: {
								redirectFrom: to.fullPath
							}
						})
					}
				}
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
					next('/Dashboard/Home');
				} else {
					next('/');
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
