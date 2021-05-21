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
      <el-collapse-item title="7. Proxy 可以实现什么功能？">
        <p>在 Vue3.0 中通过 <code>Proxy</code> 来替换原本的 <code>Object.defineProperty</code> 来实现数据响应式。</p>
        <p>Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, handler)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>target</code> 代表需要添加代理的对象，<code>handler</code> 用来自定义对象中的操作，比如可以用来自定义 <code>set</code> 或者 <code>get</code> 函数。</p>
        <p>下面来通过 <code>Proxy</code> 来实现一个数据响应式：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> onWatch = <span class="hljs-function">(<span class="hljs-params">obj, setBind, getLogger</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> handler = {
    <span class="hljs-function"><span class="hljs-title">get</span>(<span class="hljs-params">target, property, receiver</span>)</span> {
      getLogger(target, property)
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, property, receiver)
    },
    <span class="hljs-function"><span class="hljs-title">set</span>(<span class="hljs-params">target, property, value, receiver</span>)</span> {
      setBind(value, property)
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, property, value)
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, handler)
}
<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }
<span class="hljs-keyword">let</span> p = onWatch(
  obj,
  <span class="hljs-function">(<span class="hljs-params">v, property</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`监听到属性<span class="hljs-subst">${property}</span>改变为<span class="hljs-subst">${v}</span>`</span>)
  },
  <span class="hljs-function">(<span class="hljs-params">target, property</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`'<span class="hljs-subst">${property}</span>' = <span class="hljs-subst">${target[property]}</span>`</span>)
  }
)
p.a = <span class="hljs-number">2</span> <span class="hljs-comment">// 监听到属性a改变</span>
p.a <span class="hljs-comment">// 'a' = 2</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在上述代码中，通过自定义 <code>set</code> 和 <code>get</code> 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。</p>
        <p>当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要在 <code>get</code> 中收集依赖，在 <code>set</code> 派发更新，之所以 Vue3.0 要使用 <code>Proxy</code> 替换原本的 API 原因在于 <code>Proxy</code> 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 <code>Proxy</code> 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。</p>
      </el-collapse-item>
      <el-collapse-item title="8. 对对象与数组的解构的理解">
        <p>解构是 ES6 提供的一种新的提取数据的模式，这种模式能够从对象或数组里有针对性地拿到想要的数值。
          <strong>1）数组的解构</strong>
          在解构数组时，以元素的位置为匹配条件来提取想要的数据的：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> [a, b, c] = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>最终，a、b、c分别被赋予了数组第0、1、2个索引位的值：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e55fc36b191340e69698782fbd67ef4f~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image">
          数组里的0、1、2索引位的元素值，精准地被映射到了左侧的第0、1、2个变量里去，这就是数组解构的工作模式。还可以通过给左侧变量数组设置空占位的方式，实现对数组中某几个元素的精准提取：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> [a,,c] = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>通过把中间位留空，可以顺利地把数组第一位和最后一位的值赋给 a、c 两个变量：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a14ffbb3df2646a4a84f4a0c7d62d975~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <p><strong>2）对象的解构</strong>
          对象解构比数组结构稍微复杂一些，也更显强大。在解构对象时，是以属性的名称为匹配条件，来提取想要的数据的。现在定义一个对象：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> stu = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Bob'</span>,
  <span class="hljs-attr">age</span>: <span class="hljs-number">24</span>
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>假如想要解构它的两个自有属性，可以这样：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> { name, age } = stu
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这样就得到了 name 和 age 两个和 stu 平级的变量：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ed2565845f2415b8243c8c355b2c6d6~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <p>注意，对象解构严格以属性名作为定位依据，所以就算调换了 name 和 age 的位置，结果也是一样的：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> { age, name } = stu
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="9. 如何提取高度嵌套的对象里的指定属性？">
        <p>有时会遇到一些嵌套程度非常深的对象：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> school = {
   <span class="hljs-attr">classes</span>: {
      <span class="hljs-attr">stu</span>: {
         <span class="hljs-attr">name</span>: <span class="hljs-string">'Bob'</span>,
         <span class="hljs-attr">age</span>: <span class="hljs-number">24</span>,
      }
   }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>像此处的 name 这个变量，嵌套了四层，此时如果仍然尝试老方法来提取它：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> { name } = school
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>显然是不奏效的，因为 school 这个对象本身是没有 name 这个属性的，name 位于 school 对象的“儿子的儿子”对象里面。要想把 name 提取出来，一种比较笨的方法是逐层解构：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> { classes } = school
<span class="hljs-keyword">const</span> { stu } = classes
<span class="hljs-keyword">const</span> { name } = stu
name <span class="hljs-comment">// 'Bob'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>但是还有一种更标准的做法，可以用一行代码来解决这个问题：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> { <span class="hljs-attr">classes</span>: { <span class="hljs-attr">stu</span>: { name } }} = school

<span class="hljs-built_in">console</span>.log(name)  <span class="hljs-comment">// 'Bob'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>可以在解构出来的变量名右侧，通过冒号+{目标属性名}这种形式，进一步解构它，一直解构到拿到目标数据为止。</p>
      </el-collapse-item>
      <el-collapse-item title="10. 对 rest 参数的理解">
        <p>扩展运算符被用在函数形参上时，<strong>它还可以把一个分离的参数序列整合成一个数组</strong>：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutiple</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-keyword">let</span> result = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> val <span class="hljs-keyword">of</span> args) {
    result *= val;
  }
  <span class="hljs-keyword">return</span> result;
}
mutiple(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>) <span class="hljs-comment">// 24</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这里，传入 mutiple 的是四个分离的参数，但是如果在 mutiple 函数里尝试输出 args 的值，会发现它是一个数组：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mutiple</span>(<span class="hljs-params">...args</span>) </span>{
  <span class="hljs-built_in">console</span>.log(args)
}
mutiple(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>) <span class="hljs-comment">// [1, 2, 3, 4]</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这就是 … rest运算符的又一层威力了，它可以把函数的多个入参收敛进一个数组里。这一点<strong>经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。</strong></p>
      </el-collapse-item>
      <el-collapse-item title="11. ES6中模板语法与字符串处理">
        <p>ES6 提出了“模板语法”的概念。在 ES6 以前，拼接字符串是很麻烦的事情：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'css'</span>
<span class="hljs-keyword">var</span> career = <span class="hljs-string">'coder'</span>
<span class="hljs-keyword">var</span> hobby = [<span class="hljs-string">'coding'</span>, <span class="hljs-string">'writing'</span>]
<span class="hljs-keyword">var</span> finalString = <span class="hljs-string">'my name is '</span> + name + <span class="hljs-string">', I work as a '</span> + career + <span class="hljs-string">', I love '</span> + hobby[<span class="hljs-number">0</span>] + <span class="hljs-string">' and '</span> + hobby[<span class="hljs-number">1</span>]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>仅仅几个变量，写了这么多加号，还要时刻小心里面的空格和标点符号有没有跟错地方。但是有了模板字符串，拼接难度直线下降：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">'css'</span>
<span class="hljs-keyword">var</span> career = <span class="hljs-string">'coder'</span>
<span class="hljs-keyword">var</span> hobby = [<span class="hljs-string">'coding'</span>, <span class="hljs-string">'writing'</span>]
<span class="hljs-keyword">var</span> finalString = <span class="hljs-string">`my name is <span class="hljs-subst">${name}</span>, I work as a <span class="hljs-subst">${career}</span> I love <span class="hljs-subst">${hobby[<span class="hljs-number">0</span>]}</span> and <span class="hljs-subst">${hobby[<span class="hljs-number">1</span>]}</span>`</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>字符串不仅更容易拼了，也更易读了，代码整体的质量都变高了。这就是模板字符串的第一个优势——允许用${}的方式嵌入变量。但这还不是问题的关键，模板字符串的关键优势有两个：</p>
        <ul>
          <li>在模板字符串中，空格、缩进、换行都会被保留</li>
          <li>模板字符串完全支持“运算”式的表达式，可以在${}里完成一些计算</li>
        </ul>
        <p>基于第一点，可以在模板字符串里无障碍地直接写 html 代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> list = <span class="hljs-string">`
	&lt;ul&gt;
		&lt;li&gt;列表项1&lt;/li&gt;
		&lt;li&gt;列表项2&lt;/li&gt;
	&lt;/ul&gt;
`</span>;
<span class="hljs-built_in">console</span>.log(message); <span class="hljs-comment">// 正确输出，不存在报错</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>基于第二点，可以把一些简单的计算和调用丢进 ${} 来做：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">a, b</span>) </span>{
  <span class="hljs-keyword">const</span> finalString = <span class="hljs-string">`<span class="hljs-subst">${a}</span> + <span class="hljs-subst">${b}</span> = <span class="hljs-subst">${a+b}</span>`</span>
  <span class="hljs-built_in">console</span>.log(finalString)
}
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">// 输出 '1 + 2 = 3'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>除了模板语法外， ES6中还新增了一系列的字符串方法用于提升开发效率：</p>
        <p>（1）<strong>存在性判定</strong>：在过去，当判断一个字符/字符串是否在某字符串中时，只能用 indexOf &gt; -1 来做。现在 ES6 提供了三个方法：includes、startsWith、endsWith，它们都会返回一个布尔值来告诉你是否存在。</p>
        <ul>
          <li><strong>includes</strong>：判断字符串与子串的包含关系：</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> son = <span class="hljs-string">'haha'</span>
<span class="hljs-keyword">const</span> father = <span class="hljs-string">'xixi haha hehe'</span>
father.includes(son) <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>startsWith</strong>：判断字符串是否以某个/某串字符开头：</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> father = <span class="hljs-string">'xixi haha hehe'</span>
father.startsWith(<span class="hljs-string">'haha'</span>) <span class="hljs-comment">// false</span>
father.startsWith(<span class="hljs-string">'xixi'</span>) <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>endsWith</strong>：判断字符串是否以某个/某串字符结尾：</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> father = <span class="hljs-string">'xixi haha hehe'</span>
  father.endsWith(<span class="hljs-string">'hehe'</span>) <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（2）<strong>自动重复</strong>：可以使用 repeat 方法来使同一个字符串输出多次（被连续复制多次）：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> sourceCode = <span class="hljs-string">'repeat for 3 times;'</span>
<span class="hljs-keyword">const</span> repeated = sourceCode.repeat(<span class="hljs-number">3</span>)
<span class="hljs-built_in">console</span>.log(repeated) <span class="hljs-comment">// repeat for 3 times;repeat for 3 times;repeat for 3 times;</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
