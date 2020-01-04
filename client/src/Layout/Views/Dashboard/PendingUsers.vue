<template>
  <div class="view pendingUsers-view">

      <h3 class="view__headline">Pending new users ({{pendingUsers.length}})</h3>
        <ul class="pending-list">
            <li class="pending-list__item" v-for="(user, index) in pendingUsers" :key="index">
                <div class="item__info">{{ user.firstname }} - {{ user.role }}</div>
                <div class="item__btn-container">
                    <button class="btn-container__appr-btn" @click="approveUser(user._id)"><i class="fas fa-check"></i></button>
                    <button class="btn-container__deny-btn"><i class="fas fa-times"></i></button>
                </div>
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
            @include flexRow(center, space-between);
            padding: 10px;
            margin-top: 10px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

            .item__info {
                text-transform: capitalize;
            }

            .item__btn-container {
                @include flexRow(null, null);

                .btn-container__appr-btn {
                    @extend %icon-btn;
                    color: getColor($accents, tertiary);
                    margin-left: 20px;
                    font-size: 24px;

                    &:hover {
                        transform: scale(1.1);
                    }
                }
                .btn-container__deny-btn {
                    @extend %icon-btn;
                    color: getColor($accents, primary);
                    margin-left: 10px;
                    font-size: 24px;

                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
        }
    }
}

.dark-theme {
    .pending-list__item {
       
        .item__info {
            color: getColor($darkTheme, fontColor);
        }
    }
}

.light-theme {
    .pending-list__item {
     
        .item__info {
            color: getColor($lightTheme, fontColor);
        }
    }
}

</style>