import Vuex from 'vuex';
import podcasts from './podcasts.json';

// const slugify = require('slugify');

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

export function getStore() { // eslint-disable-line
  const store = new Vuex.Store({
    state: {
      // selectedItem: {},
      queue,
      watched,
    },
    mutations: {
      // selectItem(state, payload) {
      //   state.selectedItem = payload.item;
      // },
    },
    getters: {
      // findItem: () => (slug) => {
      //   function find(i) {
      //     return slugify(i.title.toLowerCase()) === slug;
      //   }
      //
      //   // let item = breakfast.find(find);
      //   // if (item) return item;
      //
      //   return {};
      // },
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
