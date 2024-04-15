// import * as path from 'path'
import * as $rdf from 'rdflib'
// import * as fs from 'file-system'

import { ref } from 'vue'

import { OntoGlimpse } from "ontoglimpse"

import { defineStore } from "pinia"

const shaclURL = 'https://raw.githubusercontent.com/cl-tud/kimeds-ontology/main/shapes.ttl'
const ontologyURL = 'https://raw.githubusercontent.com/cl-tud/kimeds-ontology/main/ontology.ttl'


export const useOntoStore = defineStore({
    id: 'ontoStore',
    state: () => ({
        og: null,
        isLoading: false,
        classes: [],
        objectProperties: [],
        name: 'oStore',
        meta: undefined
    }),
    actions: {
        async fetchRDF(url) {
            const res = await fetch(url)
            const data = await res.text()

            const mime = 'text/turtle'
            const base_uri = 'http://example.com/ontology#'

            const store = $rdf.graph()
            $rdf.parse(data, store, base_uri, mime)
            return store
        },

        async fetchStore() {
            this.isLoading = true
            try {

                let ontoStore = await this.fetchRDF(ontologyURL)
                let shaclStore = await this.fetchRDF(shaclURL)

                const totalStore = $rdf.graph()
                totalStore.addAll(ontoStore.statements)
                totalStore.addAll(shaclStore.statements)

                this.og = new OntoGlimpse(totalStore)

                this.og.__formatter.format = 'html'
                this.og.__formatter.syntax = 'manchester'
                this.og.__formatter.useLabel = true

                // TODO: capture that in classes
                this.classes = this.og.classes().map((cl) => ({
                    name: cl.name,
                    iri: cl.iri,
                    equivalentClass: cl.equivalentClass(),
                    subClassOf: cl.subClassOf(),
                    superClassOf: cl.superClassOf(),
                    domainOf: cl.domainOf(),
                    rangeOf: cl.rangeOf(),
                    comment: cl.comment(),
                    showSpecific: [...cl.subClassOf(), ...cl.superClassOf(), ...cl.domainOf(), ...cl.rangeOf(), ...cl.equivalentClass()]
                }))


                this.objectProperties = this.og.objectProperties().map((op) =>
                ({
                    name: op.name,
                    iri: op.iri,
                    subPropertyOf: op.subPropertyOf(),
                    superPropertyOf: op.superPropertyOf(),
                    domain: op.domain(),
                    range: op.range(),
                    comment: op.comment(),
                    showSpecific: [...op.subPropertyOf(), ...op.superPropertyOf(), ...op.domain(), ...op.range()]

                }))




                this.meta = this.og.metadata()



            } catch (error) {

            } finally {
                this.isLoading = false
            }
        }
    }
})

// export const useOntologyStore = defineStore('ontology', async () => {

// ontology URL
// const ontologyURL = 'https://raw.githubusercontent.com/cl-tud/kimeds-ontology/main/kimeds-ontology.owl'
// const timeout = 5000
// const store = $rdf.graph()

// TODO: use fetcher (the rdflib functionality out of the box) to load the ontology from the web instead

// const fetcher = new $rdf.Fetcher(store, timeout)
// await fetcher.load(ontologyURL)




// fetcher.nowOrWhenFetched(ontologyURL, (ok, body, response) => {
//     if (!ok)
//         console.log("Oops, something happened and couldn't fetch data " + body);
//     else if (response.onErrorWasCalled || response.status !== 200) {
//         console.log('    Non-HTTP error reloading data! onErrorWasCalled=' + response.onErrorWasCalled + ' status: ' + response.status)
//     } else {
//         debugger
//         console.log("---data loaded---")
//     }
// })


// await fetch(ontologyURL)
//     .then(function (response) {
//         return response.text();
//     })
//     .then(function (data) {
//         // Handle the data here
//         // console.log(data);

//         // debugger

//         const mime = 'text/turtle'
//         const base_uri = 'http://example.com/ontology#'

//         $rdf.parse(data, store, base_uri, mime)

//     })
//     .catch(function (error) {
//         // Handle any errors here
//         console.log('Error: ', error);
//     });

// const og = ref(new OntoGlimpse(store))
// const x = ref(0)

// debugger

// const count = ref(0)

// return { count }

// return { og, x }
// })