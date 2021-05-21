<template>
  <div class="lifeCycle_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 简单说一下Vue的生命周期">
        <ol>
          <li><strong>beforeCreate（创建前）</strong>：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。</li>
          <li><strong>created（创建后）</strong> ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 <code>$el</code> 属性。</li>
          <li><strong>beforeMount（挂载前）</strong>：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置∶ 编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。</li>
          <li><strong>mounted（挂载后）</strong>：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互。</li>
          <li><strong>beforeUpdate（更新前）</strong>：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染</li>
          <li><strong>updated（更新后）</strong> ：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。</li>
          <li><strong>beforeDestroy（销毁前）</strong>：实例销毁之前调用。这一步，实例仍然完全可用，<code>this</code> 仍能获取到实例。</li>
          <li><strong>destroyed（销毁后）</strong>：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。
            <a name="user-content-n8AQG"></a></li>
        </ol>
      </el-collapse-item>
      <el-collapse-item title="2. Vue 的父组件和子组件生命周期钩子执行顺序是什么">
        <ul>
          <li>首次加载渲染过程： <code>父beforeCreate-&gt;父created-&gt;父beforeMount-&gt;子beforeCreate-&gt;子created-&gt;子beforeMount-&gt;子mounted-&gt;父mounted</code></li>
          <li>子组件更新过程： <code>父beforeUpdate-&gt;子beforeUpdate-&gt;子updated-&gt;父updated</code></li>
          <li>父组件更新过程： <code>父beforeUpdate-&gt;父updated</code></li>
          <li>销毁过程： <code>父beforeDestroy-&gt;子beforeDestroy-&gt;子destroyed-&gt;父destroyed</code>
            <a name="user-content-L5qoK"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="3. Vue 子组件和父组件执行顺序">
        <p><strong>加载渲染过程：</strong></p>
        <p>1.父组件 beforeCreate</p>
        <p>2.父组件 created</p>
        <p>3.父组件 beforeMount</p>
        <p>4.子组件 beforeCreate</p>
        <p>5.子组件 created</p>
        <p>6.子组件 beforeMount</p>
        <p>7.子组件 mounted</p>
        <p>8.父组件 mounted</p>
        <p><strong>更新过程：</strong></p>
        <p>1.父组件 beforeUpdate</p>
        <p>2.子组件 beforeUpdate</p>
        <p>3.子组件 updated</p>
        <p>4.父组件 updated</p>
        <p><strong>销毁过程：</strong></p>
        <p>1.父组件 beforeDestroy</p>
        <p>2.子组件 beforeDestroy</p>
        <p>3.子组件 destroyed</p>
        <p>4.父组件 destoryed
          <a name="user-content-XOTp0"></a></p>
      </el-collapse-item>
      <el-collapse-item title="4. created和mounted的区别">
        <ul>
          <li>created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。</li>
          <li>mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
            <a name="user-content-5."></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="5. 接口请求一般放在哪个生命周期中？">
        <ul>
          <li>
            <p>可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。</p>
          </li>
          <li>
            <p>但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：</p>
            <ul>
              <li>能更快获取到服务端数据，减少页面loading 时间；</li>
              <li>ssr不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；
                <a name="user-content-CQc9F"></a></li>
            </ul>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
