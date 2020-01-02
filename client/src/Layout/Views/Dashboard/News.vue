<template>
  <div class="view news-view">
    <banner class="dashboard__banner" bannerText="Adventure is more than backpacking" bannerImg="/images/adventure.svg" />
      <h2 class="news-view__title">Latest News Feeds</h2>
    <section class="news-view__content">
      <section class="news-view__content--newsfeeds">
        <article class="news-view__newsfeed" v-for="i in 5" :key="i">
          <h3 class="news-view__newsfeed--headline">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
          </h3>
          <p class="news-view__newsfeed--main-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="news-view__newsfeed--date">JAN, 2020</p>
          <button class="newsfeed--btn">READ</button>
        </article>
      </section>
    </section>
  </div>
</template>

<script>
import banner from '../../Components/Dashboard/Banner.vue';

export default {
  name: 'News',

  components: {
    banner
  }
}
</script>



<style lang="scss">
.news-view {
  &__title {
    margin: 20px;
    color: getColor($accents, primary);

    @include media(min, sm) {
      margin: 20px 40px;
    }
  }

  &__content {

    &--newsfeeds {
      display: block;

        @include media(min, sm) {
          display: flex;
          flex-wrap: wrap;
          margin: 0 20px;
        }
    }
  }

  &__newsfeed {
    display: block;
    width: 250px;
    margin: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid getColor($accents, primary);

    &--headline {
      padding-bottom: 20px;
    }
    &--main-text {
      padding-bottom: 40px;
    }
    &--date {
      padding-bottom: 10px;
    }

  }
    .newsfeed--btn {
      @extend %primary-btn;
      background-color: getColor($darkTheme, secondary);
      
    }

}

/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
    .news-view__newsfeed {
      color: getColor($darkTheme, fontColor);
    }
}

/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
    .news-view__newsfeed {
      color: getColor($lightTheme, fontColor);
    }
}

</style>