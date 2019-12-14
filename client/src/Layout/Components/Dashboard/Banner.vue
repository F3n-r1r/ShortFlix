<template>
    <section class="banner">
        <router-link to="/Dashboard/News">
            <div class="banner__content">
                <h3 class="banner__content--headline">{{ bannerText }}</h3>
                <img :src="bannerImg">
            </div>
        </router-link>
    </section>
</template>

<script>
export default {
    name: 'banner',

    props: {
        bannerText: {
            type: String,
        },
        bannerImg: {
            type: String,
        }
    }
    
}
</script>

<style lang="scss">
.banner {
    width: 100%;
    height: 150px;
    background-color: getColor($accents, secondary);
    @include flexRow(center, center);

        @include media(min, md) {
            height: 150px;
            @include flexRow(center, flex-start);
        }

    &__content {
        @include flexRow(center, center);
        
        @include media(min, md) {
            // @include flexRow(center, flex-start);
        }

        &--headline  {
            width: 40%;
            font-size: 16px;

            @include media(min, md) {
                width: auto;
                font-size: 18px;
                position: absolute;
                left: 10%;
            }
        }

        img {
            width: 50%;
            height: auto;

            @include media(min, md) {
                width: 20%;
                position: absolute;
                right: 15%;
            }
        }
    }
}

</style>