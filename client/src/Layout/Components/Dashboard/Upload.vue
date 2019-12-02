<template>
    <div class="upload">
            
            <!-------------------------------------------------------------------------------------->
            <!-- ??      															  -->
            <!-------------------------------------------------------------------------------------->
            
            <form @submit.prevent="sendFile" class="upload__form" enctype="multipart/form-data">
                <div class="form__dropzone">
                    <input ref="file" @change="selectFile" type="file" class="dropzone__input">
                    <p v-if="!uploading" class="dropzone__cta">Drag files here</p>
                    
                </div>
                <button type="submit">Upload</button>

            </form>

          
            <progress v-if="uploading" class="dropzone__progress" :value="progress" max="100">
                {{progress}}
            </progress>
                
           
            
            <div if="file">{{file.name}}</div>

            <div v-if="message" :class="`message-${error ? 'error' : 'succes'}`">
                {{message}}
            </div>

    </div>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import axios from 'axios';


/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'upload',
    data() {
        return {
            file: '',
            message: '',
            error: false,
            uploading: false,
            uploadedFiles: [],
            progress: 0
        }
    },
    methods: {
        selectFile() {

            const file = this.$refs.file.files[0];
            console.log(file.type)
            const allowedTypes = ["video/quicktime"]; // "image/jpeg", "image/png", "image/gif", 
            const MAX_SIZE = 2000000000000;
            const tooLarge = file.size > MAX_SIZE;

            if(allowedTypes.includes(file.type) && !tooLarge) {
                this.file = file;
                this.error = false;
                this.message = "";
            } else {
                this.error = true;
                this.message = tooLarge ? `The file is too large. Maz size is ${MAX_SIZE/1000}Kb` : "Only images are allowed"
            }
        },
        async sendFile() {
            const formData = new FormData();
            formData.append('file', this.file);

            try {
                this.uploading = true;
               const res = await axios.post('/api/video/upload', formData, {
                   onUploadProgress: e => this.progress = Math.round(e.loaded * 100 / e.total)
               })
               this.uploadedFiles.push(res.data.file)
                this.message = "File has been uploaded"
                this.file = "";
                this.error = false;
                this.uploading = false;
            } catch(err) {
                this.message = err.response.data.error;
                this.error = true;
                this.uploading = false;
            }
        }
    },
};
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    UPLOAD
*\----------------------------------------------------------------------------------*/
.upload {

    &__form {
        min-width: 500px;

        .form__dropzone {
            position: relative;
            @include flexRow(center, center);
            min-height: 200px;
            padding: 10px 10px;
            cursor: pointer;
            outline: 2px dashed grey;
            background-color: lightcyan;
            color: dimgrey;
            outline-offset: -10px;

            &:hover {
                background-color: lightblue;
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
    }
}
</style>