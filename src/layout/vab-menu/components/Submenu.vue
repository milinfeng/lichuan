<template>
  <a-sub-menu class="sub-Text" :key="item.fullPath">
    <template v-slot:title>
      <span class="anticon">
        <vab-icon class="sub-icon" :icon="item.meta.icon"></vab-icon>
      </span>
      <span class="sub-title">{{ item.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script>
  import VabIcon from '@/layout/vab-icon'
  export default {
    name: 'Submenu',
    components: { VabIcon },
    props: {
      item: {
        type: Object,
        default() {
          return null
        },
      },
      routeChildren: {
        type: Object,
        default() {
          return null
        },
      },
    },
  }
</script>

<style lang="less">


      
</style>
