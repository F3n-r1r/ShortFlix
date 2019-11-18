import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
	/*-------------------------------------------------*\
		1. - STATE
	\*-------------------------------------------------*/
 	 state: {
		status: '',
		token: localStorage.getItem('token') || '',
		user: '',
		theme: localStorage.getItem('theme') || 'light-theme'
  	},


	/*-------------------------------------------------*\
		2. - GETTERS
	\*-------------------------------------------------*/
  	getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
		user: state => state.user,
		theme: state => state.theme
  	},


	/*-------------------------------------------------*\
		3. - MUTATIONS
	\*-------------------------------------------------*/
	mutations: {
		auth_request(state){
			state.status = 'loading'
		},
		auth_success(state, {token, user}){
			state.status = 'success'
			state.token = token
			state.user = user
		},
		auth_error(state){
			state.status = 'error'
		},
		logout(state){
			state.status = ''
			state.token = ''
		},
		theme(state, theme){
			state.theme = theme;
		}
	},



	/*-------------------------------------------------*\
		1. - ACTIONS
	\*-------------------------------------------------*/
	actions: {
		/*-------------------------------------------------*\
			1.1. - SET NEW THEME
		\*-------------------------------------------------*/
		setTheme({commit}, theme) {
			commit('theme', theme);
			localStorage.setItem('theme', theme);
		},
		/*-------------------------------------------------*\
			1.2. - GET CURRENT USER
		\*-------------------------------------------------*/
		getCurrentUser({commit, getters, state}) {
			if(getters.isLoggedIn) {
				let token = state.token;
				return new Promise((resolve, reject) => {
					axios({method: 'GET', url: 'http://localhost:8000/api/user/current'})
					.then(resp => {
						let user = resp.data.user
						commit('auth_success', {token, user})
						resolve(resp)
					})
				})
			} else  {
				console.log('Not logged in so wont fetch user')
			}
		},
		/*-------------------------------------------------*\
			1.3. - REGISTER NEW USER
		\*-------------------------------------------------*/
		register({commit}, user){
			return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({method: 'POST', url: 'http://localhost:8000/api/auth/register', data: user })
				.then(resp => {    
					resolve(resp)
				})
				.catch(err => {
					commit('auth_error', err)
					reject(err)
				})
			})
		},
		/*-------------------------------------------------*\
			1.4. - LOGIN USER
		\*-------------------------------------------------*/
		login({commit}, user) {
			return new Promise((resolve, reject) => {
				commit('auth_request');
				axios({method: 'POST', url: 'http://localhost:8000/api/auth/login', data: user})
				.then(resp => {
					const token = resp.data.token;
					const user = resp.data.user;
					commit('auth_success', {token, user});
					localStorage.setItem('token', token);
					axios.defaults.headers.common['Authorization'] = token;
					resolve(resp);
				}).catch(err => {
					commit('auth_error');
					localStorage.removeItem('token');
					reject(err);
				})
			})
		},
		/*-------------------------------------------------*\
			1.5. - LOGOUT USER
		\*-------------------------------------------------*/
		logout({commit}){
			return new Promise((resolve, reject) => {
				commit('logout')
				localStorage.removeItem('token')
				delete axios.defaults.headers.common['Authorization']
				resolve()
			})
		}
	},
})
