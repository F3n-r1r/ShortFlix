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
                <li class="thread-list__title">Active Threads</li>
                <li v-bind:class="threadClass(thread._id)" v-for="(thread, index) in threads" :key="index" v-on:click="activeThread = thread._id">
                    <p class="item__username">{{ thread.users[0].firstname }} {{ thread.users[0].lastname }}</p>
                </li>
            </ul>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT SEARCH LIST (SHOWS NETWORK IF SEARCH INPUT = EMPTY)	   			  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="searchNetwork && !searchArr.length" class="section__network-list">
                <li class="network-list__item" v-for="(user, index) in network" :key="index" v-on:click="openThread(user._id)">
                    <!-- <img class="item__avatar" src="@/assets/avatar.png"> -->
                    <p class="item__username">{{ user.firstname }} {{ user.lastname }}</p>
                </li>
            </ul>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE CONTENT SEARCH LIST (SHOWS FILTERED NETWORK ARRAY)						  -->
            <!-------------------------------------------------------------------------------------->
            <ul v-if="searchNetwork && searchArr.length" class="section__network-list">
                <li class="network-list__item" v-for="(user, index) in searchArr" :key="index" v-on:click="openThread(user._id)">
                    <!-- <img class="item__avatar" src="@/assets/avatar.png"> -->
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
            <ul v-if="messages.length" class="window__messages-list">
                <li v-bind:class="messageClass(message.author._id)" v-for="(message, index) in messages" :key="index">
                    <div class="message__content">
                        <p class="content__author-name">{{message.author.firstname}} {{message.author.lastname}}</p>
                        <p class="content__msg-text">{{message.msg}}</p> 
                    </div>     
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

            msg: '',
            socket: io('http://localhost:8000'),
            messages: [],

            activeThread: '',
            sender: '',
            receiver: '',

            bannerVisible: false,
   
        }
    },

    /*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
    methods: {

        /* RESET MESSAGES/THREADS, INITIALIZE CHAT WITH CURRENT USER & CALL LISTEN FUNCTION*/
        joinServer: function() {   
            this.messages = []
            this.threads = []
            let user = this.$store.getters.user._id
            this.socket.emit('initChat', user);
            this.listen();
        },

        /* LISTEN FOR "msg" ON THE SOCKET*/
        listen: function() {
            this.socket.on('msg', data => {
                this.messages.push(data)
            });
        },

        /* IF MESSAGE NOT EMPTY EMIT "msg" FUNCTION TO SOCKET & RESET MSG VARIABLE*/
        sendMessage: function(message) {
           if(message) {
               let data = {
                   msg: message,
                   senderId: this.$store.getters.user._id,
                   receiverId: this.receiver,
                   thread: this.activeThread
               }
                this.socket.emit('msg', data);
                this.msg = '';
           } else {
               return
           }
        },

        /*  */
        openThread: function(userId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: userId
                }
                axios({method: 'POST', url: '/api/chat/openThread', data: data})
                .then(resp => {
                    let threadsFilter = this.threads.filter(x => x._id === resp.data.thread[0]._id);
                    if(!threadsFilter.length > 0) {
                        this.threads.push(resp.data.thread[0])
                    }
                    this.activeThread = resp.data.thread[0]._id;
                    this.returnToThreads();
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        /*  */
        messageClass(msgAuthor) {
            let sender = 'messages-list__message messages-list__message--sender';
            let receiver = 'messages-list__message messages-list__message--receiver';
            if(msgAuthor === this.$store.getters.user._id) {
                return sender
            } else if (msgAuthor === this.receiver){
                return receiver
            }
        },

        threadClass(threadId) {
            let active = 'thread-list__item thread-list__item--active';
            let notActive = 'thread-list__item';
            if(threadId === this.activeThread) {
                return active
            } else {
                return notActive
            }
        },

        /*  */
        onSearchFocus: function(event) {
            this.searchNetwork = true;
        },
        
        /*  */
		returnToThreads: function(event) {
            this.searchNetwork = false;
        },

        /*  */
        fetchThreadMessages(threadId) {
            return new Promise((resolve, reject) => {
                let data = {
                    id: threadId
                }
                axios({method: 'POST', url: '/api/chat/threadMessages', data: data})
                .then(resp => {
                    this.messages = resp.data.messages;
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        /*  */
        fetchThreads() {
            return new Promise((resolve, reject) => {
                let user = this.$store.getters.user._id
                axios({method: 'GET', url: '/api/chat/threads', data: user})
                .then(resp => {
                    this.messages = resp.data.messages;
                    this.threads = resp.data.threads;
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        /*  */
        fetchNetwork() {
            return new Promise((resolve, reject) => {
                axios({method: 'GET', url: '/api/user/network/all'})
                .then(resp => {
                    //console.log(resp)
                    this.network = resp.data.user.network.accepted;
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                })
            })
        },

        /*  */
        searchNetworkList() {
            let q = this.query
            let n = this.network
            let newArr = []
            if(q) {
                for(let i = 0; i < n.length; i++) {   
                    let username = n[i].firstname + ' ' + n[i].lastname;
                    if(username.toLowerCase().includes(q.toLowerCase())) {
                         newArr.indexOf(n[i]) === -1 ? newArr.push(n[i]) : console.log("already in the array");
                    } 
                    // Object.entries(n[i]).forEach(([key, value]) => {
                    //     //.replace(/\s/g, '')
                    //     if(value.toString().toLowerCase().startsWith(q)) {
                    //         newArr.indexOf(n[i]) === -1 ? newArr.push(n[i]) : console.log("already in the array");
                    //     } 
                    // });
                }
                this.searchArr = newArr;      
            } else {
                this.searchArr = []
            }
        }
    },


    /*----------------------------------------------------------------------------------*\
		MOUNTED
	*\----------------------------------------------------------------------------------*/
    mounted: function() {

        /* CALL GET USER FUNCTION FROM STORE & THEN JOIN CHAT SERVER (SOCKET) */
        this.$store.dispatch('getCurrentUser')
        .then(res => {
            this.joinServer();
        });  

        /* CALL FETCH ALL THREADS FUNCTION & THEN SET ACTIVE THREAD TO THE FIRST IN ARRAY */
        this.fetchThreads()
        .then(res => {
            this.activeThread = res.data.threads[0]._id
        }).catch(err => {
            console.log(err)
        });

        /* CALL FUNCTION TO GET ALL USERS IN THE CURRENT USERS NETWORK */
        this.fetchNetwork();
    },


    /*----------------------------------------------------------------------------------*\
		WATCH
	*\----------------------------------------------------------------------------------*/
    watch: {

        /* DETERMINE CLASS FOR CHAT MESSAGE */
        messages: function () {
            this.$nextTick(function () {
                let chat = document.querySelector('.window__messages-list');
                if(chat) {
                    chat.scrollTop = chat.scrollHeight;
                }
            });
        },

        /* SET NEW ACTIVE THREAD ID & CALL FUNCTION TO GET ASSOCIATED MESSAGES */
        activeThread: function(newThread, oldThread) {
            this.messages = '';
            let thread = this.threads.filter(x => x._id === newThread);
            this.receiver = thread[0].users[0]._id;
            this.fetchThreadMessages(newThread);
        },

        /* WATCH SEARCH QUERY FOR INPUT AND TRIGGER SEARCH FUNCTION */
        query: function() {
            this.searchNetworkList();
        }
    }
}
</script>

<style lang="scss">
.talks-view {
    // position: absolute;
    // //top: -150px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(min-content, max-content) 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    @include media(min, xs) {
        grid-template-columns: 250px 1fr;
        grid-template-rows: 1fr;
        grid-row-gap: 0px;
    }
    
    &__aside {
        width: 100%;
        position:relative;

        @include media(min, xs) {
            width: 250px;
        }

        .aside__header {
            position:relative;
           display: flex;

            .header__return-btn {
                @extend %icon-btn;
                font-size: 18px;
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
                    padding: 10px 10px;
                    border: none;
                    border-radius: 5px;
                    height: 100%;
                    width: 100%;
                    font-size: 16px;
                }
            }
        }

        .aside__section {
            position:relative;
            z-index: 1;

            .section__thread-list {
                display: none;

                @include media(min, xs) {
                    display: block;
                }

                .thread-list__title {         
                    padding: 10px 0px;
                    font-size: 18px;
                }

                .thread-list__item {
                    position: relative;
                    cursor: pointer;
                    padding: 20px 18px;
                    border-radius: 10px;
                    margin-top: 15px;
                    // border-left: 2px solid transparent;

                    .item__username {
                        font-size: 18px;
                        text-transform: capitalize;
                    }
                }
            }

            .section__network-list {
                padding: 10px 0px;
                z-index: 999;

                .network-list__item{
                    @include flexRow(center, null);
                    cursor: pointer;
                    padding: 20px 18px;
                    border-radius: 10px;
                    margin-top: 10px;
                    text-transform: capitalize;


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
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        

        .chat__window {
            position: relative;
            height: 100%;
            border-top-left-radius: 10px;
            

            .window__messages-list {
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 10px;
                overflow-y: auto;
                overflow-x: hidden;
          
                .messages-list__message {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    padding: 15px 10px;
                    border-radius: 10px;

                    @include media(min, xs) {
                        padding: 15px 50px;
                    }

                    .message__content {
                        width: 80%;
                        padding: 10px;
                        border-radius: 10px;
                        

                        @include media(min, sm) {
                            width: 60%;
                        }

                        .content__author-name {
                            text-transform: capitalize;
                            margin-bottom: 10px;
                            font-weight: 600;
                        }
                    
                        .content__msg-text {
                            user-select: none;
                            white-space: pre-wrap;
                            word-wrap: break-word;
                            word-break: break-all;
                            white-space: normal;
                        }
                    }

                    &--receiver {
                        position: relative;
                        align-items: flex-start;
                        
                        .message__content {
                                   
                        }
                              
                    }

                    &--sender {
                        position: relative;
                        align-items: flex-end;

                        .message__content {
                              
                        }
                    }
                }


                &::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                    border-radius: 10px;
                    background-color: #F5F5F5;
                }

                &::-webkit-scrollbar {
                    border-radius: 10px;
                    width: 12px;
                    background-color: #F5F5F5;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
                    background-color: getColor($accents, primary);
                }
            }
        }

        .chat__form {
            display: flex;
            height: 100px;
            border: none;
            overflow: hidden;
            border-bottom-left-radius: 10px;
         
            padding: 25px 10px;

            @include media(min, xs) {
                padding: 25px 50px;
            }
  
            .form__input {
                height: 100%;
                padding: 0px 10px;
                width: 100%;
                font-size: 16px;
                border: none;
                border-radius: 10px;

            }

            .form__submit {
                position: relative;
                @extend %icon-btn;
                font-size: 26px;
                padding: 0px 20px;
                margin-left: 20px;
                border-radius: 10px;
                transition: transform .5s, color .5s;

                &:hover {
                    
                    transform: scale(1.1);
                }
            }
        }
    }
}


.dark-theme {
    .talks-view{
        .aside__header {
            .header__return-btn {
                color: getColor($darkTheme, fontColor);
            }
            .header__form {
                .form__search-input {
                    background-color: getColor($darkTheme, secondary);
                    color: getColor($darkTheme, fontColor);
                }
            }
        }
        .aside__section {
            .section__thread-list {
                .thread-list__title {
                    color: getColor($darkTheme, fontColor);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .thread-list__item {
                    color: getColor($darkTheme, fontColor);
                    background-color: getColor($darkTheme, secondary);

                    &--active {
                        background-color: getColor($accents, primary);
                        color: getColor($darkTheme, fontColor);
                    }
                }
            }
            .section__network-list {
                .network-list__item {
                    color: getColor($darkTheme, fontColor);
                    background-color: getColor($darkTheme, secondary);
                }
            }
        }

        &__chat {
            border: 1px solid rgba(255, 255, 255, 0.1);
            .chat__window  {
                .window__messages-list {
                    .messages-list__message {
                        .message__content {
                            color: getColor($accents, _white);
                        }
                        &--receiver {
                            .message__content {
                                background-color: getColor($accents, primary);
                            }
                        }
                         &--sender {
                            .message__content {
                                background-color: lighten(getColor($darkTheme, primary), 7%);
                            }
                         }
                    }
                }

            }
            .chat__form {
                .form__input {
                    background-color: getColor($darkTheme, secondary);
                    color: getColor($accents, _white);
                }
                .form__submit {
                    background-color: getColor($accents, primary);
                    color: getColor($accents, _white);
                    &:hover {
                        color: darken(getColor($accents, _white), 10%);
                    }
                }
            }
        }
    }
}

.light-theme {
    .talks-view{
        .aside__header {
            .header__return-btn {
                color: getColor($lightTheme, fontColor);
            }
            .header__form {
                .form__search-input {
                    background-color: getColor($lightTheme, primary);
                    color: getColor($lightTheme, fontColor);
                }
            }
        }
        .aside__section {
            .section__thread-list {
                .thread-list__title {
                    color: getColor($lightTheme, fontColor);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
                .thread-list__item {
                    color: getColor($lightTheme, fontColor);
                    background-color: getColor($lightTheme, primary);
                    


                    &--active {
                        background-color: getColor($accents, primary);
                        color: getColor($accents, _white);
                    }
                }
            }
            .section__network-list {
                .network-list__item {
                    color: getColor($lightTheme, fontColor);
                    background-color: getColor($lightTheme, primary);
                }
            }
        }

        &__chat {
            border: 1px solid rgba(0, 0, 0, 0.1);
            .chat__window  {
                .window__messages-list {
                    .messages-list__message {
                        .message__content {
                            color: getColor($accents, _white);
                        }
                        &--receiver {
                            .message__content {
                                background-color: getColor($accents, primary);
                            }
                        }
                         &--sender {
                            .message__content {
                                background-color: getColor($lightTheme, primary);
                                color: getColor($accents, _black);
                            }
                         }
                    }
                }
            }
            .chat__form {
                .form__input {
                    background-color: getColor($lightTheme, primary);
                    color: getColor($accents, _black);
                }
                .form__submit {
                    background-color: getColor($accents, primary);
                    color: getColor($accents, _white);
                    &:hover {
                        color: darken(getColor($accents, _white), 10%);
                    }
                }
            }
        }
    }
}

</style>