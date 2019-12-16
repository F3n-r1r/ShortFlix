<template>
  <div class="view cinema-view">
    <banner class="dashboard__banner" bannerText="Get behind the scenes of a director´s cut" bannerImg="/images/videographer.svg" />

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES SECTION				             									                          	  -->
    <!-------------------------------------------------------------------------------------->
    <section class="cinema-view__movie-section">
        <h2 class="movie-section__headline">Cinema</h2>
    </section>

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES CAROUSEL				             									  -->
    <!-------------------------------------------------------------------------------------->
    <carousel class="row__carousel" 
    :perPageCustom="[[0, 1], [576, 3], [992, 3], [1300, 4], [1600, 5]]"
    :scrollPerPage="true"
    :paginationEnabled="false"
    >
      <slide class="carousel__slide" v-for="(movie, index) in myMovies" :key="index">
          <div class="slide__content">
              <div @click="toggleMovieInfo(index)" class="content__img-container">
                  <img class="img-container__img" :src="`http://localhost:8000/${movie.thumbnail}`" alt="">
                   <div class="img-container__title-container">
                      <h4 class="title-container__title">{{movie.title}}</h4>
                  </div> 
              </div>
          </div>       
      </slide>
  </carousel>

  <!-------------------------------------------------------------------------------------->
    <!-- (SEE VIDEO DETAILS) MODAL COMPONENT					        				  -->
    <!-------------------------------------------------------------------------------------->
    <modal class="movies-view__modal-details" v-show="detailsModal">
        <div v-if="Object.keys(selectedMovie).length != 0" class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleMovieInfo()">
                <i class="close-btn__icon fas fa-times"></i>
            </button>
            <img style="height: 200px;" :src="`http://localhost:8000/${selectedMovie.thumbnail}`" alt="">
            <button @click="playMovie(selectedMovie.video)">PLAY</button>
        </div>
    </modal>

    <!-------------------------------------------------------------------------------------->
    <!-- VIDEO PLAYER                   				        						  -->
    <!-------------------------------------------------------------------------------------->
    <player v-if="playVideo" @click="closeMovie()"/>
  </div>
</template>

<script>
import modal from '../../Components/Shared/Modal.vue';
import banner from '../../Components/Dashboard/Banner.vue';
import upload from '../../Components/Dashboard/Upload.vue';
import player from '../../Components/Dashboard/Player.vue';

export default {
  name: 'Cinema',

  components: {
    modal,
    banner,
    upload,
    player
  },
  /*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
    data() {
        return {
            detailsModal: false,
            myMovies: [],
            selectedMovie: {},
            playVideo: false,
        }
    },

  /*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
    methods: {
      toggleMovieInfo(index) {
            let movie = this.myMovies[index];
            
            if(!this.detailsModal) {
                this.detailsModal = true;
                this.selectedMovie = movie;
				document.body.style.overflow = "hidden";
			} else {
                this.detailsModal = false;
                this.selectedMovie = {};
				document.body.removeAttribute("style");
			}
        },
        fetchMyMovies() {
            return new Promise((resolve, reject) => {
                axios({method: 'GET', url: '/api/video/myVideos'})
                .then(resp => {
                    //console.log(resp)
                    this.myMovies = resp.data.videos;

                    // Trigger resize event in order to fix carousel bug, and render it.
                    let resizeEvent = window.document.createEvent('UIEvents');
                    resizeEvent.initUIEvent('resize', true, false, window, 0);
                    window.dispatchEvent(resizeEvent);

                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        playMovie(movie) {
            let path = movie.split('\\').pop().split('\\')[0];
            this.$router.push({path: '', query: {video: path}})
            this.toggleMovieInfo();
            this.playVideo = true;
        },
        closeMovie() {
            // this.$router.back(-1);
            this.$router.push({path: ''})
            this.playVideo = false;
        },
        movieRefreshHandler() {
            //console.log(this.$route.query)
            if(this.$route.query.video) {
                this.playVideo = true;
            }
        }
    },

  /*----------------------------------------------------------------------------------*\
		MOUNTED
	*\----------------------------------------------------------------------------------*/
	mounted() {
        this.fetchMyMovies();

        this.movieRefreshHandler();
    },

}
</script>



<style lang="scss">
.cinema-view {

    .cinema-view__movie-section {
      padding: 0px 20px;

        .movie-section__headline {
            color: getColor($accents, primary);
            font-size: 18px;
            margin: 30px 0 10px 0;
        }
    }
}

</style>