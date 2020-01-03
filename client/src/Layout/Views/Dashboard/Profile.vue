<template>
  <div class="view profile-view" id="userProfile">
	<button v-if="showBack" @click="$router.go(-1)">back</button>
		<section class="profile-view__banner">
			<div class="profile-img">
				<img v-if="user.avatar" :src="`${baseURL}${user.avatar}`">
			</div>
		</section>
		<section class="profile-view__content">
			<section class="profile-view__content-header">
				<h2 class="profile-view__content-username">
					{{ user.firstname + ' ' + user.lastname }}
				</h2>
				<h5 class="profile-view__content-role">
					{{ user.role }}
				</h5>
			</section>
			<section class="profile-view__content-bio">
				<h3 class="profile-view__content-bio--headline">
					Biography
				</h3>
				<p>
					{{ user.biography }}
				</p>
			</section>
			<section class="profile-view__gallery">
				<h3 class="profile-view__gallery--headline">
					Filmography
				</h3>
				<img src="/images/ironman.png" >
				<img src="/images/inception.png">
				<img src="/images/charly.png">
			</section>
		</section>

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
			user: {},
			baseURL: this.$store.state.baseURL
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
#userProfile {
	padding: 10px;
}
.profile-view {
	display: block;
	text-align: center;

	h3 {
		padding-bottom: 5px;
	}

	&__banner {
		width: 100%;
		height: 100px;
		background-image: url("/images/profile-banner.jpeg");
		background-size: contain;
		background-repeat: no-repeat;
		
		@include media(min, xs) {
			background-size: cover;
			height: 180px;
		}

		.profile-img  {
			padding-top: 50px;

			img {
				border-radius: 100px;
				width: 100px;
				height: auto;

				@include media(min, xs) {
					width: 150px;
					position: absolute;
					left: 10%;
					bottom: 0;
				}

				@include media(min, sm) {
					width: 200px;
					align-self: center;
					position: absolute;
					left: 10%;
					top: 20%;
				}
			}
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		

		&-header {
			text-align: center;
			width: 100%;
			text-transform: Capitalize;
			letter-spacing: 2px;
			margin-top: 50px;

				@include media(min, xs) {
					margin-bottom: 20px;
				}
		}

		&-bio {
			width: 100%;
			margin: 20px 0;
			padding: 30px;
			box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

				@include media(min, xs) {
					text-align: left;
				}
		}
	}

	&__gallery {
		display: block;

		img {
			width: 100px;
			height: auto;
			margin: 20px;
			box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

				@include media(min, xs) {
					width: 200px;
					margin: 20px 30px;
				}
		}
	}
}

/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
    .profile-view {
		color: getColor($darkTheme, fontColor);

		.profile-img  {

			img {
				border: 5px solid getColor($darkTheme, primary);
			}
		}

		&__content {

			&-bio {
				background-color: getColor($darkTheme, secondary);
			}
		}
    }
}

/*----------------------------------------------------------------------------------*\
    light THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
    .profile-view {
        color: getColor($lightTheme, fontColor);

		.profile-img  {

			img {
				border: 5px solid getColor($accents, _white);
			}
		}

		&__content {

			&-bio {
				background-color: getColor($lightTheme, primary);
			}
		}
    }
}

</style>