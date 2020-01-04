<template>
  <div class="view movies-view">
    <banner class="dashboard__banner" bannerText="Thursday night is movie night" bannerImg="/images/movie_night.svg" />

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES SECTION				             										  -->
    <!-------------------------------------------------------------------------------------->
    <header class="movies-view__header">
        <h2 class="header__headline">Your movies</h2>
        <button class="header__add-btn" @click="toggleUploadModal">Add movie<i class="add-movie__icon fas fa-plus-circle"></i></button>
    </header>
    <section class="movies-view__movie-section">
        
        <ul class="movie-section__movie-list">
            <li class="movie-list__item" v-for="(movie, index) in myMovies" :key="index">
                <div @click="toggleMovieInfo(index)" class="content__wrapper">
                    <div class="wrapper__img-wrapper">
                        <img class="img-container__img" :src="`${baseURL}${movie.thumbnail}`" alt="">
                    </div>
                    <div class="img-container__title-container">
                        <h4 class="title-container__title">{{movie.title}}</h4>
                    </div> 
                </div>
            </li>
        </ul>

    </section>

    

    <!-------------------------------------------------------------------------------------->
    <!-- (SEE VIDEO DETAILS) MODAL COMPONENT					        				  -->
    <!-------------------------------------------------------------------------------------->
    <modal class="movies-view__modal-details" v-show="detailsModal">
        <div v-if="Object.keys(selectedMovie).length != 0" class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleMovieInfo()">
                <i class="close-btn__icon fas fa-times"></i>
            </button>
            <img :src="`${baseURL}${selectedMovie.thumbnail}`" alt="">
            <div class="content__description-wrapper">
                <h3 class="description-wrapper__creator">Creator: <router-link class="creator__link" :to="{ path: '/Dashboard/Profile', query: { id: selectedMovie.user._id }}">{{selectedMovie.user.firstname}} {{selectedMovie.user.lastname}}</router-link></h3>
                <h4>Title: {{selectedMovie.title}}</h4>
                <h4 class="description-wrapper__text">Description:</h4>
                <p>{{selectedMovie.description}}</p>
            </div>
            <button class="content__play-btn" @click="playMovie(selectedMovie.video)">PLAY</button>
        </div>
    </modal>


    <!-------------------------------------------------------------------------------------->
    <!-- (UPLOAD VIDEO) MODAL COMPONENT					        						  -->
    <!-------------------------------------------------------------------------------------->
    <modal class="movies-view__modal-upload" v-show="uploadModal"> 
        <div class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleUploadModal">
                <i class="close-btn__icon fas fa-times"></i>
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
    .movies-view__header {
        @include flexRow(center, space-between);
        padding: 20px;

        .header__headline {
            color: getColor($accents, primary);
        }
        .header__add-btn {
            @include flexRow(center, space-between);
            @extend %icon-btn;
            font-size: 14px;
            transition: transform .5s;

            @include media(min, xs) {
                font-size: 18px;
            }
            .add-movie__icon {
                margin-left: 5px;
            }

            &:hover {
                transform: scale(1.1);

            }
        }
    }
    .movies-view__movie-section {
        .movie-section__movie-list {
            padding: 0px 20px 20px;
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-template-rows: minmax(300px, auto);
           
           .movie-list__item {
                @include flexColumn(center, flex-start);
                overflow: hidden;
                cursor: pointer;

                .content__wrapper {
                    @include flexColumn(center, space-between);
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                    width: 100%;
                    
                    .wrapper__img-wrapper {
                        @include flexRow(center, center);
                        position: relative;
                        height: 100%;
                        width: 100%;

                        .img-container__img {
                            object-fit: contain;
                            width: 100%;
                            transition: transform .5s;

                            &:hover {
                                transform: scale(1.05);
                            }
                        }
                    }

                    
                    .img-container__title-container {
                        height: 50px;
                        @include flexRow(center, center);

                        .title-container__title {

                        }
                    }
                }
            }
        }
    }
   

    &__modal-details {
        .modal__content {
            @include flexColumn(center, center);
            max-width: 800px;
            padding: 30px;
            max-height: 500px;

            user-select: none;
            
            .content__close-btn {
                @extend %icon-btn;
                position: absolute;
                right: 10px;
                top: 10px;
                font-size: 24px;
            }

            img {
                height: 200px;
            }

            .content__description-wrapper {
                margin-top: 15px;
                overflow-y: auto;
                .description-wrapper__creator {
                    text-transform: capitalize;
                    .creator__link {

                    }
                }
                .description-wrapper__text {
                    margin-top: 15px;

                }
            }

            .content__play-btn {
                margin-top: 25px;
                @extend %secondary-btn;
            }
        }
    }

    &__modal-upload {
        
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

.dark-theme {
    .movies-view {
        .movies-view__header  {
            .header__add-btn {
                color: getColor($darkTheme, fontColor);
            }
        }

        .movies-view__movie-section {
            .movie-section__movie-list {
                .movie-list__item {
                     .content__wrapper {
                         .img-container__title-container {
                             .title-container__title  {
                                 color: getColor($darkTheme, fontColor);
                             }
                         }
                     }
                }
            }
        }

        &__modal-details {
            .modal__content {
                 background-color: getColor($darkTheme, primary);
                .content__close-btn {
                    color: getColor($darkTheme, fontColor); 
                }
                .content__description-wrapper {
                    color: getColor($darkTheme, fontColor); 
                }
                .content__play-btn {
                    color: getColor($darkTheme, fontColor); 
                    border-color: getColor($darkTheme, fontColor); 
                }
            }
        }

        &__modal-upload {
            .modal__content {
                background-color: getColor($darkTheme, primary);
                .content__close-btn {
                    color: getColor($darkTheme, fontColor);
                }
            }
        }
    }
}



.light-theme {
    .movies-view {
        .movies-view__header  {
            .header__add-btn {
                color: getColor($lightTheme, fontColor);
            }
        }

        .movies-view__movie-section {
            .movie-section__movie-list {
                .movie-list__item {
                     .content__wrapper {
                         .img-container__title-container {
                             .title-container__title  {
                                 color: getColor($lightTheme, fontColor);
                             }
                         }
                     }
                }
            }
        }

        &__modal-details {
            .modal__content {
                 background-color: getColor($lightTheme, secondary);
                .content__close-btn {
                    color: getColor($lightTheme, fontColor); 
                }
                .content__description-wrapper {
                    color: getColor($lightTheme, fontColor); 
                }
                .content__play-btn {
                    color: getColor($lightTheme, fontColor); 
                    border-color: getColor($lightTheme, fontColor); 
                }
            }
        }

        &__modal-upload {
            .modal__content {
                background-color: getColor($lightTheme, primary);
                .content__close-btn {
                    color: getColor($lightTheme, fontColor);
                }
            }
        }
    }
}
</style>