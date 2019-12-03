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
    <modal class="home-view__modal" v-show="uploadModal"> 
        <div class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleUploadModal">
                <i class="close-btn__icon fas fa-times"></i>
            </button>
            <upload :resetUpload="resetUpload"/>
        </div>
    </modal>

  </div>
</template>



<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import modal from '../../Components/Shared/Modal.vue';
import upload from '../../Components/Dashboard/Upload.vue'
import { Carousel, Slide } from 'vue-carousel';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'DashboardHome',
    components: {
        modal,
        upload,
        Carousel,
        Slide
    },

  	/*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
    data() {
        return {
            uploadModal: false,
            resetUpload: false
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
        }
    }
}
</script>


<style lang="scss">
.home-view {

    .home-view__modal {

        .modal__content {
            padding: 30px;

            .content__close-btn {
                @extend %icon-btn;
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 18px;
            }
        }
    }

}
</style>