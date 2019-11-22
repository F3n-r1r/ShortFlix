<template>
  <div class="view talks-view">

    <!-------------------------------------------------------------------------------------->
    <!-- ASIDE				             												  -->
    <!-------------------------------------------------------------------------------------->
    <aside class="talks-view__aside"> 

        <!-------------------------------------------------------------------------------------->
		<!-- ASIDE HEADER		   					    									  -->
		<!-------------------------------------------------------------------------------------->
        <header class="aside__header">
            <button v-if="searchNetwork" @click="returnToThreads"><i class="fas fa-arrow-left"></i></button>
            <form class="header__form" action="">
                <label class="form__search-label" for="network-search">Search</label>
                <input v-model="query" @focus="onSearchFocus" class="form__search-input" type="search" autocomplete="off" id="network-search">
            </form>
        </header>
        

        <!-------------------------------------------------------------------------------------->
		<!-- ASIDE CONTENT	   											        			  -->
		<!-------------------------------------------------------------------------------------->
        <section class="aside__section">

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT THREAD LIST  									        		  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="!searchNetwork" class="section__thread-list">
                <li v-for="(thread, index) in threads" :key="index">
                    {{ index }} - {{ thread.firstname }}
                    <button @click="startNewThread(thread._id)">Create new thread</button>
                </li>
            </ul>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT SEARCH LIST (SHOWS NETWORK IF SEARCH INPUT = EMPTY)	   			  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="searchNetwork && !searchArr.length" class="seaction__network-list">
                <li v-for="(user, index) in network" :key="index" v-on:click="openChat(user._id)">
                    {{ index }} - {{ user.firstname }} {{ user.lastname }}
                </li>
            </ul>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT SEARCH LIST (SHOWS FILTERED NETWORK ARRAY)						  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="searchNetwork && searchArr.length" class="seaction__network-list">
                <li v-for="(user, index) in searchArr" :key="index" v-on:click="openChat(user._id)">
                    {{ index }} - {{ user.firstname }} {{ user.lastname }}
                </li>
            </ul>
        </section>
    </aside>


    <!-------------------------------------------------------------------------------------->
    <!-- CHAT   			             												  -->
    <!-------------------------------------------------------------------------------------->
    <section class="talks-view__chat">

        <!-------------------------------------------------------------------------------------->
        <!-- CHAT WINDOW   			             											  -->
        <!-------------------------------------------------------------------------------------->
        <article class="chat__window">
            <ul class="window__messages-list">
                <li class="messages-list__message" v-for="(message, index) in messages" :key="index">
                    <p>{{message.username}}</p>
                    <p>{{message.msg}}</p>
                </li>
            </ul>
        </article>

        <!-------------------------------------------------------------------------------------->
        <!-- CHAT FORM 			             												  -->
        <!-------------------------------------------------------------------------------------->
        <form class="chat__form" v-on:submit.prevent="sendMessage(msg)">
            <input type="text" v-model="msg">
            <button type="submit">Send</button>
        </form>
    </section>

  </div>
</template>

<script>
import io from 'socket.io-client';
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
            searchArr: [],

            // currentUser: [],
            msg: '',
            username: '',
            socket: io('http://localhost:3000'),
            messages: [],
            users: [],

   
        }
    },

    methods: {
        joinServer: function() {       
            this.socket.on('loggedIn', data => {
                //console.log(data.messages)
                this.messages = data.messages;
                this.users = data.users;
                this.socket.emit('newuser', 'Benjamin')
            });
            this.listen();
        },
        listen: function() {
            this.socket.on('userOnline', user => {
                this.users.push(user)
            });
            this.socket.on('userLeft', user => {
                this.users.splice(this.users.indexOf(user), 1)
            });
            this.socket.on('msg', message => {
                this.messages.push(message)
            });
        },
        sendMessage: function(message) {
           if(message) {
               console.log(message)
                this.socket.emit('msg', message);
                this.msg = '';
           } else {
               return
           }
            //console.log(this.messages)
        },
        // sendMessage: function() {
        //     if(!this.message) {
        //         console.log('blank message');
        //         return
        //     } else {
        //         this.$emit('sendMessage', this.msg);
        //         this.msg = '';
        //     }
        // },



        openChat: function(userId) {
            //console.log(userId)
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: 'http://localhost:8000/api/chat/open_thread', data: data})
                .then(resp => {
                    console.log(resp)
                    
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

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

        // fetchThreads() {
        //     return new Promise((resolve, reject) => {
        //         axios({method: 'GET', url: 'http://localhost:8000/api/chat/threads'})
        //         .then(resp => {
        //             //console.log(resp.data)
        //             this.threads = resp
        //             resolve(resp);
        //         }).catch(err => {
        //             reject(err);
        //         })
        //     })
        // },

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
        },

    },


    mounted: function() {
        this.joinServer();
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
                //return newArr;         
            } else {
                this.searchArr = []
            }
        }
    },

    watch: {

        searchNetworkList: function() {
            //console.log(this.searchArr)
            //this.searchArr = this.searchNetworkList
        }
    },

    created: function() {
        // this.fetchThreads();

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