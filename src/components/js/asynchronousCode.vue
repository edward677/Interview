<template>
<div class="asynchronousCode_warp">
  <el-collapse accordion>
    <el-collapse-item title="一、Promise基础">
      <h4 data-id="heading-20">1、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
});
promise.then(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>最后应该输出1 2 4。这样最主要的就是3，要知道promise.then是微任务，会在所有的宏任务执行完之后才会执行，同时需要promise内部的状态发生变化，因为这里内部没有发生变化，所以不输出3。</p>
      <h4 data-id="heading-21">2、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
  resolve(<span class="hljs-string">'resolve1'</span>)
})
<span class="hljs-keyword">const</span> promise2 = promise1.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(res)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>, promise1);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>, promise2);
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果如下：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">'promise1'</span>
<span class="hljs-string">'1'</span> <span class="hljs-built_in">Promise</span>{&lt;resolved&gt;: <span class="hljs-string">'resolve1'</span>}
<span class="hljs-string">'2'</span> <span class="hljs-built_in">Promise</span>{&lt;pending&gt;}
<span class="hljs-string">'resolve1'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>需要注意的是，直接打印promise1，会打印出它的状态值和参数。</p>
      <p>这里说一下这道题的具体思路：</p>
      <ul>
        <li>script是一个宏任务，按照顺序执行这些代码</li>
        <li>首先进入Promise，执行该构造函数中的代码，打印<code>promise1</code></li>
        <li>碰到<code>resolve</code>函数, 将<code>promise1</code>的状态改变为<code>resolved</code>, 并将结果保存下来</li>
        <li>碰到<code>promise1.then</code>这个微任务，将它放入微任务队列</li>
        <li><code>promise2</code>是一个新的状态为<code>pending</code>的<code>Promise</code></li>
        <li>执行同步代码1， 同时打印出<code>promise1</code>的状态是<code>resolved</code></li>
        <li>执行同步代码2，同时打印出<code>promise2</code>的状态是<code>pending</code></li>
        <li>宏任务执行完毕，查找微任务队列，发现<code>promise1.then</code>这个微任务且状态为<code>resolved</code>，执行它。</li>
      </ul>
      <p>这样，就执行完了所有的的代码。</p>
      <h4 data-id="heading-22">3、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"timerStart"</span>);
    resolve(<span class="hljs-string">"success"</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"timerEnd"</span>);
  }, <span class="hljs-number">0</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
});
promise.then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(res);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行顺序：</p>
      <ul>
        <li>首先遇到Promise构造函数，会先执行里面的内容，打印1</li>
        <li>遇到<code>steTimeout</code>，它是一个宏任务，被推入宏任务队列</li>
        <li>接下继续执行，打印出2</li>
        <li>由于<code>Promise</code>的状态此时还是<code>pending</code>，所以<code>promise.then</code>先不执行</li>
        <li>继续执行下面的同步任务，打印出4</li>
        <li>微任务队列此时没有任务，继续执行下一轮宏任务，执行<code>steTimeout</code></li>
        <li>首先执行<code>timerStart</code>，然后遇到了<code>resolve</code>，将<code>promise</code>的状态改为<code>resolved</code>且保存结果并将之前的<code>promise.then</code>推入微任务队列，再执行<code>timerEnd</code></li>
        <li>执行完这个宏任务，就去执行微任务<code>promise.then</code>，打印出<code>resolve</code>的结果</li>
      </ul>
      <h4 data-id="heading-23">4、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>);
  <span class="hljs-keyword">const</span> timer2 = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer2'</span>)
  }, <span class="hljs-number">0</span>)
});
<span class="hljs-keyword">const</span> timer1 = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer1'</span>)
  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>)
  })
}, <span class="hljs-number">0</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start'</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这个题目就有点绕了，下面来梳理一下：</p>
      <ul>
        <li>首先，<code>Promise.resolve().then</code>是一个微任务，加入微任务队列</li>
        <li>执行timer1，它是一个宏任务，加入宏任务队列</li>
        <li>继续执行下面的同步代码，打印出start</li>
        <li>这样第一轮的宏任务就执行完了，开始执行微任务，打印出<code>promise1</code></li>
        <li>遇到timer2，它是一个宏任务，将其加入宏任务队列</li>
        <li>这样第一轮的微任务就执行完了，开始执行第二轮宏任务，指执行定时器timer1,打印timer1</li>
        <li>遇到Promise，它是一个微任务，加入微任务队列</li>
        <li>开始执行微任务队列中的任务，打印promise2</li>
        <li>最后执行宏任务timer2定时器，打印出timer2</li>
      </ul>
      <p>这个题目还是比较复杂的，值得去认真理解一下。</p>
      <p>执行结果：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">'start'</span>
<span class="hljs-string">'promise1'</span>
<span class="hljs-string">'timer1'</span>
<span class="hljs-string">'promise2'</span>
<span class="hljs-string">'timer2'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <h4 data-id="heading-24">5、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    resolve(<span class="hljs-string">'success1'</span>);
    reject(<span class="hljs-string">'error'</span>);
    resolve(<span class="hljs-string">'success2'</span>);
});
promise.then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'then:'</span>, res);
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'catch:'</span>, err);
})
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行结果为：<code>then：success1</code></p>
      <p>这个题目考察的就是<code>Promise</code>的状态在发生变化之后，就不会再发生变化。开始状态由<code>pending</code>变为<code>resolve</code>，说明已经变为已完成状态，下面的两个状态的就不会再执行，同时下面的catch也不会捕获到错误。</p>
      <h4 data-id="heading-25">6、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-number">2</span>)
  .then(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>))
  .then(<span class="hljs-built_in">console</span>.log)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1</span>
<span class="hljs-built_in">Promise</span> {&lt;fulfilled&gt;: <span class="hljs-literal">undefined</span>}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>Promise.resolve方法的参数如果是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为resolved，Promise.resolve方法的参数，会同时传给回调函数。</p>
      <p>then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为then(null)，这就会导致前一个Promise的结果会传递下面。</p>
      <h4 data-id="heading-26">7、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    resolve(<span class="hljs-string">'success'</span>)
  }, <span class="hljs-number">1000</span>)
})
<span class="hljs-keyword">const</span> promise2 = promise1.then(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error!!!'</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>, promise1)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>, promise2)
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>, promise1)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>, promise2)
}, <span class="hljs-number">2000</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出的结果如下：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">promise1 <span class="hljs-built_in">Promise</span> {&lt;pending&gt;}
promise2 <span class="hljs-built_in">Promise</span> {&lt;pending&gt;}

Uncaught (<span class="hljs-keyword">in</span> promise) <span class="hljs-built_in">Error</span>: error!!!
promise1 <span class="hljs-built_in">Promise</span> {&lt;fulfilled&gt;: <span class="hljs-string">"success"</span>}
promise2 <span class="hljs-built_in">Promise</span> {&lt;rejected&gt;: <span class="hljs-built_in">Error</span>: error!!}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这个就比较好理解了，和上面的几个题目思路类似。</p>
    </el-collapse-item>
    <el-collapse-item title="二、Promise的catch、then、finally">
      <h4 data-id="heading-28">8、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
  })
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);
  });
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：1   2</p>
      <p>Promise可以链式调用，因为每次调用 <code>.then</code> 或者 <code>.catch</code> 都会返回一个新的 promise，从而实现了链式调用, 它并不像一般任务的链式调用一样return this。</p>
      <p>上面的输出结果之所以依次打印出1和2，是因为<code>resolve(1)</code>之后走的是第一个then方法，并没有走catch里，所以第二个then中的res得到的实际上是第一个then的返回值。并且return 2会被包装成<code>resolve(2)</code>，被最后的then打印输出2。</p>
      <h4 data-id="heading-29">9、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error!!!'</span>)
}).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"then: "</span>, res)
}).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"catch: "</span>, err)
})
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的<code>return new Error('error!!!')</code>也被包裹成了<code>return Promise.resolve(new Error('error!!!'))</code>。</p>
      <p>因此它被then捕获而不是catch，输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">"then: "</span> <span class="hljs-string">"Error: error!!!"</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><strong>10、下面代码的执行结果是</strong></p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">return</span> promise;
})
promise.catch(<span class="hljs-built_in">console</span>.err)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这里其实是一个坑，<code>.then</code> 或 <code>.catch</code> 返回的值不能是 promise 本身，否则会造成死循环。所以这道题会报错：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">Uncaught (<span class="hljs-keyword">in</span> promise) <span class="hljs-built_in">TypeError</span>: Chaining cycle detected <span class="hljs-keyword">for</span> promise #&lt;<span class="hljs-built_in">Promise</span>&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
      <h4 data-id="heading-30">11、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-number">2</span>)
  .then(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>))
  .then(<span class="hljs-built_in">console</span>.log)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>看到这个题目，好多的then，实际上只需要记住一个原则：<code>.then</code> 或<code>.catch</code> 的参数期望是函数，传入非函数则会发生<strong>值透传</strong>。</p>
      <p>第一个then和第二个then中传入的都不是函数，一个是数字，一个是对象，因此发生了透传，将<code>resolve(1)</code> 的值直接传到最后一个then里。</p>
      <p>所以输出结果为：1</p>
      <h4 data-id="heading-31">12、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'err!!!'</span>)
  .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success'</span>, res)
  }, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error'</span>, err)
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'catch'</span>, err)
  })
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><code>.then</code>函数中的两个参数：</p>
      <ul>
        <li>第一个参数是用来处理Promise成功的函数</li>
        <li>第二个则是处理失败的函数</li>
      </ul>
      <p>也就是说<code>Promise.resolve('1')</code>的值会进入成功的函数，<code>Promise.reject('2')</code>的值会进入失败的函数。</p>
      <p>在这道题中，错误直接被<code>then</code>的第二个参数捕获了，所以就不会被<code>catch</code>捕获了，输出结果为：<code>'error' 'error!!!'</code></p>
      <p>但是，如果是像下面这样：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve()
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span> (<span class="hljs-params">res</span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'error!!!'</span>)
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fail1</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fail1'</span>, err)
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fail2</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fail2'</span>, err)
  })
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>在<code>then</code>的第一参数中抛出了错误，那么他就不会被第二个参数不活了，而是被后面的<code>catch</code>捕获到，所以输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">fail2 <span class="hljs-built_in">Error</span>: error!!!
              at success
<span class="copy-code-btn">复制代码</span></code></pre>
      <h4 data-id="heading-32">13、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'1'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res)
  })
  .finally(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finally'</span>)
  })
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'2'</span>)
  .finally(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finally2'</span>)
  	<span class="hljs-keyword">return</span> <span class="hljs-string">'我是finally2返回的值'</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finally2后面的then函数'</span>, res)
  })
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><code>.finally()</code>一般用的很少，只要记住以下几点就可以了：</p>
      <ul>
        <li><code>.finally()</code>方法不管Promise对象最后的状态如何都会执行</li>
        <li><code>.finally()</code>方法的回调函数不接受任何的参数，也就是说你在<code>.finally()</code>函数中是无法知道Promise最终的状态是<code>resolved</code>还是<code>rejected</code>的</li>
        <li>它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。</li>
        <li>finally本质上是then方法的特例</li>
      </ul>
      <p>上面的代码的输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1</span>
finally2
<span class="hljs-keyword">finally</span>
finally2后面的then函数 <span class="hljs-number">2</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>再开看一下<code>.finally()</code>的错误捕获：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'1'</span>)
  .finally(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finally1'</span>)
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'我是finally中抛出的异常'</span>)
  })
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finally后面的then函数'</span>, res)
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'捕获错误'</span>, err)
  })
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">'finally1'</span>
<span class="hljs-string">'捕获错误'</span> <span class="hljs-built_in">Error</span>: 我是<span class="hljs-keyword">finally</span>中抛出的异常
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="三、Promise的all和race">
      <ul>
        <li><code>.all()</code>的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。</li>
        <li><code>.race()</code>的作用是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。</li>
      </ul>
      <p><strong>14、下面代码的执行结果是</strong></p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runAsync</span> (<span class="hljs-params">x</span>) </span>{
    <span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> r(x, <span class="hljs-built_in">console</span>.log(x)), <span class="hljs-number">1000</span>))
    <span class="hljs-keyword">return</span> p
}

<span class="hljs-built_in">Promise</span>.all([runAsync(<span class="hljs-number">1</span>), runAsync(<span class="hljs-number">2</span>), runAsync(<span class="hljs-number">3</span>)]).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>首先，定义了一个Promise，来异步执行函数runAsync，该函数传入一个值x，然后间隔一秒后打印出这个x。</p>
      <p>之后再使用<code>Promise.all</code>来执行这个函数，结果如下：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行的时候，看到一秒之后输出了1，2，3，同时输出了数组[1, 2, 3]，三个函数是同步执行的，并且在一个回调函数中返回了所有的结果。并且结果和函数的执行顺序是一致的。</p>
      <h4 data-id="heading-34">15、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runAsync</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> r(x, <span class="hljs-built_in">console</span>.log(x)), <span class="hljs-number">1000</span>))
  <span class="hljs-keyword">return</span> p
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runReject</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res, rej</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> rej(<span class="hljs-string">`Error: <span class="hljs-subst">${x}</span>`</span>, <span class="hljs-built_in">console</span>.log(x)), <span class="hljs-number">1000</span> * x))
  <span class="hljs-keyword">return</span> p
}
<span class="hljs-built_in">Promise</span>.all([runAsync(<span class="hljs-number">1</span>), runReject(<span class="hljs-number">4</span>), runAsync(<span class="hljs-number">3</span>), runReject(<span class="hljs-number">2</span>)])
       .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
       .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 1s后输出</span>
<span class="hljs-number">1</span>
<span class="hljs-number">3</span>
<span class="hljs-comment">// 2s后输出</span>
<span class="hljs-number">2</span>
<span class="hljs-attr">Error</span>: <span class="hljs-number">2</span>
<span class="hljs-comment">// 4s后输出</span>
<span class="hljs-number">4</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>可以看到。catch捕获到了第一个错误，在这道题目中最先的错误就是<code>runReject(2)</code>的结果。</p>
      <p>如果一组异步操作中有一个异常都不会进入<code>.then()</code>的第一个回调函数参数中。会被<code>.then()</code>的第二个回调函数捕获。</p>
      <h4 data-id="heading-35">16、下面代码的执行结果是</h4>
      <p>下面再来看一下race：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runAsync</span> (<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> r(x, <span class="hljs-built_in">console</span>.log(x)), <span class="hljs-number">1000</span>))
  <span class="hljs-keyword">return</span> p
}
<span class="hljs-built_in">Promise</span>.race([runAsync(<span class="hljs-number">1</span>), runAsync(<span class="hljs-number">2</span>), runAsync(<span class="hljs-number">3</span>)])
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result: '</span>, res))
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行结果：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">1</span>
<span class="hljs-string">'result: '</span> <span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>then只会捕获第一个成功的方法，其他的函数虽然还会继续执行，但是不是被then捕获了。</p>
      <h4 data-id="heading-36">17、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runAsync</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> r(x, <span class="hljs-built_in">console</span>.log(x)), <span class="hljs-number">1000</span>)
  );
  <span class="hljs-keyword">return</span> p;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">runReject</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res, rej</span>) =&gt;</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> rej(<span class="hljs-string">`Error: <span class="hljs-subst">${x}</span>`</span>, <span class="hljs-built_in">console</span>.log(x)), <span class="hljs-number">1000</span> * x)
  );
  <span class="hljs-keyword">return</span> p;
}
<span class="hljs-built_in">Promise</span>.race([runReject(<span class="hljs-number">0</span>), runAsync(<span class="hljs-number">1</span>), runAsync(<span class="hljs-number">2</span>), runAsync(<span class="hljs-number">3</span>)])
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"result: "</span>, res))
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err));
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">0</span>
<span class="hljs-attr">Error</span>: <span class="hljs-number">0</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>可以看到在catch捕获到第一个错误之后，后面的代码还不执行，不过不会再被捕获了。</p>
      <p>注意：<code>all</code>和<code>race</code>传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。</p>
    </el-collapse-item>
    <el-collapse-item title="四、Async、await">
      <p>说到Promise就不得不提以下async和await，他们同样是用来执行异步代码。</p>
      <h4 data-id="heading-38">18、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async1 start"</span>);
  <span class="hljs-keyword">await</span> async2();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async1 end"</span>);
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async2"</span>);
}
async1();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'start'</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">async1 start
async2
start
async1 end
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行顺序：</p>
      <ul>
        <li>首先执行函数中的同步代码<code>async1 start</code>，之后碰到了<code>await</code>，它会阻塞<code>async1</code>后面代码的执行，因此会先去执行<code>async2</code>中的同步代码<code>async2</code>，然后跳出<code>async1</code></li>
        <li>跳出<code>async1</code>函数后，执行同步代码<code>start</code></li>
        <li>在一轮宏任务全部执行完之后，再来执行<code>await</code>后面的内容<code>async1 end</code></li>
      </ul>
      <p>这里可以理解为await后面的语句相当于放到了new Promise中，下一行及之后的语句相当于放在Promise.then中。</p>
      <h4 data-id="heading-39">19、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async1 start"</span>);
  <span class="hljs-keyword">await</span> async2();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async1 end"</span>);
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer1'</span>)
  }, <span class="hljs-number">0</span>)
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer2'</span>)
  }, <span class="hljs-number">0</span>)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async2"</span>);
}
async1();
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer3'</span>)
}, <span class="hljs-number">0</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"start"</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">async1 start
async2
start
async1 end
timer2
timer3
timer1
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这个题目就稍微就有点麻烦了。看一下执行的步骤：</p>
      <ul>
        <li>首先进入<code>async1</code>，打印出<code>async1 start</code>，这个是毋庸置疑的</li>
        <li>之后遇到<code>async2</code>，进入<code>async2</code>，遇到定时器<code>timer2</code>，加入宏任务队列，之后打印<code>async2</code></li>
        <li>由于<code>async2</code>阻塞了后面代码的执行，所以执行后面的定时器<code>timer3</code>，将其加入宏任务队列，之后打印<code>start</code></li>
        <li>然后执行async2后面的代码，打印出<code>async1 end</code>，遇到定时器timer1，将其加入宏任务队列</li>
        <li>最后，宏任务队列有三个任务，先后顺序为<code>timer2</code>，<code>timer3</code>，<code>timer1</code>，没有微任务，所以直接所有的宏任务按照先进先出的原则执行。</li>
      </ul>
      <p>实际上也不是很难，只要理清事件循环机制，就很容易做出来啦！</p>
      <h4 data-id="heading-40">20、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 start'</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
  })
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 success'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">'async1 end'</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'srcipt start'</span>)
async1().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'srcipt end'</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">script start
async1 start
promise1
script end
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这里需要注意的是在<code>async1</code>中<code>await</code>后面的Promise是没有返回值的，也就是它的状态始终是<code>pending</code>状态，所以在<code>await</code>之后的内容是不会执行的，也包括<code>async1</code>后面的 <code>.then</code>。</p>
      <h4 data-id="heading-41">21、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 start'</span>);
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
    resolve(<span class="hljs-string">'promise1 resolve'</span>)
  }).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 success'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">'async1 end'</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'srcipt start'</span>)
async1().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'srcipt end'</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这里对上面一题进行了改造，加上了resolve，来看看输出结果：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">script start
async1 start
promise1
script end
promise1 resolve
async1 success
async1 end
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这个就不难理解了，不多解释。</p>
      <h4 data-id="heading-42">22、下面代码的执行结果是</h4>
      <p>来看一道字节跳动面试题：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async1 start"</span>);
  <span class="hljs-keyword">await</span> async2();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async1 end"</span>);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"async2"</span>);
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"script start"</span>);

<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"setTimeout"</span>);
}, <span class="hljs-number">0</span>);

async1();

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise1"</span>);
  resolve();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"promise2"</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <pre><code class="hljs language-javascript copyable" lang="javascript">script start
async1 start
async2
promise1
script end
async1 end
promise2
<span class="hljs-built_in">setTimeout</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>也不多解释了，只是流程比较长，实际上难度并不是很大。</p>
      <h4 data-id="heading-43">23、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> async2();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">'async1 success'</span>
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async2'</span>)
    reject(<span class="hljs-string">'error'</span>)
  })
}
async1().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">async2
Uncaught (<span class="hljs-keyword">in</span> promise) error
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>可以看到，如果async函数中抛出了错误，就会终止错误结果，不会继续向下执行。</p>
      <p>如果想要让错误不足之处后面的代码执行，可以使用catch来捕获：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'error!!!'</span>).catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e))
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1'</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">'async1 success'</span>)
}
async1().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这样的输出结果就是：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">script start
error!!!
async1
async1 success
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="五、综合题目">
      <h4 data-id="heading-45">24、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> first = <span class="hljs-function">() =&gt;</span> (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
    <span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>);
        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
            resolve(<span class="hljs-number">6</span>);
            <span class="hljs-built_in">console</span>.log(p)
        }, <span class="hljs-number">0</span>)
        resolve(<span class="hljs-number">1</span>);
    });
    resolve(<span class="hljs-number">2</span>);
    p.then(<span class="hljs-function">(<span class="hljs-params">arg</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(arg);
    });
}));
first().then(<span class="hljs-function">(<span class="hljs-params">arg</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(arg);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这是一道比较综合的题目，看一下执行结果：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-number">3</span>
<span class="hljs-number">7</span>
<span class="hljs-number">4</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">5</span>
<span class="hljs-built_in">Promise</span>{&lt;resolved&gt;: <span class="hljs-number">1</span>}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>说一下执行的步骤吧：</p>
      <ul>
        <li>首先会进入Promise，打印出3，之后进入下面的Promise，打印出7</li>
        <li>遇到了定时器，将其加入宏任务队列</li>
        <li>执行Promise  p中的resolve，状态变为resolved，返回值为1</li>
        <li>执行Promise first中的resolve，状态变为resolved，返回值为2</li>
        <li>遇到p.then，将其加入微任务队列，遇到first().then，将其加入任务队列</li>
        <li>执行外面的代码，打印出4</li>
        <li>这样第一轮宏任务就执行完了，开始执行微任务队列中的任务，先后打印出1和2</li>
        <li>这样微任务就执行完了，开始执行下一轮宏任务，宏任务队列中有一个定时器，执行它，打印出5，由于执行已经变为resolved状态，所以<code>resolve(6)</code>不会再执行</li>
        <li>最后<code>console.log(p)</code>打印出<code>Promise{&lt;resolved&gt;: 1}</code></li>
      </ul>
      <h4 data-id="heading-46">25、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> async1 = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1'</span>);
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer1'</span>)
  }, <span class="hljs-number">2000</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
  })
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 end'</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-string">'async1 success'</span>
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>);
async1().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>);
<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>)
  .then(<span class="hljs-number">2</span>)
  .then(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>))
  .catch(<span class="hljs-number">4</span>)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res))
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer2'</span>)
}, <span class="hljs-number">1000</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>输出结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">script start
async1
promise1
script end
<span class="hljs-number">1</span>
timer2
timer1
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这道题比较简单，简单说一下执行的过程：</p>
      <ul>
        <li>首先执行同步带吗，打印出script start</li>
        <li>遇到定时器timer1将其加入宏任务队列</li>
        <li>之后是执行Promise，打印出promise1，由于Promise没有返回值，所以后面的代码不会执行</li>
        <li>然后执行同步代码，打印出script end</li>
        <li>继续执行下面的Promise，.then和.catch期望参数是一个函数，这里传入的是一个数字，因此就会发生值渗透，将resolve(1)的值传到最后一个then，直接打印出1</li>
        <li>遇到第二个定时器，将其加入到微任务队列，执行微任务队列，按顺序依次执行两个定时器，但是由于定时器时间的原因，会在两秒后先打印出timer2，在四秒后打印出timer1</li>
      </ul>
      <h4 data-id="heading-47">26、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    resolve(<span class="hljs-string">'resolve3'</span>);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'timer1'</span>)
  }, <span class="hljs-number">0</span>)
  resolve(<span class="hljs-string">'resovle1'</span>);
  resolve(<span class="hljs-string">'resolve2'</span>);
}).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(res)  <span class="hljs-comment">// resolve1</span>
  <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(p1)
  }, <span class="hljs-number">1000</span>)
}).finally(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'finally'</span>, res)
})
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>执行结果为：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">resolve1
<span class="hljs-keyword">finally</span>  <span class="hljs-literal">undefined</span>
timer1
<span class="hljs-built_in">Promise</span>{&lt;resolved&gt;: <span class="hljs-literal">undefined</span>}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>需要注意的是最后一个定时器打印出的p1其实是<code>.finally</code>的返回值，我们知道<code>.finally</code>的返回值如果在没有抛出错误的情况下默认会是上一个Promise的返回值，而这道题中<code>.finally</code>上一个Promise是<code>.then()</code>，但是这个<code>.then()</code>并没有返回值，所以p1打印出来的Promise的值会是<code>undefined</code>，如果在定时器的下面加上一个<code>return 1</code>，则值就会变成1。</p>
      <h4 data-id="heading-48">27、下面代码的执行结果是</h4>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);

<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);
    })
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
        resolve();
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'5'</span>)
    })
})
process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'6'</span>);
})
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'7'</span>);
    resolve();
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'8'</span>)
})

<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'9'</span>);
    process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'10'</span>);
    })
    <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'11'</span>);
        resolve();
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'12'</span>)
    })
})
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这是秋招遇到的一个笔试题，流程比较复杂，下面来分析一下：
        <strong>（1）第一轮事件循环流程分析如下：</strong></p>
      <ul>
        <li>整体script作为第一个宏任务进入主线程，遇到<code>console.log</code>，输出1。</li>
        <li>遇到<code>setTimeout</code>，其回调函数被分发到宏任务Event Queue中。暂且记为<code>setTimeout1</code>。</li>
        <li>遇到<code>process.nextTick()</code>，其回调函数被分发到微任务Event Queue中。记为<code>process1</code>。</li>
        <li>遇到<code>Promise</code>，<code>new Promise</code>直接执行，输出7。<code>then</code>被分发到微任务Event Queue中。记为<code>then1</code>。</li>
        <li>又遇到了<code>setTimeout</code>，其回调函数被分发到宏任务Event Queue中，记为<code>setTimeout2</code>。</li>
      </ul>
      <table><thead><tr><th>宏任务Event Queue</th><th>微任务Event Queue</th></tr></thead><tbody><tr><td>setTimeout1</td><td>process1</td></tr><tr><td>setTimeout2</td><td>then1</td></tr></tbody></table>
      <p>上表是第一轮事件循环宏任务结束时各Event Queue的情况，此时已经输出了1和7。发现了<code>process1</code>和<code>then1</code>两个微任务：</p>
      <ul>
        <li>执行<code>process1</code>，输出6。</li>
        <li>执行<code>then1</code>，输出8。</li>
      </ul>
      <p>好了，第一轮事件循环正式结束，这一轮的结果是输出1，7，6，8。</p>
      <p><strong>（2）第二轮时间循环从<code>setTimeout1</code>宏任务开始：</strong></p>
      <ul>
        <li>首先输出2。接下来遇到了<code>process.nextTick()</code>，同样将其分发到微任务Event Queue中，记为<code>process2</code>。</li>
        <li><code>new Promise</code>立即执行输出4，<code>then</code>也分发到微任务Event Queue中，记为<code>then2</code>。</li>
      </ul>
      <table><thead><tr><th>宏任务Event Queue</th><th>微任务Event Queue</th></tr></thead><tbody><tr><td>setTimeout2</td><td>process2</td></tr><tr><td></td><td>then2</td></tr></tbody></table>
      <p>第二轮事件循环宏任务结束，发现有<code>process2</code>和<code>then2</code>两个微任务可以执行：</p>
      <ul>
        <li>输出3。</li>
        <li>输出5。</li>
      </ul>
      <p>第二轮事件循环结束，第二轮输出2，4，3，5。</p>
      <p><strong>（3）第三轮事件循环开始，此时只剩setTimeout2了，执行。</strong></p>
      <ul>
        <li>直接输出9。</li>
        <li>将<code>process.nextTick()</code>分发到微任务Event Queue中。记为<code>process3</code>。</li>
        <li>直接执行<code>new Promise</code>，输出11。</li>
        <li>将<code>then</code>分发到微任务Event Queue中，记为<code>then3</code>。</li>
      </ul>
      <table><thead><tr><th>宏任务Event Queue</th><th>微任务Event Queue</th></tr></thead><tbody><tr><td></td><td>process3</td></tr><tr><td></td><td>then3</td></tr></tbody></table>
      <p>第三轮事件循环宏任务执行结束，执行两个微任务<code>process3</code>和<code>then3</code>：</p>
      <ul>
        <li>输出10。</li>
        <li>输出12。</li>
      </ul>
      <p>第三轮事件循环结束，第三轮输出9，11，10，12。</p>
      <p>整段代码，共进行了三次事件循环，完整的输出为1，7，6，8，2，4，3，5，9，11，10，12。</p>
    </el-collapse-item>
    <el-collapse-item title="六、面向对象">
      <h3 data-id="heading-50">1. 对象创建的方式有哪些？</h3>
      <p>一般使用字面量的形式直接创建对象，但是这种创建方式对于创建大量相似对象的时候，会产生大量的重复代码。但 js和一般的面向对象的语言不同，在 ES6 之前它没有类的概念。但是可以使用函数来进行模拟，从而产生出可复用的对象创建方式，常见的有以下几种：</p>
      <p>（1）第一种是工厂模式，工厂模式的主要工作原理是用函数来封装创建对象的细节，从而通过调用函数来达到复用的目的。但是它有一个很大的问题就是创建出来的对象无法和某个类型联系起来，它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。</p>
      <p>（2）第二种是构造函数模式。js 中每一个函数都可以作为构造函数，只要一个函数是通过 new 来调用的，那么就可以把它称为构造函数。执行构造函数首先会创建一个对象，然后将对象的原型指向构造函数的 prototype 属性，然后将执行上下文中的 this 指向这个对象，最后再执行整个函数，如果返回值不是对象，则返回新建的对象。因为 this 的值指向了新建的对象，因此可以使用 this 给对象赋值。构造函数模式相对于工厂模式的优点是，所创建的对象和构造函数建立起了联系，因此可以通过原型来识别对象的类型。但是构造函数存在一个缺点就是，造成了不必要的函数对象的创建，因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那么每次都会新建一个函数对象，浪费了不必要的内存空间，因为函数是所有的实例都可以通用的。</p>
      <p>（3）第三种模式是原型模式，因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。因此可以使用原型对象来添加公用属性和方法，从而实现代码的复用。这种方式相对于构造函数模式来说，解决了函数对象的复用问题。但是这种模式也存在一些问题，一个是没有办法通过传入参数来初始化值，另一个是如果存在一个引用类型如 Array 这样的值，那么所有的实例将共享一个对象，一个实例对引用类型值的改变会影响所有的实例。</p>
      <p>（4）第四种模式是组合使用构造函数模式和原型模式，这是创建自定义类型的最常见方式。因为构造函数模式和原型模式分开使用都存在一些问题，因此可以组合使用这两种模式，通过构造函数来初始化对象的属性，通过原型对象来实现函数方法的复用。这种方法很好的解决了两种模式单独使用时的缺点，但是有一点不足的就是，因为使用了两种不同的模式，所以对于代码的封装性不够好。</p>
      <p>（5）第五种模式是动态原型模式，这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。</p>
      <p>（6）第六种模式是寄生构造函数模式，这一种模式和工厂模式的实现基本相同，我对这个模式的理解是，它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。</p>
      <h3 data-id="heading-51">2. 对象继承的方式有哪些？</h3>
      <p>（1）第一种是以原型链的方式来实现继承，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。</p>
      <p>（2）第二种方式是使用借用构造函数的方式，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。</p>
      <p>（3）第三种方式是组合继承，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。</p>
      <p>（4）第四种方式是原型式继承，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。</p>
      <p>（5）第五种方式是寄生式继承，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是自定义类型时。缺点是没有办法实现函数的复用。</p>
      <p>（6）第六种方式是寄生式组合继承，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。</p>
      <h3 data-id="heading-52">3. 如何判断一个对象是否属于某个类？</h3>
      <ul>
        <li>第一种方式是使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。</li>
        <li>第二种方式可以通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。</li>
        <li>第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的[[Class]] 属性来进行判断。</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="七、垃圾回收与内存泄漏">
      <h3 data-id="heading-54">1. 浏览器的垃圾回收机制</h3>
      <h4 data-id="heading-55">（1）垃圾回收的概念</h4>
      <p><strong>垃圾回收</strong>：JavaScript代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。
        <strong>回收机制</strong>：</p>
      <ul>
        <li>Javascript 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放，原理就是找到不再使用的变量，然后释放掉其占用的内存。</li>
        <li>JavaScript中存在两种变量：局部变量和全局变量。全局变量的生命周期会持续要页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。</li>
        <li>不过，当局部变量被外部函数使用时，其中一种情况就是闭包，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。</li>
      </ul>
      <h4 data-id="heading-56">（2）垃圾回收的方式</h4>
      <p>现在浏览器通常使用的垃圾回收方法有两种：标记清除，引用计数。
        <strong>1）标记清除</strong></p>
      <ul>
        <li>标记清除是浏览器常见的垃圾回收方式，当变量进入执行环境时，就标记这个变量“进入环境”，被标记为“进入环境”的变量是不能被回收的，因为他们正在被使用。当变量离开环境时，就会被标记为“离开环境”，被标记为“离开环境”的变量会被内存释放。</li>
        <li>垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。</li>
      </ul>
      <p><strong>2）引用计数</strong></p>
      <ul>
        <li>另外一种垃圾回收机制就是引用计数，这个用的相对较少。引用计数就是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减1。当这个引用次数变为0时，说明这个变量已经没有价值，因此，在在机回收期下次再运行时，这个变量所占有的内存空间就会被释放出来。</li>
        <li>这种方法会引起<strong>循环引用</strong>的问题：</li>
      </ul>
      <p><code>obj1</code>和<code>obj2</code>通过属性进行相互引用，两个对象的引用次数都是2。当使用循环计数时，由于函数执行完后，两个对象都离开作用域，函数执行结束，<code>obj1</code>和<code>obj2</code>还将会继续存在，因此它们的引用次数永远不会是0，就会引起循环引用。</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fun</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> obj1 = {};
    <span class="hljs-keyword">let</span> obj2 = {};
    obj1.a = obj2; <span class="hljs-comment">// obj1 引用 obj2</span>
    obj2.a = obj1; <span class="hljs-comment">// obj2 引用 obj1</span>
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这种情况下，就要手动释放变量占用的内存：</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">obj1.a =  <span class="hljs-literal">null</span>
 obj2.a =  <span class="hljs-literal">null</span>
<span class="copy-code-btn">复制代码</span></code></pre>
      <h4 data-id="heading-57">（3）减少垃圾回收</h4>
      <p>虽然浏览器可以进行垃圾自动回收，但是当代码比较复杂时，垃圾回收所带来的代价比较大，所以应该尽量减少垃圾回收。</p>
      <ul>
        <li><strong>对数组进行优化：</strong> 在清空一个数组时，最简单的方法就是给其赋值为[ ]，但是与此同时会创建一个新的空对象，可以将数组的长度设置为0，以此来达到清空数组的目的。</li>
        <li><strong>对<code>object</code>进行优化：</strong> 对象尽量复用，对于不再使用的对象，就将其设置为null，尽快被回收。</li>
        <li><strong>对函数进行优化：</strong> 在循环中的函数表达式，如果可以复用，尽量放在函数的外面。</li>
      </ul>
      <h3 data-id="heading-58">2. 哪些情况会导致内存泄漏</h3>
      <p>以下四种情况会造成内存的泄漏：</p>
      <ul>
        <li><strong>意外的全局变量：</strong> 由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。</li>
        <li><strong>被遗忘的计时器或回调函数：</strong> 设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。</li>
        <li><strong>脱离 DOM 的引用：</strong> 获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收。</li>
        <li><strong>闭包：</strong> 不合理的使用闭包，从而导致某些变量一直被留在内存当中。</li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
