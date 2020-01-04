<template>
  <div class="view community-view">
    
    <banner class="dashboard__banner" bannerText="Thursday night is movie night" bannerImg="/images/movie_night.svg" />


    <ul class="community-view__user-list">
        <li class="user-list__profile-card" v-for="(user, index) in users" :key="index">
            <div class="profile-card__img-container">
                <img class="img-container__img" :src="`${baseURL}${user.avatar}`" alt="Profile image">
            </div>
            <div class="profile-card__description-container">
                <h2 class="description-container__username">{{ user.firstname }} {{ user.lastname }}</h2>
                <h3 class="description-container__role">{{ user.role }}</h3>
                <p class="description-container__bio">{{user.biography}}</p>
            </div>
            <footer class="profile-card__footer">
                <button class="footer__profile-btn"><router-link class="footer__profile-link" :to="{ path: '/Dashboard/Profile', query: { id: user._id }}">View profile</router-link></button>
                <button class="footer__request-btn" @click="networkRequest(user._id)">Send request</button>
            </footer>
        </li>
    </ul>


  </div>
</template>

<script>
import axios from 'axios';
import banner from '../../Components/Dashboard/Banner.vue';

export default {
    name: 'Community',

    components: {
        banner
    },

    data() {
        return {
            users: {},
            baseURL: this.$store.state.baseURL
        }
    },
    methods: {
        networkRequest: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: '/api/user/network/request', data: data })
                .then(resp => {
                    //console.log(resp)
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    },
    created: function() {
        return new Promise((resolve, reject) => {
            axios({method: 'GET', url: '/api/user/all', data: this.$store.getters.user})
            .then(resp => {
                this.users = resp.data.users;
                console.log(this.users)
                resolve(resp);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
</script>



<style lang="scss">
.community-view {
    &__user-list {
        display: grid;
        grid-gap: 50px 30px;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // auto-fit vs auto-fill ??
        grid-template-rows: minmax(300px, auto);
        padding: 20px;

        .user-list__profile-card {
            @include flexColumn(center, space-between);
            padding: 10px;
            user-select: none;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
            
            .profile-card__img-container {

                .img-container__img {
                    height: 150px;
                    width: 150px;
                    border-radius: 50%;
                }
            }

            .profile-card__description-container {
                text-align: center;
                .description-container__username {
                    color: getColor($accents, primary);
                    text-transform: capitalize;
                }

                .description-container__role {
                    margin-top: 5px;
                    font-size: 14px;
                    transition: color $themeTransitionTime;
                }

                .description-container__bio {
                    margin-top: 10px;
                    overflow: hidden;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* number of lines to show */
                    -webkit-box-orient: vertical;
                    transition: color $themeTransitionTime;
                }
            }

            .profile-card__footer {
                @include flexRow(center, space-between);
                width: 100%;
                padding: 10px 0px;
                margin-top: 20px;

                .footer__request-btn {
                    @extend %primary-btn;
                    width: calc(50% - 10px);
                    height: 100%;
                    font-size: 12px;
                    padding: 10px;
                }

                .footer__profile-btn {
                    @extend %primary-btn;
                    width: calc(50% - 10px);
                    height: 100%;
                    padding: 10px;
                    margin-right: 20px;
                    font-size: 12px;
                }
            }
        }
    }
}

.dark-theme {
    .community-view {
        .description-container__role {
            color: getColor($darkTheme, fontColor);
        }
        .description-container__bio {
            color: getColor($darkTheme, fontColor);
        }
    }
}

.light-theme {
    .community-view { 
        .description-container__role {
            color: getColor($lightTheme, fontColor);
        }
        .description-container__bio {
            color: getColor($lightTheme, fontColor);
        } 
    }
}

</style>