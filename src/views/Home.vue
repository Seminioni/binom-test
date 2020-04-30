<template>
  <div class="home flex flex-col items-center">
    <search
      class="mt-5 mb-5 border-solid border-2 rounded-sm border-gray-600 p-3"
      v-model="movie"
    />

    <pagination
      :container-class="'flex items-center mb-5'"
      :next-text="'Next'"
      :page-class="'ml-2 mr-2'"
      :page-count="pages"
      :prev-text="'Prev'"
      active-class="border p-1"
      v-if="results.length !== 0"
      v-model="page"
    ></pagination>

    <p v-if="results.length === 0 && movie">There's no movie you are finding</p>

    <div
      class="movies-list"
      v-else
    >
      <ul class="flex flex-wrap justify-center">
        <li
          :key="movie.id"
          v-for="movie in results"
        >
          <router-link :to="{ name: 'movie', params: { id: movie.id }}">
            <movie-card
              :alt="movie.original_title"
              :baseUrl="configuration.images.base_url"
              :path="movie.poster_path"
              :sizes="configuration.images.poster_sizes"
              class="relative"
              size="w185"
            >
              <p class="tags flex flex-col absolute left-0 top-0 text-left">
                <span
                  :key="id"
                  class="bg-white mb-1"
                  v-for="id in movie.genre_ids"
                  v-text="getGenre(id, genres) ['name']"
                ></span>
              </p>
            </movie-card>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { searchMovies } from '@/modules/searchMovies.js';

  export default {
    name: 'Home',

    inject: ['configuration', 'genres'],

    data() {
      return {
        movie: '',
        page: 1,
        pages: 1,
        results: [],
      };
    },

    components: {
      Search: () => import('../components/Search.vue'),
      MovieCard: () => import('../components/Image.vue'),
      Pagination: () => import('vuejs-paginate'),
    },

    watch: {
      page(page) {
        this.saveMovies(
          searchMovies({
            query: this.movie ? this.movie : 'trending',
            page,
          }),
        );
      },

      movie(name) {
        this.page = 1;

        this.saveMovies(
          searchMovies({ query: name ? name : 'trending', page: this.page }),
        );
      },
    },

    methods: {
      getGenre(id, genres) {
        const genre = genres.find(el => {
          return el.id === id;
        });

        return genre ? genre : { name: '' };
      },

      paginationHandler(page) {
        this.page = page;
      },

      async saveMovies(movies) {
        try {
          movies = await movies;

          this.results = movies.results;
          this.page = movies.page;
          this.pages = movies.total_pages;
        } catch (e) {
          if (movies instanceof 'MovieDoesntExistsError') {
            this.result = [];
            this.page = 1;
            this.pages = 1;
          }
        }
      },
    },

    async created() {
      this.saveMovies(searchMovies({ query: 'trending' }));
    },
  };
</script>
