<template>


    <div class="view home-view">
        <banner class="dashboard__banner" bannerText="Get behind the scenes of a director´s cut" bannerImg="/images/videographer.svg" />
    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES SECTION				             										  -->
    <!-------------------------------------------------------------------------------------->
    <section class="home-view__movie-section">
        <header class="movie-section__header">
            <h2 class="header__headline">Your recent movies</h2>
              <button class="header__add-btn" @click="toggleUploadModal">Add movie<i class="add-movie__icon fas fa-plus-circle"></i></button>
        </header>

        <ul v-if="myMovies.length" class="movie-section__movie-list">
            <li class="movie-list__item movie-list__item--add" @click="toggleUploadModal">
                <i class="add-movie__icon fas fa-plus-circle"></i>
                <p class="add-movie__subtext">Add new movie</p>
            </li>
            <li class="movie-list__item" v-for="i in 5" :key="i">
                <div class="item__img-wrapper" @click="toggleMovieInfo(i - 1)">
                    <img class="img-wrapper__img" :src="`${baseURL}${myMovies[i - 1].thumbnail}`" alt=""> 
                </div>
            </li>
        </ul>
    </section>


    <!-------------------------------------------------------------------------------------->
    <!-- SHOWCASE SECTION				             									  -->
    <!-------------------------------------------------------------------------------------->
    <section class="home-view__showcase-section">
        <header class="showcase-section__header">
            <h2 class="header__headline">Your recent showcases</h2>
            <button class="header__add-btn">Add showcase<i class="add-movie__icon fas fa-plus-circle"></i></button>
        </header>

        <ul class="showcase-section__showcase-list">
            <li class="showcase-list__item showcase-list__item--add">
                <i class="add-showcase__icon fas fa-plus-circle"></i>
                <p class="add-showcase__subtext">Add new showcase</p>
            </li>
            <li class="showcase-list__item" v-for="i in 4" :key="i">
                <div class="item__img-wrapper">
                    <svg class="img-wrapper__img" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="212.6px"
                        height="136.3px" viewBox="0 0 212.6 136.3" style="enable-background:new 0 0 212.6 136.3; width: 100%;" xml:space="preserve">
                        <g>
                            <rect class="st0" width="139.3" height="107"/>
                            <rect y="115.8" class="st0" width="212.6" height="20.5"/>
                            <rect x="149.4" class="st0" width="63.2" height="48.5"/>
                            <rect x="149.4" y="58.5" class="st0" width="63.2" height="48.5"/>
                        </g>
                    </svg>
                </div>
            </li>
        </ul>
    </section>


    <!-------------------------------------------------------------------------------------->
    <!-- (SEE VIDEO DETAILS) MODAL COMPONENT					        				  -->
    <!-------------------------------------------------------------------------------------->
    <modal class="home-view__modal-details" v-show="detailsModal">
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
    <modal class="home-view__modal-upload" v-show="uploadModal"> 
        <div class="modal__content">
            <button class="content__close-btn" type="button" @click="toggleUploadModal">
                <i class="close-btn__icon far fa-times-circle"></i>
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
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import modal from '../../Components/Shared/Modal.vue';
import upload from '../../Components/Dashboard/Upload.vue';
import player from '../../Components/Dashboard/Player.vue';
import banner from '../../Components/Dashboard/Banner.vue';
import { Carousel, Slide } from 'vue-carousel';
import axios from 'axios';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'Home',
    components: {
        modal,
        upload,
        Carousel,
        Slide,
        player,
        banner
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
.home-view {
    display: grid;
    grid-template-rows: 150px auto auto;
    padding-bottom: 20px;

    .dashboard__banner {
        grid-row: 1;
    }

    .home-view__movie-section {
        position:relative;
        grid-row: 2;
        padding: 0px 20px;

        .movie-section__header {
            @include flexRow(center, space-between);
            padding: 20px 0px;

            .header__headline {
                color: getColor($accents, primary);
                font-size: 16px;

                @include media(min, xs) {
                    font-size: 20px;
                }
            }

            .header__add-btn {
                @include flexRow(center, space-between);
                @extend %icon-btn;
                font-size: 12px;
                transition: transform .5s;

                @include media(min, xs) {
                    font-size: 18px;
                    display: none;
                }
                .add-movie__icon {
                    margin-left: 5px;
                }

                &:hover {
                    transform: scale(1.1);
                }
            }
        }



        .movie-section__movie-list {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;

            @include media(min, xs) {
                grid-template-columns: repeat(3, 1fr);
            }

            @include media(min, sm) {
                grid-template-columns: repeat(4, 1fr);
            }

            @include media(min, md) {
                grid-template-columns: repeat(4, 1fr);
            }

            @include media(min, lg) {
                grid-template-columns: repeat(6, 1fr);
            }

            .movie-list__item {
                cursor: pointer;

                    &:nth-last-child(-n+3) {
                        display: none;
                    }

                @include media(min, xs) {

                    &:nth-last-child(-n+3) {
                        display: none;
                    }
                }

                @include media(min, sm) {
                    &:nth-last-child(3) {
                        display: block;
                    }
                    &:nth-last-child(-n+2) {
                        display: none;
                    }
                }

                @include media(min, md) {
                    &:nth-last-child(-n+2) {
                        display: none;
                    }
                }

                @include media(min, lg) {
                    &:nth-last-child(-n+2) {
                        display: block;
                    }
                }

                @include media(min, xl) {
                    // max-width: 1400px
                }

                &--add {
                    display: none;
                    background-color: getColor($accents, primary);
                    font-size: 24px;
                    text-align: center;

                    &:hover > .add-movie__icon {
                        transform: scale(1.5);
                    }

                    @include media(min, xs) {
                        @include flexColumn(center, center);
                    }

                    .add-movie__icon  {
                        margin-bottom: 10px;
                        font-size: 36px;
                        transition: transform .5s;
                    }
                }

                .item__img-wrapper {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    transition: transform .5s;

                    &:hover {
                        transform: scale(1.05);
                    }

                    .img-wrapper__img {
                        object-fit: contain;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }


    }




    .home-view__showcase-section {
        grid-row: 3;
        padding: 0px 20px;

        .showcase-section__header {
            @include flexRow(center, space-between);
            padding: 20px 0px;

            .header__headline {
                color: getColor($accents, primary);
                font-size: 16px;

                @include media(min, xs) {
                    font-size: 20px;
                }
            }

            .header__add-btn {
                @include flexRow(center, space-between);
                @extend %icon-btn;
                font-size: 12px;
                transition: transform .5s;

                @include media(min, xs) {
                    font-size: 18px;
                    display: none;
                }
                .add-movie__icon {
                    margin-left: 5px;
                }

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .showcase-section__showcase-list {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;

            @include media(min, xs) {
                grid-template-columns: repeat(3, 1fr);
            }

            @include media(min, sm) {
                grid-template-columns: repeat(4, 1fr);
            }

            @include media(min, md) {
                grid-template-columns: repeat(4, 1fr);
            }

            @include media(min, lg) {
                grid-template-columns: repeat(5, 1fr);
            }

            .showcase-list__item {
                cursor: pointer;

   

                @include media(min, xs) {

                    &:nth-last-child(-n+2) {
                        display: none;
                    }
                }

                @include media(min, sm) {
                    &:nth-last-child(-n+2) {
                        display: block;
                    }
                    &:nth-last-child(-n+1) {
                        display: none;
                    }
                }

                @include media(min, md) {
                    &:nth-last-child(-n+1) {
                        display: none;
                    }
                }

                @include media(min, lg) {
                    &:nth-last-child(-n+2) {
                        display: block;
                    }
                }

                @include media(min, xl) {
                    // max-width: 1400px
                }

                &--add {
                    display: none;
                    background-color: getColor($accents, primary);
                    font-size: 24px;
                    text-align: center;

                    &:hover > .add-showcase__icon {
                        transform: scale(1.5);
                    }

                    @include media(min, xs) {
                        @include flexColumn(center, center);
                    }

                    .add-showcase__icon  {
                        margin-bottom: 10px;
                        font-size: 36px;
                        transition: transform .5s;
                    }
                }

                .item__img-wrapper {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    transition: transform .5s;

                    &:hover {
                        transform: scale(1.05);
                    }

                    .img-wrapper__img {
                        transition: fill .5s;
                        object-fit: contain;
                        width: 100%;
                        height: 100%;
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


.dark-theme {
    .home-view {
        .header__add-btn {
            color: getColor($darkTheme, fontColor);
        }
        .movie-section__movie-list {
            .movie-list__item {
                &--add {
                    color: getColor($darkTheme, fontColor);
                }
            }
        }
        .showcase-section__showcase-list {
            .showcase-list__item {
                &--add {
                    color: getColor($darkTheme, fontColor);
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
    .home-view {
        .header__add-btn {
            color: getColor($lightTheme, fontColor);
        }
        .movie-section__movie-list {
            .movie-list__item {
                &--add {
                    color: getColor($darkTheme, fontColor);
                }
            }
        }
        .showcase-section__showcase-list {
            .showcase-list__item {
                &--add {
                    color: getColor($darkTheme, fontColor);
                }

                .img-wrapper__img {
                    
                    fill: getColor($lightTheme, primary);
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