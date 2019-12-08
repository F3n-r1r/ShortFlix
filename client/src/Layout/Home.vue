<template>
  <div class="home">
    <div class="home-container">

      	<!-------------------------------------------------------------------------------------->
		<!-- HEADER																			  -->
		<!-------------------------------------------------------------------------------------->
		<header class="header">
			<div class="header__center">
			</div>
			<div class="header__right">
				<button class="right__login" @click="toggleAuthModal"><i class="fas fa-user-lock"></i></button>
			</div>  
		</header>


		<!-------------------------------------------------------------------------------------->
		<!-- MAIN PAGE CONTENT																  -->
		<!-------------------------------------------------------------------------------------->
		<main class="home-main">
			<section class="home-main__slider">
				<figure class="center__logo">
                    <img src="/images/logo.png">
                </figure>
				<h3 class="home-main__slider--subtext">
					Curating the newest work from Short Film Students
				</h3>
			</section>
			<section class="home-main__featured-content">
				<teaser />
			</section>
		</main>


		<!-------------------------------------------------------------------------------------->
		<!-- (AUTH) MODAL COMPONENT															  -->
		<!-------------------------------------------------------------------------------------->
		<modal v-show="authModal" style="background-color: rgba(0, 0, 0, 0.3);"> <!-- FIND NEW WAY TO APPLY MODAL BG COLOR ONLY FOR USE ON HOME PAGE -->
			<div class="modal-content modal-content--auth">
				<button type="button" class="auth__close-btn" @click="toggleAuthModal" aria-label="Close modal">
					<i class="fas fa-times"></i>
				</button>
				<!-- AUTH COMPONENT -->
				<auth :registerSubmitDone="toggleMessageModal"/>
			</div>
		</modal>


		<!-------------------------------------------------------------------------------------->
		<!-- (REGISTERED MESSAGE) MODAL COMPONENT											  -->
		<!-------------------------------------------------------------------------------------->
		<modal v-show="registerMsgModal" style="background-color: rgba(0, 0, 0, 0.3);"> <!-- FIND NEW WAY TO APPLY MODAL BG COLOR ONLY FOR USE ON HOME PAGE -->
			<div class="modal-content modal-content--message" style="background-color: #fff">
				<h4 class="message__headline">Hello <span class="headline__username">{{ registeredUsername }}</span>!</h4>
				<p class="message__text">Your request has succesfully been submitted and will be processed within the next 1-2 works days</p>
				<button class="message__close-btn" type="button" @click="toggleMessageModal">
					Ok
				</button>
			</div>
		</modal>


    </div>
  </div>
</template>

<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import auth from './Components/Home/Auth.vue';
import modal from './Components/Shared/Modal.vue';
import teaser from './Components/Limited/Teaser.vue';

/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
  name: 'Home',
  components: {
    modal,
	auth,
	teaser
	
  },


	/*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
	data () {
		return {
			authModal: false,
			registerMsgModal: false,
			registeredUsername: ''
		};
	},

	/*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
	methods: {
		toggleAuthModal() {
			if(!this.authModal) {
				this.authModal = true;
				document.body.style.overflow = "hidden";
			} else {
				this.authModal = false;
				document.body.removeAttribute("style");
			}
		},
		toggleMessageModal(username) {
			this.registeredUsername = username;
			if(!this.registerMsgModal) {
				this.registerMsgModal = true;
				document.body.style.overflow = "hidden";
			} else {
				this.registerMsgModal = false;
				this.authModal = false;
				document.body.removeAttribute("style");
			}
		}
	}
}
</script>


<style lang="scss">
/*----------------------------------------------------------------------------------*\
    HOME LAYOUT
*\----------------------------------------------------------------------------------*/
.home {
	background-color: getColor($darkTheme, secondary);

	.home-container {
		margin: 0 auto;

		@include media(min, xs) {
			max-width: 100%;
		}

		@include media(min, sm) {
			// max-width: 720px;
		}

		@include media(min, md) {
			// max-width: 960px;
		}

		@include media(min, lg) {
			// max-width: 1140px;
		}

		@include media(min, xl) {
			// max-width: 1400px
		}


		/*----------------------------------------------------------------------------------*\
			HEADER
		*\----------------------------------------------------------------------------------*/
		.header { 
			padding: 20px 20px 0;

			&__right {
				@include flexRow(center, flex-end);
				width: 100%;

				.right__login {
					font-size: 18px;
					@extend %icon-btn;
					color: white;
				}
			} 
		}

		/*----------------------------------------------------------------------------------*\
			MAIN CONTENT
		*\----------------------------------------------------------------------------------*/
		.home-main {
			
			&__slider {

				// mobile first
				&--subtext {
					text-align: center;
					font-size: 10px;
					color: getColor($accents, primary);
					
					@include media(min, xs) {
						font-size: 14px;
					}
				}

				.center__logo {
					display: flex;
					justify-content: center;
					padding-top: 20%;
					
					// the logo image
					img {
						width: 80%;
						height: auto;
					}

					@include media(min, xs) {
						padding-top: 4%;
						
						// the logo image
						img {
							width: 40%;
						}
					}
				}

			}

			&__featured-content {
				margin: 20px 20px;
			
				@include media(min, xs) {
					margin: 10px 100px;
				}
			}
		}


	/*----------------------------------------------------------------------------------*\
		MODAL COMPONENT
	*\----------------------------------------------------------------------------------*/
	.modal-content {

		/*----------------------------------------------------------------------------------*\
			AUTHENTICATION MODAL CONTENT
		*\----------------------------------------------------------------------------------*/
		&--auth {
			.auth__close-btn {
				position: absolute;
				@extend %icon-btn;
				font-size: 18px;
				right: 10px;
				top: 10px;;
				z-index: 999;
			}
		}

			
		/*----------------------------------------------------------------------------------*\
			REGISTER MESSAGE MODAL CONTENT
		*\----------------------------------------------------------------------------------*/
		&--message {
			@include flexColumn(center, center);
			text-align: center;
			max-width: 500px;
			padding: 20px;

			.message__headline {
				margin-bottom: 10px;

				.headline__username {
					text-transform: capitalize;
				}
			}

			.message__text {

			}

			.message__close-btn {
				@extend %primary-btn;
				margin-top: 20px;
			}
		}
	}
	}
}
</style>