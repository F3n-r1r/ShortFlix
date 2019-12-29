<template>
	<div class="player">

		<modal>
			<button class="player__close-btn" @click="close()"><i class="fas fa-times"></i></button>
				<video class="player__video" type="video/mp4" controls>
			</video>
		</modal>

	
	</div>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import modal from '../Shared/Modal.vue';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
	  name: 'Player',
    components: {
		modal
	},
	  

	data() {
		return {
		}
	},

	methods: {
		close() {
			this.$emit('click')
		}
	},

	mounted() {
		//console.log(this.$route.query.video)
		let root = 'http://localhost:8000/api/video/playVideo/'
		document.querySelector('.player__video').src = root + this.$route.query.video;
	}

}
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    PLAYER LAYOUT
*\----------------------------------------------------------------------------------*/
.player {
	&__close-btn {
		position: absolute;
		right: 10px;
		top: 10px;
		@extend %icon-btn;
		font-size: 26px;
		cursor: pointer;
		z-index: 99999;
	}
}
</style>