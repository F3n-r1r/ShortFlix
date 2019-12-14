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
                        <figure class="logo-file">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            width="200px"  viewBox="0 0 538.6 111.4" style="enable-background:new 0 0 538.6 111.4;" xml:space="preserve">
                            <g>
                                <path class="st0" d="M47.3,66.9c0-3.3-1.2-5.8-3.5-7.6c-2.3-1.8-6.5-3.6-12.5-5.6c-6-1.9-10.8-3.9-14.3-5.8
                                    C7.4,42.8,2.6,35.9,2.6,27.1c0-4.6,1.3-8.6,3.9-12.2c2.6-3.6,6.3-6.4,11.1-8.4c4.8-2,10.2-3,16.2-3c6,0,11.4,1.1,16.1,3.3
                                    c4.7,2.2,8.4,5.3,11,9.2c2.6,4,3.9,8.5,3.9,13.6H47.3c0-3.9-1.2-6.9-3.6-9c-2.4-2.1-5.8-3.2-10.2-3.2c-4.2,0-7.5,0.9-9.9,2.7
                                    c-2.4,1.8-3.5,4.2-3.5,7.1c0,2.7,1.4,5,4.1,6.9c2.8,1.9,6.8,3.6,12.2,5.2c9.9,3,17.1,6.7,21.6,11.1s6.8,9.9,6.8,16.4
                                    c0,7.3-2.8,13-8.3,17.2c-5.5,4.2-13,6.2-22.3,6.2c-6.5,0-12.4-1.2-17.7-3.6C11.1,84.2,7,81,4.2,76.8C1.4,72.7,0,67.9,0,62.5h17.4
                                    c0,9.3,5.6,14,16.7,14c4.1,0,7.4-0.8,9.7-2.5C46.1,72.2,47.3,69.9,47.3,66.9z"/>
                                <path class="st0" d="M97.6,33.2c4.4-5.3,10-8,16.7-8c13.6,0,20.5,7.9,20.7,23.7v24.7h-16.7V49.3c0-3.6-0.8-6.2-2.3-8
                                    c-1.5-1.7-4.1-2.6-7.7-2.6c-4.9,0-8.5,1.9-10.7,5.7v29.1H80.9V0.1h16.7V33.2z"/>
                                <path class="st0" d="M151,57.1c0-6.2,1.2-11.8,3.6-16.6c2.4-4.9,5.8-8.6,10.3-11.3c4.5-2.7,9.7-4,15.7-4c8.5,0,15.4,2.6,20.7,7.8
                                    c5.3,5.2,8.3,12.2,8.9,21.1l0.1,4.3c0,9.6-2.7,17.3-8,23.1c-5.4,5.8-12.6,8.7-21.6,8.7c-9,0-16.2-2.9-21.6-8.7S151,67.8,151,57.8
                                    V57.1z M167.7,58.3c0,6,1.1,10.5,3.4,13.7c2.2,3.2,5.4,4.7,9.6,4.7c4.1,0,7.2-1.6,9.5-4.7c2.3-3.1,3.4-8.1,3.4-14.9
                                    c0-5.8-1.1-10.4-3.4-13.6c-2.3-3.2-5.5-4.8-9.6-4.8c-4.1,0-7.3,1.6-9.5,4.8C168.8,46.7,167.7,51.6,167.7,58.3z"/>
                                <path class="st0" d="M261.7,42c-2.3-0.3-4.3-0.5-6-0.5c-6.3,0-10.5,2.1-12.4,6.4v25.6h-16.7V26.3h15.8l0.5,7.5
                                    c3.4-5.8,8-8.6,14-8.6c1.9,0,3.6,0.3,5.2,0.8L261.7,42z"/>
                                <path class="st0" d="M298.7,10.9v15.4h10.7v12.3h-10.7v31.3c0,2.3,0.4,4,1.3,5c0.9,1,2.6,1.5,5.1,1.5c1.9,0,3.5-0.1,4.9-0.4v12.7
                                    c-3.3,1-6.7,1.5-10.1,1.5c-11.7,0-17.7-5.9-18-17.8V38.6h-9.1V26.3h9.1V10.9H298.7z"/>
                                <path class="st0" d="M409.4,89h-10.7V0.1h10.7V89z"/>
                                <path class="st0" d="M432.5,9.7c0-1.7,0.5-3.2,1.6-4.4c1.1-1.2,2.6-1.8,4.7-1.8c2.1,0,3.7,0.6,4.7,1.8c1.1,1.2,1.6,2.7,1.6,4.4
                                    s-0.5,3.2-1.6,4.3c-1.1,1.2-2.7,1.7-4.7,1.7c-2.1,0-3.7-0.6-4.7-1.7C433.1,12.9,432.5,11.5,432.5,9.7z M444.1,89h-10.7V26.3h10.7
                                    V89z"/>
                                <g>
                                    <path class="st0" d="M345.9,90.2V35.8H336v-8.3h9.9v-6.4c0-6.7,1.8-11.9,5.4-15.6c3.6-3.7,8.7-5.5,15.2-5.5c2.5,0,4.9,0.3,7.4,1
                                        l-0.6,8.6c-1.8-0.3-3.7-0.5-5.8-0.5c-3.5,0-6.2,1-8,3.1c-1.9,2-2.8,4.9-2.8,8.7v6.6h13.4v8.3h-13.4v54.4H345.9z"/>
                                </g>
                                <path class="st0" d="M487.3,47.9l38.8-47.8h12.5L493.2,56l44.9,55.4h-12.4l-38.2-47.2L473,87.7h-12.4L481.7,56l-20.5-31h12.4
                                    L487.3,47.9z"/>
                            </g>
                            </svg>
                        </figure>
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

                &__logo {
                    .logo-file {
                        fill: getColor($accents, secondary);
                    }
                }

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

            .content-footer {
                color: getColor($accents, secondary);
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

                &__logo {
                    .logo-file {
                        fill: getColor($lightTheme, tertiary);
                    }
                }
                
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

            .content-footer {
                color: getColor($accents, secondary);
            }
        }
    }
}
</style>