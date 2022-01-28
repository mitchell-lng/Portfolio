<template>
  <div>
    <section class="section-content" v-if="articles.length>0">
      <div>
        <h1 class="title has-text-centered mb-6">Articles</h1>
        <div class="columns is-flex-wrap-wrap is-justify-content-center articles" v-if="articles.length!==0">
          <articleItem v-for="data in articles.slice(0, this.max)" :key="data.id" v-bind:data="data" />
        </div>
        <div class="is-flex is-justify-content-center">
          <a @click="showMore()" class="has-text-centered my-6 py-3 my-auto mx-1 px-1" :style="{display: (this.max > this.articles.length) ? 'none' : 'block'}">Show More</a>
          <a @click="showLess()" class="has-text-centered my-6 py-3 my-auto mx-1 px-1" :style="{display: (this.max >= 6) ? 'block' : 'none'}">Show Less</a>
        </div>
      </div>
    </section>
    <header class="container" id="hero" v-else>
      <div class="columns is-8">
        <div class="column hero-content is-6">
          <h1 class="title">Looks like there is nothing here.</h1>
          <h2 class="subtitle">Come check again later.</h2>
        </div>
        <div class="column img is-6">
          <a href="https://unsplash.com/@vnbuchholz92" target="_blank">
            <img src="../assets/evan-buchholz-z-Hu8pnt23s-unsplash.jpg" class="is-rounded" alt="Nothing">
          </a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import articleItem from "@/components/articleItem";

async function getData(url) {
  return fetch(url)
      .then(response => {
        return response.json()
      });
}

export default {
  name: "Blog",
  data() {
    return {
      articles: [],
      max: 6,
      url: "https://dev.to/api/articles?username=mitchelllng"
    }
  },
  methods: {
    showMore() {
      this.max += 3
    },
    showLess() {
      this.max -= 3
    }
  },
  mounted() {
    getData(this.url).then(response => {
      this.articles = response;

      this.articles.sort( (a, b) => new Date(b.positive_reactions_count) - new Date(a.positive_reactions_count));
    });
  },
  components: {
    articleItem
  }
}
</script>

<style scoped>
header {
  margin-top: calc(2vw + 20px);
  margin-bottom: calc(2vw + 20px);
}

img {
  border-radius: 50% 100%;
  -webkit-box-shadow: 10px 10px 42px 0px rgba(209,209,209,1);
  -moz-box-shadow: 10px 10px 42px 0px rgba(209,209,209,1);
  box-shadow: 10px 10px 42px 0px rgba(209,209,209,1);
}

.img {
  width: 100%;
  justify-content: center;
}

.hero-content {
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.articles {
  margin-left: calc(2vw + 20px);
  margin-right: calc(2vw + 20px);
}

.section-content {
  margin-top: calc(2vw + 20px);
  margin-bottom: calc(2vw + 20px);
  padding-top: calc(2vw + 20px);
  padding-bottom: calc(2vw + 20px);
}
</style>