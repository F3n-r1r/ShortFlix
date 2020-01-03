<template>
  <div class="view movies-view">
    <banner class="dashboard__banner" bannerText="Thursday night is movie night" bannerImg="/images/movie_night.svg" />

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES SECTION				             										  -->
    <!-------------------------------------------------------------------------------------->
    <section class="movies-view__movie-section">
        <h2 class="movie-section__headline">Your recent movies</h2>

        <div class="movie-section__row">
            <!-------------------------------------------------------------------------------------->
            <!-- ADD MOVIE (DESKTOP)      				             							  -->
            <!-------------------------------------------------------------------------------------->
            <div class="row__add-movie" @click="toggleUploadModal">
                <i class="add-movie__icon fas fa-plus-circle"></i>
                <p class="add-movie__subtext">Add new movie</p>
            </div>
        
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
                            <img class="img-container__img" :src="`${baseURL}${movie.thumbnail}`" alt="">
                            <div class="img-container__title-container">
                                <h4 class="title-container__title">{{movie.title}}</h4>
                            </div> 
                        </div>
                    </div>       
                </slide>
            </carousel>
        </div>
    </section>

    <!-------------------------------------------------------------------------------------->
    <!-- (SEE VIDEO DETAILS) MODAL COMPONENT					        				  -->
    <!-------------------------------------------------------------------------------------->
    <modal class="movies-view__modal-details" v-show="detailsModal">
        <div v-if="Object.keys(selectedMovie).length != 0" class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleMovieInfo()">
                <i class="close-btn__icon fas fa-times"></i>
            </button>
            <img style="height: 200px;" :src="`${baseURL}${selectedMovie.thumbnail}`" alt="">
            <button @click="playMovie(selectedMovie.video)">PLAY</button>
        </div>
    </modal>


    <!-------------------------------------------------------------------------------------->
    <!-- (UPLOAD VIDEO) MODAL COMPONENT					        						  -->
    <!-------------------------------------------------------------------------------------->
    <modal class="movies-view__modal-upload" v-show="uploadModal"> 
        <div class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleUploadModal">
                <i class="close-btn__icon far fa-times"></i>
            </button>
            <upload v-model="myMovies" :resetUpload="resetUpload"/>
        </div>
    </modal>


    <!-------------------------------------------------------------------------------------->
    <!-- VIDEO PLAYER                   				        						  -->
    <!-------------------------------------------------------------------------------------->
    <player v-if="playVideo" @click="closeMovie()"/>

  </div>
</template>

<script>
import axios from 'axios';
import modal from '../../Components/Shared/Modal.vue';
import banner from '../../Components/Dashboard/Banner.vue';
import upload from '../../Components/Dashboard/Upload.vue';
import player from '../../Components/Dashboard/Player.vue';
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'Movies',

  components: {
    modal,
    banner,
    upload,
    player,
    Carousel,
    Slide
  },

  /*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
    data() {
        return {
            uploadModal: false,
            detailsModal: false,
            resetUpload: false,
            myMovies: [],
            selectedMovie: {},
            playVideo: false,
            baseURL: this.$store.state.baseURL
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
.movies-view {
    display: grid;
    grid-template-rows: 150px auto auto;

    .dashboard__banner {
        grid-row: 1;
    }

    .movies-view__movie-section {
        grid-row: 2;
        padding: 0px 20px;

        .movie-section__headline {
            color: getColor($accents, primary);
            font-size: 18px;
            margin: 30px 0 10px 0;
        }

        .movie-section__row {
            @include flexRow(null, space-between);
            flex-wrap: wrap;
              
            @include media(min, xs) {
                flex-wrap: nowrap;
            }
 
            .row__add-movie  {
                @include flexColumn(center, center);
                width: 250px;
                height: 135px;
                margin-right: 15px;
                background-color: getColor($lightTheme, primary);
                cursor: pointer;

                @include media(min, xs) {
                    width: 25%;
                    padding: 4%;
                }

                &:hover > .add-movie__icon {
                    transform: scale(1.3);
                    color: getColor($accents, tertiary);
                }

                .add-movie__icon {
                    font-size: 30px;
                    transition: transform .5s ease, color .5s ease;
                    color: getColor($lightTheme, tertiary);
                }
            }

            .row__carousel {
                

                .carousel__slide {
                    

                    .slide__content {
                        position: relative; 
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        max-height: 250px;

                        @include media(min, xs) {
                            padding: 0px 15px;
                        }

                        .content__img-container {
                            position: relative;
                            cursor: pointer;

                            &:hover > .img-container__title-container {
                                opacity: 1;
                            }

                            .img-container__img {
                                position: relative;
                                object-fit: contain;
                                height: 100%;
                                width: 100%;
                            }

                            .img-container__title-container {
                                position: absolute;
                                @include flexRow(center, center);
                                top: 0;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                background-color: rgba(0,0,0,0.5);
                                opacity: 0;
                                padding: 20px;

                                .title-container__title {
                                    position: relative;
                                    color: getColor($accents, _white);
                                    word-wrap: break-word;
                                    word-break: break-all;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    &__modal-details {
        .modal__content {
            background-color: getColor($darkTheme, primary);
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

    &__modal-upload {
        
        .modal__content {
            background-color: getColor($darkTheme, primary);
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