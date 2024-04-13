<script setup>
import OntologyEntity from './components/OntologyEntity.vue'
import TableOfContents from './components/TableOfContents.vue';
import OptionalHtmlItem from './components/OptionalHtmlItem.vue';
import PersonItem from './components/PersonItem.vue';

</script>

<template>
  <div>

    <div v-if="!loaded">
      <h3>Loading...</h3>
    </div>

    <div v-else>

      <header>
        <img id="logo" src="./assets/riskman_green.png">
        <div id="titles">
          <h1>{{ meta.name }}</h1>
          <h3 v-if="meta.title">{{ meta.title }}</h3>
        </div>

      </header>
      <hr>
      
      
      <h2>Download serialization:</h2>
      <div id="serialization">
        <a href="https://w3id.org/riskman/ontology/" class="download">Ontology (*.ttl)</a>
        <a href="https://w3id.org/riskman/shapes/" class="download">Shapes (*.ttl)</a>
      </div>
      <span style="margin-right: 10px;" v-if="meta.creationDate">Creation date: {{ meta.creationDate }}</span> <span v-if="meta.modificationDate">Modification date: {{ meta.modificationDate }}</span>
      <hr>

      <h2>Creators</h2>
      <ul>
        <li v-for="c in meta.creators">
          <PersonItem :person="c" />
        </li>
      </ul>

      <h2>Contributors</h2>
      <ul>
        <li v-for="c in meta.contributors">
          <PersonItem :person="c" />
        </li>
      </ul>

      <hr>

      <div v-if="meta.description">
        <h2>Description</h2>
        <p>{{ meta.description }}</p>
      </div>

      <div v-if="meta.abstract">
        <h2>Abstract</h2>
        <p>{{ meta.abstract }}</p>
      </div>


      <TableOfContents :objects="classes" name="Classes" />

      <OntologyEntity v-for="cl in classes" :et="cl">
        <template #specific v-if="cl.showSpecific.length > 0">
          <div class="specific">
            <OptionalHtmlItem :objects="cl.equivalentClass" name="Equivalent to" />
            <OptionalHtmlItem :objects="cl.subClassOf" name="Subclass of" />
            <OptionalHtmlItem :objects="cl.superClassOf" name="Superclass of" />
            <OptionalHtmlItem :objects="cl.domainOf" name="Domain of" />
            <OptionalHtmlItem :objects="cl.rangeOf" name="Range of" />
          </div>
        </template>
      </OntologyEntity>

      <TableOfContents :objects="objectProperties" name="Object properties" />

      <OntologyEntity v-for="op in objectProperties" :et="op">
        <template #specific v-if="op.showSpecific.length > 0">
          <div class="specific">
            <OptionalHtmlItem :objects="op.subPropertyOf" name="Subproperty of" />
            <OptionalHtmlItem :objects="op.superPropertyOf" name="Superproperty of" />
            <OptionalHtmlItem :objects="op.domain" name="Domain" />
            <OptionalHtmlItem :objects="op.range" name="Range" />
          </div>
        </template>
      </OntologyEntity>
      <footer>
        Made with &nbsp<a href='https://www.npmjs.com/package/ontoglimpse'>ontoglimpse</a> &nbsp in Dresden.
      </footer>
    </div>
  </div>
</template>

<style scoped>
#logo {
  width: 200px;
}

#serialization {
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
}

a.download{
  display: block;
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 10%;
  padding: 2px 10px;
  cursor: pointer;
  margin-right: 20px;
  margin-left: 0;
}

a.download:hover {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

#titles {
  text-align: center;
  flex-grow: 2;
}

.specific {
  margin: 10px;
  padding: 10px;
  border: 1px #909090 dashed;
}

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  text-align: center;
}

hr {
  margin: 20px 0;
  border: 0;
  /* Remove default border */
  border-top: 0.5px solid white;
  /* Set custom border thickness and color */
}
</style>

<script>
import { useOntoStore } from './stores/ontology';
import OntologyEntity from './components/OntologyEntity.vue';


export default {
  data() {
    return {
      loaded: false,
      classes: [],
      objectProperties: [],
      meta: {
        creators: []
      }

    }
  },
  methods: {
    async fetchData() {

      debugger

      const oStore = useOntoStore()
      await oStore.fetchStore()
      this.classes = oStore.classes
      this.objectProperties = oStore.objectProperties
      this.meta = oStore.meta
      this.loaded = true

      if (this.meta.title) 
        document.title= this.meta.name
      
    }
  },

  mounted() {
    this.fetchData()

  }
}

</script>
