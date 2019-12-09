<template>
  <div class="view network-view">
        <header class="network-view__banner">
            <banner />
        </header>

    <section class="network-view__pending-section" v-if="pendingRequests.length">
        <h3>Pending Network Requests</h3>
        <ul>
            <li v-for="(user, index) in pendingRequests" :key="index">
                {{ index }} - {{ user.firstname }} - {{ user.role }}
                <button @click="acceptRequest(user._id)">Accept Request</button>
            </li>
        </ul>
    </section>

    <section class="network-view__network-section">
        <h3>Your Network</h3>
        <ul>
            <li v-if="!network.length">You do not currently have a network, start building one <router-link class="item__link" to="/Dashboard/Community">here</router-link></li>
            <li v-for="(user, index) in network" :key="index">
                {{ index }} - {{ user.firstname }} - {{ user.role }}
            </li>
        </ul>
    </section>


  </div>
</template>

<script>
import banner from '../../Components/Limited/Banner.vue';
import axios from 'axios';

export default {
    name: 'Network',
    components: {
        banner
    },
    data() {
        return {
            network: [],
            pendingRequests: []
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
        margin-bottom: 20px;
    }

    &__network-section {

    }
}

</style>