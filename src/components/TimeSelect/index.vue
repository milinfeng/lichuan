<template>
    <div>
      <a-button @click="$emit('time-selected', 'day')">日</a-button>
      <a-button @click="$emit('time-selected', 'month')">月</a-button>
      <a-button @click="$emit('time-selected', 'year')">年</a-button>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
