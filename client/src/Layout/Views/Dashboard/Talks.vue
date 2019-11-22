<template>
  <div class="view talks-view">



    <aside class="talks-view__aside"> 
        <header class="aside__header">
            <button v-if="searchNetwork" @click="returnToThreads"><i class="fas fa-arrow-left"></i></button>
            <form class="header__form" action="">
                <label class="form__search-label" for="network-search">Search</label>
                <input v-model="query" @focus="onSearchFocus" class="form__search-input" type="search" autocomplete="off" id="network-search">
            </form>
        </header>
        
        <section class="aside__section">
            <ul v-if="!searchNetwork" class="section__thread-list">
                <li v-for="(thread, index) in threads" :key="index">
                    {{ index }} - {{ thread.firstname }}
                    <button @click="startNewThread(thread._id)">Create new thread</button>
                </li>
            </ul>
            <ul v-if="searchNetwork && !searchArr.length" class="seaction__network-list">
                <li v-for="(user, index) in network" :key="index">
                    {{ index }} - {{ user.firstname }} {{ user.lastname }}
                </li>
            </ul>
            <ul v-if="searchNetwork && searchArr.length" class="seaction__network-list">
                <li v-for="(user, index) in searchArr" :key="index">
                    {{ index }} - {{ user.firstname }} {{ user.lastname }}
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
            query: '',
            searchNetwork: false,
            network: [],
            threads: [],
            searchArr: []
        }
    },
    methods: {
        onSearchFocus: function(event) {
            this.searchNetwork = true;
        },
        
		returnToThreads: function(event) {
            this.searchNetwork = false;
        },
        
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
        },

        fetchThreads() {
            return new Promise((resolve, reject) => {
                axios({method: 'GET', url: 'http://localhost:8000/api/chat/threads'})
                .then(resp => {
                    //console.log(resp.data)
                    this.threads = resp
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        fetchNetwork() {
            return new Promise((resolve, reject) => {
                axios({method: 'GET', url: 'http://localhost:8000/api/user/network/all'})
                .then(resp => {
                    //console.log(resp)
                    this.network = resp.data.user.network.accepted;
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    },

    computed: {
        searchNetworkList() {
            let q = this.query
            let n = this.network
            let newArr = []
            //console.log(newArr)
            if(q) {
                for(let i = 0; i < n.length; i++) {   
                    Object.entries(n[i]).forEach(([key, value]) => {
                        if(value.toString().toLowerCase().startsWith(q.replace(/\s/g, ''))) {
                            newArr.indexOf(n[i]) === -1 ? newArr.push(n[i]) : console.log("already in the array");
                        } 
                    });
                }
                this.searchArr = newArr;         
            } else {
                this.searchArr = []
            }
        }
    },

    watch: {
        searchNetworkList: function() {
            console.log(this.searchArr)
        }
    },

    created: function() {
        this.fetchThreads();

        this.fetchNetwork();
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