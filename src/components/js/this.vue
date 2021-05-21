<template>
  <div class="this_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 谈谈对this的理解">
        <p>this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。</p>
        <ul>
          <li>第一种是<strong>函数调用模式</strong>，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。</li>
          <li>第二种是<strong>方法调用模式</strong>，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。</li>
          <li>第三种是<strong>构造器调用模式</strong>，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。</li>
          <li>第四种是 <strong>apply 、 call 和 bind 调用模式</strong>，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。</li>
        </ul>
        <p>这四种方式，使用构造器调用模式的优先级最高，然后是 apply 、 call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。</p>
      </el-collapse-item>
      <el-collapse-item title="2. call() 和 apply() 的区别？">
        <p>它们的作用一模一样，区别仅在于传入参数的形式的不同。</p>
        <ul>
          <li>apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数。</li>
          <li>call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="3. 实现call、apply 及 bind 函数">
        <p><strong>（1）call 函数的实现步骤：</strong></p>
        <ul>
          <li>判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。</li>
          <li>判断传入上下文对象是否存在，如果不存在，则设置为 window 。</li>
          <li>处理传入的参数，截取第一个参数后的所有参数。</li>
          <li>将函数作为上下文对象的一个属性。</li>
          <li>使用上下文对象来调用这个方法，并保存返回结果。</li>
          <li>删除刚才新增的属性。</li>
          <li>返回结果。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Function</span>.prototype.myCall = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
  <span class="hljs-comment">// 判断调用对象</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">this</span> !== <span class="hljs-string">"function"</span>) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"type error"</span>);
  }
  <span class="hljs-comment">// 获取参数</span>
  <span class="hljs-keyword">let</span> args = [...arguments].slice(<span class="hljs-number">1</span>),
    result = <span class="hljs-literal">null</span>;
  <span class="hljs-comment">// 判断 context 是否传入，如果未传入则设置为 window</span>
  context = context || <span class="hljs-built_in">window</span>;
  <span class="hljs-comment">// 将调用函数设为对象的方法</span>
  context.fn = <span class="hljs-built_in">this</span>;
  <span class="hljs-comment">// 调用函数</span>
  result = context.fn(...args);
  <span class="hljs-comment">// 将属性删除</span>
  <span class="hljs-keyword">delete</span> context.fn;
  <span class="hljs-keyword">return</span> result;
};
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（2）apply 函数的实现步骤：</strong></p>
        <ul>
          <li>判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。</li>
          <li>判断传入上下文对象是否存在，如果不存在，则设置为 window 。</li>
          <li>将函数作为上下文对象的一个属性。</li>
          <li>判断参数值是否传入</li>
          <li>使用上下文对象来调用这个方法，并保存返回结果。</li>
          <li>删除刚才新增的属性</li>
          <li>返回结果</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Function</span>.prototype.myApply = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
  <span class="hljs-comment">// 判断调用对象是否为函数</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">this</span> !== <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Error"</span>);
  }
  <span class="hljs-keyword">let</span> result = <span class="hljs-literal">null</span>;
  <span class="hljs-comment">// 判断 context 是否存在，如果未传入则为 window</span>
  context = context || <span class="hljs-built_in">window</span>;
  <span class="hljs-comment">// 将函数设为对象的方法</span>
  context.fn = <span class="hljs-built_in">this</span>;
  <span class="hljs-comment">// 调用方法</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]) {
    result = context.fn(...arguments[<span class="hljs-number">1</span>]);
  } <span class="hljs-keyword">else</span> {
    result = context.fn();
  }
  <span class="hljs-comment">// 将属性删除</span>
  <span class="hljs-keyword">delete</span> context.fn;
  <span class="hljs-keyword">return</span> result;
};
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（3）bind 函数的实现步骤：</strong></p>
        <ul>
          <li>判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。</li>
          <li>保存当前函数的引用，获取其余传入参数值。</li>
          <li>创建一个函数返回</li>
          <li>函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Function</span>.prototype.myBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">context</span>) </span>{
  <span class="hljs-comment">// 判断调用对象是否为函数</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">this</span> !== <span class="hljs-string">"function"</span>) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Error"</span>);
  }
  <span class="hljs-comment">// 获取参数</span>
  <span class="hljs-keyword">var</span> args = [...arguments].slice(<span class="hljs-number">1</span>),
    fn = <span class="hljs-built_in">this</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 根据调用方式，传入不同绑定值</span>
    <span class="hljs-keyword">return</span> fn.apply(
      <span class="hljs-built_in">this</span> <span class="hljs-keyword">instanceof</span> Fn ? <span class="hljs-built_in">this</span> : context,
      args.concat(...arguments)
    );
  };
};
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
