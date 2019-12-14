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
				<figure class="center-logo">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="200px"  viewBox="0 0 538.6 111.4" style="enable-background:new 0 0 538.6 111.4;" xml:space="preserve">
                        <g>
                            <path class="st0" d="M47.3,66.9c0-3.3-1.2-5.8-3.5-7.6c-2.3-1.8-6.5-3.6-12.5-5.6c-6-1.9-10.8-3.9-14.3-5.8
                                    C7.4,42.8,2.6,35.9,2.6,27.1c0-4.6,1.3-8.6,3.9-12.2c2.6-3.6,6.3-6.4,11.1-8.4c4.8-2,10.2-3,16.2-3c6,0,11.4,1.1,16.1,3.3
                                    c4.7,2.2,8.4,5.3,11,9.2c2.6,4,3.9,8.5,3.9,13.6H47.3c0-3.9-1.2-6.9-3.6-9c-2.4-2.1-5.8-3.2-10.2-3.2c-4.2,0-7.5,0.9-9.9,2.7
                                    c-2.4,1.8-3.5,4.2-3.5,7.1c0,2.7,1.4,5,4.1,6.9c2.8,1.9,6.8,3.6,12.2,5.2c9.9,3,17.1,6.7,21.6,11.1s6.8,9.9,6.8,16.4
                                    c0,7.3-2.8,13-8.3,17.2c-5.5,4.2-13,6.2-22.3,6.2c-6.5,0-12.4-1.2-17.7-3.6C11.1,84.2,7,81,4.2,76.8C1.4,72.7,0,67.9,0,62.5h17.4
                                    c0,9.3,5.6,14,16.7,14c4.1,0,7.4-0.8,9.7-2.5C46.1,72.2,47.3,69.9,47.3,66.9z"/>
                            <path class="st0" d="M97.6,33.2c4.4-5.3,10-8,16.7-8c13.6,0,20.5,7.9,20.7,23.7v24.7h-16.7V49.3c0-3.6-0.8-6.2-2.3-8
                                    c-1.5-1.7-4.1-2.6-7.7-2.6c-4.9,0-8.5,1.9-10.7,5.7v29.1H80.9V0.1h16.7V33.2z"/>
                            <path class="st0" d="M151,57.1c0-6.2,1.2-11.8,3.6-16.6c2.4-4.9,5.8-8.6,10.3-11.3c4.5-2.7,9.7-4,15.7-4c8.5,0,15.4,2.6,20.7,7.8
                                    c5.3,5.2,8.3,12.2,8.9,21.1l0.1,4.3c0,9.6-2.7,17.3-8,23.1c-5.4,5.8-12.6,8.7-21.6,8.7c-9,0-16.2-2.9-21.6-8.7S151,67.8,151,57.8
                                    V57.1z M167.7,58.3c0,6,1.1,10.5,3.4,13.7c2.2,3.2,5.4,4.7,9.6,4.7c4.1,0,7.2-1.6,9.5-4.7c2.3-3.1,3.4-8.1,3.4-14.9
                                    c0-5.8-1.1-10.4-3.4-13.6c-2.3-3.2-5.5-4.8-9.6-4.8c-4.1,0-7.3,1.6-9.5,4.8C168.8,46.7,167.7,51.6,167.7,58.3z"/>
                            <path class="st0" d="M261.7,42c-2.3-0.3-4.3-0.5-6-0.5c-6.3,0-10.5,2.1-12.4,6.4v25.6h-16.7V26.3h15.8l0.5,7.5
                                    c3.4-5.8,8-8.6,14-8.6c1.9,0,3.6,0.3,5.2,0.8L261.7,42z"/>
                            <path class="st0" d="M298.7,10.9v15.4h10.7v12.3h-10.7v31.3c0,2.3,0.4,4,1.3,5c0.9,1,2.6,1.5,5.1,1.5c1.9,0,3.5-0.1,4.9-0.4v12.7
                                    c-3.3,1-6.7,1.5-10.1,1.5c-11.7,0-17.7-5.9-18-17.8V38.6h-9.1V26.3h9.1V10.9H298.7z"/>
                            <path class="st0" d="M409.4,89h-10.7V0.1h10.7V89z"/>
                            <path class="st0" d="M432.5,9.7c0-1.7,0.5-3.2,1.6-4.4c1.1-1.2,2.6-1.8,4.7-1.8c2.1,0,3.7,0.6,4.7,1.8c1.1,1.2,1.6,2.7,1.6,4.4
                                    s-0.5,3.2-1.6,4.3c-1.1,1.2-2.7,1.7-4.7,1.7c-2.1,0-3.7-0.6-4.7-1.7C433.1,12.9,432.5,11.5,432.5,9.7z M444.1,89h-10.7V26.3h10.7
                                    V89z"/>
                            <g>
                                <path class="st0" d="M345.9,90.2V35.8H336v-8.3h9.9v-6.4c0-6.7,1.8-11.9,5.4-15.6c3.6-3.7,8.7-5.5,15.2-5.5c2.5,0,4.9,0.3,7.4,1
                                        l-0.6,8.6c-1.8-0.3-3.7-0.5-5.8-0.5c-3.5,0-6.2,1-8,3.1c-1.9,2-2.8,4.9-2.8,8.7v6.6h13.4v8.3h-13.4v54.4H345.9z"/>
                            </g>
                                <path class="st0" d="M487.3,47.9l38.8-47.8h12.5L493.2,56l44.9,55.4h-12.4l-38.2-47.2L473,87.7h-12.4L481.7,56l-20.5-31h12.4
                                    L487.3,47.9z"/>
                            </g>
                    </svg>
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
			
			.home-main__slider {

                .center-logo {
                    fill: getColor($accents, secondary);

					display: flex;
					justify-content: center;
					padding-top: 20%;
					
					// the logo image
					svg {
						width: 35%;
						height: auto;
					}

					@include media(min, xs) {
						padding-top: 4%;
					}
                }

				// mobile first
				&--subtext {
					text-align: center;
					font-size: 10px;
					color: getColor($accents, primary);
					
					@include media(min, xs) {
						font-size: 14px;
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