<template>
    <section class="banner">
        <router-link to="/Dashboard/News">
            <div class="banner__content">
                <img :src="bannerImg">
                <h3 class="banner__content--headline">{{ bannerText }}</h3>
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
    background-image: url("/images/steam.png");
	background-size: cover;
    background-repeat: no-repeat;
    background-blend-mode: saturation;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    @include flexRow(center, center);

        @include media(min, md) {
            height: 150px;
            @include flexRow(center, flex-start);
        }

    &__content {
        @include flexRow(center, center);
        
        &--headline  {
            width: 40%;
            font-size: 16px;
            font-family: courier-std, monospace;
            font-style: normal;
            font-weight: 400;

            @include media(min, md) {
                width: auto;
                font-size: 18px;
                position: absolute;
                right: 20%;
            }
        }

        img {
            width: 50%;
            height: auto;

            @include media(min, md) {
                width: 20%;
                position: absolute;
                left: 15%;
            }
        }
    }
}

</style>