<template>
  <div class="view cinema-view">
    <banner class="dashboard__banner" bannerText="Get behind the scenes of a director´s cut" bannerImg="/images/videographer.svg" />

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES SECTION				             									      -->
    <!-------------------------------------------------------------------------------------->
    <section class="cinema-view__movie-section">
        <h2 class="movie-section__headline">Cinema</h2>
    </section>


    <!-------------------------------------------------------------------------------------->
    <!-- MOVIE CATEGORY SELECTION			             								  -->
    <!-------------------------------------------------------------------------------------->
    <section class="cinema-view__category-select">
        <ul v-if="!category" class="category-select__list">
            <li @click="chooseCategory('All')" class="list__item">All</li>
            <li @click="chooseCategory('Horror')" class="list__item">Horror</li>
            <li @click="chooseCategory('Comedy')" class="list__item">Comedy</li>
            <li @click="chooseCategory('Drama')" class="list__item">Drama</li>
            <li @click="chooseCategory('Action')" class="list__item">Action</li>
            <li @click="chooseCategory('Sci-fi')" class="list__item">Sci-fi</li>
            <li @click="chooseCategory('Adventure')" class="list__item">Adventure</li>
            <li @click="chooseCategory('Romance')" class="list__item">Romance</li>
            <li @click="chooseCategory('Animation')" class="list__item">Animation</li>
        </ul>
    </section>


    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES                     		             								  -->
    <!-------------------------------------------------------------------------------------->
    <section v-if="movies.length" class="cinema-view__movies">
        <button @click="goBack()">Back</button>
        <ul class="movies__list">
            <li class="list__item" v-for="(movie, index) in movies" :key="index">
                <div @click="toggleMovieInfo(index)">
                    {{movie.title}}
                    <img class="img-container__img" :src="`http://localhost:8000/${movie.thumbnail}`" alt=""> 
                </div>
            </li>
        </ul>
    </section>



    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES CAROUSEL				             									  -->
    <!-------------------------------------------------------------------------------------->
    <!-- <carousel class="row__carousel" 
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
  </carousel> -->

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
import axios from 'axios';

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
            category: '',
            movies: []
        }
    },

  /*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
    methods: {
    chooseCategory(cat) {
        this.category = cat;
    },
      toggleMovieInfo(index) {
            let movie = this.movies[index];
            
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
        },
        goBack() {
            this.category = '';
            this.movies = [];
        }
    },

    /*----------------------------------------------------------------------------------*\
		MOUNTED
	*\----------------------------------------------------------------------------------*/
	mounted() {
        // this.fetchMyMovies();

        this.movieRefreshHandler();
    },


    /*----------------------------------------------------------------------------------*\
		WATCH
	*\----------------------------------------------------------------------------------*/
    watch: {
        category: function(cat) {
            let data = {
                category: cat
            }      
            axios({method: 'POST', url: '/api/video/videocat', data: data})
            .then(resp => {
                //console.log(resp)
                this.movies = resp.data.videos;
            }).catch(err => {
                console.log(err)
            })
          
        },


    }

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

    .cinema-view__category-select {
        padding: 0px 20px;

        .category-select__list {
            @include flexRow(center, space-between);
            flex-wrap: wrap;

            .list__item {
                margin-top: 10px;
                background-color: getColor($accents, secondary);
                @include flexRow(center, center);
                width: calc(50% - 10px);
                height: 50px;
                cursor: pointer;
                transition: background-color .3s;

                &:hover {
                    background-color: getColor($accents, primary);
                }
   
                @include media(min, xs) {
                    width: calc(33% - 10px);
                }

                @include media(min, sm) {
                    width: calc(25% - 10px);
                }
            }
        }
    }
}

</style>