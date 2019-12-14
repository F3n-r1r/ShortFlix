<template>
  <div class="view profile-view">
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
		}
	},
	mounted() {
		this.loadProfile(this.$route.query.id);
	}
}
</script>


<style lang="scss">

</style>