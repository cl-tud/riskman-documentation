<template>
    <div>
        <h2>{{ name }}:</h2>
        <div class="info">
            <slot name="info"></slot>
        </div>
        <hr>
    </div>
</template>

<style scoped>
.info {
    margin: 10px 20px;
}

hr {
    margin: 20px 0;
    border: 0;
    /* Remove default border */
    border-top: 0.5px solid white;
    margin: 20px 0;
}
</style>

<script>
export default {
    props: {
        name: 'Name'
    },
}
</script>