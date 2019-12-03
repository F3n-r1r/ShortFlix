<template>
    <div class="upload">
            
            <!-------------------------------------------------------------------------------------->
            <!-- ??      															  -->
            <!-------------------------------------------------------------------------------------->
            <form v-if="!uploading && !uploadComplete" @submit.prevent="sendFile" class="upload__form" enctype="multipart/form-data">
                <div class="form__field">
                    <input class="field__input" v-model="title" type="text" placeholder="Movie title..." required>
                </div>
                <div class="form__field">
                    <textarea class="field__textarea" v-model="description" name="" placeholder="Movie description..." required/>
                </div>
                <p class="form__info">
                    * Upload your movie along with the related movie poster below. The poster is a requirement.
                </p>
                <div class="form__dropzone">
                    <input multiple ref="files" @change="selectFile" type="file" class="dropzone__input">
                    <p class="dropzone__cta">Drag files here</p>
                </div>

                <div v-for="(file, index) in files" :key="index" :class="`form__files form__files--${file.invalidMessage ? 'error' : 'success'}`">
                    <p>{{file.name}} <span v-if="file.invalidMessage">- ({{file.invalidMessage}})</span></p>
                    <button class="files__delete" @click.prevent="files.splice(index, 1);uploadFiles.splice(index, 1)">X</button>
                </div>

                <div v-if="message && !uploadComplete">
                    {{message}}
                </div>


                <button v-if="uploadRdy" class="form__submit" type="submit">Upload</button>
            </form>


          
            <progress v-if="uploading" class="dropzone__progress" :value="progress" max="100">
                {{progress}}
            </progress>
            

            <div v-if="message && uploadComplete">
                {{message}}
            </div>



    </div>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import axios from 'axios';
import _ from 'lodash';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    props: {
        resetUpload: Boolean
},
    data() {
        return {
            title: '',
            description: '',
            files: [],
            uploadFiles: [],
            message: '',
            error: false,
            uploading: false,
            uploadComplete: false,
            progress: 0, 
            uploadRdy: false   
        }
    },
    methods: {
        selectFile() {
            const files = this.$refs.files.files;
            this.uploadFiles = [...this.uploadFiles, ...files];

            this.files = [
                ...this.files,
                ..._.map(files, file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    invalidMessage: this.validate(file)
                }))
            ]
        },

        validate(file) {
            const MAX_SIZE = 2000000000000;
            const allowedTypes = ["video/quicktime", "image/jpeg", "image/png"]; 

            if(file.size > MAX_SIZE) {
                return `Max size: ${MAX_SIZE/1024}Kb`;
            }

            if(!allowedTypes.includes(file.type)) {
                return "This format is not allowed";
            }

            return "";
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('creator', this.$store.getters.user._id);
            _.forEach(this.uploadFiles, file => {
                if(this.validate(file) === "") {
                    formData.append('files', file);
                }
            })
           
            try {
                this.uploading = true;
                const res = await axios.post('/api/video/upload', formData, {
                    onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
                })
                console.log(res)
                this.message = "Files has been uploaded"
                this.file = "";
                this.error = false;
                this.uploading = false;
                this.uploadComplete = true;
            } catch(err) {
                this.message = err.response.data.error;
                this.error = true;
                this.uploading = false;
                this.uploadComplete = false;
            }
        }
    },
    watch: {
        files() {
            const videos = ["video/quicktime"]; 
            const images = ["image/jpeg", "image/png"];
            let containMovie = false;
            let containImg = false;
            if(this.files.length > 2) {
                this.message = "You need to only upload 1 video and 1 image"
                return;
            }

            for(let i = 0; i < this.files.length; i++) {    
                let testImg = images.includes(this.files[i].type);
                let testVid = videos.includes(this.files[i].type);
                if(testImg) {
                    containImg = true;
                }
                if(testVid) {
                    containMovie = true;
                }
            }

            if(containMovie && containImg) {
                
                this.uploadRdy = true;
            }
            this.message = "";
        },

        resetUpload() {
            if(this.resetUpload) {
                this.title = ''
                this.description = ''
                this.files = []
                this.uploadFiles = []
                this.message = ''
                this.error = false
                this.uploading = false
                this.uploadComplete = false
                this.progress = 0,
                this.uploadRdy = false  
            }
        }
    }
};
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    UPLOAD
*\----------------------------------------------------------------------------------*/
.upload {

    &__form {
        @include flexColumn(center, center);
        min-width: 500px;

        .form__field {
            width: 100%;
            margin-bottom: 10px;

            .field__input {
                width: 100%;
                padding: 10px 10px;
            }

            .field__textarea {
                width: 100%;
                resize: none;
                height: 150px;
                padding: 10px 10px;
            }
        }

        .form__info {
            color: getColor($darkTheme, fontColor);
            font-size: 12px;
            margin-bottom: 5px;
        }

        .form__dropzone {
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

            .dropzone__input {
                position: absolute;
                opacity: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }

            .dropzone__cta {

            }

            .dropzone__progress {
                
            }
        }

        .form__files {
            @include flexRow(center, space-between);
            padding: 5px;
            margin-top: 5px;
            width: 100%;
            color: getColor($darkTheme, fontColor);

            &--success {
                color: getColor($accents, tertiary); 
            }

            &--error {
                color: getColor($accents, primary);
            }

            .files__delete {
                @extend %icon-btn;
                color: getColor($darkTheme, fontColor);
                font-size: 16px;

                &:hover {
                    color: getColor($accents, primary);
                }
            }
        }

        .form__submit {
            @extend %secondary-btn;
            margin-top: 20px;

        }
    }
}
</style>