<template>
  <div class="view showcases-view">
    <banner class="dashboard__banner" bannerText="Check out the latest feed on animation" bannerImg="/images/animating.svg" />

    <section class="showcases-view__showcase-section">
        <h2 class="showcase-section__headline">Your recent showcases</h2>

        <div class="showcase-section__row">
            <!-------------------------------------------------------------------------------------->
            <!-- ADD SHOWCASE (ONLY MOBILE?)      				             							  -->
            <!-------------------------------------------------------------------------------------->
            <div class="row__add-showcase">
                <i class="add-showcase__icon fas fa-plus-circle"></i>
                <p class="add-movie__subtext">Add new showcase</p>
            </div>
            <div class="row__showcase-template" v-for="i in 2" :key="i">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="212.6px"
                height="136.3px" viewBox="0 0 212.6 136.3" style="enable-background:new 0 0 212.6 136.3;" xml:space="preserve">
              <g>
                <rect class="st0" width="139.3" height="107"/>
                <rect y="115.8" class="st0" width="212.6" height="20.5"/>
                <rect x="149.4" class="st0" width="63.2" height="48.5"/>
                <rect x="149.4" y="58.5" class="st0" width="63.2" height="48.5"/>
              </g>
              </svg>



            </div>
        </div>
        </section>
  </div>
</template>

<script>
import banner from '../../Components/Dashboard/Banner.vue';

export default {
  name: 'Showcases',

  components: {
    banner
  }
}
</script>



<style lang="scss">
.showcases-view {
  .showcases-view__showcase-section {
        grid-row: 3;
        // padding: 20px 20px;
        margin: 30px 30px;

        .showcase-section__headline {
            color: getColor($accents, primary);
            font-size: 18px;
            margin: 30px 0 10px 0;
        }

        .showcase-section__row {
            @include flexRow(null, space-between);
            flex-wrap: wrap;
              
            @include media(min, xs) {
              @include flexRow(null, space-between);
              flex-wrap: nowrap;

            }
            .row__add-showcase {
                width: 250px;
                height: 135px;
                margin-right: 15px;
                background-color: getColor($lightTheme, primary);
                cursor: pointer;

                @include media(min, xs) {
                    @include flexColumn(center, center);
                    padding: 40px 0;
                }

                &:hover > .add-showcase__icon {
                    transform: scale(1.3);
                    color: getColor($accents, tertiary);
                }

                .add-showcase__icon {
                    font-size: 30px;
                    transition: transform .5s ease, color .5s ease;
                    color: getColor($lightTheme, tertiary);
                    margin-bottom: 10px;
                }
            }

            .row__showcase-template {
                width: 250px;
                height: 150px;
                svg {
                  fill: getColor($lightTheme, tertiary);
                }
            }
        }
    }
}


</style>