<template>
  <div class="context_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 执行上下文类型">
        <p><strong>（1）全局执行上下文</strong>
          任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文。
          <strong>（2）函数执行上下文</strong>
          当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。
          <strong>（3）<code>eval</code>函数执行上下文</strong>
          执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用，不做介绍。</p>
      </el-collapse-item>
      <el-collapse-item title="2. 执行上下文栈">
        <ul>
          <li>JavaScript引擎使用执行上下文栈来管理执行上下文</li>
          <li>当JavaScript执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用，就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> a = <span class="hljs-string">'Hello World!'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">first</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Inside first function'</span>);
  second();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Again inside first function'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">second</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Inside second function'</span>);
}
first();
<span class="hljs-comment">//执行顺序</span>
<span class="hljs-comment">//先执行second(),在执行first()</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="3. 创建执行上下文">
        <p>创建执行上下文有两个阶段：<strong>创建阶段</strong>和<strong>执行阶段</strong>
          <strong>1）创建阶段</strong>
          （1）this绑定</p>
        <ul>
          <li>在全局执行上下文中，this指向全局对象（window对象）</li>
          <li>在函数执行上下文中，this指向取决于函数如何调用。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined</li>
        </ul>
        <p>（2）创建词法环境组件</p>
        <ul>
          <li>词法环境是一种有<strong>标识符——变量映射</strong>的数据结构，标识符是指变量/函数名，变量是对实际对象或原始数据的引用。</li>
          <li>词法环境的内部有两个组件：
            <strong>加粗样式</strong>：环境记录器:用来储存变量个函数声明的实际位置
            <strong>外部环境的引用</strong>：可以访问父级作用域</li>
        </ul>
        <p>（3）创建变量环境组件</p>
        <ul>
          <li>变量环境也是一个词法环境，其环境记录器持有变量声明语句在执行上下文中创建的绑定关系。</li>
        </ul>
        <p><strong>2）执行阶段</strong>
          此阶段会完成对变量的分配，最后执行完代码。
          <strong>简单来说执行上下文就是指：</strong>
          在执行一点JS代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。这一步执行完了，才开始正式的执行程序。
          在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。</p>
        <ul>
          <li>全局上下文：变量定义，函数声明</li>
          <li>函数上下文：变量定义，函数声明，<code>this</code>，<code>arguments</code></li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
