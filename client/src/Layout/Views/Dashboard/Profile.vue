<template>
  <div class="view profile-view">
    <p>Profile</p>
	
  </div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Profile',
	components: {

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