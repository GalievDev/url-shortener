<template>
  <div id="app">
    <h1>URL Shortener</h1>
    <form @submit.prevent="shortenUrl">
      <input v-model="originalUrl" placeholder="Enter URL" required />
      <input v-model="alias" placeholder="Custom Alias (optional)" />
      <button type="submit">Shorten</button>
    </form>
    <div v-if="shortUrl">
      <p>Short URL: <a :href="shortUrl" target="_blank">{{ shortUrl }}</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      originalUrl: '',
      alias: '',
      shortUrl: '',
    };
  },
  methods: {
    async shortenUrl() {
      try {
        const response = await axios.post('http://localhost:3000/shorten', {
          originalUrl: this.originalUrl,
          alias: this.alias,
        });
        this.shortUrl = `http://localhost:3000/${response.data.shortUrl}`;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
