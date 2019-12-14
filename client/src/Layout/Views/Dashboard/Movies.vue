<template>
  <div class="view movies-view">
    <banner class="dashboard__banner" bannerText="Thursday night is movie night" bannerImg="/images/movie_night.svg" />
    <p>movies</p>
  </div>
</template>

<script>
import banner from '../../Components/Dashboard/Banner.vue';

export default {
  name: 'Movies',

  components: {
    banner
  }
}
</script>



<style lang="scss">


</style>