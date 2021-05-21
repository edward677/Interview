<template>
  <div class="Browser_warp">
    <el-tabs>
      <el-tab-pane label="浏览器安全" ><browser-security/></el-tab-pane>
      <el-tab-pane label="进程与线程" ><process-and-thread/></el-tab-pane>
      <el-tab-pane label="浏览器缓存" ><browserCache/></el-tab-pane>
      <el-tab-pane label="浏览器内核" ><rowser-kernel/></el-tab-pane>
      <el-tab-pane label="浏览器的渲染过程" ><rendering-process/></el-tab-pane>
      <el-tab-pane label="浏览器本地存储" ><local-storage/></el-tab-pane>
      <el-tab-pane label="浏览器跨域" ><cross-domain/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import crossDomain from '../components/Browser/crossDomain'
import localStorage from '../components/Browser/localStorage'
import renderingProcess from '../components/Browser/renderingProcess'
import rowserKernel from '../components/Browser/rowserKernel'
import processAndThread from '../components/Browser/processAndThread'
import browserCache from '../components/Browser/browserCache'
import browserSecurity from '../components/Browser/browserSecurity'
// browserSecurity

export default {
  components: {
    crossDomain,
    localStorage,
    renderingProcess,
    rowserKernel,
    processAndThread,
    browserCache,
    browserSecurity
  }
}
</script>

<style lang="less" scoped>

</style>
