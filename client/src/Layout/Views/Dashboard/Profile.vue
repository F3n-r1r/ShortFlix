<template>
  <div class="view profile-view">

	  <button v-if="showBack" @click="$router.go(-1)">back</button>
    <p>Profile</p>
	{{ user }}
  </div>
</template>

<script>
import axios from 'axios';
import banner from '../../Components/Dashboard/Banner.vue';

export default {
	name: 'Profile',
	components: {
		banner
	},
	
	data() {
        return {
            user: {}
        }
  	},
	methods: {
		loadProfile: function(id) {
			axios({method: 'GET', url: `/api/user/profile/${id}`})
			.then(resp => {
				this.user = resp.data;
			}).catch(err => {
				throw(err)
			})
		},
	},
	computed: {
		showBack() {
			let currentUser = this.$store.getters.user._id;
			let params = this.$route.query.id;
			if (params === currentUser) {
				return false
			} else {
				return true
			}
		}
	},
	mounted() {
		this.loadProfile(this.$route.query.id);
	}
}
</script>


<style lang="scss">

</style>