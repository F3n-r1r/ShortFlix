<template>
    <section class="banner" v-if="$route.name != 'Talks' ">
        <router-link to="/Dashboard/News">
            <div class="banner__content">
                <h3 class="banner__content--headline">See what´s new in Animation!</h3>
            </div>
        </router-link>
    </section>
</template>

<script>
export default {
    name: 'banner'
}
</script>

<style lang="scss">
.banner {
    width: 100%;
    height: 150px;
    background-color: getColor($accents, secondary);
    background-image: url('/images/animation-mobile.svg');
    background-size: cover;
    background-repeat: no-repeat;
        
        @include media(min, md) {
            background-image: url('/images/animation.svg');
            background-size: contain;
            background-position-x: 125%;
        }

    &__content {

        &--headline  {
            line-height: 150px;
            position: absolute;
            left: 10%;
        }
    }
}

</style>