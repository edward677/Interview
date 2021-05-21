<template>
  <div class="es6_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. let、const、var的区别">
        <p><strong>（1）块级作用域</strong>
          块作用域由 <code>{ }</code>包括，let和const具有块级作用域，var不存在块级作用域。
          块级作用域解决了ES5中的两个问题：</p>
        <ul>
          <li>内层变量可能覆盖外层变量</li>
          <li>用来计数的循环变量泄露为全局变量</li>
        </ul>
        <p><strong>（2）变量提升</strong>
          var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。
          <strong>（3）给全局添加属性</strong>
          浏览器的全局对对象是window，Node的全局对象是global。var声明的变量为全局变量，同时会将该变量添加为全局对象的属性，但是let和const就不会。
          <strong>（4）重复声明</strong>
          var声明变量时，可以重复声明变量，const和let不能重复声明。
          <strong>（5）暂时性死区</strong>
          在代码块内，使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为<strong>暂时性死区</strong>。
          <strong>（6）初始值设置</strong>
          在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。
          <strong>（7）指针指向</strong>
          let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。</p>
        <p><strong>总结：</strong></p>
        <table><thead><tr><th><strong>区别</strong></th><th><strong>var</strong></th><th><strong>let</strong></th><th><strong>const</strong></th></tr></thead><tbody><tr><td>是否有块级作用域</td><td>×</td><td>✔️</td><td>✔️</td></tr><tr><td>是否存在变量提升</td><td>✔️</td><td>×</td><td>×</td></tr><tr><td>是否添加全局属性</td><td>✔️</td><td>×</td><td>×</td></tr><tr><td>能否重复声明变量</td><td>✔️</td><td>×</td><td>×</td></tr><tr><td>是否存在暂时性死区</td><td>×</td><td>✔️</td><td>✔️</td></tr><tr><td>是否必须设置初始值</td><td>×</td><td>×</td><td>✔️</td></tr><tr><td>能否改变指针指向</td><td></td><td>✔️</td><td>×</td></tr></tbody></table>
      </el-collapse-item>
      <el-collapse-item title="2. const对象的属性可以修改吗">
        <p>const保证的并不是变量的值不得改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。</p>
        <p>但对于引用类型的数据（主要是对象和数组），变量指向数据的内存地址，保存的只是一个指针，const只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。</p>
      </el-collapse-item>
      <el-collapse-item title="3. 如果new一个箭头函数的会怎么样">
        <p>箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。
          new操作符的实现步骤如下：</p>
        <ul>
          <li>创建一个对象</li>
          <li>将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的prototype属性）</li>
          <li>指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）</li>
          <li>返回新的对象</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="4. 箭头函数与普通函数的区别">
        <p><strong>（1）箭头函数比普通函数更加简洁</strong></p>
        <ul>
          <li>如果没有参数，就直接写一个空括号即可</li>
          <li>如果只有一个参数，可以省去参数的括号</li>
          <li>如果有多个参数，用逗号分割</li>
          <li>如果函数体的返回值只有一句，可以省略大括号</li>
          <li>如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个void关键字。最常见的就是调用一个函数：</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> fn = <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">void</span> doesNotReturn();
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（2）箭头函数没有自己的this</strong>
          箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。
          <strong>（3）箭头函数继承来的this指向永远不会改变</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> id = <span class="hljs-string">'GLOBAL'</span>;
<span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">id</span>: <span class="hljs-string">'OBJ'</span>,
  <span class="hljs-attr">a</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">this</span>.id);
  },
  <span class="hljs-attr">b</span>: <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">this</span>.id);
  }
};
obj.a();    <span class="hljs-comment">// 'OBJ'</span>
obj.b();    <span class="hljs-comment">// 'GLOBAL'</span>
<span class="hljs-keyword">new</span> obj.a() <span class="hljs-comment">// 报错，不能作为构造函数</span>
<span class="hljs-keyword">new</span> obj.b()
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。
          这里需要注意，定义对象的大括号<code>{}</code>是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。
          <strong>（4）call()、apply()、bind()等方法不能改变箭头函数中this的指向</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> id = <span class="hljs-string">'Global'</span>;
<span class="hljs-keyword">let</span> fun1 = <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">this</span>.id)
};
fun1();                     <span class="hljs-comment">// 'Global'</span>
fun1.call({<span class="hljs-attr">id</span>: <span class="hljs-string">'Obj'</span>});     <span class="hljs-comment">// 'Global'</span>
fun1.apply({<span class="hljs-attr">id</span>: <span class="hljs-string">'Obj'</span>});    <span class="hljs-comment">// 'Global'</span>
fun1.bind({<span class="hljs-attr">id</span>: <span class="hljs-string">'Obj'</span>})();   <span class="hljs-comment">// 'Global'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（5）箭头函数不能作为构造函数使用</strong>
          构造函数在new的步骤在上面已经说过了，实际上第二步就是将函数中的this指向该对象。 但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。
          <strong>（6）箭头函数没有自己的arguments</strong>
          箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。
          <strong>（7）箭头函数没有prototype</strong>
          <strong>（8）箭头函数不能用作Generator函数，不能使用yeild关键字</strong></p>
      </el-collapse-item>
      <el-collapse-item title="5. 箭头函数的指向哪⾥？">
        <p>箭头函数不同于传统JavaScript中的函数,箭头函数并没有属于⾃⼰的this,它的所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值,并且由于没有属于⾃⼰的this,⽽箭头函数是不会被new调⽤的，这个所谓的this也不会被改变.</p>
        <p>可以⽤Babel理解⼀下箭头函数:</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// ES6 </span>
<span class="hljs-keyword">const</span> obj = {
  <span class="hljs-function"><span class="hljs-title">getArrow</span>(<span class="hljs-params"></span>)</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-function">() =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">this</span> === obj);
    };
  }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>转化后：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// ES5，由 Babel 转译</span>
<span class="hljs-keyword">var</span> obj = {
   <span class="hljs-attr">getArrow</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArrow</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">var</span> _this = <span class="hljs-built_in">this</span>;
     <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(_this === obj);
     };
   }
};
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="6. 扩展运算符的作用及使用场景">
        <p><strong>（1）对象扩展运算符</strong>
          对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> bar = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">let</span> baz = { ...bar }; <span class="hljs-comment">// { a: 1, b: 2 }</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>上述方法实际上等价于:</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> bar = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> };
<span class="hljs-keyword">let</span> baz = <span class="hljs-built_in">Object</span>.assign({}, bar); <span class="hljs-comment">// { a: 1, b: 2 }</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>Object.assign</code>方法用于对象的合并，将源对象<code>（source）</code>的所有可枚举属性，复制到目标对象<code>（target）</code>。
          <code>Object.assign</code>方法的第一个参数是目标对象，后面的参数都是源对象。(<strong>如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性</strong>)。
          同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> bar = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>};
<span class="hljs-keyword">let</span> baz = {...bar, ...{<span class="hljs-attr">a</span>:<span class="hljs-number">2</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">4</span>}};  <span class="hljs-comment">// {a: 2, b: 4}</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>利用上述特性就可以很方便的修改对象的部分属性。在<code>redux</code>中的<code>reducer</code>函数规定必须是<strong>一个纯函数</strong>，<code>reducer</code>中的<code>state</code>对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。</p>
        <p>这里有点需要注意的是<strong>扩展运算符对对象实例的拷贝属于一种浅拷贝</strong>。
          <strong>（2）数组扩展运算符</strong>
          数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log(...[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
<span class="hljs-comment">// 1 2 3</span>
<span class="hljs-built_in">console</span>.log(...[<span class="hljs-number">1</span>, [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>], <span class="hljs-number">5</span>])
<span class="hljs-comment">// 1 [2, 3, 4] 5</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>下面是数组的扩展运算符的应用：</p>
        <ul>
          <li><strong>将数组转换为参数序列</strong></li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x, y</span>) </span>{
  <span class="hljs-keyword">return</span> x + y;
}
<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
add(...numbers) <span class="hljs-comment">// 3</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>复制数组</strong></li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> arr1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
<span class="hljs-keyword">const</span> arr2 = [...arr1];
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>要记住：<strong>扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中</strong>，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。</p>
        <ul>
          <li><strong>合并数组</strong></li>
        </ul>
        <p>如果想在数组内合并数组，可以这样：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> arr1 = [<span class="hljs-string">'two'</span>, <span class="hljs-string">'three'</span>];
<span class="hljs-keyword">const</span> arr2 = [<span class="hljs-string">'one'</span>, ...arr1, <span class="hljs-string">'four'</span>, <span class="hljs-string">'five'</span>];
<span class="hljs-comment">// ["one", "two", "three", "four", "five"]</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>扩展运算符与解构赋值结合起来，用于生成数组</strong></li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> [first, ...rest] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
first <span class="hljs-comment">// 1</span>
rest  <span class="hljs-comment">// [2, 3, 4, 5]</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>需要注意：</p>
        <blockquote>
          <p><strong>如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。</strong></p>
        </blockquote>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> [...rest, last] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-comment">// 报错</span>
<span class="hljs-keyword">const</span> [first, ...rest, last] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-comment">// 报错</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>将字符串转为真正的数组</strong></li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript">[...<span class="hljs-string">'hello'</span>]
<span class="hljs-comment">// [ "h", "e", "l", "l", "o" ]</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>任何 Iterator 接口的对象（参阅 Iterator 一章），都可以用扩展运算符转为真正的数组</strong></li>
        </ul>
        <p>比较常见的应用是可以将某些数据结构转为数组,比如：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// arguments对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> args = [...arguments];
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>用于替换<code>es5</code>中的<code>Array.prototype.slice.call(arguments)</code>写法。</p>
        <ul>
          <li><strong>使用<code>Math</code>函数</strong></li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">7</span>, <span class="hljs-number">1</span>];
<span class="hljs-built_in">Math</span>.min(...numbers); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">Math</span>.max(...numbers); <span class="hljs-comment">// 9</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
