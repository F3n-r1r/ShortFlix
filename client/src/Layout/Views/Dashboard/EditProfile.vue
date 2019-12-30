<template>
  <div class="view editProfile-view">


    <form class="editProfile__form" @submit.prevent="submitEdit" enctype="multipart/form-data">

        <div class="form__row">
            <img class="row__avatar" v-if="avatar" :src="`${baseURL}${avatar}`" alt="">
            <div class="form__field form__field--dropzone">
                <input class="field__dropzone-input" multiple ref="file" @change="validateFile" type="file">
                <p class="dropzone__cta">Drag new avatar here...</p>
            </div>
            <p v-if="file.name" class="row__file-name">{{ file.name}}</p>
        </div>

        <div class="form__field">
            <textarea class="field__textarea" placeholder="Write your biography..." v-model="biography"></textarea>
        </div>

        <div class="form__field form__field--email">
            <input class="field__input" type="email" v-model="email">
        </div>

        <div class="form__field form__field--password">
            <input class="field__input" type="password" v-model="password" placeholder="New password">
            <input class="field__input" type="password" v-model="repeatPassword" placeholder="Repeat new password">
        </div>

        <button class="form__submit" type="submit">Submit Changes</button>
    </form>




  </div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'EditProfile',
	components: {

	},
	data() {
        return {
            user: {},
            email: '',
            avatar: '',
            biography: '',
            password: '',
            repeatPassword: '',
            file: {},
            baseURL: this.$store.state.baseURL
        }
  	},

    methods: {
		loadProfile: function(id) {
			axios({method: 'GET', url: `/api/user/profile/${id}`})
			.then(resp => {
                let user = resp.data;
        
                this.email = user.email;
                this.avatar = user.avatar;
                this.biography = user.biography;
               
                console.log(user)
			}).catch(err => {
				throw(err)
			})
        },
        validateFile: function() {
            const file = this.$refs.file.files[0];
            
            const MAX_SIZE = 200000000000;
            const allowedTypes = ["image/jpeg", "image/png"]; 

            if(file.size > MAX_SIZE) {
                return `Max size: ${MAX_SIZE/1024}Kb`;
            }

            if(!allowedTypes.includes(file.type)) {
                return "This format is not allowed";
            }
            
            this.file  = file;
            //console.log(this.file)
        },


        async submitEdit() {
            let id = this.$route.query.id;
            const formData = new FormData();
            formData.append('email', this.email);
            formData.append('biography', this.biography);
            
            if(this.file.size > 0 && this.file != undefined) {
                formData.append('file', this.file);
            }
            
            if(this.password && this.repeatPassword) {
                if(this.password === this.repeatPassword) {
                    formData.append('password', this.password);
                } else {
                    return 'Passwords do not match';
                }
            }
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }

            await axios.post(`/api/user/profile/edit/${id}`, formData)
            .then(resp => {
                console.log(resp)
                this.email = resp.data.email;
                this.biography = resp.data.biography;
                this.avatar = resp.data.avatar;
            }).catch(err => {
                throw(err)
            })
        }
	},
	mounted() {
		this.loadProfile(this.$route.query.id);
	}
}
</script>


<style lang="scss">
.editProfile-view {
    padding: 20px;
}

    .editProfile__form {
        @include flexColumn(null, center);

        .form__row {
            @include flexColumn(center, null);
            
            @include media(min, xs) {
                @include flexRow(center, null);
                flex-wrap: wrap;
            }

            .row__avatar {
                width: 100px;
                height: 100px;
                border-radius: 50px;
                margin-right: 0px;

                @include media(min, xs) {
                    margin-right: 50px;
                }
            }

            .row__file-name {
                margin: 15px 0px 0px 0px;
                width: 100%;
                background: getColor($accents, tertiary);
                padding: 5px;
                color: getColor($accents, _black);
            }
        }
  
        .form__field {
            width: 100%;

            .field__input {
                width: 100%;

                @include media(min, xs) {
                    width: auto;
                }
            }

            .field__textarea {
                width: 100%;
                margin-top: 15px;
                height: 100px;
                padding: 10px;
            }

            &--dropzone {
                width: 100%;
                position: relative;
                @include flexRow(center, center);
                min-height: 100px;
                margin-top: 20px;
                padding: 10px 10px;
                cursor: pointer;
                outline: 2px dashed getColor($darkTheme, fontColor);
                background-color: getColor($accents, tertiary); 
                color: getColor($darkTheme, fontColor);
                outline-offset: -10px;

                @include media(min, xs) {
                    width: calc(100% - 150px);
                    min-height: 150px;
                    margin-top: 0px;
                }

                &:hover {
                    background-color: lighten(getColor($accents, tertiary), 5%);
                }

                .field__dropzone-input {
                    position: absolute;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
            }

            &--email {
                margin-top: 15px;

                .field__input {
                    width: 100%;
                    padding: 8px 12px;

                    @include media(min, xs) {
                        width: 100%;
                    }
                }
            }

            &--password {
                margin-top: 15px;

                .field__input {
                    width: 100%; 
                    padding: 8px 12px;

                    @include media(min, xs) {
                        width: calc(50% - 5px);
                    }

                    &:last-child {
                        margin-top: 15px;

                        @include media(min, xs) {
                            margin-top: 0px;
                        }
                    }

                    &:first-child {
                        margin-right: 10px;
                    }
                }
            }
        }

        .form__submit {
            margin-top: 15px;
            @extend %primary-btn;
        }
    }
</style>