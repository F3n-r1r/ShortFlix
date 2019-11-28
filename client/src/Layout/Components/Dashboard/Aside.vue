<template>
    <aside class="aside">
        <div class="aside__content">
            
            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE HEADER       															  -->
            <!-------------------------------------------------------------------------------------->
            <header class="content-header">
                <button class="content-header__burger-btn" @click="closeMenu"></button>
                <i class="content-header__icon fas fa-camera"></i>
                <h1 class="content-header__headline">ShortFlix</h1>
            </header>


            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE NAVIGATION   															  -->
            <!-------------------------------------------------------------------------------------->
            <nav class="content-nav">
                <ul class="content-nav__list">
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/DashboardHome"><i class="link__icon fas fa-film"></i>Home</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Movies"><i class="link__icon fas fa-film"></i>Movies</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Talks"><i class="link__icon far fa-comment-dots"></i>Talks</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Network"><i class="link__icon fas fa-users"></i>Network</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Community"><i class="link__icon fas fa-users"></i>Community</router-link>
                    </li>
                    <li class="list__item" v-if="user.role === 'Admin'">
                        <router-link class="item__link" to="/Dashboard/Admin"><i class="link__icon fas fa-tools"></i>Admin</router-link>
                    </li>
                </ul>
            </nav>


            <!-------------------------------------------------------------------------------------->
            <!-- ASIDE FOOTER       															  -->
            <!-------------------------------------------------------------------------------------->
            <footer class="content-footer">
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
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    transition-delay: .5s;
    transform: translateX(-100%);
    z-index: 9999;

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
        display: grid;
        grid-template-rows: 100px auto 100px;
        position: fixed;
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
            grid-row: 1;

            @include media(min, md) {
                @include flexRow(center, center);
            }

            &__burger-btn {
                @extend %burger-btn;
                margin-top: 8px;
                opacity: 0;

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
            grid-row: 2;

            &__list {
                .list__item {
                    .item__link {
                        @include flexRow(center, null);
                        padding: 15px 30px;
                        border-left: 3px solid transparent;
                        transition: border-left-color $themeTransitionTime, color $themeTransitionTime;
    
                        &:hover {
                            transition: color $hoverTransitionTime;
                        }

                        .link__icon {
                            margin-right: 20px;
                            font-size: 22px;
                            width: 30px;   
                        }
                    }
                }
            }
        }


        /*----------------------------------------------------------------------------------*\
            CONTENT FOOTER
        *\----------------------------------------------------------------------------------*/
        .content-footer {
            position: relative;
            padding: 0px 30px;
            grid-row: 3;   
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
                    .list__item {
                        color: getColor($lightTheme, fontColor);

                        .item__link {
                            color: getColor($lightTheme, fontColor);

                            &:hover {
                                color: getColor($accents, _black);
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