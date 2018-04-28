import Vue from 'vue';
import Vuex from 'vuex';
import slugify from 'slugify';

import podcasts from './podcasts.json';
import getFirebase from './lib/firebase';

const database = getFirebase();

let queue = {};
let watched = {};

const storedWatched = localStorage.getItem('tvqueue-watched');
const storedQueue = localStorage.getItem('tvqueue-queue');

try {
  const watchedParsed = JSON.parse(storedWatched);
  if (watchedParsed) watched = watchedParsed;
} catch (e) {

}

try {
  const queueParsed = JSON.parse(storedQueue);
  if (queueParsed) queue = queueParsed;
} catch (e) {

}

database
  .ref('tvqueue-queue').once('value')
  .then((firebaseQueue) => {
    const val = firebaseQueue.val();
    if (val) queue = val;

    return database
      .ref('tvqueue-watched').once('value');
  })
  .then((snap) => {
    const val = snap.val();
    if (val) watched = val;

    console.log(queue, watched);
  });

// @TODO: Lib
function getKeyForMovieTitle(movieTitle) {
  return slugify(movieTitle.replace(/[.#$,\[\]]+/g, ''));
}

export function getStore() { // eslint-disable-line
  const store = new Vuex.Store({
    state: {
      // selectedItem: {},
      queue,
      watched,
    },
    mutations: {
      addToQueue(state, payload) {
        const { movie } = payload;

        const movieTitleKey = getKeyForMovieTitle(movie.title);

        if (state.queue[movieTitleKey]) return;

        Vue.set(state.queue, movieTitleKey, movie);

        const updates = {};
        updates['/tvqueue-queue/'] = state.queue;
        database.ref().update(updates);

        localStorage.setItem('tvqueue-queue', JSON.stringify(state.queue));
      },
      addToWatched(state, payload) {
        const { movie } = payload;

        const movieTitleKey = getKeyForMovieTitle(movie.title);

        if (state.watched[movieTitleKey]) return;

        Vue.set(state.watched, movieTitleKey, movie);

        const updates = {};
        updates['/tvqueue-watched/'] = state.watched;
        database.ref().update(updates);

        localStorage.setItem('tvqueue-watched', JSON.stringify(state.watched));
      },
      removeFromQueue(state, payload) {
        const { movie } = payload;

        Vue.delete(state.queue, getKeyForMovieTitle(movie.title));
        localStorage.setItem('tvqueue-queue', JSON.stringify(state.queue));

        const updates = {};
        updates['/tvqueue-queue/'] = state.queue;
        database.ref().update(updates);
      },
      removeFromWatched(state, payload) {
        const { movie } = payload;

        Vue.delete(state.watched, getKeyForMovieTitle(movie.title));

        localStorage.setItem('tvqueue-watched', JSON.stringify(state.watched));

        const updates = {};
        updates['/tvqueue-watched/'] = state.watched;
        database.ref().update(updates);
      },
    },
    getters: {
      filterItems: () => (searchTerm) => {
        if (!searchTerm) return podcasts;

        const result = podcasts.filter((res) => {
          return res.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        });

        return result;
      },
    },
  });

  return store;
}
