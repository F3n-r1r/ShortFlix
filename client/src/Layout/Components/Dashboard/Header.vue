<template>
    <header class="header">
		<!-------------------------------------------------------------------------------------->
		<!-- BURGER MENU BUTTON																  -->
		<!-------------------------------------------------------------------------------------->
		<button class="header__burger-btn" @click="openMenu"></button>

		<!-------------------------------------------------------------------------------------->
        <!-- ADD MOVIE (DESKTOP)      				             							  -->
        <!-------------------------------------------------------------------------------------->
		<div class="row__add-movie" @click="toggleUploadModal">
            <p class="add-movie__btn">Upload movie</p>
        </div>

		<!-------------------------------------------------------------------------------------->
		<!-- (UPLOAD VIDEO) MODAL COMPONENT					        						  -->
		<!-------------------------------------------------------------------------------------->
		<modal class="home-view__modal-upload" v-show="uploadModal"> 
			<div class="modal__content">
				<button class="content__close-btn" type="button" @click="toggleUploadModal">
					<i class="close-btn__icon fas fa-times"></i>
				</button>
				<upload v-model="myMovies" :resetUpload="resetUpload"/>
			</div>
		</modal>	

		<!-------------------------------------------------------------------------------------->
		<!-- DROPDOWN CONTAINER																  -->
		<!-------------------------------------------------------------------------------------->
		<div class="header__dropdown">
			<!-- DROPDOWN BUTTON -->			
			<button class="dropdown__btn" @click="showDropdown">
				<p class="btn__username">
					<span class="username__firstname">{{ user.firstname }}</span>&nbsp;
					<span class="username__lastname">{{ user.lastname }}</span>
				</p>
				<img v-if="user.avatar" class="btn__img" :src="`http://localhost:8000/${user.avatar}`">
			</button>

			<!-- DROPDOWN CONTENT -->
			<ul class="dropdown__content">
				<li class="content__item">
					<ul class="item__list">
						<li class="list__header">Profile<li>
						<li class="list__item"><router-link class="item__link" :to="{ path: '/Dashboard/EditProfile', query: { id: user._id }}">Edit Profile<i class="link__icon far fa-edit"></i></router-link></li>
						<li class="list__item"><router-link class="item__link" :to="{ path: '/Dashboard/Profile', query: { id: user._id }}">View Profile<i class="link__icon far fa-user"></i></router-link></li>
					</ul>
				</li>
				<li class="content__item">
					<ul class="item__list">
						<li class="list__header">Settings</li>
						<li class="list__item list__item--alt" @click="changeTheme">
							<span class="item__theme-name"></span>
							<div class="item__toggle">
								<input type="checkbox" id="toggle__checkbox" class="toggle__checkbox" />
								<label for="toggle__checkbox" class="toggle__label"></label>
							</div>
						</li>
					</ul>
				</li>
				<li class="content__item">
					<ul class="item__list">
						<li class="list__item list__item--alt" @click="showModal">
							<span>Sign Out</span>
							<i class="fas fa-door-open"></i>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		

		<!-------------------------------------------------------------------------------------->
		<!-- MODAL FOR SIGN OUT NOTIFICATION 												  -->
		<!-------------------------------------------------------------------------------------->
		<modal v-show="isModalVisible">
			<div class="modal-content">
				<h3 class="modal-content__headline">Are you sure you wish to sign out?</h3>
				<div class="modal-content__btn-container">
					<button class="btn-container__btn btn-container__btn--positive" @click="logout">Yes</button>
					<button class="btn-container__btn btn-container__btn--negative" @click="closeModal">No</button>
				</div>
			</div>
		</modal>

    </header>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import modal from '../Shared/Modal.vue';
import upload from '../../Components/Dashboard/Upload.vue';

/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
	name: 'dashboardheader',
	props: {
		user: {
			//type: Array,
			required: true
		}
	},
	components: {
		modal,
		upload
	},

	/*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
	data() {
		return {
			isModalVisible: false,
			uploadModal: false,
		}
	},

	/*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
	methods: {
		toggleUploadModal() {
			if(!this.uploadModal) {
                this.uploadModal = true;
                this.resetUpload = false;
				document.body.style.overflow = "hidden";
			} else {
                this.uploadModal = false;
                this.resetUpload = true;
				document.body.removeAttribute("style");
			}
        },
		openMenu: function() {
			document.querySelector('.header .header__burger-btn').classList.add('header__burger-btn--active');
			document.querySelector('.aside .content-header__burger-btn').classList.add('content-header__burger-btn--active');
			document.querySelector('.dashboard .aside').classList.add('aside--active');
		},
		logout: function() {
			this.$store.dispatch('logout')
			.then(() => {
				this.$router.push('/')
			})
		},
		changeTheme: function() {
			if(this.$store.getters.theme === 'light-theme') {
				this.$store.dispatch('setTheme', 'dark-theme');
				document.querySelector('.toggle__checkbox').checked = true;
			} else {
				this.$store.dispatch('setTheme', 'light-theme'); 
				document.querySelector('.toggle__checkbox').checked = false;
			}
		},
		showDropdown: function() {
			let dropdown = document.querySelector('.header__dropdown');
			dropdown.classList.toggle('header__dropdown--active');
		},
		showModal: function() {
			this.isModalVisible = true;
			document.body.style.overflow = "hidden";
		},	
		closeModal: function() {
			this.isModalVisible = false;
			document.body.removeAttribute("style");
		}
	},

	/*----------------------------------------------------------------------------------*\
		COMPUTED
	*\----------------------------------------------------------------------------------*/
	computed: {
		getTheme() {
			return this.$store.getters.theme
		}
	},

	/*----------------------------------------------------------------------------------*\
		WATCH
	*\----------------------------------------------------------------------------------*/
	watch: {
		getTheme(theme) {
			if(theme === 'dark-theme') {
				document.querySelector('.toggle__checkbox').checked = true
				document.querySelector('.header .dropdown__content .content__item .item__theme-name').innerHTML = 'Dark Mode'
			} else {
				document.querySelector('.header .dropdown__content .content__item .item__theme-name').innerHTML = 'Light Mode'
			}
		}
	},

	/*----------------------------------------------------------------------------------*\
		MOUNTED
	*\----------------------------------------------------------------------------------*/
	mounted() {
		if(this.$store.getters.theme === 'dark-theme') {
			document.querySelector('.toggle__checkbox').checked = true
			document.querySelector('.header .dropdown__content .content__item .item__theme-name').innerHTML = 'Dark Mode'
		} else {
			document.querySelector('.header .dropdown__content .content__item .item__theme-name').innerHTML = 'Light Mode'
		}
	}
};
</script>





<style lang="scss" scoped>
/*----------------------------------------------------------------------------------*\
    HEADER
*\----------------------------------------------------------------------------------*/
.header {
	@include flexRow(center, flex-end);
	padding: 0px 20px;
	transition: background-color $themeTransitionTime;

	/*----------------------------------------------------------------------------------*\
    	ADD MOVIE BUTTON
	*\----------------------------------------------------------------------------------*/
	.row__add-movie {
        display: none; // should not be visible for the pro´s
        margin-right: 25px;
        cursor: pointer;

        @include media(min, xs) {
            @include flexRow(center, center);
        }

        &:hover > .add-movie__btn {
            transform: scale(1.1);
            font-weight: bold;
        }

        .add-movie__btn {
			@extend %secondary-btn;
			font-style: normal;
			border: none;
			background-color: getColor($accents, secondary);
            transition: transform .5s ease, color .5s ease;
            color: getColor($accents, primary);
        }
    }

	/*----------------------------------------------------------------------------------*\
		BURGER BUTTON
	*\----------------------------------------------------------------------------------*/
	&__burger-btn {
		@extend %burger-btn;
		opacity: 1;
		position: absolute;
		left: 5%;

		@include media(min, md) {
			display: none;
		}

		&--active {
			pointer-events: none;
			@extend %burger-btn--active;
			opacity: 0;
		}
	}


	/*----------------------------------------------------------------------------------*\
		DROPDOWN
	*\----------------------------------------------------------------------------------*/
	&__dropdown {
		position: relative;
		@include flexColumn(center, center);
		z-index: 1;
	

		/*----------------------------------------------------------------------------------*\
			DROPDOWN BUTTON
		*\----------------------------------------------------------------------------------*/
		.dropdown__btn {
			@include flexRow(center, center);
			border: none;
			background: none;
			cursor: pointer;
			outline: none;

			&:hover > .btn__username {
				transition: color $hoverTransitionTime;

				&:after {
					content: '';
					width: 100%;
					transition: background-color $themeTransitionTime, width $hoverTransitionTime;
				}
			}

			.btn__img {
				height: 40px;
				width: 40px;
				border-radius: 50%;
				margin: 0px 0px 0px 10px;
			}

			.btn__username {
				position: relative;
				font-size: 14px;
				transition: color $themeTransitionTime;


				&:after {
					content: '';
					position: absolute;
					display: block;
					height: 1px;
					width: 0%;
					transition: width $hoverTransitionTime;
				}

				.username__firstname {
					text-transform: capitalize;
				}

				.username__lastname {
					text-transform: capitalize;
				}
			}
		}


		/*----------------------------------------------------------------------------------*\
			DROPDOWN CONTENT
		*\----------------------------------------------------------------------------------*/
		.dropdown__content {
			display: none;
			position: absolute;
			top: calc(100% + 15px);
			right: 0;
			width: 250px;
			transition: color $themeTransitionTime;

			&:after{
				content: '';
				position: absolute;
				right: 10px;
				top: -10px;
				width: 0;
				height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				z-index: 999;
				border-bottom: 10px solid transparent;
				transition: border-bottom-color $themeTransitionTime;
			}

			.content__item {
				user-select: none;
				transition: background-color $themeTransitionTime, border-left $themeTransitionTime;
				
				&:last-child {
					.item__list {
						&:after {
							display: none; 
						}
					}
				}

				.item__list {
					position: relative;
					width:100%;

					&:after {
						content: "";
						position: absolute;
						transform: translateX(10px);
						bottom: 0;
						width: calc(100% - 20px);
						border-bottom: 1px solid transparent;
						transition: border-bottom-color $themeTransitionTime;
					}

					.list__header {
						font-weight: 600;
						padding: 10px 10px 5px 13px;
						letter-spacing: 2px;
						transition: color $themeTransitionTime;
					}

					.list__item {
						border-left: 3px solid transparent;
						cursor: pointer;
						font-size: 14px;
						transition: color $themeTransitionTime;

						&--alt {
							@include flexRow(center, space-between);
							padding: 10px 13px 10px 10px;
						}

						&:hover {
							transition: background-color $hoverTransitionTime, color $hoverTransitionTime;
						}

						.item__link {
							@include flexRow(center, space-between);
							height: 100%;
							padding: 10px 13px 10px 10px;
							transition: color $themeTransitionTime;
						}

						.item__toggle {
							height: 18px;

							.toggle__checkbox {
								display: none;

								&:checked ~ label::after {
									transform: translateX(21px);
								}
							}

							.toggle__label {
								pointer-events: none;
								border-radius: 50px;
								cursor: pointer;
								display: inline-block;
								position: relative;
								width: 40px;
								height: 100%;
								transition: background-color $themeTransitionTime;

								&:after {
									border-radius: 50%;
									content: ' ';
									cursor: pointer;
									display: inline-block;
									position: absolute;
									left: 2px;
									top: 2px;
									width: 14px;
									height: 14px;
									transition: background-color $themeTransitionTime, transform $toggleTransitionTime;
								}
							}
						}
					}
				}
			}
		}


		/*----------------------------------------------------------------------------------*\
			DROPDOWN ACTIVE
		*\----------------------------------------------------------------------------------*/
		&--active {
			.dropdown__btn {
				.btn__username {
					&:after {
						content: '';
						width: 100%;
					}
				}
			}

			.dropdown__content {
				display: block;
			}
		}
	}


	/*----------------------------------------------------------------------------------*\
		MODAL
	*\----------------------------------------------------------------------------------*/
    .modal-content {
		@include flexColumn(center, center);
		padding: 30px;

		&__headline {
			margin-bottom: 20px;
			transition: color $themeTransitionTime;
		}

		&__btn-container {
			.btn-container__btn {
				@extend %primary-btn;
				transition: background-color $themeTransitionTime;

				&:hover {
					transition: background-color $hoverTransitionTime;
				}

				&:first-child {
					margin-right: 20px;
				}
			}
		}
    }
}


/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
    .header {
		background-color: getColor($darkTheme, tertiary);

		&__burger-btn {
			color: getColor($accents, _white);
		}

		&__dropdown {
			.dropdown__btn {
				&:hover > .btn__username {
					color: getColor($accents, _white);
				}

				.btn__username {
					color: getColor($darkTheme, fontColor);

					&:after {
						background-color: getColor($accents, primary);
					}
				}
			}
		
			.dropdown__content {
				color: getColor($accents, _white);

				&:after {
					border-bottom-color: getColor($darkTheme, secondary)
				}

				.content__item {
					background-color: getColor($darkTheme, secondary);

					.item__list {
						&:after {
							border-bottom-color: rgba(255, 255, 255, .2);
						}

						.list__header {
							color: getColor($accents, _white);
						}

						.list__item {
							color: getColor($accents, _white);

							&:hover {
								background-color: lighten(getColor($darkTheme, secondary), 5%);
								border-color: getColor($accents, primary);
							}

							.item__link {
								color: getColor($accents, _white);
							}

							.item__toggle {
								.toggle__label {
										background-color: getColor($accents, primary);

									&:after {
										background-color: getColor($accents, _white);
									}
								}
							}
						}
					}
				}
			}

			&--active {
				.dropdown__btn {
					.btn__username {
						color: getColor($accents, _white);
					}
				}
    		}
		}
    
		.modal-content {
			background-color: getColor($darkTheme, primary);

			&__headline {
				color: getColor($accents, _white);
			}

			&__btn-container {
				.btn-container__btn {
					&--positive {
						background-color: getColor($accents, tertiary);

						&:hover {
							background-color: lighten(getColor($accents, tertiary), 10%);
						}
					}

					&--negative {
						background-color: getColor($accents, primary);

						&:hover {
							background-color: lighten(getColor($accents, primary), 10%);
						}
					}
				}
			}
		}
  	}
}


/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
	.header {
		background-color: getColor($lightTheme, tertiary);

		&__burger-btn {
			color: getColor($accents, _white);
		}

		&__dropdown {
			.dropdown__btn {
				&:hover > .btn__username {
					color: getColor($accents, _white);
				}

				.btn__username {
					color: getColor($lightTheme, fontColorSec);

					&:after {
						background-color: getColor($accents, primary);
					}
				}
			}
		
			.dropdown__content {
				color: getColor($accents, _white);

				&:after {
					border-bottom-color: getColor($lightTheme, secondary)
				}

				.content__item {
					background-color: getColor($lightTheme, primary);

					.item__list {
						&:after {
							border-bottom-color: rgba(0, 0, 0, .2);
						}

						.list__header {
							color: getColor($accents, _black);
						}

						.list__item {
							color: getColor($accents, _black);

							&:hover {
								background-color: lighten(getColor($lightTheme, secondary), 5%);
								border-color: getColor($accents, primary);
							}

							.item__link {
								color: getColor($accents, _black);
							}

							.item__toggle {
								.toggle__label {
										background-color: getColor($lightTheme, secondary);

									&:after {
										background-color: getColor($accents, secondary);
									}
								}
							}
						}
					}
				}
			}

			&--active {
				.dropdown__btn {
					.btn__username {
						color: getColor($accents, _white);
					}
				}
    		}
		}
    
		.modal-content {
			background-color: getColor($lightTheme, primary);

			&__headline {
				color: getColor($accents, _black);
			}

			&__btn-container {
				.btn-container__btn {
					&--positive {
						background-color: getColor($accents, tertiary);

						&:hover {
							background-color: lighten(getColor($accents, tertiary), 10%);
						}
					}

					&--negative {
						background-color: getColor($accents, primary);

						&:hover {
							background-color: lighten(getColor($accents, primary), 10%);
						}
					}
				}
			}
		}
  	}
}
</style>