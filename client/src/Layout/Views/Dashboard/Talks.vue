<template>
  <div class="view talks-view">



    <aside class="talks-view__aside"> 
        <!-- <header class="aside__header">
            <ul class="header__tabs">
                <li class="tabs_tab">Current talks</li>
                <li class="tabs_tab">New talk</li>
            </ul>
        </header> -->
        <section class="aside__section">
            <ul class="section__thread-list">
                <li v-for="(user, index) in users" :key="index">
                    {{ index }} - {{ user.firstname }}
                    <button @click="startNewThread(user._id)">Create new thread</button>
                </li>
            </ul>
        </section>
    </aside>


    <article class="talks-view__chat">

    </article>




  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Talks',
    components: {

    },
    data() {
        return {
            users: {}
        }
    },
    methods: {
        startNewThread: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: 'http://localhost:8000/api/chat/thread', data: data })
                .then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    },
    created: function() {
        return new Promise((resolve, reject) => {
            axios({method: 'GET', url: 'http://localhost:8000/api/chat/threads'})
            .then(resp => {
                console.log(resp.data)
                this.users = resp
                resolve(resp);
            }).catch(err => {
                reject(err);
            })
        })
    }
    }
</script>



<style lang="scss">
.talks-view {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 300px 1fr;
    grid-column-gap: 20px;

    &__aside {
        width: 300px;
        height: 100%;
        grid-column: 1;

        .aside__section {


            .section__thread-list {
                
            }
        }
    }

    &__chat {
        grid-column: 2;
        background: firebrick;
    }
}

</style>