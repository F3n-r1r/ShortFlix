<template>
	<div class="player">

		<modal>
			<button @click="close()"><i class="fas fa-times"></i></button>
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

</style>