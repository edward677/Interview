<template>
  <div class="asynchronous_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 异步编程的实现方式？">
        <p>JavaScript中的异步机制可以分为以下几种：</p>
        <ul>
          <li><strong>回调函数</strong>的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。</li>
          <li><strong>Promise</strong> 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。</li>
          <li><strong>generator</strong> 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。</li>
          <li><strong>async 函数</strong> 的形式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. setTimeout、Promise、Async/Await 的区别">
        <h4 data-id="heading-4">（1）setTimeout</h4>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>)	<span class="hljs-comment">//1. 打印 script start</span>
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'settimeout'</span>)	<span class="hljs-comment">// 4. 打印 settimeout</span>
})	<span class="hljs-comment">// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>)	<span class="hljs-comment">//3. 打印 script start</span>
<span class="hljs-comment">// 输出顺序：script start-&gt;script end-&gt;settimeout</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-5">（2）Promise</h4>
        <p>Promise本身是<strong>同步的立即执行函数</strong>， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>)
<span class="hljs-keyword">let</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1'</span>)
    resolve()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise1 end'</span>)
}).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'promise2'</span>)
})
<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'settimeout'</span>)
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>)
<span class="hljs-comment">// 输出顺序: script start-&gt;promise1-&gt;promise1 end-&gt;script end-&gt;promise2-&gt;settimeout</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>当JS主线程执行到Promise对象时，</p>
        <ul>
          <li>promise1.then() 的回调就是一个 task</li>
          <li>promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue</li>
          <li>promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中</li>
          <li>setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况</li>
        </ul>
        <h4 data-id="heading-6">（3）async/await</h4>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async1</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 start'</span>);
    <span class="hljs-keyword">await</span> async2();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async1 end'</span>)
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">async2</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'async2'</span>)
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script start'</span>);
async1();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'script end'</span>)
<span class="hljs-comment">// 输出顺序：script start-&gt;async1 start-&gt;async2-&gt;script end-&gt;async1 end</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。
          举个例子：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
}
<span class="hljs-built_in">console</span>.log(func1())
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e2fff431329431ea82d48cb9a2a3bc0~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述" loading="lazy" class="medium-zoom-image"></p>
        <p>很显然，func1的运行结果其实就是一个Promise对象。因此也可以使用then来处理后续逻辑。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">func1().then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);  <span class="hljs-comment">// 30</span>
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。</p>
      </el-collapse-item>
      <el-collapse-item title="3. 对Promise的理解">
        <p>Promise是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。</p>
        <p>所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
          （1）Promise的实例有<strong>三个状态</strong>:</p>
        <ul>
          <li>Pending（进行中）</li>
          <li>Resolved（已完成）</li>
          <li>Rejected（已拒绝）</li>
        </ul>
        <p>当把一件事情交给promise时，它的状态就是Pending，任务完成了状态就变成了Resolved、没有完成失败了就变成了Rejected。
          （2）Promise的实例有<strong>两个过程</strong>：</p>
        <ul>
          <li>pending -&gt; fulfilled : Resolved（已完成）</li>
          <li>pending -&gt; rejected：Rejected（已拒绝）</li>
        </ul>
        <p>需要注意：一旦从进行状态变成为其他状态就永远不能更改状态了。</p>
        <p><strong>Promise的特点：</strong></p>
        <ul>
          <li>对象的状态不受外界影响。promise对象代表一个异步操作，有三种状态，<code>pending</code>（进行中）、<code>fulfilled</code>（已成功）、<code>rejected</code>（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是promise这个名字的由来——“<strong>承诺</strong>”；</li>
          <li>一旦状态改变就不会再变，任何时候都可以得到这个结果。promise对象的状态改变，只有两种可能：从<code>pending</code>变为<code>fulfilled</code>，从<code>pending</code>变为<code>rejected</code>。这时就称为<code>resolved</code>（已定型）。如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果。这与事件（event）完全不同，事件的特点是：如果你错过了它，再去监听是得不到结果的。</li>
        </ul>
        <p><strong>Promise的缺点：</strong></p>
        <ul>
          <li>无法取消Promise，一旦新建它就会立即执行，无法中途取消。</li>
          <li>如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。</li>
          <li>当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。</li>
        </ul>
        <p><strong>总结：</strong>
          Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。</p>
        <p>状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。</p>
      </el-collapse-item>
      <el-collapse-item title="4. Promise的基本用法">
        <p>Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。</p>
        <p>Promise构造函数接受一个函数作为参数，该函数的两个参数分别是<code>resolve</code>和<code>reject</code>。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-comment">// ... some code</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/* 异步操作成功 */</span>){
    resolve(value);
  } <span class="hljs-keyword">else</span> {
    reject(error);
  }
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>一般情况下都会使用<code>new Promise()</code>来创建promise对象，但是也可以使用<code>promise.resolve</code>和 <code>promise.reject</code>这两个方法：</strong></p>
        <ul>
          <li><strong>Promise.resolve</strong></li>
        </ul>
        <p><code>Promise.resolve(value)</code>的返回值也是一个promise对象，可以对返回值进行.then调用；</p>
        <p>如下代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">11</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
  <span class="hljs-built_in">console</span>.log(value); <span class="hljs-comment">// 打印出11</span>
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>resolve(11)</code>代码中，会让promise对象进入确定(<code>resolve</code>状态)，并将参数<code>11</code>传递给后面的<code>then</code>所指定的<code>onFulfilled</code> 函数；</p>
        <p>上面说过创建promise对象，可以使用<code>new Promise</code>的形式创建对象，但是这边也可以使用<code>Promise.resolve(value)</code>的形式创建promise对象；</p>
        <ul>
          <li><strong>Promise.reject</strong></li>
        </ul>
        <p><code>Promise.reject</code> 也是<code>new Promise</code>的快捷形式，也创建一个promise对象。</p>
        <p>如下代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(“我错了，请原谅俺！！”));
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>就是下面的代码new Promise的简单形式：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
   reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"我错了，请原谅俺！！"</span>));
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>下面来综合看看使用resolve方法和reject方法：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testPromise</span>(<span class="hljs-params">ready</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve,reject</span>)</span>{
    <span class="hljs-keyword">if</span>(ready) {
      resolve(<span class="hljs-string">"hello world"</span>);
    }<span class="hljs-keyword">else</span> {
      reject(<span class="hljs-string">"No thanks"</span>);
    }
  });
};
<span class="hljs-comment">// 方法调用</span>
testPromise(<span class="hljs-literal">true</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
  <span class="hljs-built_in">console</span>.log(msg);
},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error</span>)</span>{
  <span class="hljs-built_in">console</span>.log(error);
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>上面的代码的含义是给<code>testPromise</code>方法传递一个参数，返回一个promise对象，如果为<code>true</code>的话，那么调用promise对象中的<code>resolve()</code>方法，并且把其中的参数传递给后面的<code>then</code>第一个函数内，因此打印出 “<code>hello world</code>”, 如果为<code>false</code>的话，会调用promise对象中的<code>reject()</code>方法，则会进入<code>then</code>的第二个函数内，会打印<code>No thanks</code>；</p>
        <h4 data-id="heading-10">（2）Promise方法</h4>
        <p>Promise有五个常用的方法：then()、catch()、all()、race()、finally。下面就来看一下这些方法。</p>
        <ol>
          <li><strong>then()</strong></li>
        </ol>
        <p>当Promise执行的内容符合成功条件时，调用<code>resolve</code>函数，失败就调用<code>reject</code>函数。Promise创建完了，那该如何调用呢？</p>
        <pre><code class="copyable">promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>then</code>方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为<code>resolved</code>时调用，第二个回调函数是Promise对象的状态变为<code>rejected</code>时调用。其中第二个参数可以省略。
          <code>then</code>方法返回的是一个新的Promise实例（不是原来那个Promise实例）。因此可以采用链式写法，即<code>then</code>方法后面再调用另一个then方法。</p>
        <p>当要写有顺序的异步事件时，需要串行时，可以这样写：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    ajax(<span class="hljs-string">'first'</span>).success(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
        resolve(res);
    })
})
promise.then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resovle,reject</span>)=&gt;</span>{
        ajax(<span class="hljs-string">'second'</span>).success(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
            resolve(res)
        })
    })
}).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resovle,reject</span>)=&gt;</span>{
        ajax(<span class="hljs-string">'second'</span>).success(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
            resolve(res)
        })
    })
}).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{

})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>那当要写的事件没有顺序或者关系时，还如何写呢？可以使用<code>all</code> 方法来解决。
          <strong>2. catch()</strong></p>
        <ul>
          <li>Promise对象除了有then方法，还有一个catch方法，该方法相当于<code>then</code>方法的第二个参数，指向<code>reject</code>的回调函数。</li>
          <li>不过<code>catch</code>方法还有一个作用，就是在执行<code>resolve</code>回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入<code>catch</code>方法中。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript">p.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolved'</span>,data);
},<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected'</span>,err);
     }
);
p.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'resolved'</span>,data);
}).catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'rejected'</span>,err);
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>3. all()</strong>
          <code>all</code>方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个<code>promise</code>对象。当数组中所有的<code>promise</code>的状态都达到<code>resolved</code>的时候，<code>all</code>方法的状态就会变成<code>resolved</code>，如果有一个状态变成了<code>rejected</code>，那么<code>all</code>方法的状态就会变成<code>rejected</code>。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">javascript
<span class="hljs-keyword">let</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
	<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">()=&gt;</span>{
       resolve(<span class="hljs-number">1</span>);
	},<span class="hljs-number">2000</span>)
});
<span class="hljs-keyword">let</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
	<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">()=&gt;</span>{
       resolve(<span class="hljs-number">2</span>);
	},<span class="hljs-number">1000</span>)
});
<span class="hljs-keyword">let</span> promise3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
	<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">()=&gt;</span>{
       resolve(<span class="hljs-number">3</span>);
	},<span class="hljs-number">3000</span>)
});
<span class="hljs-built_in">Promise</span>.all([promise1,promise2,promise3]).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(res);
    <span class="hljs-comment">//结果为：[1,2,3] </span>
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>调用<code>all</code>方法时的结果成功的时候是回调函数的参数也是一个数组，这个数组按顺序保存着每一个promise对象<code>resolve</code>执行时的值。
          <strong>（4）race()</strong>
          <code>race</code>方法和<code>all</code>一样，接受的参数是一个每项都是<code>promise</code>的数组，但是与<code>all</code>不同的是，当最先执行完的事件执行完之后，就直接返回该<code>promise</code>对象的值。</p>
        <p>如果第一个<code>promise</code>对象状态变成<code>resolved</code>，那自身的状态变成了<code>resolved</code>；反之第一个<code>promise</code>变成<code>rejected</code>，那自身状态就会变成<code>rejected</code>。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> promise1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
	<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">()=&gt;</span>{
       reject(<span class="hljs-number">1</span>);
	},<span class="hljs-number">2000</span>)
});
<span class="hljs-keyword">let</span> promise2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
	<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">()=&gt;</span>{
       resolve(<span class="hljs-number">2</span>);
	},<span class="hljs-number">1000</span>)
});
<span class="hljs-keyword">let</span> promise3 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
	<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">()=&gt;</span>{
       resolve(<span class="hljs-number">3</span>);
	},<span class="hljs-number">3000</span>)
});
<span class="hljs-built_in">Promise</span>.race([promise1,promise2,promise3]).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
	<span class="hljs-built_in">console</span>.log(res);
	<span class="hljs-comment">//结果：2</span>
},<span class="hljs-function"><span class="hljs-params">rej</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(rej)};
)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>那么<code>race</code>方法有什么实际作用呢？当要做一件事，超过多长时间就不做了，可以用这个方法来解决：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.race([promise1,timeOutPromise(<span class="hljs-number">5000</span>)]).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>5. finally()</strong>
          <code>finally</code>方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">promise
.then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {···})
.catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {···})
.finally(<span class="hljs-function">() =&gt;</span> {···});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>上面代码中，不管<code>promise</code>最后的状态，在执行完<code>then</code>或<code>catch</code>指定的回调函数以后，都会执行<code>finally</code>方法指定的回调函数。</p>
        <p>下面是一个例子，服务器使用 Promise 处理请求，然后使用<code>finally</code>方法关掉服务器。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">server.listen(port)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  })
  .finally(server.stop);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><code>finally</code>方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是<code>fulfilled</code>还是<code>rejected</code>。这表明，<code>finally</code>方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。</p>
        <p><code>finally</code>本质上是<code>then</code>方法的特例：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">promise
.finally(<span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// 语句</span>
});
<span class="hljs-comment">// 等同于</span>
promise
.then(
  <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-comment">// 语句</span>
    <span class="hljs-keyword">return</span> result;
  },
  <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-comment">// 语句</span>
    <span class="hljs-keyword">throw</span> error;
  }
);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>上面代码中，如果不使用<code>finally</code>方法，同样的语句需要为成功和失败两种情况各写一次。有了<code>finally</code>方法，则只需要写一次。</p>
      </el-collapse-item>
      <el-collapse-item title="5. Promise解决了什么问题">
        <p>在工作中经常会碰到这样一个需求，比如我使用ajax发一个A请求后，成功后拿到数据，需要把数据传给B请求；那么需要如下编写代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
fs.readFile(<span class="hljs-string">'./a.txt'</span>,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>)</span>{
  fs.readFile(data,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>)</span>{
    fs.readFile(data,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,data</span>)</span>{
      <span class="hljs-built_in">console</span>.log(data)
    })
  })
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>如上代码；上面的代码有如下缺点：</p>
        <ul>
          <li>后一个请求需要依赖于前一个请求成功后，将数据往下传递，会导致多个ajax请求嵌套的情况，代码不够直观。</li>
          <li>如果前后两个请求不需要传递参数的情况下，那么后一个请求也需要前一个请求成功后再执行下一步操作，这种情况下，那么也需要如上编写代码，导致代码不够直观。</li>
        </ul>
        <p><code>Promise</code>出现之后，代码变成了这样子：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">read</span>(<span class="hljs-params">url</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    fs.readFile(url,<span class="hljs-string">'utf8'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error,data</span>)</span>{
      error &amp;&amp; reject(error)
      resolve(data)
    })
  })
}
read(<span class="hljs-string">'./a.txt'</span>).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
  <span class="hljs-keyword">return</span> read(data)
}).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
  <span class="hljs-keyword">return</span> read(data)
}).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
  <span class="hljs-built_in">console</span>.log(data)
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这样代码看起了就简洁了很多，解决了地狱回调的问题。</p>
      </el-collapse-item>
      <el-collapse-item title="6. Promise.all和Promise.race的区别的使用场景">
        <p><strong>（1）Promise.all</strong>
          <code>Promise.all</code>可以将多个<code>Promise</code>实例包装成一个新的Promise实例。同时，成功和失败的返回值是不同的，成功的时候返回的是<strong>一个结果数组</strong>，而失败的时候则返回<strong>最先被reject失败状态的值</strong>。</p>
        <p>Promise.all中传入的是数组，返回的也是是数组，并且会将进行映射，传入的promise对象返回的值是按照顺序在数组中排列的，但是注意的是他们执行的顺序并不是按照顺序的，除非可迭代对象为空。</p>
        <p>需要特别注意的是，Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，这样当遇到发送多个请求并根据请求顺序获取和使用数据的场景，就可以使用Promise.all来解决。
          <strong>（2）Promise.race</strong>
          顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。</p>
        <p>当要做一件事，超过多长时间就不做了，可以用这个方法来解决：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">Promise</span>.race([promise1,timeOutPromise(<span class="hljs-number">5000</span>)]).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{})
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="7. 对async/await 的理解">
        <p>async/await其实是<code>Generator</code> 的语法糖，它能实现的效果都能用then链来实现，它是为优化then链而开发出来的。从字面上来看，async是“异步”的简写，await则为等待，所以很好理解async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。当然语法上强制规定await只能出现在asnyc函数中，先来看看async函数返回了什么：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsy</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">return</span> <span class="hljs-string">'hello world'</span>;
}
<span class="hljs-keyword">let</span> result = testAsy();
<span class="hljs-built_in">console</span>.log(result)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8cee27d6d8a4fb2859cdb019c174ba8~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述" loading="lazy" class="medium-zoom-image"></p>
        <p>所以，async 函数返回的是一个 Promise 对象。async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，如果在函数中 <code>return</code> 一个直接量，async 会把这个直接量通过 <code>Promise.resolve()</code> 封装成 Promise 对象。</p>
        <p>async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，当然应该用原来的方式：<code>then()</code> 链来处理这个 Promise 对象，就像这样：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsy</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-keyword">return</span> <span class="hljs-string">'hello world'</span>
}
<span class="hljs-keyword">let</span> result = testAsy()
<span class="hljs-built_in">console</span>.log(result)
result.then(<span class="hljs-function"><span class="hljs-params">v</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(v)   <span class="hljs-comment">// hello world</span>
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>现在回过头来想下，如果 async 函数没有返回值，又该如何？很容易想到，它会返回 <code>Promise.resolve(undefined)</code>。
          联想一下 Promise 的特点——无等待，所以在没有 <code>await</code> 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。</p>
        <p><strong>注意：</strong>
          <code>Promise.resolve(x)</code> 可以看作是 <code>new Promise(resolve =&gt; resolve(x))</code> 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例。</p>
      </el-collapse-item>
      <el-collapse-item title="8. await 到底在等啥？">
        <p><strong>重点就在await，它等待什么呢？</strong></p>
        <p>一般来说，都认为 await 是在等待一个 async 函数完成。不过按语法说明，await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。</p>
        <p>因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSomething</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-string">"something"</span>;
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsync</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-string">"hello async"</span>);
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> v1 = <span class="hljs-keyword">await</span> getSomething();
    <span class="hljs-keyword">const</span> v2 = <span class="hljs-keyword">await</span> testAsync();
    <span class="hljs-built_in">console</span>.log(v1, v2);
}
test();
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>await 表达式的运算结果取决于它等的是什么。</p>
        <ul>
          <li>如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。</li>
          <li>如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。</li>
        </ul>
        <p>来看一个例子：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAsy</span>(<span class="hljs-params">x</span>)</span>{
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span>=&gt;</span>{<span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
       resolve(x);
     }, <span class="hljs-number">3000</span>)
    }
   )
}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testAwt</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">let</span> result =  <span class="hljs-keyword">await</span> testAsy(<span class="hljs-string">'hello world'</span>);
  <span class="hljs-built_in">console</span>.log(result);    <span class="hljs-comment">// 3秒钟之后出现hello world</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'cuger'</span>)   <span class="hljs-comment">// 3秒钟之后出现cug</span>
}
testAwt();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'cug'</span>)  <span class="hljs-comment">//立即输出cug</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。await暂停当前async的执行，所以'cug''最先输出，hello world'和‘cuger’是3秒钟后同时出现的。</p>
      </el-collapse-item>
      <el-collapse-item title="9. async/await的优势">
        <p>单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。</p>
        <p>假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。仍然用 <code>setTimeout</code> 来模拟异步操作：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">takeLongTime</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
        <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> resolve(n + <span class="hljs-number">200</span>), n);
    });
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step1</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step1 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step2</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step2 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step3</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`step3 with <span class="hljs-subst">${n}</span>`</span>);
    <span class="hljs-keyword">return</span> takeLongTime(n);
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>现在用 Promise 方式来实现这三个步骤的处理</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doIt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">"doIt"</span>);
    <span class="hljs-keyword">const</span> time1 = <span class="hljs-number">300</span>;
    step1(time1)
        .then(<span class="hljs-function"><span class="hljs-params">time2</span> =&gt;</span> step2(time2))
        .then(<span class="hljs-function"><span class="hljs-params">time3</span> =&gt;</span> step3(time3))
        .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`result is <span class="hljs-subst">${result}</span>`</span>);
            <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"doIt"</span>);
        });
}
doIt();
<span class="hljs-comment">// c:\var\test&gt;node --harmony_async_await .</span>
<span class="hljs-comment">// step1 with 300</span>
<span class="hljs-comment">// step2 with 500</span>
<span class="hljs-comment">// step3 with 700</span>
<span class="hljs-comment">// result is 900</span>
<span class="hljs-comment">// doIt: 1507.251ms</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>输出结果 <code>result</code> 是 <code>step3()</code> 的参数 <code>700 + 200</code> = <code>900</code>。<code>doIt()</code> 顺序执行了三个步骤，一共用了 <code>300 + 500 + 700 = 1500</code> 毫秒，和 <code>console.time()/console.timeEnd()</code> 计算的结果一致。</p>
        <p>如果用 async/await 来实现呢，会是这样：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doIt</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">"doIt"</span>);
    <span class="hljs-keyword">const</span> time1 = <span class="hljs-number">300</span>;
    <span class="hljs-keyword">const</span> time2 = <span class="hljs-keyword">await</span> step1(time1);
    <span class="hljs-keyword">const</span> time3 = <span class="hljs-keyword">await</span> step2(time2);
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> step3(time3);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`result is <span class="hljs-subst">${result}</span>`</span>);
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"doIt"</span>);
}
doIt();
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样</p>
      </el-collapse-item>
      <el-collapse-item title="10. async/await对比Promise的优势">
        <ul>
          <li>代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调⽤也会带来额外的阅读负担</li>
          <li>Promise传递中间值⾮常麻烦，⽽async/await⼏乎是同步的写法，⾮常优雅</li>
          <li>错误处理友好，async/await可以⽤成熟的try/catch，Promise的错误捕获⾮常冗余</li>
          <li>调试友好，Promise的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个.then代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then代码块，因为调试器只能跟踪同步代码的每⼀步。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="11. async/await 如何捕获异常">
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">try</span>{
        <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'error'</span>)
    }<span class="hljs-keyword">catch</span>(error){
        <span class="hljs-built_in">console</span>.log(error)
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="12. 并发与并行的区别？">
        <ul>
          <li>并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。</li>
          <li>并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="13. 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？">
        <p>以下代码就是一个回调函数的例子：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">ajax(url, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// 处理逻辑</span>
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>回调函数有一个致命的弱点，就是容易写出回调地狱（Callback hell）。假设多个请求存在依赖性，可能会有如下代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">ajax(url, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// 处理逻辑</span>
    ajax(url1, <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-comment">// 处理逻辑</span>
        ajax(url2, <span class="hljs-function">() =&gt;</span> {
            <span class="hljs-comment">// 处理逻辑</span>
        })
    })
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>以上代码看起来不利于阅读和维护，当然，也可以把函数分开来写：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">firstAjax</span>(<span class="hljs-params"></span>) </span>{
  ajax(url1, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// 处理逻辑</span>
    secondAjax()
  })
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">secondAjax</span>(<span class="hljs-params"></span>) </span>{
  ajax(url2, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// 处理逻辑</span>
  })
}
ajax(url, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// 处理逻辑</span>
  firstAjax()
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>以上的代码虽然看上去利于阅读了，但是还是没有解决根本问题。回调地狱的根本问题就是：</p>
        <ol>
          <li>嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身</li>
          <li>嵌套函数一多，就很难处理错误</li>
        </ol>
        <p>当然，回调函数还存在着别的几个缺点，比如不能使用 <code>try catch</code> 捕获错误，不能直接 <code>return</code>。</p>
      </el-collapse-item>
      <el-collapse-item title="14. setTimeout、setInterval、requestAnimationFrame 各有什么特点？">
        <p>异步编程当然少不了定时器了，常见的定时器函数有 <code>setTimeout</code>、<code>setInterval</code>、<code>requestAnimationFrame</code>。最常用的是<code>setTimeout</code>，很多人认为 <code>setTimeout</code> 是延时多久，那就应该是多久后执行。</p>
        <p>其实这个观点是错误的，因为 JS 是单线程执行的，如果前面的代码影响了性能，就会导致 <code>setTimeout</code> 不会按期执行。当然了，可以通过代码去修正 <code>setTimeout</code>，从而使定时器相对准确：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">let</span> period = <span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">2</span>
<span class="hljs-keyword">let</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() + period
<span class="hljs-keyword">let</span> interval = <span class="hljs-number">1000</span>
<span class="hljs-keyword">let</span> currentInterval = interval
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loop</span>(<span class="hljs-params"></span>) </span>{
  count++
  <span class="hljs-comment">// 代码执行所消耗的时间</span>
  <span class="hljs-keyword">let</span> offset = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - (startTime + count * interval);
  <span class="hljs-keyword">let</span> diff = end - <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
  <span class="hljs-keyword">let</span> h = <span class="hljs-built_in">Math</span>.floor(diff / (<span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">60</span>))
  <span class="hljs-keyword">let</span> hdiff = diff % (<span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * <span class="hljs-number">60</span>)
  <span class="hljs-keyword">let</span> m = <span class="hljs-built_in">Math</span>.floor(hdiff / (<span class="hljs-number">60</span> * <span class="hljs-number">1000</span>))
  <span class="hljs-keyword">let</span> mdiff = hdiff % (<span class="hljs-number">60</span> * <span class="hljs-number">1000</span>)
  <span class="hljs-keyword">let</span> s = mdiff / (<span class="hljs-number">1000</span>)
  <span class="hljs-keyword">let</span> sCeil = <span class="hljs-built_in">Math</span>.ceil(s)
  <span class="hljs-keyword">let</span> sFloor = <span class="hljs-built_in">Math</span>.floor(s)
  <span class="hljs-comment">// 得到下一次循环所消耗的时间</span>
  currentInterval = interval - offset
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'时：'</span>+h, <span class="hljs-string">'分：'</span>+m, <span class="hljs-string">'毫秒：'</span>+s, <span class="hljs-string">'秒向上取整：'</span>+sCeil, <span class="hljs-string">'代码执行时间：'</span>+offset, <span class="hljs-string">'下次循环间隔'</span>+currentInterval)
  <span class="hljs-built_in">setTimeout</span>(loop, currentInterval)
}
<span class="hljs-built_in">setTimeout</span>(loop, currentInterval)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>接下来看 <code>setInterval</code>，其实这个函数作用和 <code>setTimeout</code> 基本一致，只是该函数是每隔一段时间执行一次回调函数。</p>
        <p>通常来说不建议使用 <code>setInterval</code>。第一，它和 <code>setTimeout</code> 一样，不能保证在预期的时间执行任务。第二，它存在执行累积的问题，请看以下伪代码</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">demo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">setInterval</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
  },<span class="hljs-number">1000</span>)
  sleep(<span class="hljs-number">2000</span>)
}
demo()
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>以上代码在浏览器环境中，如果定时器执行过程中出现了耗时操作，多个回调函数会在耗时操作结束以后同时执行，这样可能就会带来性能上的问题。</p>
        <p>如果有循环定时器的需求，其实完全可以通过 <code>requestAnimationFrame</code> 来实现：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setInterval</span>(<span class="hljs-params">callback, interval</span>) </span>{
  <span class="hljs-keyword">let</span> timer
  <span class="hljs-keyword">const</span> now = <span class="hljs-built_in">Date</span>.now
  <span class="hljs-keyword">let</span> startTime = now()
  <span class="hljs-keyword">let</span> endTime = startTime
  <span class="hljs-keyword">const</span> loop = <span class="hljs-function">() =&gt;</span> {
    timer = <span class="hljs-built_in">window</span>.requestAnimationFrame(loop)
    endTime = now()
    <span class="hljs-keyword">if</span> (endTime - startTime &gt;= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = <span class="hljs-built_in">window</span>.requestAnimationFrame(loop)
  <span class="hljs-keyword">return</span> timer
}
<span class="hljs-keyword">let</span> a = <span class="hljs-number">0</span>
<span class="hljs-built_in">setInterval</span>(<span class="hljs-function"><span class="hljs-params">timer</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
  a++
  <span class="hljs-keyword">if</span> (a === <span class="hljs-number">3</span>) cancelAnimationFrame(timer)
}, <span class="hljs-number">1000</span>)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>首先 <code>requestAnimationFrame</code> 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 <code>setTimeout</code>。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
