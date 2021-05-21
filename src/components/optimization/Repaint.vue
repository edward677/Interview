<template>
  <div class="Repaint_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 回流与重绘的概念及触发条件">
        <h4 data-id="heading-14">（1）回流</h4>
        <p>当渲染树中部分或者全部元素的尺寸、结构或者属性发生变化时，浏览器会重新渲染部分或者全部文档的过程就称为<strong>回流</strong>。</p>
        <p>下面这些操作会导致回流：</p>
        <ul>
          <li>页面的首次渲染</li>
          <li>浏览器的窗口大小发生变化</li>
          <li>元素的内容发生变化</li>
          <li>元素的尺寸或者位置发生变化</li>
          <li>元素的字体大小发生变化</li>
          <li>激活CSS伪类</li>
          <li>查询某些属性或者调用某些方法</li>
          <li>添加或者删除可见的DOM元素</li>
        </ul>
        <p>在触发回流（重排）的时候，由于浏览器渲染页面是基于流式布局的，所以当触发回流时，会导致周围的DOM元素重新排列，它的影响范围有两种：</p>
        <ul>
          <li>全局范围：从根节点开始，对整个渲染树进行重新布局</li>
          <li>局部范围：对渲染树的某部分或者一个渲染对象进行重新布局</li>
        </ul>
        <h4 data-id="heading-15">（2）重绘</h4>
        <p>当页面中某些元素的样式发生变化，但是不会影响其在文档流中的位置时，浏览器就会对元素进行重新绘制，这个过程就是<strong>重绘</strong>。</p>
        <p>下面这些操作会导致回流：</p>
        <ul>
          <li>color、background 相关属性：background-color、background-image 等</li>
          <li>outline 相关属性：outline-color、outline-width 、text-decoration</li>
          <li>border-radius、visibility、box-shadow</li>
        </ul>
        <p>注意： <strong>当触发回流时，一定会触发重绘，但是重绘不一定会引发回流。</strong></p>
      </el-collapse-item>
      <el-collapse-item title="2. 如何避免回流与重绘？">
        <p><strong>减少回流与重绘的措施：</strong></p>
        <ul>
          <li>操作DOM时，尽量在低层级的DOM节点进行操作</li>
          <li>不要使用<code>table</code>布局， 一个小的改动可能会使整个<code>table</code>进行重新布局</li>
          <li>使用CSS的表达式</li>
          <li>不要频繁操作元素的样式，对于静态页面，可以修改类名，而不是样式。</li>
          <li>使用absolute或者fixed，使元素脱离文档流，这样他们发生变化就不会影响其他元素</li>
          <li>避免频繁操作DOM，可以创建一个文档片段<code>documentFragment</code>，在它上面应用所有DOM操作，最后再把它添加到文档中</li>
          <li>将元素先设置<code>display: none</code>，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。</li>
          <li>将DOM的多个读操作（或者写操作）放在一起，而不是读写操作穿插着写。这得益于<strong>浏览器的渲染队列机制</strong>。</li>
        </ul>
        <p>浏览器针对页面的回流与重绘，进行了自身的优化——<strong>渲染队列</strong></p>
        <p><strong>浏览器会将所有的回流、重绘的操作放在一个队列中，当队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会对队列进行批处理。这样就会让多次的回流、重绘变成一次回流重绘。</strong></p>
        <p>上面，我们将多个读操作（或者写操作）放在一起，就会等所有的读操作进入队列之后执行，这样，原本应该是触发多次回流，变成了只触发一次回流。</p>
      </el-collapse-item>
      <el-collapse-item title="3. 如何优化动画？">
        <p>对于如何优化动画，我们知道，一般情况下，动画需要频繁的操作DOM，就就会导致页面的性能问题，我们可以将动画的<code>position</code>属性设置为<code>absolute</code>或者<code>fixed</code>，将动画脱离文档流，这样他的回流就不会影响到页面了。</p>
      </el-collapse-item>
      <el-collapse-item title="4. documentFragment 是什么？用它跟直接操作 DOM 的区别是什么？">
        <p>MDN中对<code>documentFragment</code>的解释：</p>
        <blockquote>
          <p>DocumentFragment，文档片段接口，一个没有父对象的最小文档对象。它被作为一个轻量版的 Document使用，就像标准的document一样，存储由节点（nodes）组成的文档结构。与document相比，最大的区别是DocumentFragment不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。</p>
        </blockquote>
        <p>当我们把一个 DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点。</p>
        <p>在频繁的DOM操作时，我们就可以将DOM元素插入DocumentFragment，之后一次性的将所有的子孙节点插入文档中。</p>
        <p>和直接操作DOM相比，将DocumentFragment 节点插入DOM树时，不会触发页面的重绘，这样就大大提高了页面的性能。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
