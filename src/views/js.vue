<template>
  <div class="js_warp">
    <el-tabs>
      <el-tab-pane label="基础" ><basis/></el-tab-pane>
      <el-tab-pane label="数据类型" ><type-of-data/></el-tab-pane>
      <el-tab-pane label="ES6"><es6/></el-tab-pane>
      <el-tab-pane label="事件"><event/></el-tab-pane>
      <el-tab-pane label="原型"><prototype/></el-tab-pane>
      <el-tab-pane label="上下文/作用域/闭包"><context/></el-tab-pane>
      <el-tab-pane label="this/call/apply/bind"><this/></el-tab-pane>
      <el-tab-pane label="异步"><asynchronous/></el-tab-pane>
      <el-tab-pane label="异步代码"><asynchronous-code/></el-tab-pane>
      <el-tab-pane label="面向对象"><object1/></el-tab-pane>
      <el-tab-pane label="垃圾回收与内存泄漏"><garbage-collection/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import basis from '../components/js/basis'
import event from '../components/js/event'
import prototype from '../components/js/prototype'
import typeOfData from '../components/js/typeOfData'
import context from '../components/js/context'
import This from '../components/js/this'
import Es6 from '../components/js/es6'
import asynchronous from '../components/js/asynchronous'
import asynchronousCode from '../components/js/asynchronousCode'
import object1 from '../components/js/object'
import garbageCollection from '../components/js/garbageCollection'

export default {
  components: {
    basis,
    event,
    prototype,
    typeOfData,
    context,
    This,
    Es6,
    asynchronous,
    asynchronousCode,
    object1,
    garbageCollection
  }
}
</script>

<style lang="less" scoped>
::v-deep(.el-tabs__item) {
  padding: 0 15px;
}
</style>
