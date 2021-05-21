<template>
  <div class="optimization_warp">
    <el-tabs>
      <el-tab-pane label="CDN" ><cdn/></el-tab-pane>
      <el-tab-pane label="懒加载" ><lazy-loading/></el-tab-pane>
      <el-tab-pane label="回流和重绘" ><repaint/></el-tab-pane>
      <el-tab-pane label="节流防抖" ><Throttling/></el-tab-pane>
      <el-tab-pane label="图片优化" ><Optimization/></el-tab-pane>
      <el-tab-pane label="Webpack优化" ><webpack/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cdn from '../components/optimization/CDN'
import lazyLoading from '../components/optimization/lazyLoading'
import Repaint from '../components/optimization/Repaint'
import Throttling from '../components/optimization/Throttling'
import Optimization from '../components/optimization/Optimization'
import webpack from '../components/optimization/Webpack'
// Webpack
export default {
  components: {
    cdn,
    lazyLoading,
    Repaint,
    Throttling,
    Optimization,
    webpack
  }
}
</script>

<style lang="less" scoped>

</style>
