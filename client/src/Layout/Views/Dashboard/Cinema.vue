<template>
  <div class="view cinema-view">
    <banner class="dashboard__banner" bannerText="Get behind the scenes of a director´s cut" bannerImg="/images/videographer.svg" />

    <!-------------------------------------------------------------------------------------->
    <!-- MOVIES HEADER				             									      -->
    <!-------------------------------------------------------------------------------------->
    <header class="cinema-view__movie-header">
        <h2 v-if="!category" class="movie-header__headline">Cinema</h2>
        <button v-if="category" class="movie-header__btn" @click="goBack()"><i class="fas fa-arrow-left"></i></button>
        <h2 v-if="category" class="movie-header__headline">{{category}} movies</h2>
    </header>


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
        <ul class="movies__list">
            <li class="list__item" v-for="(movie, index) in movies" :key="index">
                <div class="item__wrapper" @click="toggleMovieInfo(index)">
                    <div class="wrapper__img-wrapper">
                        <img class="img-wrapper__img" :src="`${baseURL}${movie.thumbnail}`" alt=""> 
                    </div>
                    <div class="wrapper__title-wrapper">
                        <h3 class="title-wrapper__title">{{movie.title}}</h3>
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
            movies: [],
            baseURL: this.$store.state.baseURL
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
                console.log(this.selectedMovie)
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
            } else if (this.$route.query.category) {
                this.category = this.$route.query.category
            }
        },
        goBack() {
            this.category = '';
            this.movies = [];
            this.$router.push({path: ''})
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
            if(cat) {
                let data = {
                    category: cat
                }      
                axios({method: 'POST', url: '/api/video/videocat', data: data})
                .then(resp => {
                    //console.log(resp)
                    this.movies = resp.data.videos;
                    if (!this.$route.query.category) {
                        this.$router.push({path: '', query: {category: cat}})
                    }
                }).catch(err => {
                    console.log(err)
                })
            } 
        },


    }

}
</script>





<style lang="scss">
.cinema-view {

    .cinema-view__movie-header {
        @include flexRow(center, flex-start);
        padding: 30px 20px 20px 20px;

        .movie-header__headline {
            color: getColor($accents, primary);
            font-size: 18px;
        }

        .movie-header__btn {
            @extend %icon-btn;
            color: getColor($accents, _white);
            font-size: 18px;
            margin-right: 15px;
        }
    }

    .cinema-view__category-select {
        padding: 0px 20px 10px;

        .category-select__list {
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // auto-fit vs auto-fill ??
            grid-template-rows: auto;
            padding: 20px;
            user-select: none;

            .list__item {
                padding: 20px 5px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
                @include flexRow(center, center);
                cursor: pointer;
                transition: background-color .5s;
                font-size: 18px;

                &:hover {
                    background-color: getColor($accents, primary);
                }
   

            }
        }
    }


    .cinema-view__movies {
        padding: 0px 20px 20px;

        .movies__list {
            display: grid;
            grid-gap: 50px 20px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-template-rows: minmax(300px, auto);

            .list__item {
                @include flexColumn(center, flex-start);
                overflow: hidden;
                cursor: pointer;

                .item__wrapper {
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
                        
                        .img-wrapper__img {
                            object-fit: contain;
                            width: 100%;
                        }
                    }

                    .wrapper__title-wrapper {
                        position: relative;

                        .title-wrapper__title {
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }



    .movies-view__modal-details {
        .modal__content {
            @include flexColumn(center, center);
            max-width: 800px;
            padding: 30px;
            max-height: 500px;
 
            user-select: none;
            

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
}

.dark-theme {
    .cinema-view {
        .category-select__list {
            .list__item {
                color: getColor($darkTheme, fontColor);
            }
        }
        .cinema-view__movie-header {
            .movie-header__btn {
                color: getColor($darkTheme, fontColor);
            }
        }
        .wrapper__title-wrapper {
            .title-wrapper__title {
               color: getColor($darkTheme, fontColor); 
            }
        }
        .modal__content {
           background-color: getColor($darkTheme, primary);
            .content__close-btn {
                color: getColor($darkTheme, fontColor); 
            }
            .content__description-wrapper {
                color: getColor($darkTheme, fontColor); 
            }
            .creator__link {
                &:hover {
                    color: getColor($accents, _white);
                }
            }
        }
    }
}

.light-theme {
    .cinema-view {
        .category-select__list {
            .list__item {
                color: getColor($lightTheme, fontColor);
            }
        }
        .cinema-view__movie-header {
            .movie-header__btn {
                color: getColor($lightTheme, fontColor);
            }
        }
        .wrapper__title-wrapper {
            .title-wrapper__title {
               color: getColor($lightTheme, fontColor); 
            }
        }
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
}
</style>