<template>
    <span>

        <a v-if="person.url" :href="person.url">{{ person.name }}</a>
        <span v-else>{{ person.name }}</span>

        <span v-if="person.affiliation">
            (<a v-if="person.affiliation.url" :href="person.affiliation.url">{{ person.affiliation.name }}</a>
            <span v-else>{{person.affiliation.name}}</span>)
            
        </span>

    </span>
</template>

<script>
export default {
    props: {
        person: undefined
    }
}
</script>

<style scoped></style>


