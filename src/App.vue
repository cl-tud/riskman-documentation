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
        <div id="titles" class="text-center">
          <h1 class="ubuntu-bold">{{ mainOntology.meta.name }}</h1>
          <h3 v-if="mainOntology.meta.title">{{ mainOntology.meta.title }}</h3>
        </div>

      </header>
      <hr>

      <div class="side-by-side">

        <OntologyInfoItem name="Links">
          <template #info>
            <div id="links">
              <span>Documentation: <a href="https://w3id.org/riskman/">https://w3id.org/riskman/</a></span>
              <span>Ontology: <a href="https://w3id.org/riskman/ontology">https://w3id.org/riskman/ontology</a></span>
              <span>Shapes: <a href="https://w3id.org/riskman/shapes">https://w3id.org/riskman/shapes</a></span>
              <span>GitHub repo: <a href="https://w3id.org/riskman/repo">https://w3id.org/riskman/repo</a></span>
            </div>
            <br />
            <div id="dates">
              <div v-if="mainOntology.meta.creationDate">Creation date: <span class="date">{{
                mainOntology.meta.creationDate }}</span></div>
              <div v-if="mainOntology.meta.modificationDate">Modification date: <span class="date">{{
                mainOntology.meta.modificationDate }}</span>
              </div>
            </div>
          </template>
        </OntologyInfoItem>

        <!-- <OntologyInfoItem name="Download serialization">
          <template #info>
            <div id="serialization">
              <a href="https://w3id.org/riskman/ontology/" class="button-link">Ontology (*.ttl)</a>
              <a href="https://w3id.org/riskman/shapes/" class="button-link">Shapes (*.ttl)</a>
            </div>
          </template>
        </OntologyInfoItem> -->


        <OntologyInfoItem name="License">
          <template #info>
            <div id="licenses">
              <a href="https://creativecommons.org/licenses/by/4.0/" class="button-link">CC BY 4.0</a>
              <a href="https://creativecommons.org/licenses/by/4.0/"> <img id="cc-by" src="./assets/by.png"> </a>
            </div>

          </template>
        </OntologyInfoItem>
      </div>
      <hr>


      <div class="side-by-side">

        <OntologyInfoItem name="Creators">
          <template #info>
            <ul class="people">
              <li v-for="c in mainOntology.meta.creators">
                <PersonItem :person="c" />
              </li>
            </ul>
          </template>
        </OntologyInfoItem>


        <OntologyInfoItem name="Contributors">
          <template #info>
            <ul class="people">
              <li v-for="c in mainOntology.meta.contributors">
                <PersonItem :person="c" />
              </li>
            </ul>
          </template>
        </OntologyInfoItem>

      </div>

      <hr>

      <OntologyInfoItem v-if="mainOntology.meta.description" name="Description">
        <template #info>
          <p>{{ mainOntology.meta.description }}</p>
        </template>
      </OntologyInfoItem>

      <OntologyInfoItem v-if="mainOntology.meta.abstract" name="Abstract">
        <template #info>
          <p>{{ mainOntology.meta.abstract }}</p>
        </template>
      </OntologyInfoItem>



      <TableOfContents :objects="mainOntology.classes" name="Classes" />

      <OntologyEntity v-for="cl in mainOntology.classes" :et="cl">
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

      <TableOfContents :objects="mainOntology.objectProperties" name="Object properties" />

      <OntologyEntity v-for="op in mainOntology.objectProperties" :et="op">
        <template #specific v-if="op.showSpecific.length > 0">
          <div class="specific">
            <OptionalHtmlItem :objects="op.subPropertyOf" name="Subproperty of" />
            <OptionalHtmlItem :objects="op.superPropertyOf" name="Superproperty of" />
            <OptionalHtmlItem :objects="op.domain" name="Domain" />
            <OptionalHtmlItem :objects="op.range" name="Range" />
          </div>
        </template>
      </OntologyEntity>

      <!-- Security ontology -->
       
      <footer>
        Made with &nbsp<a href='https://www.npmjs.com/package/ontoglimpse'>ontoglimpse</a> &nbsp in Dresden.
      </footer>
    </div>
  </div>
</template>

<style scoped>
.side-by-side {
  display: flex;
  flex-wrap: wrap;


}

#logo {
  width: 200px;
}

#serialization {
  display: flex;
}

#dates {

  display: flex;
  flex-direction: column;
}

#links {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}

.date {
  font-weight: bold;
}

ul.people {
  list-style: none;
  padding: 0;
}

/* #download-buttons {
  display: flex;
} */

a.button-link {
  display: block;
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 5%;
  padding: 2px 10px;
  cursor: pointer;
  margin-right: 20px;
  margin-left: 0;
  max-width: fit-content;
  height: fit-content;
}

a.button-link:hover {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

#titles {
  flex-grow: 2;
}

.text-center {
  text-align: center;
}

.margin-top {
  margin-top: 100px;
}

#licenses {
  display: flex;
}

#cc-by {
  height: 40px
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
  /* border: 0; */
  /* Remove default border */
  /* border-top: 0.5px solid white; */
  /* Set custom border thickness and color */
}
</style>

<script>
import { useOntoStore } from './stores/ontology';
import OntologyEntity from './components/OntologyEntity.vue';
import OntologyInfoItem from './components/OntologyInfoItem.vue';


export default {
  data() {
    return {
      loaded: false,
      mainOntology: {
        classes: [],
        namedIndividuals: [],
        objectProperties: [],
        meta: {}
      },
      // securityOntology: {
      //   classes: [],
      //   objectProperties: [],
      //   namedIndividuals: [],
      //   meta: {}
      // },
    }
  },
  methods: {
    async fetchData() {

      const oStore = useOntoStore()
      await oStore.fetchStore()
      this.mainOntology = oStore.mainOntology
      this.securityOntology = oStore.securityOntology
      this.loaded = true

      if (this.mainOntology.meta.name)
        document.title = this.mainOntology.meta.name

    },

    fetchFromFile() {
      debugger
      const oStore = useOntoStore()
      oStore.fetchFromFile()
      this.mainOntology = oStore.mainOntology
      // this.securityOntology = oStore.securityOntology
      this.loaded = true

      if (this.mainOntology.meta.name)
        document.title = this.mainOntology.meta.name
    }
  },

  mounted() {
    // this.fetchData()
    this.fetchFromFile()

  }
}

</script>
