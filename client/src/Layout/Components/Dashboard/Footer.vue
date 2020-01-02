<template>
    <footer class="footer" v-if="$route.name != 'Talks' ">
        <div class="footer__content">
            <div class="content-nav">
                <ul class="content-nav__list content-nav__list--left">
                    <li class="list__header">Shortflix</li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Home">Prices</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Home">Upload</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Sitemap">Site Map</router-link>
                    </li>
                </ul>
                <ul class="content-nav__list content-nav__list--middle">
                    <li class="list__header">Features</li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Movies">Movie Player</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Showcases">Showcases</router-link>
                    </li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/Community">Collaboration</router-link>
                    </li>
                </ul>

                <ul class="content-nav__list content-nav__list--right">
                    <li class="list__header">Company</li>
                    <li class="list__item">
                        <router-link class="item__link" to="/Dashboard/News">About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'dashboard-footer'
}
</script>

<style lang="scss">
.footer {
    width: 100%;

    &__content {
        padding-left: 20%;
        padding-top: 50px;
        display: block;

        .list__header {
            padding-bottom: 10px;
            font-size: 18px;
            color: getColor($accents, secondary);
        }

        .list__item {
            padding-bottom: 8px;
            font-size: 12px;
            color: getColor($accents, secondary);

            .item__link {
                @include flexRow(center, null);
                transition: border-left-color $themeTransitionTime, color $themeTransitionTime;
                
                &:hover {
                    transition: color $hoverTransitionTime;
                    color: getColor($accents, tertiary);
                }
            }
        }
        .content-nav {
            &__list{
                padding-bottom: 40px;
            }
        }
    
        @include media(min, xs) {
            padding-left: 20%;
            padding-top: 20px;
        
            .content-nav {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                    
                &__list {

                        &.content-nav__list--left {
                            grid-column: 1;
                        }

                        &.content-nav__list--middle {
                            grid-column: 2;
                        }

                        &.content-nav__list--right {
                            grid-column: 3;
                        }
                }
            }
        }
    }
}    

</style>