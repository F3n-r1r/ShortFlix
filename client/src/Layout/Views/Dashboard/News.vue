<template>
  <div class="view news-view">
    <banner class="dashboard__banner" bannerText="Adventure is more than backpacking" bannerImg="/images/adventure.svg" />
    
    <h2 class="news-view__title">Latest News</h2>

    <section class="news-view__content">
      <section class="news-view__content--newsfeeds">
        <article class="news-view__newsfeed" v-for="(article, index) in news" :key="index">
          <h3 class="news-view__newsfeed--headline">
            {{article.headline}}
          </h3>
          <p class="news-view__newsfeed--main-text">
            {{article.articleShort}}
          </p>
          <p class="news-view__newsfeed--date">{{article.date}}</p>
          <button class="newsfeed--btn" @click="showArticle(index)">READ</button>
        </article>
      </section>
    </section>

    <modal v-show="modal">
      <div class="modal-content">
        <button class="modal-content__close-btn" @click="closeModal"><i class="fas fa-times"></i></button>
        <h3 class="modal-content__headline">{{activeArticle.headline}}</h3>
        <p class="modal-content__text">{{activeArticle.articleFull}}</p>
      </div>
    </modal>

  </div>
</template>

<script>
import banner from '../../Components/Dashboard/Banner.vue';
import modal from '../../Components/Shared/Modal.vue';

export default {
  name: 'News',

  components: {
    banner,
    modal
  },
  data() {
      return {
        modal: false,
        activeArticle: {},
          news: [
            {
              headline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
              articleShort: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              articleFull: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              date: "10/12-2019"
            },
                        {
              headline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
              articleShort: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              articleFull: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              date: "24/12-2019"
            },
                        {
              headline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
              articleShort: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              articleFull: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              date: "30/12-2019"
            },
                        {
              headline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
              articleShort: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              articleFull: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              date: "01/01-2020"
            },
                        {
              headline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
              articleShort: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              articleFull: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              date: "03/01-2020"
            },
                        {
              headline: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
              articleShort: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              articleFull: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              date: "15/2-2020"
            }
          ]
      }
  },
  methods: {
    showArticle: function(index) {
      this.modal = true;
      this.activeArticle = this.news[index];
    },
    closeModal: function() {
      this.modal = false;
      setTimeout(function () {
      this.activeArticle = {};
      }, 1000);
    }
  }
}
</script>



<style lang="scss">
.news-view {
  &__title {
    margin: 20px;
    color: getColor($accents, primary);

  }

  &__content {

    &--newsfeeds {
        display: grid;
        grid-gap: 50px;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // auto-fit vs auto-fill ??
        grid-template-rows: minmax(300px, auto);
        padding: 20px;
    }
  }

  &__newsfeed {
    display: block;
    padding-bottom: 20px;
    border-bottom: 1px solid getColor($accents, primary);
    transition: color $themeTransitionTime;

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
      
    }

    .modal-content {
      max-width: 800px;
      padding: 30px;
      max-height: 500px;
      overflow-y: auto;

      &__close-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        @extend %icon-btn;
        font-size: 18px;
      }

        &__headline {
          margin-bottom: 20px;
        }

        &__text {
          
        }
    }

}

/*----------------------------------------------------------------------------------*\
    DARK THEME COLORS
*\----------------------------------------------------------------------------------*/
.dark-theme {
  .news-view {
    .news-view__newsfeed {
      color: getColor($darkTheme, fontColor);
    }
      .modal-content {
        background-color: getColor($darkTheme, tertiary);

        &__close-btn {
          color: getColor($darkTheme, fontColor);
        }

        &__headline {
          color: getColor($darkTheme, fontColor);
        }

        &__text {
          color: getColor($darkTheme, fontColor);
        }
    }
  }
}

/*----------------------------------------------------------------------------------*\
    LIGHT THEME COLORS
*\----------------------------------------------------------------------------------*/
.light-theme {
  .news-view {
    .news-view__newsfeed {
      color: getColor($lightTheme, fontColor);
    }
          .modal-content {
        background-color: getColor($lightTheme, secondary);

                &__close-btn {
          color: getColor($lightTheme, fontColor);
        }

        &__headline {
          color: getColor($lightTheme, fontColor);
        }

        &__text {
          color: getColor($lightTheme, fontColor);
        }
    }
  }
}

</style>