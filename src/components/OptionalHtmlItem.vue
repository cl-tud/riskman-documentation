<template>
    <div v-if="objects.length > 0">
        <h5>{{ name }}:</h5>
        <ul>
            <li v-for="(item, index) in objects" :key="index">
                <span v-html="item"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        name: 'Item name',
        objects: {
            type: Array,
            default: []
        }
    }
}
</script>

<style scoped></style>


