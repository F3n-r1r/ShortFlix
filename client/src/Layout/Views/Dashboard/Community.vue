<template>
  <div class="view community-view">
    <p>community panel</p>

    <ul>
        <li v-for="(user, index) in users" :key="index">
            {{ index }} - {{ user.firstname }} - {{ user.role }}
            <button @click="networkRequest(user._id)">Approve</button>
        </li>
    </ul>


  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Community',
    components: {

    },
    data() {
        return {
            users: {}
        }
    },
    methods: {
        networkRequest: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    userA: this.$store.getters.user._id,
                    userB: userId
                }
                axios({method: 'POST', url: 'http://localhost:8000/api/user/network/request', data: data })
                .then(resp => {
                    console.log(resp)
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    },
    created: function() {
        return new Promise((resolve, reject) => {
            axios({method: 'GET', url: 'http://localhost:8000/api/user/all', data: this.$store.getters.user})
            .then(resp => {
                this.users = resp.data.users;
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