<template>
  <div>
    <header class="container" id="hero">
      <div class="columns is-8">
        <div class="column hero-content is-6">
          <h1 class="title">{{ githubProfile.name }}</h1>
          <h2 class="subtitle">{{ githubProfile.location }}</h2>
          <p>{{ githubProfile.bio }}</p><br /><br />
          <div>
            <a class="button bd-fat-button is-black mr-1" href="https://github.com/mitchell-lng" target="_blank">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span>Github</span>
            </a>
            <a class="button bd-fat-button is-info mx-1" href="https://www.linkedin.com/in/mitchell-long-3031521ba/" target="_blank">
              <span class="icon">
                <i class="fab fa-linkedin"></i>
              </span>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
        <div class="column img is-6">
          <img v-bind:src="githubProfile.avatar_url" alt="Avatar Image" class="is-rounded">
        </div>
      </div>
    </header>
    <section class="section-content">
      <h1 class="title has-text-centered mb-6">Projects</h1>
      <div class="columns is-flex-wrap-wrap is-justify-content-center projects">
        <project v-for="repo in repos.slice(0, this.max)" :key="repo.id" v-bind:data="repo" />
      </div>
      <div class="is-flex is-justify-content-center">
        <a @click="showMore()" class="has-text-centered my-6 py-3 my-auto mx-1 px-1" :style="{display: (this.max > this.repos.length) ? 'none' : 'block'}">Show More</a>
        <a @click="showLess()" class="has-text-centered my-6 py-3 my-auto mx-1 px-1" :style="{display: (this.max >= 6) ? 'block' : 'none'}">Show Less</a>
      </div>
    </section>
    <section class="section-content">
      <h1 class="title has-text-centered mb-6 mt-6">Contact Information</h1>
      <div class="has-text-centered">
        <h3 class="has-text-black">Email: mitchelltlong@gmail.com</h3><br />
        <socialmedia></socialmedia>
      </div>
    </section>
  </div>
</template>

<script>
import socialmedia from "@/components/socialmedia";
import project from "@/components/project";

async function githubProfileData(url) {
  return fetch(url)
    .then(response => {
      return response.json()
    });
}

async function getData(baseUrl) {
  const url = baseUrl + "/repos";

  return fetch(url)
      .then(response => {
        return response.json()
      });
}

export default {
  name: 'Home',
  data() {
    return {
      repos: [],
      githubProfile: [],
      max: 6,
      url: "https://api.github.com/users/mitchell-lng",
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
    githubProfileData(this.url).then(response => {
      this.githubProfile = response;
    })
    getData(this.url).then(response => {
      this.repos = response;

      this.repos.sort( (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    });
  },
  components: {
    socialmedia,
    project
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

h1 {
  margin: 0;
}

.projects {
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