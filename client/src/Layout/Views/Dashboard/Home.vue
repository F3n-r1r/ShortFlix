<template>
  <div class="view home-view">

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES SECTION				             										  -->
    <!-------------------------------------------------------------------------------------->
    <section class="home-view__movie-section">
        <h2>Your Movies</h2>
        <carousel :perPageCustom="[[768, 3], [1024, 4]]">
            <slide>
              <i class="fas fa-plus" @click="toggleUploadModal"></i>
            </slide>
            <slide>
                2
            </slide>
            <slide>
                3
            </slide>
            <slide>
                4
            </slide>
        </carousel>
           
    </section>
    

    <!-------------------------------------------------------------------------------------->
    <!-- (REGISTERED MESSAGE) MODAL COMPONENT											  -->
    <!-------------------------------------------------------------------------------------->
    <modal v-show="uploadModal"> 
        <div class="modal-content">
            <button class="message__close-btn" type="button" @click="toggleUploadModal">
                Ok
            </button>
        </div>
    </modal>

  </div>
</template>



<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import modal from '../../Components/Shared/Modal.vue';
import { Carousel, Slide } from 'vue-carousel';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'DashboardHome',
    components: {
        modal,
        Carousel,
        Slide
    },

  	/*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
    data() {
        return {
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
				document.body.style.overflow = "hidden";
			} else {
				this.uploadModal = false;
				document.body.removeAttribute("style");
			}
        }
    }
}
</script>


<style lang="scss">

</style>