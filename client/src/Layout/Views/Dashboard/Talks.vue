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
            <button class="header__return-btn" v-if="searchNetwork" @click="returnToThreads"><i class="fas fa-arrow-left"></i></button>
            <form class="header__form" action="">
                <label class="form__search-label" for="network-search">Search</label>
                <input v-model="query" @focus="onSearchFocus" class="form__search-input" type="search" placeholder="Search..." autocomplete="off" id="network-search">
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
                <li class="thread-list__item" v-for="(thread, index) in threads" :key="index">
                    {{ index }} - {{ thread.firstname }}
                    <button @click="startNewThread(thread._id)">Create new thread</button>
                </li>
            </ul>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT SEARCH LIST (SHOWS NETWORK IF SEARCH INPUT = EMPTY)	   			  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="searchNetwork && !searchArr.length" class="section__network-list">
                <li class="network-list__item" v-for="(user, index) in network" :key="index" v-on:click="openChat(user._id)">
                    <img class="item__avatar" src="@/assets/avatar.png">
                    <p class="item__username">{{ user.firstname }} {{ user.lastname }}</p>
                </li>
            </ul>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT SEARCH LIST (SHOWS FILTERED NETWORK ARRAY)						  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="searchNetwork && searchArr.length" class="section__network-list">
                <li class="network-list__item" v-for="(user, index) in searchArr" :key="index" v-on:click="openChat(user._id)">
                    <img class="item__avatar" src="@/assets/avatar.png">
                    <p class="item__username">{{ user.firstname }} {{ user.lastname }}</p>
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
                <li  class="messages-list__message" v-for="(message, index) in messages" :key="index">
                    <p>{{message.username}}</p>
                    <p>{{message.msg}}</p>
                </li>
            </ul>
        </article>

        <!-------------------------------------------------------------------------------------->
        <!-- CHAT FORM 			             												  -->
        <!-------------------------------------------------------------------------------------->
        <form class="chat__form" v-on:submit.prevent="sendMessage(msg)">
            <input class="form__input" type="text" placeholder="Type your message here..." v-model="msg">
            <button class="form__submit" type="submit"><i class="fab fa-telegram-plane"></i></button>
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

// test below
currentUser: 'Benjamin',
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
                        //.replace(/\s/g, '')
                        if(value.toString().toLowerCase().startsWith(q)) {
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

        .aside__header {
           display: flex;
           height: 50px;

            .header__return-btn {
                @extend %icon-btn;
                font-size: 18px;
                color: #fff; // Move to theme
                padding: 0px 20px;
            }

            .header__form {
                position: relative;
                height: 100%;
                width: 100%;

                .form__search-label {
                    display: none;
                }

                .form__search-input {
                    padding: 0px 10px;
                    border: none;
                    border-radius: 5px;
                    height: 100%;
                    width: 100%;
                    font-size: 16px;
                }
            }
        }

        .aside__section {
            .section__thread-list {
                
                .thread-list__item {

                }
            }

            .section__network-list {
                padding: 10px 0px;

                .network-list__item{
                    @include flexRow(center, null);
                    padding: 10px 5px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: getColor($accents, _white);


                    .item__avatar {
                        height: 40px;
                        width: 40px;
                    }
                }
            }
        }
    }


    &__chat {
        position: relative;
        grid-column: 2;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;

        .chat__window {
            position: relative;
            height: 100%;

            .window__messages-list {
                position: absolute;
                padding: 10px;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                overflow-y: auto;
            }
        }

        .chat__form {
            display: flex;
            height: 60px;
            border: none;
            overflow: hidden;
  
            .form__input {
                height: 100%;
                padding: 0px 10px;
                width: 100%;
                font-size: 16px;
                border: none;
            }

            .form__submit {
                position: relative;
                @extend %icon-btn;
                font-size: 26px;
                padding: 0px 30px;
                color: getColor($accents, primary);

                &:hover {
                    color: darken(getColor($accents, primary), 10%);
                    transform: scale(1.2);
                }
            }
        }
    }
}

</style>