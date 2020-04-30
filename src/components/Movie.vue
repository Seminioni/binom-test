<template>
  <div class="movie-card flex items-center flex-col">
    <h2 class="text-2xl mb-10">{{movie.original_title}}</h2>

    <section class="movie-info flex">
      <movie-image
        :alt="movie.original_title"
        :baseUrl="configuration.images.base_url"
        :path="movie.poster_path"
        :sizes="configuration.images.poster_sizes"
        class
        size="w185"
      />

      <div class=""></div>
    </section>
  </div>
</template>

<script>
  import { getMovie } from '@/modules/getMovie.js';

  export default {
    name: 'Movie',

    inject: ['configuration'],

    props: ['id'],

    components: {
      MovieImage: () => import('./Image.vue'),
    },

    data() {
      return {
        movie: {},
      };
    },

    async beforeRouteEnter(to, from, next) {
      try {
        const movie = await getMovie(to.params.id);

        next(vm => {
          vm.movie = movie.data;
        });
      } catch (e) {
        next({ name: 'movieNotFound', params: { entity: 'Movie' } });
      }
    },

    async beforeRouteUpdate(to, from, next) {
      try {
        const movie = await getMovie(to.params.id);

        this.movie = movie.data;

        next();
      } catch (e) {
        next({ name: 'movie-not-found', params: { entity: 'Movie' } });
      }
    },
  };
</script>
