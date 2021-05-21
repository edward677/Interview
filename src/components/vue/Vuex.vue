<template>
  <div class="Vuex_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. Vuex 的原理以及自己的理解">
        <p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。</p>
        <ul>
          <li>Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。</li>
          <li>改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。</li>
        </ul>
        <p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03320f926f804239858a7654a40c6c71~tplv-k3u1fbpfcp-zoom-1.image" alt="b025e120ca3d0bd2ded3d038d58cacf4.jpg" loading="lazy" class="medium-zoom-image">
          Vuex为Vue Components建立起了一个完整的生态圈，包括开发中的API调用一环。</p>
        <p><strong>（1）核心流程中的主要功能：</strong></p>
        <ul>
          <li>Vue Components 是 vue 组件，组件会触发（dispatch）一些事件或动作，也就是图中的 Actions;</li>
          <li>在组件中发出的动作，肯定是想获取或者改变数据的，但是在 vuex 中，数据是集中管理的，我们不能直接去更改数据，所以会把这个动作提交（Commit）到 Mutations 中;</li>
          <li>然后 Mutations 就去改变（Mutate）State 中的数据;</li>
          <li>当 State 中的数据被改变之后，就会重新渲染（Render）到 Vue Components 中去，组件展示更新后的数据，完成一个流程。</li>
        </ul>
        <p><strong>（2）各模块在核心流程中的主要功能：</strong></p>
        <ul>
          <li><code>Vue Components</code>∶ Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。</li>
          <li><code>dispatch</code>∶操作行为触发方法，是唯一能执行action的方法。</li>
          <li><code>actions</code>∶ 操作行为处理模块。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。</li>
          <li><code>commit</code>∶状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。</li>
          <li><code>mutations</code>∶状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。</li>
          <li><code>state</code>∶ 页面状态管理容器对象。集中存储Vuecomponents中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。</li>
          <li><code>getters</code>∶ state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。
            <a name="user-content-cElon"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. Vuex中action和mutation的区别">
        <p>mutation中的操作是一系列的同步函数，用于修改state中的变量的的状态。当使用vuex时需要通过commit来提交我们需要操作的内容。mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
  },
  <span class="hljs-attr">mutations</span>: {
    increment (state) {
      state.count++      <span class="hljs-comment">// 变更状态</span>
    }
  }
})
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
