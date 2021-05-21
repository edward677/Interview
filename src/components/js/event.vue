<template>
<div class="event_warp">
  <el-collapse accordion>
    <el-collapse-item title="1. 事件是什么？事件模型？">
      <p>事件是用户操作网页时发生的交互动作，比如 click/move， 事件除了用户触发的动作外，还可以是文档加载，窗口滚动和大小调整。事件被封装成一个 event 对象，包含了该事件发生时的所有相关信息（ event 的属性）以及可以对事件进行的操作（ event 的方法）。</p>
      <p>事件是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型：</p>
      <ul>
        <li><strong>DOM0 级事件模型</strong>，这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js 属性来指定监听函数。这种方式是所有浏览器都兼容的。</li>
        <li><strong>IE 事件模型</strong>，在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。</li>
        <li><strong>DOM2 级事件模型</strong>，在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="2. 如何阻止事件冒泡">
      <ul>
        <li>普通浏览器使用：event.stopPropagation()</li>
        <li>IE浏览器使用：event.cancelBubble = true;</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="3. 对事件委托的理解">
      <h4 data-id="heading-61">（1）事件委托的概念</h4>
      <p>事件委托本质上是利用了浏览器<strong>事件冒泡</strong>的机制。因为事件在冒泡过程中会上传到父节点，并且父节点可以通过事件对象获取到目标节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理。</p>
      <p>使用事件代理可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理还可以实现事件的动态绑定，比如说新增了一个子节点，并不需要单独地为它添加一个监听事件，它所发生的事件会交给父元素中的监听函数来处理。</p>
      <h4 data-id="heading-62">（2）事件委托的特点</h4>
      <ul>
        <li>减少内存消耗</li>
      </ul>
      <p>试想一下，如果有一个列表，列表之中有大量的列表项，需要在点击列表项的时候响应一个事件；</p>
      <pre><code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"list"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item 3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  ......
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>item n<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
// ...... 代表中间还有未知数个 li
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的，效率上需要消耗很多性能；
        因此，比较好的方法就是把这个点击事件绑定到他的父层，也就是 <code>ul</code> 上，然后在执行事件的时候再去匹配判断目标元素；
        所以事件委托可以减少大量的内存消耗，节约效率。</p>
      <ul>
        <li>动态绑定事件</li>
      </ul>
      <p>比如上述的例子中列表项就几个，给每个列表项都绑定了事件；在很多时候，需要通过 AJAX 或者用户操作动态的增加或者去除列表项元素，那么在每一次改变的时候都需要重新给新增的元素绑定事件，给即将删去的元素解绑事件；如果用了事件委托就没有这种麻烦了，因为事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的；所以使用事件在动态绑定事件的情况下是可以减少很多重复工作的。</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 来实现把 #list 下的 li 元素的事件代理委托到它的父层元素也就是 #list 上：</span>
<span class="hljs-comment">// 给父层元素绑定事件</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'list'</span>).addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-comment">// 兼容性处理</span>
  <span class="hljs-keyword">var</span> event = e || <span class="hljs-built_in">window</span>.event;
  <span class="hljs-keyword">var</span> target = event.target || event.srcElement;
  <span class="hljs-comment">// 判断是否匹配目标元素</span>
  <span class="hljs-keyword">if</span> (target.nodeName.toLocaleLowerCase === <span class="hljs-string">'li'</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'the content is: '</span>, target.innerHTML);
  }
});
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>在上述代码中， target 元素则是在 #list 元素之下具体被点击的元素，然后通过判断 target 的一些属性（比如：nodeName，id 等等）可以更精确地匹配到某一类 #list li 元素之上；</p>
      <h4 data-id="heading-63">（3）局限性</h4>
      <p>当然，事件委托也是有一定局限性的；
        比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托；
        mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的；</p>
      <p>当然事件委托不是只有优点，它也是有<strong>缺点</strong>的，事件委托会影响页面性能，主要影响因素有：</p>
      <ul>
        <li>元素中，绑定事件委托的次数；</li>
        <li>点击的最底层元素，到绑定事件元素之间的<code>DOM</code>层数；</li>
      </ul>
      <p>所以，在必须使用事件委托的地方，可以如下的处理：</p>
      <ul>
        <li>只在必须的地方，使用事件委托，比如：<code>ajax</code>的局部刷新区域</li>
        <li>尽量的减少绑定的层级，不在<code>body</code>元素上，进行绑定</li>
        <li>减少绑定的次数，如果可以，那么把多个事件的绑定，合并到一次事件委托中去，由这个事件委托的回调，来进行分发。</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="4. 事件委托的使用场景">
      <p>有一个场景就是要给页面的所有的a标签添加click事件，代码如下：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
	<span class="hljs-keyword">if</span> (e.target.nodeName == <span class="hljs-string">"A"</span>)
		<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"a"</span>);
}, <span class="hljs-literal">false</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="5. 同步和异步的区别">
      <ul>
        <li>同步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，那么这个进程会一直等待下去，直到消息返回为止再继续向下执行。</li>
        <li>异步指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，这个时候进程会继续往下执行，不会阻塞等待消息的返回，当消息返回时系统再通知进程进行处理。</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="6. 对事件循环的理解">
      <p>因为 js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。在执行同步代码的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。任务队列可以分为宏任务对列和微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事件压入栈中执行。当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。</p>
    </el-collapse-item>
    <el-collapse-item title="7. 宏任务和微任务分别有哪些">
      <ul>
        <li>微任务包括： promise 的回调、node 中的 process.nextTick 、对 Dom 变化监听的 MutationObserver。</li>
        <li>宏任务包括： script 脚本的执行、setTimeout ，setInterval ，setImmediate 一类的定时事件，还有如 I/O 操作、UI 渲染等。</li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
