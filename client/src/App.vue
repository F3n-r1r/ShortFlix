<template>
	<div class="app">

		<!-------------------------------------------------------------------------------------->
		<!-- MAIN APP ROUTE                                   															  -->
		<!-------------------------------------------------------------------------------------->
		<transition name="flip" mode="out-in">
			<router-view id="router"></router-view>
		</transition>
			
	</div>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
	name: 'App',
	components: {
	},

	/*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
	data() {
		return {
		}
	},

	/*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
	// methods: {
	// 	logout: function () {
	// 		this.$store.dispatch('logout')
	// 		.then(() => {
	// 			this.$router.push('/login')
	// 		})
	// 	}
	// },

	/*----------------------------------------------------------------------------------*\
		COMPUTED
	*\----------------------------------------------------------------------------------*/
	// computed : {
	// 	isLoggedIn : function() { 
	// 		return this.$store.getters.isLoggedIn
	// 	}
	// },

	/*----------------------------------------------------------------------------------*\
		CREATED
	*\----------------------------------------------------------------------------------*/
	created: function () {
		this.$http.interceptors.response.use(undefined, function (err) {
			return new Promise(function (resolve, reject) {
				if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
					this.$store.dispatch('logout');
				} else {
					throw err;
				}
			});
		});
		this.$store.dispatch('getCurrentUser');
	}
}
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    APP
*\----------------------------------------------------------------------------------*/
.app {
	width: 100%;
	height: 100%;
	-webkit-perspective: 1000px;
	-ms-perspective: 1000px;
	perspective: 1000px;


	/*----------------------------------------------------------------------------------*\
		ROUTER
	*\----------------------------------------------------------------------------------*/
	#router {
		height: 100%; 
		width: 100%;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
}


/*----------------------------------------------------------------------------------*\
	PAGE TRANSITION ENTER
*\----------------------------------------------------------------------------------*/
.flip-enter-active {
	animation: flipEnter 2s forwards;
	overflow: hidden;
}

@keyframes flipEnter {
	0% {
		-webkit-transform: rotateX(90deg) scale(.5);
		transform: rotateX(90deg) scale(.5);
	}
	50% {
		-webkit-transform: rotateX(0deg) scale(.5);
		transform: rotateX(0deg) scale(.5);
	}
	100% {
		transform: scale(1);
	}
} 


/*----------------------------------------------------------------------------------*\
	PAGE TRANSITION LEAVE
*\----------------------------------------------------------------------------------*/
.flip-leave-active {
	animation: flipLeave 2s forwards;
	overflow: hidden;
}

@keyframes flipLeave {
	50%   {
		-webkit-transform: scale(.5);
		transform: scale(.5);
	}
	100% {
		-webkit-transform: rotateX(-90deg) scale(.5);
		transform: rotateX(-90deg) scale(.5);
	}
} 

</style>
