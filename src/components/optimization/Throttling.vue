<template>
  <div class="Throttling_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 介绍一下节流与防抖">
        <ul>
          <li>函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。</li>
          <li>函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. 实现节流函数和防抖函数">
        <p><strong>函数防抖的实现：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">debounce</span>(<span class="hljs-params">fn, wait</span>) </span>{
  <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> context = <span class="hljs-built_in">this</span>,
      args = [...arguments];

    <span class="hljs-comment">// 如果此时存在定时器的话，则取消之前的定时器重新记时</span>
    <span class="hljs-keyword">if</span> (timer) {
      <span class="hljs-built_in">clearTimeout</span>(timer);
      timer = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">// 设置定时器，使事件间隔指定事件后执行</span>
    timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      fn.apply(context, args);
    }, wait);
  };
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>函数节流的实现：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 时间戳版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(<span class="hljs-params">fn, delay</span>) </span>{
  <span class="hljs-keyword">var</span> preTime = <span class="hljs-built_in">Date</span>.now();

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> context = <span class="hljs-built_in">this</span>,
      args = [...arguments],
      nowTime = <span class="hljs-built_in">Date</span>.now();

    <span class="hljs-comment">// 如果两次时间间隔超过了指定时间，则执行函数。</span>
    <span class="hljs-keyword">if</span> (nowTime - preTime &gt;= delay) {
      preTime = <span class="hljs-built_in">Date</span>.now();
      <span class="hljs-keyword">return</span> fn.apply(context, args);
    }
  };
}

<span class="hljs-comment">// 定时器版</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span> (<span class="hljs-params">fun, wait</span>)</span>{
  <span class="hljs-keyword">let</span> timeout = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> context = <span class="hljs-built_in">this</span>
    <span class="hljs-keyword">let</span> args = [...arguments]
    <span class="hljs-keyword">if</span>(!timeout){
      timeout = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
        fun.apply(context, args)
        timeout = <span class="hljs-literal">null</span>
      }, wait)
    }
  }
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
