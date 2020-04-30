<template>
  <div class="movie-card mt-10 flex justify-center">
    <section class="movie-info max-w-2xl flex">
      <movie-image
        :alt="movie.original_title"
        :baseUrl="configuration.images.base_url"
        :path="movie.poster_path"
        :sizes="configuration.images.poster_sizes"
        class="flex-shrink-0"
        size="w185"
      />

      <div class="pl-5 text-left">
        <p>Film Name: <strong>{{movie.original_title}}</strong></p>
        <p>Adult: <strong>{{movie.adult}}</strong></p>
        <p>Film Budget: <strong>{{movie.budget}}</strong></p>
        <p>Film Language: <strong>{{movie.original_language}}</strong></p>
        <p>Overview: <strong>{{movie.overview}}</strong></p>
        <p>Popularity: <strong>{{movie.popularity}}</strong></p>
      </div>
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
