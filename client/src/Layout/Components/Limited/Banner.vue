<template>
    <section class="banner">
        <router-link to="/Dashboard/News">
            <div class="banner__content">
                <h3 class="banner__content--headline">See what´s new in Animation!</h3>
                <figure class="banner__content--image">
                    <img src="/images/animation.svg">
                </figure>
            </div>
        </router-link>
    </section>
</template>

<script>
export default {
    name: 'banner'
}
</script>

<style lang="scss" scoped>

    .banner__content {
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: getColor($accents, secondary);

        &--headline  {
            line-height: 150px;
            position: absolute;
            left: 10%;
        }

        &--image {
            position: absolute;
            right: 5%;

            img {
                width: 90%;
            }
        }
    }

</style>