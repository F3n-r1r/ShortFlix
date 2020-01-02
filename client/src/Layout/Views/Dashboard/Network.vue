<template>
  <div class="view network-view">
    <banner class="dashboard__banner" bannerText="Adventure is more than backpacking" bannerImg="/images/adventure.svg" />
    <section class="network-view__pending-section" v-if="pendingRequests.length">
        <h3 class="pending-section__headline">Pending Network Requests</h3>
        <ul class="network-section__pending-list">
            <li class="pending-list__item" v-for="(user, index) in pendingRequests" :key="index">
                <img class="item__img" v-if="user.avatar" :src="`${baseURL}${user.avatar}`">
                <router-link class="item__route" :to="{ path: '/Dashboard/Profile', query: { id: user._id }}">
                    {{ user.firstname }} - {{ user.role }}
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
            <section class="listing__profiles">
            <li v-for="(user, index) in network" :key="index">
            <img v-if="user.avatar" class="btn__img" :src="`${baseURL}${user.avatar}`">
                <router-link class="listing__profiles--firstname" :to="{ path: '/Dashboard/Profile', query: { id: user._id }}">
                   {{ user.firstname }},</router-link>
                <div class="listing__profiles--role">{{ user.role }}</div> 
            </li>
            </section>
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
                    font-size: 14px;
                    padding-left: 10px;
                    font-weight: bold;
                    text-transform: capitalize;
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

            .listing__profiles {
                li {
                    @include flexRow(center, flex-start);
                    padding: 10px;

                    .btn__img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                    }
                }

                &--firstname {
                    font-size: 14px;
                    padding-left: 10px;
                    font-weight: bold;
                    text-transform: capitalize;
                }

                &--role {
                    font-size: 14px;
                    padding-left: 2px;
                    text-transform: lowercase;
                }
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
    DARK THEME COLORS
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