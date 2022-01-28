<template>
  <div class="column box m-2 is-one-quarter is-multiline is-one-thirds-tablet is-one-third-widescreen is-full-mobile">
    <h1 class="subtitle m-0 mb-1">{{ data.name.replaceAll("-", " ") }}</h1>
    <p>{{ data.language }}</p>
    <br />
    <p>{{ data.description }}</p>
    <br />
    <a v-bind:href="data.html_url">More Project Info</a>

    <h6 class="is-size-7">Last Updated: {{ convertDate(data.pushed_at) }}</h6>
  </div>
</template>

<script>
export default {
  name: "project",
  props: {
    data: Object
  },
  methods: {
    convertDate(date) {
      return new Date(date).toLocaleString();
    }
  }
}
</script>

<style scoped>

</style>