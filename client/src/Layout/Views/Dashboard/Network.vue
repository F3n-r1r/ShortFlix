<template>
  <div class="view network-view">
    <banner class="dashboard__banner" bannerText="Adventure is more than backpacking" bannerImg="/images/adventure.svg" />
    <section class="network-view__pending-section" v-if="pendingRequests.length">
        <h3 class="pending-section__headline">Pending Network Requests</h3>
        <ul class="network-section__pending-list">
            <li class="pending-list__item" v-for="(user, index) in pendingRequests" :key="index">
                <router-link class="item__route" :to="{ path: '/Dashboard/Profile', query: { id: user._id }}">
                    <img class="item__img" v-if="user.avatar" :src="`${baseURL}${user.avatar}`">
                    <p class="route__name">{{ user.firstname }}, {{ user.role }}</p>
                </router-link>
                <button class="item__btn-acc" @click="acceptRequest(user._id)"><i class="fas fa-check"></i></button>
                <button class="item__btn-deny" @click="denyRequest(user._id)"><i class="fas fa-times"></i></button>
            </li>
        </ul>
    </section>

    <section class="network-view__network-section">
        <h3 class="network-section__headline">This is your A-List</h3>
        <p class="network-section__subtext">The persons you have communicated with will appear here</p>
        <ul class="network-section__listing">
            <li v-if="!network.length">You do not currently have a network, start building one <router-link class="item__link" to="/Dashboard/Community">here</router-link></li>
            
            <li class="listing__li" v-for="(user, index) in network" :key="index">
                <router-link class="listing__link" :to="{ path: '/Dashboard/Profile', query: { id: user._id }}">
                    <img v-if="user.avatar" class="btn__img" :src="`${baseURL}${user.avatar}`">
                    <div class="listing__profiles--firstname">{{ user.firstname }},</div>
                    <div class="listing__profiles--role">{{ user.role }}</div> 
                </router-link>
            </li>
        
        </ul>
    </section>


  </div>
</template>

<script>
import axios from 'axios';
import banner from '../../Components/Dashboard/Banner.vue';

export default {
    name: 'Network',

    components: {
        banner
    },

    data() {
        return {
            network: [],
            pendingRequests: [],
            baseURL: this.$store.state.baseURL
        }
    },
    methods: {
        acceptRequest: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: '/api/user/network/accept', data: data })
                .then(resp => {
                    //console.log(resp)
                    this.network = this.network.concat(this.pendingRequests.filter(x => x._id == userId))
                    this.pendingRequests = this.pendingRequests.filter(x => x._id !== userId)
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        denyRequest: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: '/api/user/network/deny', data: data })
                .then(resp => {
                    this.pendingRequests = this.pendingRequests.filter(x => x._id !== userId)
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    },
    created: function() {
        return new Promise((resolve, reject) => {
            axios({method: 'GET', url: '/api/user/network/all'})
            .then(resp => {
                //console.log(resp)
                this.pendingRequests = resp.data.user.network.pending;
                this.network = resp.data.user.network.accepted;
                resolve(resp);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
</script>



<style lang="scss">
.network-view {

    &__pending-section {
        margin: 30px;
        .pending-section__headline {
            color: getColor($accents, primary);
            font-size: 18px;
            margin-bottom: 5px;
        }
        .network-section__pending-list {
            .pending-list__item {
                @include flexRow(center, flex-start);
                 padding: 10px;
                .item__img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                .item__route {
                    @include flexRow(center, flex-start);
                    font-size: 14px;
                    text-transform: capitalize;
                    .route__name {
                        margin-left: 10px;
                    }
                }
                .item__btn-acc {
                    @extend %icon-btn;
                    color: getColor($accents, tertiary);
                    margin-left: 20px;
                    font-size: 24px;
                }
                .item__btn-deny {
                    @extend %icon-btn;
                    color: getColor($accents, primary);
                    margin-left: 10px;
                    font-size: 24px;
                }
            }
        }
    }

    &__network-section {
        margin: 30px;
        
        .network-section__headline {
            color: getColor($accents, primary);
            font-size: 18px;
            margin-bottom: 5px;
        }
        .network-section__subtext {
            font-size: 14px;
            font-style: italic;
            margin-bottom: 30px;
        }

        .network-section__listing {
                @include flexColumn(flex-start, center);
           
                .listing__li {
                    .listing__link {
                        @include flexRow(center, flex-start);
                        padding: 10px;
                    }

                    .btn__img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                    }
                }

                .listing__profiles--firstname { 
                    margin-left: 10px;
                    margin-right: 5px;
                    text-transform: capitalize;
                }

                .listing__profiles--role {
                    text-transform: capitalize;
                }
            
        }

    }
}
/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
    .network-view {
        &__network-section {
            color: getColor($darkTheme, fontColor);
        }
        .network-section__pending-list {
            .item__route {
                color: getColor($darkTheme, fontColor);
            }
        }
    }
}

/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
    .network-view {
        &__network-section {
            color: getColor($lightTheme, fontColor);
        }
        .network-section__pending-list {
            .item__route {
                color: getColor($lightTheme, fontColor);
            }
        }
    }
}

</style>