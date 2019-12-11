<template>
    <aside class="aside">
        <div class="aside__content">
            
            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE HEADER       															  -->
            <!-------------------------------------------------------------------------------------->
            <header class="content-header">
                <button class="content-header__burger-btn" @click="closeMenu"></button>
                <figure class="content-header__logo">
                    <router-link to="/Dashboard/Home">
                        <img src="/images/logo.png"> 
                    </router-link>
                </figure>
            </header>


            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE NAVIGATION   															  -->
            <!-------------------------------------------------------------------------------------->
            <nav class="content-nav">

                <!-------------------------------------------------------------------------------------->
                <!-- PERSONAL LIST            														  -->
                <!-------------------------------------------------------------------------------------->
                <ul class="content-nav__list content-nav__list--personal">
                    <li class="list__header">PERSONAL</li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Home"><i class="link__icon fas fa-home"></i>Home</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Movies"><i class="link__icon fas fa-film"></i>Movies</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Showcases"><i class="link__icon fas fa-photo-video"></i>Showcases</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Network"><i class="link__icon fas fa-users"></i>Network</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Talks"><i class="link__icon far fa-comment-dots"></i>Talks</router-link>
                    </li>
                </ul>

                <!-------------------------------------------------------------------------------------->
                <!-- PUBLIC LIST            														  -->
                <!-------------------------------------------------------------------------------------->
                <ul class="content-nav__list content-nav__list--public">
                    <li class="list__header">PUBLIC</li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Cinema"><i class="link__icon fas fa-play"></i>Cinema</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Community"><i class="link__icon fas fa-users"></i>Shortflix Community</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/News"><i class="link__icon fas fa-broadcast-tower"></i>News</router-link>
                    </li>
                </ul>

                <!-------------------------------------------------------------------------------------->
                <!-- ADMIN LIST            															  -->
                <!-------------------------------------------------------------------------------------->
                <ul class="content-nav__list content-nav__list--admin" v-if="user.role === 'Admin'">
                    <li class="list__header">ADMIN</li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/PendingUsers"><i class="link__icon fas fa-tools"></i>Pending users</router-link>
                    </li>
                </ul>
            </nav>

            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE FOOTER       															  -->
            <!-------------------------------------------------------------------------------------->
            <footer class="content-footer">
                <h4 class="content-footer__headline">Made in Denmark</h4>
                <p class="content-footer__subtext">- Home of the happy</p>
            </footer>


        </div>
    </aside>
</template>





<script>
/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'dashboardaside',
    props: {
		user: {
			//type: Array,
			required: true
		}
	},
    methods: {
        closeMenu: function() {
            document.querySelector('.header .header__burger-btn').classList.remove('header__burger-btn--active');
			document.querySelector('.aside .content-header__burger-btn').classList.remove('content-header__burger-btn--active');
			document.querySelector('.dashboard .aside').classList.remove('aside--active');
        }
    },
};
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    ASIDE
*\----------------------------------------------------------------------------------*/
.aside {
    position: fixed;
    height: 100%;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    transition-delay: .5s;
    transform: translateX(-100%);
    z-index: 10;
    @include media(min, md) {
        position: relative;
        width: auto;
        grid-row: 1 / -1;
        grid-column: 1;
        transform: translateX(0);         
        transition-delay: 0s;
    }
    /*----------------------------------------------------------------------------------*\
        ASIDE ACTIVE CLASS (MOBILE)
    *\----------------------------------------------------------------------------------*/
    &--active {
        // transition-delay: 0s;
        background-color: rgba(0, 0, 0, 0.3);
        transform: translateX(0);
        transition: background-color .5s linear 0s;
        .aside__content {
            transform: translateX(0);
            transition: transform .5s ease;
        }
    }
    /*----------------------------------------------------------------------------------*\
        ASIDE CONTENT
    *\----------------------------------------------------------------------------------*/
    &__content {
        @include flexColumn(flex-start, space-evenly);
        // position: fixed;
		width: 300px;
		height: 100%;
		z-index: 999;
		transform: translateX(-300px);
		transition: transform .5s ease, background-color $themeTransitionTime;
        @include media(min, md) {
			position: relative;
			width: auto;
			transform: translateX(0);
		}
        /*----------------------------------------------------------------------------------*\
            CONTENT HEADER
        *\----------------------------------------------------------------------------------*/
        .content-header {
            @include flexRow(center, flex-end);
            padding: 0px 20px;
            @include media(min, md) {
                @include flexRow(center, center);
            }
            &__burger-btn {
                @extend %burger-btn;
                opacity: 0;
                position: absolute;
                right: 5%;
                &--active {
                    @extend %burger-btn--active;
                    opacity: 1;
                }
                @include media(min, md) {
                    display: none;
                }
            }
            
            &__icon {
                display: none;
                font-size: 26px;
                margin-right: 20px;
                color: getColor($accents, primary);
                @include media(min, md) {
                    display: block;
                }
            }
            &__headline {
                display: none;
                font-size: 26px;
                @include media(min, md) {
                    display: block;
                }
            }
            
            &__logo img {
                width: 70%;
                height: auto;
            }
        }
        /*----------------------------------------------------------------------------------*\
            CONTENT NAVIGATION
        *\----------------------------------------------------------------------------------*/
        .content-nav {
            @include flexColumn(flex-start, null);

            &__list {
                padding-bottom: 20px;

                .list__header {
                    padding: 0 30px;
                }
                .list__item {
                    .item__link {
                        @include flexRow(center, null);
                        padding: 10px 30px;
                        border-left: 3px solid transparent;
                        transition: border-left-color $themeTransitionTime, color $themeTransitionTime;
    
                        &:hover {
                            transition: color $hoverTransitionTime;
                        }
                        .link__icon {
                            margin-right: 20px;
                            font-size: 18px;
                            width: 20px;   
                        }
                    }
                }
            }
        }
        /*----------------------------------------------------------------------------------*\
            CONTENT FOOTER
        *\----------------------------------------------------------------------------------*/
        .content-footer {
            color: getColor($accents, secondary);
            padding: 0px 30px;
        }
    }
}




/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
    .aside {
        &__content {
            background-color: getColor($darkTheme, secondary);

            .content-header { 
                &__headline {
                    color: getColor($accents, _white);
                }

                &__burger-btn {
                    color: getColor($accents, _white);
                }
            } 

            .content-nav {
                &__list {
                    .list__header {
                        color: getColor($darkTheme, fontColor);
                    }

                    .list__item {
                        color: getColor($darkTheme, fontColor);

                        .item__link {
                            color: getColor($darkTheme, fontColor);

                            &:hover {
                                color: getColor($accents, _white);
                            }
                        }

                        .router-link-active {
                            border-left-color: getColor($accents, primary);
                            color: getColor($accents, primary);

                            &:hover {
                                color: getColor($accents, primary);
                            }
                        }
                    }
                }
            }
        }
    }
}


/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
    .aside {
        &__content {
            background-color: getColor($lightTheme, primary);

            .content-header { 
                
                &__headline {
                    color: getColor($accents, _black);
                }

                &__burger-btn {
                    color: getColor($accents, _black);
                }
            } 

            .content-nav {
                &__list {
                    .list__header {
                        color: getColor($lightTheme, fontColor);
                    }

                    .list__item {
                        color: getColor($lightTheme, fontColor);

                        .item__link {
                            color: getColor($lightTheme, fontColor);

                            &:hover {
                                color: getColor($accents, primary);
                            }
                        }

                        .router-link-active {
                            border-left-color: getColor($accents, primary);
                            color: getColor($accents, primary);

                            &:hover {
                                color: getColor($accents, primary);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>