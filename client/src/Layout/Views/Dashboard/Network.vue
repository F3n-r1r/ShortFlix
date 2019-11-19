<template>
  <div class="view network-view">



    <p>PENDING REQUESTS</p>
    <ul>
        <li v-for="(user, index) in pendingRequests" :key="index">
            {{ index }} - {{ user.firstname }} - {{ user.role }}
            <button @click="acceptRequest(user._id)">Accept Request</button>
        </li>
    </ul>


    <br><br>
    <p>MY NETWORK</p>
    <ul>
        <li v-for="(user, index) in network" :key="index">
            {{ index }} - {{ user.firstname }} - {{ user.role }}
        </li>
    </ul>


  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Network',
    components: {

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
                axios({method: 'POST', url: 'http://localhost:8000/api/user/network/accept', data: data })
                .then(resp => {
                    console.log(resp)
                    this.pendingUsers = this.pendingUsers.filter(x => x._id !== userId);
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    },
    created: function() {
        return new Promise((resolve, reject) => {
            axios({method: 'GET', url: 'http://localhost:8000/api/user/network/all'})
            .then(resp => {
                //console.log(resp.data)
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


</style>