<template lang="pug">
.container
  .row.text-left
    h1.col-12 Queue
    .col-12.col-md-12(v-for='(movie, key) in queue')
      .card
        strong {{movie.title}}
        span {{movie.releasedate}}
        div
          button.btn.btn-primary(@click='removeQueue(movie)') Remove
</template>

<style scoped>
  .card {
    padding: 1em;
    /* min-height: 380px; */
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(223,225,230,0.5);
    border-radius: 10px;
    margin-bottom: 1em;
    border: none;
  }
</style>

<script>
export default {
  computed: {
    queue() {
      return this.$store.state.queue;
    },
  },
  methods: {
    removeQueue(movie) {
      this.$store.commit('removeFromQueue', { movie });
    },
  },
};
</script>
