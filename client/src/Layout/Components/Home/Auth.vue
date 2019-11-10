<template>
    <div class="auth-container" id="auth-container">

        <!-------------------------------------------------------------------------------------->
		<!-- SIGN IN FORM       															  -->
		<!-------------------------------------------------------------------------------------->
        <div class="form-container sign-in-container">
            <form class="form sign-in-form" @submit.prevent="register">
                <h1>Sign Up</h1>
                <div class="form-group">
                    <label class="form-group__label" for="register-firstname">Firstname</label>
                    <input class="form-group__input" id="register-firstname" @focus="inputFocus" @blur="inputDeFocus" required v-model="register_firstname" name="firstname" type="text"/>
                </div>
                <div class="form-group">
                    <label class="form-group__label" for="register-lastname">Lastname</label>
                    <input class="form-group__input" id="register-lastname" @focus="inputFocus" @blur="inputDeFocus" required v-model="register_lastname" name="lastname" type="text"/>
                </div>
                <div class="form-group">
                    <label class="form-group__label" for="register-email">Email</label>
                    <input class="form-group__input" id="register-email" @focus="inputFocus" @blur="inputDeFocus" required v-model="register_email" name="email" type="email"/>
                </div>
                <div class="form-group">
                    <label class="form-group__label" for="register-password">Password</label>
                    <input class="form-group__input" id="register-password" @focus="inputFocus" @blur="inputDeFocus" required v-model="register_password" name="password" type="password"/>
                </div>
                <div class="form-group">
                    <label class="form-group__label" for="register-password-confirmation">Confirm Password</label>
                    <input class="form-group__input" id="register-password-confirmation" @focus="inputFocus" @blur="inputDeFocus" required v-model="register_password_confirmation" name="confirm-password" type="password"/>
                </div>
                <button class="form-btn" type="submit">Submit</button>
            </form>
        </div>


        <!-------------------------------------------------------------------------------------->
		<!-- LOGIN FORM         															  -->
		<!-------------------------------------------------------------------------------------->
        <div class="form-container login-container">
            <form class="form login-form" @submit.prevent="login">
                <h1>Sign In</h1>
                <div class="form-group">
                    <label class="form-group__label" for="sign-in-email">Email</label>
                    <input class="form-group__input" id="sign-in-email" @focus="inputFocus" @blur="inputDeFocus" required v-model="login_email" name="email" type="email"/>
                </div>
                <div class="form-group">
                    <label class="form-group__label" for="sign-in-password">Password</label>
                    <input class="form-group__input" id="sign-in-password" @focus="inputFocus" @blur="inputDeFocus" required v-model="login_password" name="password" type="password"/>
                </div>
                <button class="form-btn" type="submit">Login</button>
            </form>
        </div>


        <!-------------------------------------------------------------------------------------->
		<!-- OVERLAY        																  -->
		<!-------------------------------------------------------------------------------------->
        <div class="overlay-container">
            <div class="overlay">
                <!-- LOGIN OVERLAY -->
                <div class="overlay__panel overlay__left">
                    <h1 class="panel__headline">Hello, Friend!</h1>
                    <p class="panel__text">Click here to if you do not have an account</p>
                    <button class="panel__btn" @click="togglePanel">Sign Up</button>
                </div>

                <!-- SIGN IN OVERLAY -->
                <div class="overlay__panel overlay__right">
                    <h1 class="panel__headline">Welcome Back!</h1>
                    <p class="panel__text">Click here if you already have an account</p>
                    <button class="panel__btn" @click="togglePanel">Sign In</button>
                </div>
            </div>
        </div>

 
    </div>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'Auth',

    /*----------------------------------------------------------------------------------*\
		DATA
	*\----------------------------------------------------------------------------------*/
    data() {
        return {
            register_email: '',
            register_password: '',
            register_password_confirmation: '',
            register_firstname: '',
            register_lastname: '',
            login_email: '',
            login_password: '',
        }
    },

    /*----------------------------------------------------------------------------------*\
		METHODS
	*\----------------------------------------------------------------------------------*/
    methods: {
        register: function() {
            let data = {
                email: this.register_email,
                password: this.register_password,
                firstname: this.register_firstname,
                lastname: this.register_lastname
            }
            let passwordConfirm = this.register_password_confirmation;
            if(data.password == passwordConfirm) {
                this.$store.dispatch('register', data)
                .then(() => 
                    this.$router.push('/Dashboard/Profile')
                )
                .catch(err => console.log(err))
            } else {
                console.log('passwords does not match');
            }
        },
        login: function() {
            let data = {
                email: this.login_email,
                password: this.login_password
            }
            this.$store.dispatch('login', data)
            .then((res) => {
                if(res == 'Incorrect password' || res == 'Incorrect email') {
                    this.login_error = res;
                } else {
                    this.$router.push('/Dashboard/Profile')
                }
            })
            .catch(err => console.log(err))
        },
        togglePanel() {
            const cont = document.querySelector('.auth-container');
            if (cont.classList) {
                cont.classList.toggle("panel-active");
            } else {
                // For IE9
                let classes = cont.className.split(" ");
                let i = classes.indexOf("panel-active");
                if (i >= 0) {
                    classes.splice(i, 1);
                } else {
                    classes.push("panel-active");
                    cont.className = classes.join(" ");
                }
            }
        },
        inputFocus(e) {
            const siblingLabel = e.currentTarget.parentNode.querySelector('.form-group__label');
            siblingLabel.classList.add('form-group__focus');
        },
        inputDeFocus(e) {
            const siblingLabel = e.currentTarget.parentNode.querySelector('.form-group__label');
            if(!e.currentTarget.value.trim()) {
                siblingLabel.classList.remove('form-group__focus');
            }
        }
    }
}
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    AUTHENTICATION CONTAINER
*\----------------------------------------------------------------------------------*/
.auth-container {
    position: relative;
	background-color: getColor($accents, _white);
	overflow: hidden;
	width: 768px;
    min-height: 480px;
    user-select: none;
    

    /*----------------------------------------------------------------------------------*\
        FORMS
    *\----------------------------------------------------------------------------------*/
    .form-container {
        position: absolute;
	    top: 0;
	    height: 100%;
        transition: all 0.6s ease-in-out;

        .form {
            @include flexColumn(center, center);
            height: 100%;
            padding: 0px 30px;
            text-align: center;
            background-color: getColor($accents, _white);
            transition: all 0.6s ease-in-out;

            &-group {
                position: relative;
                margin-top: 20px;
                width: 100%;

                &__focus {
                    transform: translate(25%, -125%) !important;
                    font-size: 90%;
                }

                &__label {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    padding: 5px 5px;
                    background-color: getColor($accents, _white);
                    z-index: 1;
                    font-size: 12px;
                    transform: translate(10%, -50%);
                    transition: transform 150ms ease-out, font-size 150ms ease-out;
                }

                &__input {
                    position: relative;
                    width: 100%;
                    padding: 10px 10px;
                    outline: 0;
                    background-color: getColor($accents, _white);
                    border-radius: 5px;
                    border: 1px solid getColor($accents, primary);
                }
            }

            &-btn {
                @extend %primary-btn;
                margin-top: 20px;
            }
        }
    }


    /*----------------------------------------------------------------------------------*\
        SIGN IN CONTAINER/FORM
    *\----------------------------------------------------------------------------------*/
    .sign-in-container {
        left: 0;
        width: 50%;
        z-index: 1;

        .form {
            opacity: 1;
            transition-delay: opacity 1s;
        }
    }


    /*----------------------------------------------------------------------------------*\
        LOGIN CONTAINER/FORM
    *\----------------------------------------------------------------------------------*/
    .login-container {
        left: 0;
        width: 50%;
        opacity: 0;

        .form {
            opacity: 0;
            transition-delay: opacity 1s;
        }
    }


    /*----------------------------------------------------------------------------------*\
        OVERLAY
    *\----------------------------------------------------------------------------------*/
    .overlay-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: transform 0.6s ease-in-out;
        z-index: 100;

        .overlay {
            position: relative;
            background: getColor($accents, primary);
            background: linear-gradient(to right, getColor($accents, secondary), getColor($accents, primary));
            left: -100%;
            height: 100%;
            width: 200%;
            transform: translateX(0);
            transition: transform 0.6s ease-in-out;

            &__panel {
                position: absolute;
                @include flexColumn(center, center);
                padding: 0 40px;
                text-align: center;
                top: 0;
                height: 100%;
                width: 50%;
                transform: translateX(0);
                transition: transform 0.6s ease-in-out;

                .panel__headline {
                    font-size: 36px;
                    color: getColor($accents, _white);
                    margin-bottom: 10px;
                    
                }
                .panel__text {
                    font-size: 16px;
                    color: getColor($accents, _white);
                    margin-bottom: 20px;
                }

                .panel__btn {
                    @extend %secondary-btn;
                }
            }
            
            &__right {
                right: 0;
                transform: translateX(0);
            }

            &__left {
                left: 0;
                transform: translateX(-20%);
            }
        }
    }
}


/*----------------------------------------------------------------------------------*\
    PANEL ACTIVE
*\----------------------------------------------------------------------------------*/
.panel-active {
    .login-container {
        transform: translateX(100%);
        opacity: 1;
        z-index: 2;

        .form {
            opacity: 1;
            transition-delay: opacity 1s;
        }
    }
    .sign-in-container {
        transform: translateX(100%);
        opacity: 0;

        .form {
            opacity: 0;
            transition-delay: opacity 1s;
        }
    }

    .overlay-container {
        transform: translateX(-100%);

        .overlay {
            transform: translateX(50%);
            
            &__right {
                transform: translateX(20%);
            }

            &__left {
                transform: translateX(0);
            }
        }
    }
}
</style>
