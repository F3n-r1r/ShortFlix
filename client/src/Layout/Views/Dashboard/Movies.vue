<template>
  <div class="view movies-view">
    <header class="movies-view__banner">
      <banner />
    </header>

    <p>movies</p>
  </div>
</template>

<script>
import banner from '../../Components/Limited/Banner.vue';

export default {
  name: 'Movies',
  components: {
    banner
  }
}
</script>



<style lang="scss">


</style>