<template>
  <div class="view editProfile-view">
    <p>Edit Profile</p>



    <form class="editProfile__form" @submit.prevent="submitEdit" enctype="multipart/form-data">

        <div class="form__field">
            <input type="email" v-model="email">
        </div>

        <div class="form__field">
            <input type="text" v-model="firstname">
            <input type="text" v-model="lastname">
        </div>

        <img v-if="avatar" :src="`http://localhost:8000/${avatar}`" alt="">
        <div class="form__field form__field--dropzone">
            <input class="field__dropzone-input" multiple ref="file" @change="validateFile" type="file">
            <p class="dropzone__cta">Drag files here</p>
        </div>

        {{file.name}}

        <div class="form__field">
            <input type="password" v-model="password" placeholder="New password">
            <input type="password" v-model="repeatPassword" placeholder="Repeat new password">
        </div>

        <!-- {{img.name}} -->

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
            firstname: '',
            lastname: '',
            avatar: '',
            password: '',
            repeatPassword: '',
            file: {}
        }
  	},

    methods: {
		loadProfile: function(id) {
			axios({method: 'GET', url: `/api/user/profile/${id}`})
			.then(resp => {
                let user = resp.data;
        
                this.email = user.email;
                this.firstname = user.firstname;
                this.lastname = user.lastname;
                this.avatar = user.avatar;
               
                
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
        },


        async submitEdit() {
            let id = this.$route.query.id;
            const formData = new FormData();
            formData.append('email', this.email);
            formData.append('firstname', this.firstname);
            formData.append('lastname', this.lastname);

            
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
                console.log(res)
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

    .editProfile__form {
  
        .form__field {
            &--dropzone {
                width: 100%;
                position: relative;
                @include flexRow(center, center);
                min-height: 200px;
                padding: 10px 10px;
                cursor: pointer;
                outline: 2px dashed getColor($darkTheme, fontColor);
                background-color: getColor($accents, tertiary); 
                color: getColor($darkTheme, fontColor);
                outline-offset: -10px;

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
        }
    }
</style>