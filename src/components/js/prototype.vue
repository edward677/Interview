<template>
<div class="prototype_warp">
  <el-collapse accordion>
    <el-collapse-item title="1. 对原型、原型链的理解">
      <p>在JavaScript中使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说不应该能够获取到这个值的，但是现在浏览器中都实现了 <strong>proto</strong> 属性来访问这个属性，但是最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，可以通过这个方法来获取对象的原型。</p>
      <p>当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是新建的对象为什么能够使用 toString() 等方法的原因。</p>
      <p>特点：
        JavaScript 对象是通过引用来传递的，创建的每个新对象实体中并没有一份属于自己的原型副本。当修改原型时，与之相关的对象也会继承这一改变。</p>
    </el-collapse-item>
    <el-collapse-item title="2. 原型修改、重写">
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-built_in">this</span>.name = name
}
<span class="hljs-comment">// 修改原型</span>
Person.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'hello'</span>)
<span class="hljs-built_in">console</span>.log(p.__proto__ === Person.prototype) <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(p.__proto__ === p.constructor.prototype) <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 重写原型</span>
Person.prototype = {
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'hello'</span>)
<span class="hljs-built_in">console</span>.log(p.__proto__ === Person.prototype)        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(p.__proto__ === p.constructor.prototype) <span class="hljs-comment">// false</span>
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="3. 原型链指向">
      <pre><code class="hljs language-javascript copyable" lang="javascript">Person.prototype = {
    <span class="hljs-attr">getName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'hello'</span>)
p.constructor = Person
<span class="hljs-built_in">console</span>.log(p.__proto__ === Person.prototype)        <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(p.__proto__ === p.constructor.prototype) <span class="hljs-comment">// true</span>

<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="4. 原型链的终点是什么？如何打印出原型链的终点？">
      <p>由于<code>Object</code>是构造函数，原型链终点是<code>Object.prototype.__proto__</code>，而<code>Object.prototype.__proto__=== null // true</code>，所以，原型链的终点是<code>null</code>
        原型链上的所有原型都是对象，所有的对象最终都是由<code>Object</code>构造的，而<code>Object.prototype</code>的下一级是<code>Object.prototype.__proto__</code>。
        <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d40a3ff5648431e8da2726d3d4bebe5~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述" loading="lazy" class="medium-zoom-image"></p>
    </el-collapse-item>
    <el-collapse-item title="5. 如何获得对象非原型链上的属性？">
      <p>使用后<code>hasOwnProperty()</code>方法来判断属性是否属于原型链的属性：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iterate</span>(<span class="hljs-params">obj</span>)</span>{
   <span class="hljs-keyword">var</span> res=[];
   <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj){
        <span class="hljs-keyword">if</span>(obj.hasOwnProperty(key))
           res.push(key+<span class="hljs-string">': '</span>+obj[key]);
   }
   <span class="hljs-keyword">return</span> res;
}
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="6. 下面代码的输出结果">
     <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-built_in">this</span>.name = name
}
<span class="hljs-keyword">var</span> p2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'king'</span>);
<span class="hljs-built_in">console</span>.log(p2.__proto__) <span class="hljs-comment">//Person.prototype</span>
<span class="hljs-built_in">console</span>.log(p2.__proto__.__proto__) <span class="hljs-comment">//Object.prototype</span>
<span class="hljs-built_in">console</span>.log(p2.__proto__.__proto__.__proto__) <span class="hljs-comment">// null</span>
<span class="hljs-built_in">console</span>.log(p2.__proto__.__proto__.__proto__.__proto__)<span class="hljs-comment">//null后面没有了，报错</span>
<span class="hljs-built_in">console</span>.log(p2.__proto__.__proto__.__proto__.__proto__.__proto__)<span class="hljs-comment">//null后面没有了，报错</span>
<span class="hljs-built_in">console</span>.log(p2.constructor)<span class="hljs-comment">//Person</span>
<span class="hljs-built_in">console</span>.log(p2.prototype)<span class="hljs-comment">//undefined p2是实例，没有prototype属性</span>
<span class="hljs-built_in">console</span>.log(Person.constructor)<span class="hljs-comment">//Function 一个空函数</span>
<span class="hljs-built_in">console</span>.log(Person.prototype)<span class="hljs-comment">//打印出Person.prototype这个对象里所有的方法和属性</span>
<span class="hljs-built_in">console</span>.log(Person.prototype.constructor)<span class="hljs-comment">//Person</span>
<span class="hljs-built_in">console</span>.log(Person.prototype.__proto__)<span class="hljs-comment">// Object.prototype</span>
<span class="hljs-built_in">console</span>.log(Person.__proto__) <span class="hljs-comment">//Function.prototype</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Function</span>.prototype.__proto__)<span class="hljs-comment">//Object.prototype</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Function</span>.__proto__)<span class="hljs-comment">//Function.prototype</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.__proto__)<span class="hljs-comment">//Function.prototype</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Object</span>.prototype.__proto__)<span class="hljs-comment">//null</span>
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="7. 下面代码的输出结果">
<pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-built_in">this</span>.name = <span class="hljs-string">'puppy'</span>
}
Dog.prototype.bark = <span class="hljs-function">() =&gt;</span> {
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'woof!woof!'</span>)
}
<span class="hljs-keyword">const</span> dog = <span class="hljs-keyword">new</span> Dog()
<span class="hljs-built_in">console</span>.log(Dog.prototype.constructor === Dog &amp;&amp; dog.constructor === Dog &amp;&amp; dog <span class="hljs-keyword">instanceof</span> Dog)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><strong>打印出：true</strong></p>
      <p>因为constructor是prototype上的属性，所以dog.constructor实际上就是指向Dog.prototype.constructor；constructor属性指向构造函数。instanceof而实际检测的是类型是否在实例的原型链上。</p>
      <p>constructor是prototype上的属性，这一点很容易被忽略掉。constructor和instanceof 的作用是不同的，感性地来说，constructor的限制比较严格，它只能严格对比对象的构造函数是不是指定的值；而instanceof比较松散，只要检测的类型在原型链上，就会返回true。</p>
    </el-collapse-item>
    <el-collapse-item title="8. 下面代码的输出结果">
<pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">this</span>.name = <span class="hljs-string">'puppy'</span>
}
Dog.prototype.bark = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'woof!woof!'</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BigDog</span>(<span class="hljs-params"></span>) </span>{}
BigDog.prototype = <span class="hljs-keyword">new</span> Dog()
<span class="hljs-keyword">const</span> bigDog = <span class="hljs-keyword">new</span> BigDog()
<span class="hljs-built_in">console</span>.log(bigDog.constructor === BigDog)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><strong>打印出：false</strong></p>
      <p>因为bigDog的原型是Dog的实例，所以访问bigDog.constructor时实际访问的是Dog.prototype.constructor，也就是Dog。所以 bigDog.constructor === Dog，这样才会打印出true。</p>
      <p>这个例子证明了单纯用constructor来判断实例的类型是有隐患的，因为bigDog.constructor === BigDog是false，就说明无法用constructor来准确判断bigDog一个实例的类型。</p>
      <p>可以这样修改：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dog</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">this</span>.name = <span class="hljs-string">'puppy'</span>
}
Dog.prototype.bark = <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'woof!woof!'</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BigDog</span>(<span class="hljs-params"></span>) </span>{}
BigDog.prototype = <span class="hljs-keyword">new</span> Dog()
<span class="hljs-comment">// 修复constructor的指向</span>
<span class="hljs-built_in">Object</span>.defineProperty(BigDog.prototype, <span class="hljs-string">"constructor"</span>, {
        <span class="hljs-attr">value</span>: BigDog,
        <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">false</span>,
      })
<span class="hljs-keyword">const</span> bigDog = <span class="hljs-keyword">new</span> BigDog()
<span class="hljs-built_in">console</span>.log(bigDog.constructor === BigDog)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这段代码通过显式地更改BigDog.prototype的指向来修正上面提到的隐患，那为什么要这么大费周章地使用Object.defineProperty，而不是直接这样做呢：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">BigDog.prototype.constructor = BigDog
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>是因为不希望 constructor 这个属性被 for…in 遍历到，所以用 defineProperty 来控制访问权限。</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> bigDog){<span class="hljs-built_in">console</span>.log(i)} <span class="hljs-comment">// 会出现constructor属性</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>如果用上面两个问题去测试，就会发现ES6中的class本质上只是原型链的语法糖。</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> </span>{
    <span class="hljs-function"><span class="hljs-title">constructor</span>(<span class="hljs-params">props</span>)</span> {
      <span class="hljs-built_in">this</span>.name = <span class="hljs-string">'puppy'</span>
    }
  }
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BigCat</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Cat</span> </span>{
    <span class="hljs-function"><span class="hljs-title">constructor</span>(<span class="hljs-params">props</span>)</span> {
      <span class="hljs-built_in">super</span>(props)
    }
}
<span class="hljs-keyword">const</span> bigCat = <span class="hljs-keyword">new</span> BigCat()
<span class="hljs-built_in">console</span>.log(bigCat.constructor === BigCat) <span class="hljs-comment">//true</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> bigCat){<span class="hljs-built_in">console</span>.log(i)} <span class="hljs-comment">// 不会出现constructor属性</span>
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
