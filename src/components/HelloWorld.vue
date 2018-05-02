<template lang="pug">
.hello
  //.container-fluid.header
    .row.text-center
      .col-12
  div
    .row.filters
      .col-6
        input.search.form-control(type='text', placeholder='Search', v-model='searchTerm')
      .col-6
        input.search.form-control(type='text', v-model='dateFilter')
  .container
    .row.text-left
      .col-12.col-md-4(v-for='movie in movies', :key='movie.title', v-if='!queue[getKeyForMovieTitle(movie.title)] && !watched[getKeyForMovieTitle(movie.title)] && !hide[getKeyForMovieTitle(movie.title)]')
        .card
          img.img(v-lazy="movie.image")
          //.img(:style='`background-image: url("${movie.image}")`')
          strong {{movie.title}}
          span {{movie.releasedate}}
          span {{movie.desc}}
          div
            button.btn.btn-primary(@click='addQueue(movie)', v-if='!queue[getKeyForMovieTitle(movie.title)]') Queue
            button.btn.btn-secondary(@click='addWatched(movie)', v-if='!watched[getKeyForMovieTitle(movie.title)]') Watched
            button.btn.btn-secondary(@click='addHide(movie)', v-if='!hide[getKeyForMovieTitle(movie.title)]') Hide
</template>

<script>
import { ModelSelect } from 'vue-search-select';
import moment from 'moment';
import slugify from 'slugify';
import sortBy from 'lodash/sortBy';
import movies from '../data/movies.json';

import getFirebase from '../lib/firebase';

const database = getFirebase();

export default {
  name: 'HelloWorld',
  components: {
    ModelSelect,
  },
  metaInfo() {
    const title = 'Ologies Podcast';

    return {
      title,
      meta: [
        { vmid: 'description', name: 'description', content: title },
      ],
    };
  },
  mounted() {
    database
      .ref('tvqueue-queue').once('value')
      .then((firebaseQueue) => {
        const val = firebaseQueue.val();
        if (val) {
          this.$store.state.queue = val;
        }

        return database
          .ref('tvqueue-watched').once('value');
      })
      .then((snap) => {
        const val = snap.val();
        if (val) {
          this.$store.state.watched = val;
        }

        return database
          .ref('tvqueue-watched').once('value');
      })
      .then((snap) => {
        const val = snap.val();
        if (val) {
          this.$store.state.hide = val;
        }
      });
  },
  data() {
    return {
      msg: 'Machine Learning Tutorials',
      searchTerm: '',
      catOptions: [
        { value: 'Linear Algebra', text: 'Linear Algebra' },
      ],
      selectedCat: {
        value: '',
        text: '',
      },
      formatOptions: [
        { value: 'Book', text: 'Book' },
      ],
      selectedFormat: {
        value: '',
        text: '',
      },
      dateFilter: '2018',
      // movies,
    };
  },
  computed: {
    resources() {
      const result = this.$store.getters.filterItems(this.searchTerm);
      return result;
    },
    queue() {
      return this.$store.state.queue;
    },
    watched() {
      return this.$store.state.watched;
    },
    hide() {
      return this.$store.state.hide;
    },
    movies() {
      const moviesMap = {};

      const movFiltered =  movies.map((mov) => {
        mov.date = new Date(mov.releasedate);
        moviesMap[mov.title] = 0;
        return mov;
      })
        .filter((mov) => {
          const searchMatched = this.searchTerm ?
            mov.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 : true;
          const yearMatched = this.dateFilter ?
            moment(mov.releasedate).year() === parseInt(this.dateFilter, 10) : false;

          if (!moviesMap[mov.title]) moviesMap[mov.title] = 0;
          moviesMap[mov.title] += 1;

          return yearMatched && searchMatched && moviesMap[mov.title] === 1;
        });

      return sortBy(movFiltered, [(o) => {
        return o.title;
      }]);
    },
  },
  methods: {
    getKeyForMovieTitle(movieTitle) {
      if (!movieTitle) return '';
      return slugify(encodeURI(movieTitle).replace(/[.#$,\[\]]+/g, ''));
    },
    addQueue(movie) {
      this.$store.commit('addToQueue', { movie });
    },
    addWatched(movie) {
      this.$store.commit('addToWatched', { movie });
    },
    addHide(movie) {
      this.$store.commit('addToHide', { movie });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  h2 {
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .logo {
    width: 125px;
    height: 125px;
    margin-bottom: 1em;
  }

  .header {
    background-image: url('https://cdn.shopify.com/s/files/1/2384/1915/files/OLOGIESTITLESLIDEwithmushroom_2048x.png?v=1517064763');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    height: 300px;
    background-color: #FAF4DC;
    margin-bottom: 1em;
  }

  .search {
    border: none;
    box-shadow: 0 4px 30px 0 rgba(223,225,230,0.5);
    padding: 1em;
    font-size: 22px;
  }

  .filter-container {
    /* background: linear-gradient(to right, #E100FF, #0066ff); */
    background-color: #f9f7e3;
  }

  .filters {
    margin-bottom: 2em;
    max-width: 1140px;
    margin: 0 auto;
    padding-top: 1em;
    padding-bottom: 1em;
    margin-bottom: 1em;
  }

  .card {
    padding: 1em;
    /* min-height: 380px; */
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(223,225,230,0.5);
    border-radius: 10px;
    margin-bottom: 1em;
    border: none;
  }

  .card .img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-position: center;
    background-size: contain;
  }

  .badge-primary {
    /* background: #FF6D4A; */
  }

  .badge {
    font-size: 14px;
    margin-bottom: 10px;
    cursor: pointer;
    display: inline-block;
    background-color: #fafafa;
    padding: 5px 10px;
    border-radius: 40px;
    color: #ccc;
    text-transform: lowercase;
  }
/*
  .btn-primary {
    color: #999 !important;
    margin-right: 10px;
    border: 1px solid #f3f3f3;
    text-transform: uppercase;
    border-radius: 40px;
    padding: 5px 10px;
    font-weight: 600;
    font-size: 11px;
    background-color: #f9f7e3;
  } */

  strong {
    /* color: #FF6D4A; */
    font-family: 'Poppins', sans-serif;
    margin-top: .5em;
    margin-bottom: .5em;
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }

  a {
    color: #fff !important;
    width: 80px;
    position: absolute;
    bottom: 10px;
  }

  .share {
    width: 100%;
    margin-top: 1em;
  }

  .share a svg {
    height: 15px;
  }

  .share a {
    color: #ccc !important;
    width: 15px;
    height: 15px;
    display: inline-block;
    position: relative;
    margin-right: .5em;
  }
</style>
