<template>
	<div class="dashboard" :class="theme">
		
		<!-------------------------------------------------------------------------------------->
		<!-- DASHBOARD HEADER																  -->
		<!-------------------------------------------------------------------------------------->
		<dashboardheader :user="currentUser" class="dashboard__header" />

		<!-------------------------------------------------------------------------------------->
		<!-- DASHBOARD ASIDE																  -->
		<!-------------------------------------------------------------------------------------->
		<dashboardaside :user="currentUser" />


		<!-------------------------------------------------------------------------------------->
		<!-- DASHBOARD MAIN	ROUTE															  -->
		<!-------------------------------------------------------------------------------------->
		<main class="dashboard__main">
			<transition name="scale-fade" mode="out-in">
				<router-view></router-view>
			</transition>
		<!-------------------------------------------------------------------------------------->
		<!-- MAIN FOOTER																  -->
		<!-------------------------------------------------------------------------------------->
			<dashboardfooter class="main__footer"/>
		</main>
		
	</div>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import dashboardheader from '../Layout/Components/Dashboard/Header.vue';
import dashboardaside from '../Layout/Components/Dashboard/Aside.vue';
import dashboardfooter from '../Layout/Components/Dashboard/Footer.vue';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
  	name: 'Dashboard',
    components: {
		dashboardheader,
		dashboardaside,
		dashboardfooter
	},
	  
	/*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
	data() {
		return {
			theme: this.$store.getters.theme,
			currentUser: [],
		}
	},
	
	/*----------------------------------------------------------------------------------*\
		COMPUTED
	*\----------------------------------------------------------------------------------*/
	computed: {
		themeChange () {
			return this.$store.getters.theme;
		},
		getUser() {
			return this.$store.getters.user
		}
	},

	/*----------------------------------------------------------------------------------*\
		WATCH
	*\----------------------------------------------------------------------------------*/
	watch: {
		themeChange(value) {
			this.theme = value;
		},
		getUser(user) {
			this.currentUser = user;
		}
	},

	/*----------------------------------------------------------------------------------*\
		MOUNTED
	*\----------------------------------------------------------------------------------*/
	mounted() {
		this.currentUser = this.$store.getters.user;
	}
}
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    DASHBOARD LAYOUT
*\----------------------------------------------------------------------------------*/
.dashboard {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 100px auto;

		@include media(min, md) {
			grid-template-columns: 300px 1fr;
		}
	/*----------------------------------------------------------------------------------*\
		DASHBOARD HEADER
	*\----------------------------------------------------------------------------------*/
	&__header {
		position: relative;
		grid-row: 1;
		@include media(min, md) {
			grid-column: 2;
		}
	}
	/*----------------------------------------------------------------------------------*\
		DASHBOARD MAIN
	*\----------------------------------------------------------------------------------*/
	&__main {
		width: 100%;
		position: relative;
		overflow-y: auto;
		display: grid;
		overflow-x: hidden;
		grid-row: 2;
		// grid-template-rows: min(500px) auto;
		transition: background-color $themeTransitionTime;
							
		/*----------------------------------------------------------------------------------*\
			MAIN FOOTER
		*\----------------------------------------------------------------------------------*/
		&.main__footer {
			min-height: 500px;
			grid-row: 2;
		}

		@include media(min, md) {
			grid-column: 2;
		}
		/*----------------------------------------------------------------------------------*\
			VIEW CLASS
		*\----------------------------------------------------------------------------------*/
		.view {	// All dashboard related views needs this class
			width: 100%;
			height: 100%;
			grid-row: 1;
			transition: background-color $themeTransitionTime;
		}
		/*----------------------------------------------------------------------------------*\
			PAGE TRANSITION
		*\----------------------------------------------------------------------------------*/
		.scale-fade-enter-active, .scale-fade-leave-active {
			transition-duration: 0.5s;
			transition-property: opacity, transform;
			transition-timing-function: ease;
		}
		.scale-fade-enter-active {
			transform: scale(1);
			opacity: 1;
		}
		.scale-fade-enter, .scale-fade-leave-active {
			opacity: 0;
			transform: scale(.5);
		}
	}	
	
}
	
	




/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme { 
	background-color: getColor($darkTheme, primary);
	
	.dashboard {
		background-color: getColor($darkTheme, primary);

		&__main {
			.view {
				background-color: getColor($darkTheme, primary);
			}

			.main__footer {
				background-color: getColor($darkTheme, tertiary);
				color: getColor($darkTheme, fontColor);
			}
		}

	}
}


/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme { 
	background-color: getColor($lightTheme, secondary);

	.dashboard {
		&__main {
			background-color: getColor($lightTheme, secondary);

			.view {
				background-color: getColor($lightTheme, secondary);
			}

			.main__footer {
				background-color: getColor($lightTheme, tertiary);
				color: getColor($lightTheme, fontColor);
			}
		}
	}
}
</style>