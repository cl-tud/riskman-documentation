<script setup>

</script>

<template>
  <div class="toc">

    <h1 class="ubuntu-bold">{{ name }}</h1>
    <ul class="horizontal">
      <li v-for="(obj, key) of objects" :key="key"> <a :href="`#${obj.iri}`">{{ obj.name }}</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    name: '',
    objects: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
ul.horizontal {
  padding-left: 0;
  text-align: justify;
}

ul.horizontal li {
  display: inline;
  margin-right: 30px;

}

.toc {
  border: 1px solid #909090;
  margin: 50px 5px;
  padding: 20px;
}

h1 {
  text-align: center;
}
</style>
