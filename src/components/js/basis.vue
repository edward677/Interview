<template>
  <div class="basis_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. new操作符的实现原理">
        <p><strong>new操作符的执行过程：</strong>
          （1）首先创建了一个新的空对象
          （2）设置原型，将对象的原型设置为函数的 prototype 对象。
          （3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
          （4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。</p>
        <p>具体实现：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">objectFactory</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> newObject = <span class="hljs-literal">null</span>,
    <span class="hljs-title">constructor</span> = <span class="hljs-title">Array</span>.<span class="hljs-title">prototype</span>.<span class="hljs-title">shift</span>.<span class="hljs-title">call</span>(<span class="hljs-params"><span class="hljs-built_in">arguments</span></span>),
    <span class="hljs-title">result</span> = <span class="hljs-title">null</span>;
  <span class="hljs-comment">// 参数判断</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-title">constructor</span> !== "<span class="hljs-title">function</span>") {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"type error"</span>);
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-comment">// 新建一个空对象，对象的原型为构造函数的 prototype 对象</span>
  newObject = <span class="hljs-built_in">Object</span>.create(<span class="hljs-title">constructor</span>.<span class="hljs-title">prototype</span>);
  <span class="hljs-comment">// 将 this 指向新建对象，并执行函数</span>
  result = <span class="hljs-title">constructor</span>.<span class="hljs-title">apply</span>(<span class="hljs-params">newObject, <span class="hljs-built_in">arguments</span></span>);
  <span class="hljs-comment">// 判断返回对象</span>
  <span class="hljs-keyword">let</span> flag = result &amp;&amp; (<span class="hljs-keyword">typeof</span> result === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> result === <span class="hljs-string">"function"</span>);
  <span class="hljs-comment">// 判断返回结果</span>
  <span class="hljs-keyword">return</span> flag ? result : newObject;
}
<span class="hljs-comment">// 使用方法</span>
objectFactory(构造函数, 初始化参数);
<span class="copy-code-btn">复制代码</span></code></pre>
        <h3 data-id="heading-30">2. map和Object的区别</h3>
        <table><thead><tr><th></th><th>Map</th><th>Object</th></tr></thead><tbody><tr><td>意外的键</td><td>Map默认情况不包含任何键。只包含显式插入的键。</td><td>Object 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。</td></tr><tr><td>键的类型</td><td>Map的键可以是任意值，包括函数、对象或任意基本类型。</td><td>Object 的键必须是 String 或是Symbol。</td></tr><tr><td>键的顺序</td><td>Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。</td><td>Object 的键是无序的</td></tr><tr><td>Size</td><td>Map 的键值对个数可以轻易地通过size 属性获取</td><td>Object 的键值对个数只能手动计算</td></tr><tr><td>迭代</td><td>Map 是 iterable 的，所以可以直接被迭代。</td><td>迭代Object需要以某种方式获取它的键然后才能迭代。</td></tr><tr><td>性能</td><td>在频繁增删键值对的场景下表现更好。</td><td>在频繁添加和删除键值对的场景下未作出优化。</td></tr></tbody></table>
      </el-collapse-item>
      <el-collapse-item title="2. map和weakMap的区别">
        <p><strong>（1）Map</strong>
          map本质上就是键值对的集合，但是普通的Object中的键值对中的键只能是字符串。而ES6提供的Map数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的Hash结构。
          如果Map的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。
          实际上Map是一个数组，它的每一个数据也都是一个数组，其形式如下：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> map = [
     [<span class="hljs-string">"name"</span>,<span class="hljs-string">"张三"</span>],
     [<span class="hljs-string">"age"</span>,<span class="hljs-number">18</span>],
]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>Map数据结构有以下操作方法：</p>
        <ul>
          <li><strong>size</strong>： <code>map.size</code> 返回Map结构的成员总数。</li>
          <li><strong>set(key,value)</strong>：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）</li>
          <li><strong>get(key)</strong>：该方法读取key对应的键值，如果找不到key，返回undefined。</li>
          <li><strong>has(key)</strong>：该方法返回一个布尔值，表示某个键是否在当前Map对象中。</li>
          <li><strong>delete(key)</strong>：该方法删除某个键，返回true，如果删除失败，返回false。</li>
          <li><strong>clear()</strong>：map.clear()清除所有成员，没有返回值。</li>
        </ul>
        <p>Map结构原生提供是三个遍历器生成函数和一个遍历方法</p>
        <ul>
          <li>keys()：返回键名的遍历器。</li>
          <li>values()：返回键值的遍历器。</li>
          <li>entries()：返回所有成员的遍历器。</li>
          <li>forEach()：遍历Map的所有成员。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([
     [<span class="hljs-string">"foo"</span>,<span class="hljs-number">1</span>],
     [<span class="hljs-string">"bar"</span>,<span class="hljs-number">2</span>],
])
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">of</span> map.keys()){
    <span class="hljs-built_in">console</span>.log(key);  <span class="hljs-comment">// foo bar</span>
}
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> map.values()){
     <span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// 1 2</span>
}
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> items <span class="hljs-keyword">of</span> map.entries()){
    <span class="hljs-built_in">console</span>.log(items);  <span class="hljs-comment">// ["foo",1]  ["bar",2]</span>
}
map.forEach( <span class="hljs-function">(<span class="hljs-params">value,key,map</span>) =&gt;</span> {
     <span class="hljs-built_in">console</span>.log(key,value); <span class="hljs-comment">// foo 1    bar 2</span>
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（2）WeakMap</strong>
          WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。<strong>其键必须是对象</strong>，原始数据类型不能作为key值，而值可以是任意的。</p>
        <p>该对象也有以下几种方法：</p>
        <ul>
          <li><strong>set(key,value)</strong>：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）</li>
          <li><strong>get(key)</strong>：该方法读取key对应的键值，如果找不到key，返回undefined。</li>
          <li><strong>has(key)</strong>：该方法返回一个布尔值，表示某个键是否在当前Map对象中。</li>
          <li><strong>delete(key)</strong>：该方法删除某个键，返回true，如果删除失败，返回false。</li>
        </ul>
        <p>其clear()方法已经被弃用，所以可以通过创建一个空的WeakMap并替换原对象来实现清除。</p>
        <p>WeakMap的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。</p>
        <p>而WeakMap的<strong>键名所引用的对象都是弱引用</strong>，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的<strong>键名对象和所对应的键值对会自动消失，不用手动删除引用</strong>。</p>
        <p><strong>总结：</strong></p>
        <ul>
          <li>Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。</li>
          <li>WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="3. JavaScript有哪些内置的对象">
        <p>全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在
          全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。</p>
        <p><strong>标准内置对象的分类：</strong></p>
        <p>（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。
          例如 Infinity、NaN、undefined、null 字面量</p>
        <p>（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。
          例如 eval()、parseFloat()、parseInt() 等</p>
        <p>（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。
          例如 Object、Function、Boolean、Symbol、Error 等</p>
        <p>（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。
          例如 Number、Math、Date</p>
        <p>（5）字符串，用来表示和操作字符串的对象。
          例如 String、RegExp</p>
        <p>（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array</p>
        <p>（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。
          例如 Map、Set、WeakMap、WeakSet</p>
        <p>（8）矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。
          例如 SIMD 等</p>
        <p>（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。
          例如 JSON 等</p>
        <p>（10）控制抽象对象
          例如 Promise、Generator 等</p>
        <p>（11）反射
          例如 Reflect、Proxy</p>
        <p>（12）国际化，为了支持多语言处理而加入 ECMAScript 的对象。
          例如 Intl、Intl.Collator 等</p>
        <p>（13）WebAssembly</p>
        <p>（14）其他
          例如 arguments</p>
        <p><strong>总结：</strong>
          js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般经常用到的如全局变量值 NaN、undefined，全局函数如 parseInt()、parseFloat() 用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的单体内置对象如 Math 对象。</p>
      </el-collapse-item>
      <el-collapse-item title="4. 常用的正则表达式有哪些？">
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// （1）匹配 16 进制颜色值</span>
<span class="hljs-keyword">var</span> regex = <span class="hljs-regexp">/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g</span>;

<span class="hljs-comment">// （2）匹配日期，如 yyyy-mm-dd 格式</span>
<span class="hljs-keyword">var</span> regex = <span class="hljs-regexp">/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/</span>;

<span class="hljs-comment">// （3）匹配 qq 号</span>
<span class="hljs-keyword">var</span> regex = <span class="hljs-regexp">/^[1-9][0-9]{4,10}$/g</span>;

<span class="hljs-comment">// （4）手机号码正则</span>
<span class="hljs-keyword">var</span> regex = <span class="hljs-regexp">/^1[34578]\d{9}$/g</span>;

<span class="hljs-comment">// （5）用户名正则</span>
<span class="hljs-keyword">var</span> regex = <span class="hljs-regexp">/^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/</span>;
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="5. 对JSON的理解">
        <p>JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。</p>
        <p>在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为
          JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。</p>
        <p>因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。</p>
        <p>在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，</p>
        <ul>
          <li>JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。</li>
          <li>JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="6. JavaScript脚本延迟加载的方式有哪些？">
        <p>相关知识点：
          js 延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。</p>
        <p>一般有以下几种方式：</p>
        <ul>
          <li><strong>defer 属性：</strong> 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。</li>
          <li><strong>async 属性：</strong> 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。</li>
          <li><strong>动态创建 DOM 方式：</strong> 动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。</li>
          <li><strong>使用 setTimeout 延迟方法：</strong> 设置一个定时器来延迟加载js脚本文件</li>
          <li><strong>让 JS 最后加载：</strong> 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="7. JavaScript 类数组对象的定义？">
        <p>一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。
          常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length
          属性值，代表可接收的参数个数。</p>
        <p>常见的类数组转换为数组的方法有这样几种：
          （1）通过 call 调用数组的 slice 方法来实现转换</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.slice.call(arrayLike);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（2）通过 call 调用数组的 splice 方法来实现转换</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.splice.call(arrayLike, <span class="hljs-number">0</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（3）通过 apply 调用数组的 concat 方法来实现转换</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.concat.apply([], arrayLike);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（4）通过 Array.from 方法来实现转换</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.from(arrayLike);
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="8. 数组和对象有哪些原生方法，列举一下？">
        <ul>
          <li>数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。</li>
          <li>数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。</li>
          <li>数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。</li>
          <li>数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。</li>
          <li>数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。</li>
          <li>数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法</li>
          <li>数组归并方法 reduce() 和 reduceRight() 方法</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="9. Unicode、UTF-8、UTF-16、UTF-32有什么区别？">
        <h4 data-id="heading-39">（1）Unicode</h4>
        <p>在说<code>Unicode</code>之前需要先了解一下<code>ASCII</code>码：
          ASCII 码（<code>American Standard Code for Information Interchange</code>）称为美国标准信息交换码。</p>
        <ul>
          <li>它是基于拉丁字母的一套电脑编码系统。</li>
          <li>它定义了一个用于代表常见字符的字典。</li>
          <li>它包含了"A-Z"(包含大小写)，数据"0-9" 以及一些常见的符号。</li>
          <li>它是专门为英语而设计的，有128个编码，对其他语言无能为力</li>
        </ul>
        <p><code>ASCII</code>码可以表示的编码有限，要想表示其他语言的编码，还是要使用<code>Unicode</code>来表示，可以说<code>Unicode</code>是<code>ASCII</code> 的超集。</p>
        <p><code>Unicode</code>全称 <code>Unicode Translation Format</code>，又叫做统一码、万国码、单一码。<code>Unicode</code> 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。
          <strong>Unicode的实现的方式：</strong>
          <code>Unicode</code>的实现方式（也就是编码方式）有很多种，常见的是<strong>UTF-8</strong>、<strong>UTF-16</strong>、<strong>UTF-32</strong>和<strong>USC-2</strong>。</p>
        <h4 data-id="heading-40">（2）UTF-8</h4>
        <p><code>UTF-8</code>是使用最广泛的<code>Unicode</code>编码方式，它是一种可变长的编码方式，可以是1—4个字节不等，它可以完全兼容<code>ASCII</code>码的128个字符。
          <strong>注意：</strong> <code>UTF-8</code> 是一种编码方式，<code>Unicode</code>是一个字符集合。
          <code>UTF-8</code>的编码规则：</p>
        <ul>
          <li>对于<strong>单字节</strong>的符号，字节的第一位为0，后面的7位为这个字符的<code>Unicode</code>编码，因此对于英文字母，它的<code>Unicode</code>编码和<code>ACSII</code>编码一样。</li>
          <li>对于<strong>n字节</strong>的符号，第一个字节的前n位都是1，第n+1位设为0，后面字节的前两位一律设为10，剩下的没有提及的二进制位，全部为这个符号的<code>Unicode</code>码 。</li>
        </ul>
        <p>来看一下具体的<code>Unicode</code>编号范围与对应的<code>UTF-8</code>二进制格式 ：</p>
        <table><thead><tr><th>编码范围（编号对应的十进制数）</th><th>二进制格式</th></tr></thead><tbody><tr><td>0x00—0x7F （0-127）</td><td>0xxxxxxx</td></tr><tr><td>0x80—0x7FF （128-2047）</td><td>110xxxxx 10xxxxxx</td></tr><tr><td>0x800—0xFFFF  （2048-65535）</td><td>1110xxxx 10xxxxxx 10xxxxxx</td></tr><tr><td>0x10000—0x10FFFF  （65536以上）</td><td>11110xxx 10xxxxxx 10xxxxxx 10xxxxxx</td></tr></tbody></table>
        <p>那该如何通过具体的<code>Unicode</code>编码，进行具体的<code>UTF-8</code>编码呢？
          <strong>步骤：</strong></p>
        <ul>
          <li>找到该<code>Unicode</code>编码的所在的编号范围，进而找到与之对应的二进制格式</li>
          <li>将<code>Unicode</code>编码转换为二进制数（去掉最高位的0）</li>
          <li>将二进制数从右往左一次填入二进制格式的<code>X</code>中，如果有<code>X</code>未填，就设为0</li>
        </ul>
        <p>来看一个实际的例子：
          “<strong>马</strong>” 字的<code>Unicode</code>编码是：<code>0x9A6C</code>，整数编号是<code>39532</code>
          （1）首选确定了该字符在第三个范围内，它的格式是 <code>1110xxxx 10xxxxxx 10xxxxxx</code>
          （2）39532对应的二进制数为<code>1001 1010 0110 1100</code>
          （3）将二进制数填入X中，结果是：<code>11101001 10101001 10101100</code></p>
        <h4 data-id="heading-41">（3）UTF-16</h4>
        <p><strong>1. 平面的概念</strong>
          在了解<code>UTF-16</code>之前，先看一下<strong>平面</strong>的概念：
          <code>Unicode</code>编码中有很多很多的字符，它并不是一次性定义的，而是分区进行定义的，每个区存放<strong>65536</strong>（2）个字符，这称为一个<strong>平面</strong>，目前总共有17 个平面。</p>
        <p>最前面的一个平面称为<strong>基本平面</strong>，它的码点从<strong>0 — 2-1</strong>，写成16进制就是<code>U+0000 — U+FFFF</code>，那剩下的16个平面就是<strong>辅助平面</strong>，码点范围是 <code>U+10000—U+10FFFF</code>。
          <strong>2. UTF-16 概念：</strong>
          <code>UTF-16</code>也是<code>Unicode</code>编码集的一种编码形式，把<code>Unicode</code>字符集的抽象码位映射为16位长的整数（即码元）的序列，用于数据存储或传递。<code>Unicode</code>字符的码位需要1个或者2个16位长的码元来表示，因此<code>UTF-16</code>也是用变长字节表示的。
          <strong>3. UTF-16 编码规则：</strong></p>
        <p>最前面的一个平面称为<strong>基本平面</strong>，它的码点从<strong>0 — 2-1</strong>，写成16进制就是<code>U+0000 — U+FFFF</code>，那剩下的16个平面就是<strong>辅助平面</strong>，码点范围是 <code>U+10000—U+10FFFF</code>。
          <strong>2. UTF-16 概念：</strong>
          <code>UTF-16</code>也是<code>Unicode</code>编码集的一种编码形式，把<code>Unicode</code>字符集的抽象码位映射为16位长的整数（即码元）的序列，用于数据存储或传递。<code>Unicode</code>字符的码位需要1个或者2个16位长的码元来表示，因此<code>UTF-16</code>也是用变长字节表示的。
          <strong>3. UTF-16 编码规则：</strong></p>
        <ul>
          <li>编号在 <code>U+0000—U+FFFF</code> 的字符（常用字符集），直接用两个字节表示。</li>
          <li>编号在 <code>U+10000—U+10FFFF</code> 之间的字符，需要用四个字节表示。</li>
        </ul>
        <p><strong>4. 编码识别</strong>
          那么问题来了，当遇到两个字节时，怎么知道是把它当做一个字符还是和后面的两个字节一起当做一个字符呢？</p>
        <p><code>UTF-16</code> 编码肯定也考虑到了这个问题，在基本平面内，从 <code>U+D800 — U+DFFF</code> 是一个空段，也就是说这个区间的码点不对应任何的字符，因此这些空段就可以用来映射辅助平面的字符。</p>
        <p>辅助平面共有 <strong>2</strong> 个字符位，因此表示这些字符至少需要 20 个二进制位。<code>UTF-16</code> 将这 20 个二进制位分成两半，前 10 位映射在 <code>U+D800 — U+DBFF</code>，称为<strong>高位</strong>（H），后 10 位映射在 <code>U+DC00 — U+DFFF</code>，称为<strong>低位</strong>（L）。这就相当于，将一个辅助平面的字符拆成了两个基本平面的字符来表示。</p>
        <p>因此，当遇到两个字节时，发现它的码点在 <code>U+D800 —U+DBFF</code>之间，就可以知道，它后面的两个字节的码点应该在 <code>U+DC00 — U+DFFF</code> 之间，这四个字节必须放在一起进行解读。
          <strong>5. 举例说明</strong>
          以 "<strong>𡠀</strong>" 字为例，它的 <code>Unicode</code> 码点为 <code>0x21800</code>，该码点超出了基本平面的范围，因此需要用四个字节来表示，步骤如下：</p>
        <ul>
          <li>首先计算超出部分的结果：<code>0x21800 - 0x10000</code></li>
          <li>将上面的计算结果转为20位的二进制数，不足20位就在前面补0，结果为：<code>0001000110 0000000000</code></li>
          <li>将得到的两个10位二进制数分别对应到两个区间中</li>
          <li><code>U+D800</code> 对应的二进制数为 <code>1101100000000000</code>， 将<code>0001000110</code>填充在它的后10 个二进制位，得到 <code>1101100001000110</code>，转成 16 进制数为 <code>0xD846</code>。同理，低位为 <code>0xDC00</code>，所以这个字的<code>UTF-16</code> 编码为 <code>0xD846 0xDC00</code></li>
        </ul>
        <h4 data-id="heading-42">（4） UTF-32</h4>
        <p><code>UTF-32</code> 就是字符所对应编号的整数二进制形式，每个字符占四个字节，这个是直接进行转换的。该编码方式占用的储存空间较多，所以使用较少。</p>
        <p>比如“<strong>马</strong>” 字的Unicode编号是：<code>U+9A6C</code>，整数编号是<code>39532</code>，直接转化为二进制：<code>1001 1010 0110 1100</code>，这就是它的UTF-32编码。</p>
        <h4 data-id="heading-43">（5）总结</h4>
        <p>简单的了解完这几个概念，那就来简单回答一下最开始的那个问题：
          <strong>Unicode、UTF-8、UTF-16、UTF-32有什么区别？</strong></p>
        <ul>
          <li><code>Unicode</code> 是编码字符集（字符集），而<code>UTF-8</code>、<code>UTF-16</code>、<code>UTF-32</code>是字符集编码（编码规则）</li>
          <li><code>UTF-16</code> 使用变长码元序列的编码方式，相较于定长码元序列的<code>UTF-32</code>算法更复杂，甚至比同样是变长码元序列的<code>UTF-8</code>也更为复杂，因为其引入了独特的<strong>代理对</strong>这样的代理机制</li>
          <li><code>UTF-8</code>需要判断每个字节中的开头标志信息，所以如果某个字节在传送过程中出错了，就会导致后面的字节也会解析出错；而<code>UTF-16</code>不会判断开头标志，即使错也只会错一个字符，所以容错能力教强</li>
          <li>如果字符内容全部英文或英文与其他文字混合，但英文占绝大部分，那么用<code>UTF-8</code>就比<code>UTF-16</code>节省了很多空间；而如果字符内容全部是中文这样类似的字符或者混合字符中中文占绝大多数，那么<code>UTF-16</code>就占优势了，可以节省很多空间</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="10. 常见的位运算符有哪些？其计算规则是什么？">
        <p>现代计算机中数据都是以二进制的形式存储的，即0、1两种状态，计算机对二进制数据进行的运算加减乘除等都是叫位运算，即将符号位共同参与运算的运算。</p>
        <p>常见的位运算有以下几种：</p>
        <table><thead><tr><th>运算符</th><th>描述</th><th>运算规则</th></tr></thead><tbody><tr><td><code>&amp;</code></td><td>与</td><td>两个位都为1时，结果才为1</td></tr><tr><td>`</td><td>`</td><td>或</td></tr><tr><td><code>^</code></td><td>异或</td><td>两个位相同为0，相异为1</td></tr><tr><td><code>~</code></td><td>取反</td><td>0变1，1变0</td></tr><tr><td><code>&lt;&lt;</code></td><td>左移</td><td>各二进制位全部左移若干位，高位丢弃，低位补0</td></tr><tr><td><code>&gt;&gt;</code></td><td>右移</td><td>各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃</td></tr></tbody></table>
        <h4 data-id="heading-45">1. 按位与运算符（&amp;）</h4>
        <p><strong>定义：</strong> 参加运算的两个数据<strong>按二进制位</strong>进行“与”运算。
          <strong>运算规则：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0</span> &amp; <span class="hljs-number">0</span> = <span class="hljs-number">0</span>
<span class="hljs-number">0</span> &amp; <span class="hljs-number">1</span> = <span class="hljs-number">0</span>
<span class="hljs-number">1</span> &amp; <span class="hljs-number">0</span> = <span class="hljs-number">0</span>
<span class="hljs-number">1</span> &amp; <span class="hljs-number">1</span> = <span class="hljs-number">1</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>总结：两位同时为1，结果才为1，否则结果为0。
          例如：3&amp;5 即：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0000</span> <span class="hljs-number">0011</span>
   <span class="hljs-number">0000</span> <span class="hljs-number">0101</span>
 = <span class="hljs-number">0000</span> <span class="hljs-number">0001</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>因此 3&amp;5 的值为1。
          注意：负数按补码形式参加按位与运算。
          <strong>用途：</strong>
          <strong>（1）判断奇偶</strong>
          只要根据最未位是0还是1来决定，为0就是偶数，为1就是奇数。因此可以用<code>if ((i &amp; 1) == 0)</code>代替<code>if (i % 2 == 0)</code>来判断a是不是偶数。
          <strong>（2）清零</strong>
          如果想将一个单元清零，即使其全部二进制位为0，只要与一个各位都为零的数值相与，结果为零。</p>
        <h4 data-id="heading-46">2. 按位或运算符（|）</h4>
        <p><strong>定义：</strong> 参加运算的两个对象按二进制位进行“或”运算。
          <strong>运算规则：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0</span> | <span class="hljs-number">0</span> = <span class="hljs-number">0</span>
<span class="hljs-number">0</span> | <span class="hljs-number">1</span> = <span class="hljs-number">1</span>
<span class="hljs-number">1</span> | <span class="hljs-number">0</span> = <span class="hljs-number">1</span>
<span class="hljs-number">1</span> | <span class="hljs-number">1</span> = <span class="hljs-number">1</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>总结：参加运算的两个对象只要有一个为1，其值为1。
          例如：3|5即：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0000</span> <span class="hljs-number">0011</span>
  <span class="hljs-number">0000</span> <span class="hljs-number">0101</span>
= <span class="hljs-number">0000</span> <span class="hljs-number">0111</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>因此，3|5的值为7。
          注意：负数按补码形式参加按位或运算。</p>
        <h4 data-id="heading-47">3. 异或运算符（^）</h4>
        <p><strong>定义：</strong> 参加运算的两个数据按二进制位进行“异或”运算。
          <strong>运算规则：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0</span> ^ <span class="hljs-number">0</span> = <span class="hljs-number">0</span>
<span class="hljs-number">0</span> ^ <span class="hljs-number">1</span> = <span class="hljs-number">1</span>
<span class="hljs-number">1</span> ^ <span class="hljs-number">0</span> = <span class="hljs-number">1</span>
<span class="hljs-number">1</span> ^ <span class="hljs-number">1</span> = <span class="hljs-number">0</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>总结：参加运算的两个对象，如果两个相应位相同为0，相异为1。
          例如：3|5即：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0000</span> <span class="hljs-number">0011</span>
  <span class="hljs-number">0000</span> <span class="hljs-number">0101</span>
= <span class="hljs-number">0000</span> <span class="hljs-number">0110</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>因此，3^5的值为6。
          异或运算的性质:</p>
        <ul>
          <li>交换律：<code>(a^b)^c == a^(b^c)</code></li>
          <li>结合律：<code>(a + b)^c == a^b + b^c</code></li>
          <li>对于任何数x，都有 <code>x^x=0，x^0=x</code></li>
          <li>自反性: <code>a^b^b=a^0=a</code>;</li>
        </ul>
        <h4 data-id="heading-48">4. 取反运算符 (~)</h4>
        <p><strong>定义：</strong> 参加运算的一个数据按二进制进行“取反”运算。
          运算规则：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">~ <span class="hljs-number">1</span> = <span class="hljs-number">0</span>
~ <span class="hljs-number">0</span> = <span class="hljs-number">1</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>总结：对一个二进制数按位取反，即将0变1，1变0。
          例如：~6 即：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0000</span> <span class="hljs-number">0110</span>
= <span class="hljs-number">1111</span> <span class="hljs-number">1001</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在计算机中，正数用原码表示，负数使用补码存储，首先看最高位，最高位1表示负数，0表示正数。此计算机二进制码为负数，最高位为符号位。
          当发现按位取反为负数时，就<strong>直接取其补码</strong>，变为十进制：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0000</span> <span class="hljs-number">0110</span>
   = <span class="hljs-number">1111</span> <span class="hljs-number">1001</span>
反码：<span class="hljs-number">1000</span> <span class="hljs-number">0110</span>
补码：<span class="hljs-number">1000</span> <span class="hljs-number">0111</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>因此，~6的值为-7。</p>
        <h4 data-id="heading-49">5. 左移运算符（&lt;&lt;）</h4>
        <p><strong>定义：</strong> 将一个运算对象的各二进制位全部左移若干位，左边的二进制位丢弃，右边补0。
          设 a=1010 1110，a = a&lt;&lt; 2 将a的二进制位左移2位、右补0，即得a=1011 1000。
          若左移时舍弃的高位不包含1，则每左移一位，相当于该数乘以2。</p>
        <h4 data-id="heading-50">6. 右移运算符（&gt;&gt;）</h4>
        <p><strong>定义：</strong> 将一个数的各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃。
          例如：a=a&gt;&gt;2 将a的二进制位右移2位，左补0 或者 左补1得看被移数是正还是负。
          操作数每右移一位，相当于该数除以2。</p>
        <h4 data-id="heading-51">7. 原码、补码、反码</h4>
        <p>上面提到了补码、反码等知识，这里就补充一下。
          计算机中的<strong>有符号数</strong>有三种表示方法，即原码、反码和补码。三种表示方法均有符号位和数值位两部分，符号位都是用0表示“正”，用1表示“负”，而数值位，三种表示方法各不相同。
          <strong>（1）原码</strong>
          原码就是一个数的二进制数。
          例如：10的原码为0000 1010
          <strong>（2）反码</strong></p>
        <ul>
          <li>正数的反码与原码相同，如：10 反码为 0000 1010</li>
          <li>负数的反码为除符号位，按位取反，即0变1，1变0。</li>
        </ul>
        <p>例如：-10</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">原码：<span class="hljs-number">1000</span> <span class="hljs-number">1010</span>
反码：<span class="hljs-number">1111</span> <span class="hljs-number">0101</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（3）补码</strong></p>
        <ul>
          <li>正数的补码与原码相同，如：10 补码为 0000 1010</li>
          <li>负数的补码是原码除符号位外的所有位取反即0变1，1变0，然后加1，也就是反码加1。</li>
        </ul>
        <p>例如：-10</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">原码：<span class="hljs-number">1000</span> <span class="hljs-number">1010</span>
反码：<span class="hljs-number">1111</span> <span class="hljs-number">0101</span>
补码：<span class="hljs-number">1111</span> <span class="hljs-number">0110</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="11. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?">
        <p>因为<code>arguments</code>是一个对象，它的属性是从 0 开始依次递增的数字，还有<code>callee</code>和<code>length</code>等属性，与数组非常相似；但是它们却没有数组常见的方法属性，如<code>forEach</code>, <code>reduce</code>等，所以叫它们类数组。</p>
        <p>要遍历类数组，有三个方法：
          （1）将数组的方法应用到类数组上，这时候就可以使用<code>call</code>和<code>apply</code>方法，如：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">Array</span>.prototype.forEach.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a))
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（2）使用Array.from方法将类数组转化成数组：‌</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">const</span> arrArgs = <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">arguments</span>)
  arrArgs.forEach(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a))
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（3）使用展开运算符将类数组转化成数组</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">const</span> arrArgs = [...arguments]
    arrArgs.forEach(<span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(a))
}
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="12. 什么是 DOM 和 BOM？">
        <ul>
          <li>DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。</li>
          <li>BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="13. 对类数组对象的理解，如何转化为数组">
        <p>一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。</p>
        <p>常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length属性值，代表可接收的参数个数。</p>
        <p>常见的类数组转换为数组的方法有这样几种：</p>
        <ul>
          <li>通过 call 调用数组的 slice 方法来实现转换</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.slice.call(arrayLike);
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过 call 调用数组的 splice 方法来实现转换</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.splice.call(arrayLike, <span class="hljs-number">0</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过 apply 调用数组的 concat 方法来实现转换</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.prototype.concat.apply([], arrayLike);
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>通过 Array.from 方法来实现转换</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Array</span>.from(arrayLike);
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="14. escape,encodeURI,encodeURIComponent 的区别？">
        <p>encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。</p>
        <p>encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。
          escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，再在每个字节前加上 %。</p>
      </el-collapse-item>
      <el-collapse-item title="15. 对AJAX的理解，实现一个AJAX请求">
        <p>AJAX是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。</p>
        <p>创建AJAX请求的步骤：</p>
        <ul>
          <li><strong>创建一个 XMLHttpRequest 对象。</strong></li>
          <li>在这个对象上<strong>使用 open 方法创建一个 HTTP 请求</strong>，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。</li>
          <li>在发起请求前，可以为这个对象<strong>添加一些信息和监听函数</strong>。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。</li>
          <li>当对象的属性和监听函数设置完成后，最后调<strong>用 sent 方法来向服务器发起请求</strong>，可以传入参数作为发送的数据体。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> SERVER_URL = <span class="hljs-string">"/server"</span>;
<span class="hljs-keyword">let</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-comment">// 创建 Http 请求</span>
xhr.open(<span class="hljs-string">"GET"</span>, SERVER_URL, <span class="hljs-literal">true</span>);
<span class="hljs-comment">// 设置状态监听函数</span>
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">this</span>.readyState !== <span class="hljs-number">4</span>) <span class="hljs-keyword">return</span>;
  <span class="hljs-comment">// 当请求成功时</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">this</span>.status === <span class="hljs-number">200</span>) {
    handle(<span class="hljs-built_in">this</span>.response);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-built_in">this</span>.statusText);
  }
};
<span class="hljs-comment">// 设置请求失败时的监听函数</span>
xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.error(<span class="hljs-built_in">this</span>.statusText);
};
<span class="hljs-comment">// 设置请求头信息</span>
xhr.responseType = <span class="hljs-string">"json"</span>;
xhr.setRequestHeader(<span class="hljs-string">"Accept"</span>, <span class="hljs-string">"application/json"</span>);
<span class="hljs-comment">// 发送 Http 请求</span>
xhr.send(<span class="hljs-literal">null</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>使用Promise封装AJAX：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// promise 封装实现：</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJSON</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-comment">// 创建一个 promise 对象</span>
  <span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    <span class="hljs-keyword">let</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    <span class="hljs-comment">// 新建一个 http 请求</span>
    xhr.open(<span class="hljs-string">"GET"</span>, url, <span class="hljs-literal">true</span>);
    <span class="hljs-comment">// 设置状态的监听函数</span>
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">this</span>.readyState !== <span class="hljs-number">4</span>) <span class="hljs-keyword">return</span>;
      <span class="hljs-comment">// 当请求成功或失败时，改变 promise 的状态</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">this</span>.status === <span class="hljs-number">200</span>) {
        resolve(<span class="hljs-built_in">this</span>.response);
      } <span class="hljs-keyword">else</span> {
        reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-built_in">this</span>.statusText));
      }
    };
    <span class="hljs-comment">// 设置错误监听函数</span>
    xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-built_in">this</span>.statusText));
    };
    <span class="hljs-comment">// 设置响应的数据类型</span>
    xhr.responseType = <span class="hljs-string">"json"</span>;
    <span class="hljs-comment">// 设置请求头信息</span>
    xhr.setRequestHeader(<span class="hljs-string">"Accept"</span>, <span class="hljs-string">"application/json"</span>);
    <span class="hljs-comment">// 发送 http 请求</span>
    xhr.send(<span class="hljs-literal">null</span>);
  });
  <span class="hljs-keyword">return</span> promise;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
