<template>
  <div class="typeOfData_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. JavaScript有哪些数据类型，它们的区别">
        <p>JavaScript共有七种基本数据类型，分别是 Undefined、Null、Boolean、Number、String，还有在 ES6 中新增的 Symbol 和 BigInt 类型：</p>
        <ul>
          <li>Symbol 代表创建后独一无二且不可变的数据类型，它的出现我认为主要是为了解决可能出现的全局变量冲突的问题。</li>
          <li>BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。</li>
        </ul>
        <p>这些数据可以分为原始数据类型和引用数据类型：</p>
        <ul>
          <li>栈：原始数据类型（Undefined、Null、Boolean、Number、String）</li>
          <li>堆：引用数据类型（对象、数组和函数）</li>
        </ul>
        <p>两种类型的区别是：存储位置不同。</p>
        <ul>
          <li>原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。</li>
          <li>引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。</li>
        </ul>
        <p>在操作系统中，内存被分为栈区和堆区：</p>
        <ul>
          <li>栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。</li>
          <li>堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. 数据类型检测的方式有哪些">
        <p><strong>（1）typeof</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-number">2</span>);               <span class="hljs-comment">// number</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">true</span>);            <span class="hljs-comment">// boolean</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-string">'str'</span>);           <span class="hljs-comment">// string</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> []);              <span class="hljs-comment">// object    </span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});    <span class="hljs-comment">// function</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> {});              <span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">undefined</span>);       <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>);            <span class="hljs-comment">// object</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>其中数组、对象、null都会被判断为object，其他判断都正确。
          <strong>（2）instanceof</strong>
          <code>instanceof</code>可以正确判断对象的类型，因为其内部的机制是通过判断在其原型链中能否找到该类型的原型。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Number</span>);                    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-literal">true</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Boolean</span>);                <span class="hljs-comment">// false </span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'str'</span> <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">String</span>);                <span class="hljs-comment">// false </span>

<span class="hljs-built_in">console</span>.log([] <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);                    <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{} <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>);       <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log({} <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Object</span>);                   <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>有上面可以看到，<code>instanceof</code>只能正确判断引用数据类型，而不能判断基本数据类型。</p>
        <p><code>instanceof</code> 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 <code>prototype</code> 属性</p>
        <p><strong>（3） constructor</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log((<span class="hljs-number">2</span>).constructor === <span class="hljs-built_in">Number</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-literal">true</span>).constructor === <span class="hljs-built_in">Boolean</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-string">'str'</span>).constructor === <span class="hljs-built_in">String</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(([]).constructor === <span class="hljs-built_in">Array</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log((<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}).constructor === <span class="hljs-built_in">Function</span>); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(({}).constructor === <span class="hljs-built_in">Object</span>); <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>constructor</code>有两个作用，一是判断数据的类型，二是对象实例通过 <code>constrcutor</code> 对象访问它的构造函数。</p>
        <p>需要注意的是，如果创建一个对象来改变它的原型，<code>constructor</code>就不能用来判断数据类型了：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>)</span>{};

Fn.prototype = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();

<span class="hljs-keyword">var</span> f = <span class="hljs-keyword">new</span> Fn();

<span class="hljs-built_in">console</span>.log(f.constructor===Fn);    <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log(f.constructor===<span class="hljs-built_in">Array</span>); <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（4）Object.prototype.toString.call()</strong>
          <code>Object.prototype.toString.call()</code> 使用 Object 对象的原型方法 toString ，判断数据类型</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-built_in">Object</span>.prototype.toString;

<span class="hljs-built_in">console</span>.log(a.call(<span class="hljs-number">2</span>));
<span class="hljs-built_in">console</span>.log(a.call(<span class="hljs-literal">true</span>));
<span class="hljs-built_in">console</span>.log(a.call(<span class="hljs-string">'str'</span>));
<span class="hljs-built_in">console</span>.log(a.call([]));
<span class="hljs-built_in">console</span>.log(a.call(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}));
<span class="hljs-built_in">console</span>.log(a.call({}));
<span class="hljs-built_in">console</span>.log(a.call(<span class="hljs-literal">undefined</span>));
<span class="hljs-built_in">console</span>.log(a.call(<span class="hljs-literal">null</span>));
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>同样是检测对象obj调用toString方法，obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？</p>
        <p>这是因为toString为Object的原型方法，而Array ，function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object上原型toString方法。</p>
      </el-collapse-item>
      <el-collapse-item title="3. 判断数组的方式有哪些">
        <ul>
          <li>通过Object.prototype.toString.call()做判断</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Object</span>.prototype.toString.call().slice(<span class="hljs-number">8</span>,-<span class="hljs-number">1</span>) === <span class="hljs-string">'Array'</span>;
        <span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过原型链来判断</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript">obj.__proto__ === <span class="hljs-built_in">Array</span>.prototype;
        <span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过es6 Array.isArrray()做判断</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.isArrray(obj);
        <span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过instanceof做判断</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript">obj <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>
        <span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过Array.prototype.isPrototypeOf</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.isPrototypeOf(obj)
        <span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="4. null和undefined区别">
        <p>首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。</p>
        <p>undefined 代表的含义是未定义，null 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。</p>
        <p>undefined 在 js 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它会影响对 undefined 值的判断。但是可以通过一些方法获得安全的 undefined 值，比如说 void 0。</p>
        <p>当对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。</p>
      </el-collapse-item>
      <el-collapse-item title="5. type null 的结果是什么，为什么">
        <p>type null 的结果是Object</p>
        <p>在 JavaScript 第一个版本中，所有值都存储在 32 位的单元中，每个单元包含一个小的 <strong>类型标签(1-3 bits)</strong> 以及当前要存储值的真实数据。类型标签存储在每个单元的低位中，共有五种数据类型：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">000</span>: object   - 当前存储的数据指向一个对象。
        <span class="hljs-number">1</span>: int        - 当前存储的数据是一个 <span class="hljs-number">31</span> 位的有符号整数。
        <span class="hljs-number">010</span>: double   - 当前存储的数据指向一个双精度的浮点数。
        <span class="hljs-number">100</span>: string   - 当前存储的数据指向一个字符串。
        <span class="hljs-number">110</span>: boolean  - 当前存储的数据是布尔值。
        <span class="copy-code-btn">复制代码</span></code></pre>
        <p>如果最低位是 1，则类型标签标志位的长度只有一位；如果最低位是 0，则类型标签标志位的长度占三位，为存储其他四种数据类型提供了额外两个 bit 的长度。</p>
        <p>有两种特殊数据类型：</p>
        <ul>
          <li>undefined的值是 (-2)(一个超出整数范围的数字)</li>
          <li>null 的值是机器码 NULL 指针(null 指针的值全是 0)</li>
        </ul>
        <p>那也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object。</p>
      </el-collapse-item>
      <el-collapse-item title="6. intanceof 操作符的实现原理及实现">
        <p>instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myInstanceof</span>(<span class="hljs-params">left, right</span>) </span>{
  <span class="hljs-keyword">let</span> proto = <span class="hljs-built_in">Object</span>.getPrototypeOf(left), <span class="hljs-comment">// 获取对象的原型</span>
    prototype = right.prototype; <span class="hljs-comment">// 获取构造函数的 prototype 对象</span>
  <span class="hljs-comment">// 判断构造函数的 prototype 对象是否在对象的原型链上</span>
  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">if</span> (!proto) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">if</span> (proto === prototype) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    proto = <span class="hljs-built_in">Object</span>.getPrototypeOf(proto);
  }
}
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="7. 为什么0.1+0.2 ! == 0.3，如何让其相等">
        <p>在开发过程中遇到类似这样的问题：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> n1 = <span class="hljs-number">0.1</span>, n2 = <span class="hljs-number">0.2</span>
<span class="hljs-keyword">let</span> n3 = n1 + n2   <span class="hljs-comment">//0.30000000000000004</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这不是想要的结果，要想等于0.3，就要把它进行转化：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">n3.toFixed(<span class="hljs-number">2</span>) <span class="hljs-comment">// 注意，toFixed为四舍五入</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>toFixed(num)</code> 方法可把 Number 四舍五入为指定小数位数的数字。
          那为什么会出现这样的结果呢？</p>
        <p>计算机是通过二进制的方式存储数据的，所以计算机计算0.1+0.2的时候，实际上是计算的两个数的二进制的和。0.1的二进制是<code>0.0001100110011001100...</code>（1100循环），0.2的二进制是：<code>0.00110011001100...</code>（1100循环），这两个数的二进制都是无限循环的数。那JavaScript是如何处理无限循环的二进制小数呢？</p>
        <p>JavaScript中所用的数字包括整数和小数，但是只有一种类型——Number，它的实现遵循IEEE 754标准，使用64位固定长度来表示，也就是标准的double双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留52位，再加上前面的1，其实就是保留53位有效数字，剩余的舍去，遵从“0舍1入”的原则。</p>
        <p>根据这个原则，0.1和0.2的二进制数相加，再转化为十进制数就是：<code>0.30000000000000004</code>。</p>
        <p>下面看一下<strong>双精度数是如何保存</strong>的：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/189df83e41b0403b98a7a6d7ebd359a8~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述" loading="lazy" class="medium-zoom-image"></p>
        <ul>
          <li>第一部分（蓝色）：用来存储符号位（sign），用来区分正负数，0表示正数，占用1位</li>
          <li>第二部分（绿色）：用来存储指数（exponent），占用11位</li>
          <li>第三部分（红色）：用来存储小数（fraction），占用52位</li>
        </ul>
        <p>对于0.1，它的二进制为：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0.00011001100110011001100110011001100110011001100110011001</span> <span class="hljs-number">10011.</span>..
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>转为科学计数法（科学计数法的结果就是浮点数）：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1.1001100110011001100110011001100110011001100110011001</span>*<span class="hljs-number">2</span>^-<span class="hljs-number">4</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>可以看出0.1的符号位为0，指数位为-4，小数位为：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1001100110011001100110011001100110011001100110011001</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>那么问题又来了，<strong>指数位是负数，该如何保存</strong>呢？</p>
        <p>IEEE标准规定了一个偏移量，对于指数部分，每次都加这个偏移量进行保存，这样即使指数是负数，那么加上这个偏移量也就是正数了。由于JavaScript的数字是双精度数，这里就以双精度数为例，它的指数部分为11位，能表示的范围就是0~2047，IEEE固定<strong>双精度数的偏移量为1023</strong>。</p>
        <ul>
          <li>当指数位不全是0也不全是1时(规格化的数值)，IEEE规定，阶码计算公式为 e-Bias。 此时e最小值是1，则1-1023= -1022，e最大值是2046，则2046-1023=1023，可以看到，这种情况下取值范围是<code>-1022~1013</code>。</li>
          <li>当指数位全部是0的时候(非规格化的数值)，IEEE规定，阶码的计算公式为1-Bias，即1-1023= -1022。</li>
          <li>当指数位全部是1的时候(特殊值)，IEEE规定这个浮点数可用来表示3个特殊值，分别是正无穷，负无穷，NaN。 具体的，小数位不为0的时候表示NaN；小数位为0时，当符号位s=0时表示正无穷，s=1时候表示负无穷。</li>
        </ul>
        <p>对于上面的0.1的指数位为-4，-4+1023 = 1019 转化为二进制就是：<code>1111111011</code>.</p>
        <p>所以，0.1表示为：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0</span> <span class="hljs-number">1111111011</span> <span class="hljs-number">1001100110011001100110011001100110011001100110011001</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>说了这么多，是时候该最开始的问题了，如何实现0.1+0.2=0.3呢？</p>
        <p>对于这个问题，一个直接的解决方法就是设置一个误差范围，通常称为“机器精度”。对JavaScript来说，这个值通常为2，在ES6中，提供了<code>Number.EPSILON</code>属性，而它的值就是2，只要判断<code>0.1+0.2-0.3</code>是否小于<code>Number.EPSILON</code>，如果小于，就可以判断为0.1+0.2 ===0.3</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">numberepsilon</span>(<span class="hljs-params">arg1,arg2</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.abs(arg1 - arg2) &lt; <span class="hljs-built_in">Number</span>.EPSILON;
}

<span class="hljs-built_in">console</span>.log(numberepsilon(<span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>)); <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="8. JavaScript为什么要进行变量提升，它导致了什么问题？">
        <p>变量提升的表现是，无论在函数中何处位置声明的变量，好像都被提升到了函数的首部，可以在变量声明前访问到而不会报错。</p>
        <p>造成变量声明提升的<strong>本质原因</strong>是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当访问一个变量时，会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象的是在代码解析的时候创建的。</p>
        <p>首先要知道，JS在拿到一个变量或者一个函数的时候，会有两步操作，即解析和执行。</p>
        <ul>
          <li><strong>在解析阶段</strong>，JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。
            <ul>
              <li>全局上下文：变量定义，函数声明</li>
              <li>函数上下文：变量定义，函数声明，this，arguments</li>
            </ul>
          </li>
          <li><strong>在执行阶段</strong>，就是按照代码的顺序依次执行。</li>
        </ul>
        <p>那为什么会进行变量提升呢？主要有以下两个原因：</p>
        <ul>
          <li>提高性能</li>
          <li>容错性更好</li>
        </ul>
        <p><strong>（1）提高性能</strong>
          在JS代码执行之前，会进行语法检查和预编译，并且这一操作只进行一次。这么做就是为了提高性能，如果没有这一步，那么每次执行代码前都必须重新解析一遍该变量（函数），而这是没有必要的，因为变量（函数）的代码并不会改变，解析一遍就够了。</p>
        <p>在解析的过程中，还会为函数生成预编译代码。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释、不必要的空白等。这样做的好处就是每次执行函数时都可以直接为该函数分配栈空间（不需要再解析一遍去获取代码中声明了哪些变量，创建了哪些函数），并且因为代码压缩的原因，代码执行也更快了。
          <strong>（2）容错性更好</strong>
          变量提升可以在一定程度上提高JS的容错性，看下面的代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">a = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> a;
<span class="hljs-built_in">console</span>.log(a);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>如果没有变量提升，这两行代码就会报错，但是因为有了变量提升，这段代码就可以正常执行。</p>
        <p>虽然，在可以开发过程中，可以完全避免这样写，但是有时代码很复杂的时候。可能因为疏忽而先使用后定义了，这样也不会影响正常使用。由于变量提升的存在，而会正常运行。</p>
        <p><strong>总结：</strong></p>
        <ul>
          <li>解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间</li>
          <li>声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行</li>
        </ul>
        <p>变量提升虽然有一些优点，但是他也会造成一定的问题，在ES6中提出了let、const来定义变量，它们就没有变量提升的机制。
          下面来看一下变量提升可能会导致的问题：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
	<span class="hljs-built_in">console</span>.log(tmp);
	<span class="hljs-keyword">if</span>(<span class="hljs-literal">false</span>){
		<span class="hljs-keyword">var</span> tmp = <span class="hljs-string">'hello world'</span>;
	}
}

fn();  <span class="hljs-comment">// undefined</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在这个函数中，原本是要打印出外层的tmp变量，但是因为变量提升的问题，内层定义的tmp被提到函数内部的最顶部，相当于覆盖了外层的tmp，所以打印结果为undefined。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> tmp = <span class="hljs-string">'hello world'</span>;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; tmp.length; i++) {
	<span class="hljs-built_in">console</span>.log(tmp[i]);
}

<span class="hljs-built_in">console</span>.log(i); <span class="hljs-comment">// 11</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>由于遍历时定义的i会变量提升成为一个全局变量，在函数结束之后不会被销毁，所以打印出来11。</p>
      </el-collapse-item>
      <el-collapse-item title="9. typeof NaN 的结果是什么？">
        <p>NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出
          数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">typeof</span> <span class="hljs-literal">NaN</span>; <span class="hljs-comment">// "number"</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN
          为 true。</p>
      </el-collapse-item>
      <el-collapse-item title="10. isNaN 和 Number.isNaN 函数的区别？">
        <ul>
          <li>函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。</li>
          <li>函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="11. == 操作符的强制类型转换规则？">
        <ul>
          <li>字符串和数字之间的相等比较，将字符串转换为数字之后再进行比较。</li>
          <li>其他类型和布尔类型之间的相等比较，先将布尔值转换为数字后，再应用其他规则进行比较。</li>
          <li>null 和 undefined 之间的相等比较，结果为真。其他值和它们进行比较都返回假值。</li>
          <li>对象和非对象之间的相等比较，对象先调用 ToPrimitive 抽象操作后，再进行比较。</li>
          <li>如果一个操作值为 NaN ，则相等比较返回 false（ NaN 本身也不等于 NaN ）。</li>
          <li>如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回true，否则，返回 false。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="12. 其他值到字符串的转换规则？">
        <ul>
          <li>Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，</li>
          <li>Boolean 类型，true 转换为 "true"，false 转换为 "false"。</li>
          <li>Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。</li>
          <li>Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。</li>
          <li>对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="13. 其他值到数字值的转换规则？">
        <ul>
          <li>Undefined 类型的值转换为 NaN。</li>
          <li>Null 类型的值转换为 0。</li>
          <li>Boolean 类型的值，true 转换为 1，false 转换为 0。</li>
          <li>String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。</li>
          <li>Symbol 类型的值不能转换为数字，会报错。</li>
          <li>对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。</li>
        </ul>
        <p>为了将值转换为相应的基本类型值，抽象操作 ToPrimitive 会首先（通过内部操作 DefaultValue）检查该值是否有valueOf()方法。如果有并且返回基本类型值，就使用该值进行强制类型转换。如果没有就使用 toString() 的返回值（如果存在）来进行强制类型转换。</p>
        <p>如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。</p>
      </el-collapse-item>
      <el-collapse-item title="14. 其他值到布尔类型的值的转换规则？">
        <pre>以下这些是假值：
          • undefined
          • null
          • false
          • +0、-0 和 NaN
          • ""</pre>
        <p>假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。</p>
      </el-collapse-item>
      <el-collapse-item title="15. || 和 && 操作符的返回值？">
        <p>|| 和 &amp;&amp; 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制类型转换，然后再执行条件
          判断。</p>
        <ul>
          <li>对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。</li>
          <li>&amp;&amp; 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。</li>
        </ul>
        <p>|| 和 &amp;&amp; 返回它们其中一个操作数的值，而非条件判断的结果</p>
      </el-collapse-item>
      <el-collapse-item title="16. Object.is() 与比较操作符  ===   ==   的区别？ ">
        <ul>
          <li>使用双等号进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。</li>
          <li>使用三等号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。</li>
          <li>使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="17. 什么是 JavaScript 中的包装类型？ ">
        <p>在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，如：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> a = <span class="hljs-string">"abc"</span>;
a.length; <span class="hljs-comment">// 3</span>
a.toUpperCase(); <span class="hljs-comment">// "ABC"</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在访问<code>'abc'.length</code>时，JavaScript 将<code>'abc'</code>在后台转换成<code>String('abc')</code>，然后再访问其<code>length</code>属性。</p>
        <p>JavaScript也可以使用<code>Object</code>函数显式地将基本类型转换为包装类型：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-string">'abc'</span>
<span class="hljs-built_in">Object</span>(a) <span class="hljs-comment">// String {"abc"}</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>也可以使用<code>valueOf</code>方法将包装类型倒转成基本类型：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-string">'abc'</span>
<span class="hljs-keyword">var</span> b = <span class="hljs-built_in">Object</span>(a)
<span class="hljs-keyword">var</span> c = b.valueOf() <span class="hljs-comment">// 'abc'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>看看如下代码会打印出什么：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Boolean</span>( <span class="hljs-literal">false</span> );
<span class="hljs-keyword">if</span> (!a) {
	<span class="hljs-built_in">console</span>.log( <span class="hljs-string">"Oops"</span> ); <span class="hljs-comment">// never runs</span>
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>答案是什么都不会打印，因为虽然包裹的基本类型是<code>false</code>，但是<code>false</code>被包裹成包装类型后就成了对象，所以其非值为<code>false</code>，所以循环体中的内容不会运行。</p>
      </el-collapse-item>
      <el-collapse-item title="18. JavaScript 中如何进行隐式类型转换？ ">
        <p>首先要介绍<code>ToPrimitive</code>方法，这是 JavaScript 中每个值隐含的自带的方法，用来将值 （无论是基本类型值还是对象）转换为基本类型值。如果值为基本类型，则直接返回值本身；如果值为对象，其看起来大概是这样：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">/**
* <span class="hljs-doctag">@obj </span>需要转换的对象
* <span class="hljs-doctag">@type </span>期望的结果类型
*/</span>
ToPrimitive(obj,type)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>type</code>的值为<code>number</code>或者<code>string</code>。
          <strong>（1）当<code>type</code>为<code>number</code>时规则如下：</strong></p>
        <ul>
          <li>调用<code>obj</code>的<code>valueOf</code>方法，如果为原始值，则返回，否则下一步；</li>
          <li>调用<code>obj</code>的<code>toString</code>方法，后续同上；</li>
          <li>抛出<code>TypeError</code> 异常。</li>
        </ul>
        <p><strong>（2）当<code>type</code>为<code>string</code>时规则如下：</strong></p>
        <ul>
          <li>调用<code>obj</code>的<code>toString</code>方法，如果为原始值，则返回，否则下一步；</li>
          <li>调用<code>obj</code>的<code>valueOf</code>方法，后续同上；</li>
          <li>抛出<code>TypeError</code> 异常。</li>
        </ul>
        <p>可以看出两者的主要区别在于调用<code>toString</code>和<code>valueOf</code>的先后顺序。默认情况下：</p>
        <ul>
          <li>如果对象为 Date 对象，则<code>type</code>默认为<code>string</code>；</li>
          <li>其他情况下，<code>type</code>默认为<code>number</code>。</li>
        </ul>
        <p>总结上面的规则，对于 Date 以外的对象，转换为基本类型的大概规则可以概括为一个函数：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> objToNumber = <span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> <span class="hljs-built_in">Number</span>(value.valueOf().toString())
objToNumber([]) === <span class="hljs-number">0</span>
objToNumber({}) === <span class="hljs-literal">NaN</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>而 JavaScript 中的隐式类型转换主要发生在<code>+、-、*、/</code>以及<code>==、&gt;、&lt;</code>这些运算符之间。而这些运算符只能操作基本类型值，所以在进行这些运算前的第一步就是将两边的值用<code>ToPrimitive</code>转换成基本类型，再进行操作。</p>
        <ol>
          <li><strong><code>+</code>操作符</strong>
            当<code>+</code>操作符的两边有至少一个<code>string</code>类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。</li>
        </ol>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1</span> + <span class="hljs-string">'23'</span> <span class="hljs-comment">// '123'</span>
 <span class="hljs-number">1</span> + <span class="hljs-literal">false</span> <span class="hljs-comment">// 1 </span>
 <span class="hljs-number">1</span> + <span class="hljs-built_in">Symbol</span>() <span class="hljs-comment">// Uncaught TypeError: Cannot convert a Symbol value to a number</span>
 <span class="hljs-string">'1'</span> + <span class="hljs-literal">false</span> <span class="hljs-comment">// '1false'</span>
 <span class="hljs-literal">false</span> + <span class="hljs-literal">true</span> <span class="hljs-comment">// 1</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ol start="2">
          <li><strong><code>-</code>、<code>*</code>、<code>\</code>操作符</strong>
            这三个操作符是为数字操作而设计的，所以操作符两边的变量都会被转换成数字，注意<code>NaN</code>也是一个数字</li>
        </ol>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1</span> * <span class="hljs-string">'23'</span> <span class="hljs-comment">// 23</span>
 <span class="hljs-number">1</span> * <span class="hljs-literal">false</span> <span class="hljs-comment">// 0</span>
 <span class="hljs-number">1</span> / <span class="hljs-string">'aa'</span> <span class="hljs-comment">// NaN</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ol start="3">
          <li><strong>对于<code>==</code>操作符</strong></li>
        </ol>
        <p>操作符两边的值都尽量转成<code>number</code>：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">3</span> == <span class="hljs-literal">true</span> <span class="hljs-comment">// false, 3 转为number为3，true转为number为1</span>
<span class="hljs-string">'0'</span> == <span class="hljs-literal">false</span> <span class="hljs-comment">//true, '0'转为number为0，false转为number为0</span>
<span class="hljs-string">'0'</span> == <span class="hljs-number">0</span> <span class="hljs-comment">// '0'转为number为0</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <ol start="4">
          <li><strong>对于<code>&lt;</code>和<code>&gt;</code>比较符</strong></li>
        </ol>
        <p>如果两边都是字符串，则比较字母表顺序：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">'ca'</span> &lt; <span class="hljs-string">'bd'</span> <span class="hljs-comment">// false</span>
<span class="hljs-string">'a'</span> &lt; <span class="hljs-string">'b'</span> <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>其他情况下，转换为数字再比较：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">'12'</span> &lt; <span class="hljs-number">13</span> <span class="hljs-comment">// true</span>
<span class="hljs-literal">false</span> &gt; -<span class="hljs-number">1</span> <span class="hljs-comment">// true</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>以上说的是基本类型的隐式转换，而对象会被<code>ToPrimitive</code>转换为基本类型再进行转换：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> a = {}
a &gt; <span class="hljs-number">2</span> <span class="hljs-comment">// false</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>其对比过程如下：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">a.valueOf() <span class="hljs-comment">// {}, 上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步</span>
a.toString() <span class="hljs-comment">// "[object Object]"，现在是一个字符串了</span>
<span class="hljs-built_in">Number</span>(a.toString()) <span class="hljs-comment">// NaN，根据上面 &lt; 和 &gt; 操作符的规则，要转换成数字</span>
<span class="hljs-literal">NaN</span> &gt; <span class="hljs-number">2</span> <span class="hljs-comment">//false，得出比较结果</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>又比如：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> a = {<span class="hljs-attr">name</span>:<span class="hljs-string">'Jack'</span>}
<span class="hljs-keyword">var</span> b = {<span class="hljs-attr">age</span>: <span class="hljs-number">18</span>}
a + b <span class="hljs-comment">// "[object Object][object Object]"</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>运算过程如下：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">a.valueOf() <span class="hljs-comment">// {}，上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步</span>
a.toString() <span class="hljs-comment">// "[object Object]"</span>
b.valueOf() <span class="hljs-comment">// 同理</span>
b.toString() <span class="hljs-comment">// "[object Object]"</span>
a + b <span class="hljs-comment">// "[object Object][object Object]"</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="19. +  操作符什么时候用于字符串的拼接？ ">
        <p>根据 ES5 规范 11.6.1 节，如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+ 将进行拼接操作。如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作，该抽象操作再调用 [[DefaultValue]]，以数字作为上下文。如果不能转换为字符串，则会将其转换为数字类型来进行计算。</p>
        <p>简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。</p>
        <p>那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
