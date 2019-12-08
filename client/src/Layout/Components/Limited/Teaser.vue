<template>
    <section class="slider">
        <vueper-slides class="no-shadow"
            :visible-slides="5" 
            :dragging-distance="50" 
            :breakpoints="{ 376: { visibleSlides: 3, bulletsOutside: true }, 768: { bulletsOutside: true }, 992: { bulletsOutside: false }}"
            :slideImageInside="true"
            :bulletsOutside="false" >
                <vueper-slide v-for="(slide, i) in videos"
                :key="i"
                :image="slide.videoImg">
                </vueper-slide>
        </vueper-slides>
    </section>
</template>

<script>
/*----------------------------------------------------------------------------------*\
	IMPORTS
*\----------------------------------------------------------------------------------*/
import { VueperSlides, VueperSlide} from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

/*----------------------------------------------------------------------------------*\
	EXPORTS
*\----------------------------------------------------------------------------------*/
export default {
    name: 'teaser',
    components: {
        VueperSlides,
        VueperSlide
        },

    data: () => ({
        videos: [
            {
                title: 'Mystical Magic in May',
                videoImg: '/images/hogwarts.png'
            },

            {
                title: 'Avatar for all',
                videoImg: '/images/avatar.png'
            },

            {
                title: 'Breakfast is served',
                videoImg: '/images/breakfast.png'
            },

            {
                title: 'Incept it!',
                videoImg: '/images/inception.png'
            },

            {
                title: 'A man made of iron',
                videoImg: '/images/ironman.png'
            },

            {
                title: 'Yellow spacecrafting',
                videoImg: '/images/yellow.png'
            },

            {
                title: 'Charlie goes futuristic',
                videoImg: '/images/charly.png'
            }
        ]
    })
}
</script>

<style lang="scss">

.slider {

   .vueperslides {

       .vueperslide__image {
           background-size: contain;
           background-repeat: no-repeat;
           transform: scale(0.8);
        }

        &__arrow svg {
            color: getColor($darkTheme, primary);
            font-size: 4px;
        }

        &__bullet {
            width: 6px;
            height: 6px;
            border-radius: 6px;
            border: 1px solid getColor($darkTheme, primary);
            margin: 0.5em .3em;

            &--active {
                background-color: getColor($darkTheme, primary);
            }

            &span {
                display: block;
                color: getColor($darkTheme, primary);
            }
        }

        @include media(min, xs) {
        
            .vueperslide__image {
                transform: scale(0.6);
            }

            &__arrow svg {
                font-size: 16px;
            }

            &__bullet {
                width: 12px;
                height: 12px;
                border-radius: 12px;
                margin: 1.0em .6em;
            }
        } 
        
        @include media(min, sm) {
            &__bullet {
                margin: 1.75em .6em;
            }
        }
    }

    .vueperslide--active {
        transform: scale(1.2);
        -webkit-transition: opacity 2s ease-in;
        transition: opacity 2s ease-in;
        -webkit-transition-duration: inherit;
        transition-duration: inherit
    }
}

</style>