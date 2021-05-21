<template>
  <div class="vue_warp">
    <el-tabs>
      <el-tab-pane label="基础" ><basis/></el-tab-pane>
      <el-tab-pane label="生命周期" ><left/></el-tab-pane>
      <el-tab-pane label="组件通信" ><communication/></el-tab-pane>
      <el-tab-pane label="路由"><route/></el-tab-pane>
      <el-tab-pane label="vuex"><vuex/></el-tab-pane>
      <el-tab-pane label="网络"><vuex/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import basis from '../components/vue/basis'
import left from '../components/vue/lifeCycle'
import route from '../components/vue/route'
import vuex from '../components/vue/Vuex'
import communication from '../components/vue/communication'

export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  components: {
    basis,
    left,
    communication,
    route,
    vuex
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
