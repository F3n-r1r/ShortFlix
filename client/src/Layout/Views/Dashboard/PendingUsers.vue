<template>
  <div class="view pendingUsers-view">

      <h3 class="view__headline">Pending new users ({{pendingUsers.length}})</h3>
        <ul class="pending-list">
            <li class="pending-list__item" v-for="(user, index) in pendingUsers" :key="index">
                <div class="item__info">{{ user.firstname }} - {{ user.role }}</div>
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
.pendingUsers-view {
    padding: 20px;
    .view__headline {
        color: getColor($accents, primary);
        font-size: 18px;
        margin-bottom: 5px;
    }
    .pending-list {
        .pending-list__item {
            @include flexRow(center, flex-start);
            padding: 10px;
        }
    }
}

</style>