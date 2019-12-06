<template>
  <div class="view pendingUsers-view">
    <p>Admin panel</p>

    <ul>
        <li v-for="(user, index) in pendingUsers" :key="index">
            {{ index }} - {{ user.firstname }} - {{ user.role }}
            <button @click="approveUser(user._id)">Approve</button>
        </li>
    </ul>


  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PendingUsers',
    components: {

    },
    data() {
        return {
            pendingUsers: {}
        }
    },
    methods: {
        approveUser: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: '/api/auth/approve', data: data })
                .then(resp => {
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
            let data = {
                id: this.$store.getters.user
            }
            axios({method: 'GET', url: '/api/auth/pending', data: data})
            .then(resp => {
                console.log(resp.data.user)
                this.pendingUsers = resp.data.user;
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