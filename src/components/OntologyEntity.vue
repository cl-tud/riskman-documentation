<template>
  <div class="class-item" :id="et.iri">
    <h3>{{ et.name }}</h3>
    <hr />
    <span class="iri"> <b>IRI:</b> <i>{{ et.iri }}</i> </span>

    <p class="comment">{{ et.comment }}</p>

    <slot name="specific"></slot>
  </div>
</template>

<style scoped>
.class-item {
  border: 1px solid #909090;
  margin: 15px 5px;
  padding: 5px;
}

hr {
  border: none;

  margin-bottom: 15px;
  height: 1px;

  color: #909090;
  background-color: #909090;

  /* color: hsla(160, 100%, 37%, 1);  old IE */
  /* background-color: hsla(160, 100%, 37%, 1);  Modern Browsers */
}

.iri {
  font-size: small;
}

.comment {
  margin: 10px 0;
  font-weight: bold;
}
</style>

<script>
export default {
  props: {
    et: {
      name: '',
      iri: '',
      comment: '',
    }
  },
}
</script>
