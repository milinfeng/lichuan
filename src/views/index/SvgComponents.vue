<!--svg 组件模块s-->
<template>
  <component :is="component_prop.type" :prop_data="component_prop"></component>
</template>

<script>
  let importComponents = {}

  export default {
    props: ['svgInfoData', 'component_prop'],
    data() {
      return {
        componentTag: '',
      }
    },
    components: importComponents,
    methods: {},
    created() {
      // 原电气组件
      this.svgInfoData.forEach((f) => {
        let componentInfo = {
          template: f.template,
          props: f.props,
        }
        importComponents[f.type] = componentInfo // 按电气元件类型进行划分svg
      })
      console.log(this.component_prop)
    },
  }
</script>
<style scoped></style>
