<template>
    <aside class="aside" id="aside">
        
        <!-------------------------------------------------------------------------------------->
		<!-- ASIDE HEADER       															  -->
		<!-------------------------------------------------------------------------------------->
        <header class="aside-header">
            <button class="aside-header__burger-btn" @click="closeMenu"></button>
            <i class="aside-header__icon fas fa-camera"></i>
            <h1 class="aside-header__headline">ShortFlix</h1>
        </header>


        <!-------------------------------------------------------------------------------------->
		<!-- ASIDE NAVIGATION   															  -->
		<!-------------------------------------------------------------------------------------->
        <nav class="aside-nav">
            <ul class="aside-nav__list">
                <li class="list__item">
                    <router-link class="item__link" to="/Dashboard/Profile"><i class="link__icon far fa-user"></i>Profile</router-link>
                </li>
                <li class="list__item">
                    <router-link class="item__link" to="/Dashboard/Movies"><i class="link__icon fas fa-film"></i>Movies</router-link>
                </li>
                <li class="list__item" v-if="user.role === 'Admin'">
                    <router-link class="item__link" to="/Dashboard/Admin"><i class="link__icon fas fa-tools"></i>Admin</router-link>
                </li>
            </ul>
        </nav>


        <!-------------------------------------------------------------------------------------->
		<!-- ASIDE FOOTER       															  -->
		<!-------------------------------------------------------------------------------------->
        <footer class="aside-footer">
        </footer>

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
			document.querySelector('.aside .aside-header__burger-btn').classList.remove('aside-header__burger-btn--active');
			document.querySelector('.dashboard .dashboard__aside').classList.remove('dashboard__aside--active');
        }
    },
};
</script>





<style lang="scss">
/*----------------------------------------------------------------------------------*\
    ASIDE
*\----------------------------------------------------------------------------------*/
.aside {
    display: grid;
    grid-template-rows: 100px auto 100px;
    transition: background-color $themeTransitionTime, transform 1s;


    /*----------------------------------------------------------------------------------*\
        HEADER
    *\----------------------------------------------------------------------------------*/
    &-header {
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
        NAVIGATION
    *\----------------------------------------------------------------------------------*/
    &-nav {
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
        FOOTER
    *\----------------------------------------------------------------------------------*/
    &-footer {
        position: relative;
        padding: 0px 30px;
        grid-row: 3;   
    }
}


/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
    .aside {
        background-color: getColor($darkTheme, secondary);

        &-header { 
            &__headline {
                color: getColor($accents, _white);
            }
        } 

        &-nav {
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


/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
    .aside {
        background-color: getColor($lightTheme, primary);

        &-header { 
            &__headline {
                color: getColor($accents, _black);
            }
        } 

        &-nav {
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
</style>