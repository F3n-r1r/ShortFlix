<template>
  <div class="home">
    <div class="home-container">

      	<!-------------------------------------------------------------------------------------->
		<!-- HEADER																			  -->
		<!-------------------------------------------------------------------------------------->
		<header class="header">
			<div class="header__center">
				<figure class="center__logo">
                    <!-- <img src="../Assets/logo.png"> -->
                </figure>
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

			</section>
			<section class="home-main__featured-content">
				<div class="test1"></div>
				<div class="test2"></div>
				<div class="test3"></div>
				<div class="test4"></div>
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


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
  name: 'Home',
  components: {
    modal,
	auth
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
.home-container {
	padding: 0px 15px;
	margin: 0 auto;
	max-width: 1140px;

	@include media(min, xs) {
		max-width: 100%;
	}

	@include media(min, sm) {
		max-width: 720px;
	}

	@include media(min, md) {
		max-width: 960px;
	}

	@include media(min, lg) {
		max-width: 1140px;
	}

	@include media(min, xl) {
		max-width: 1400px
	}


	/*----------------------------------------------------------------------------------*\
		HEADER
	*\----------------------------------------------------------------------------------*/
	.header { 
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		justify-items: center;
		padding: 20px 0px;
		
		&__center {
			grid-column: 2 / 3;

			.center__logo {
				font-size: 36px;
			}
		}

		&__right {
			@include flexRow(center, flex-end);
			width: 100%;
			grid-column: 3 / -1;

			.right__login {
				font-size: 18px;
				@extend %icon-btn;
			}
		} 
	}

	/*----------------------------------------------------------------------------------*\
		MAIN CONTENT
	*\----------------------------------------------------------------------------------*/
	.home-main {
		display: grid;
		grid-auto-rows: auto;;
		grid-gap: 20px;

		&__slider {
			height: 500px;
			background-color: getColor($lightTheme, primary);
		}

		&__featured-content {
			display: grid;
			grid-auto-rows: 250px;
			grid-template-columns: repeat(6, 1fr);
			grid-gap: 20px;

			@include media(min, sm) {
				grid-template-columns: repeat(12, 1fr);
			}

			.test1 {
				grid-column: span 6;
				grid-row: 1 / 3;
				background-color: getColor($lightTheme, primary);
			}
			.test2 {
				grid-column: span 6;
				background-color: getColor($accents, secondary);
			}
			.test3 {
				grid-column: span 3;
				background-color: getColor($lightTheme, primary);
			}
			.test4 {
				grid-column: span 3;
				background-color: getColor($lightTheme, primary);
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
</style>