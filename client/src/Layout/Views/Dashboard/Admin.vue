<template>
  <div class="view admin-view">
    <p>Admin panel</p>

    <ul>
        <li v-for="(user, index) in pendingUsers" :key="index">
            {{ index }} - {{user.firstname}}
            <button @click="approveUser(user)">Approve</button>
        </li>
    </ul>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  components: {

  },
  data() {
      return {
          pendingUsers: {}
      }
  },
  methods: {
    approveUser: function(user) {
        return new Promise((resolve, reject) => {
            axios({method: 'POST', url: 'http://localhost:8000/user/approve', data: user._id})
            .then(resp => {
                this.pendingUsers = this.pendingUsers.filter(x => x._id !== user._id);
                resolve(resp);
            }).catch(err => {
                reject(err);
            })
        })
      }
  },
  created: function() {
    return new Promise((resolve, reject) => {
        axios({method: 'GET', url: 'http://localhost:8000/user/pending', data: this.$store.getters.user})
        .then(resp => {
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