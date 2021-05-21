<template>
  <div class="Webpack_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 减少 Webpack 打包时间">
        <h4 data-id="heading-25">（1）优化 Loader</h4>
        <p>对于 Loader 来说，影响打包效率首当其冲必属 Babel 了。因为 Babel 会将代码转为字符串生成 AST，然后对 AST 继续进行转变最后再生成新的代码，项目越大，<strong>转换代码越多，效率就越低</strong>。当然了，我们是有办法优化的。</p>
        <p>首先我们<strong>优化 Loader 的文件搜索范围</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-comment">// js 文件才使用 babel</span>
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        loader: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-comment">// 只在 src 文件夹下查找</span>
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>)],
        <span class="hljs-comment">// 不会去查找的路径</span>
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      }
    ]
  }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>对于 Babel 来说，希望只作用在 JS 代码上的，然后 <code>node_modules</code> 中使用的代码都是编译过的，所以我们也完全没有必要再去处理一遍。</p>
        <p>当然这样做还不够，还可以将 Babel 编译过的文件<strong>缓存</strong>起来，下次只需要编译更改过的代码文件即可，这样可以大幅度加快打包时间</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">loader: <span class="hljs-string">'babel-loader?cacheDirectory=true'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-26">（2）HappyPack</h4>
        <p>受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。</p>
        <p><strong>HappyPack 可以将 Loader 的同步执行转换为并行的</strong>，这样就能充分利用系统资源来加快打包效率了</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      include: [resolve(<span class="hljs-string">'src'</span>)],
      <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
      <span class="hljs-comment">// id 后面的内容对应下面</span>
      loader: <span class="hljs-string">'happypack/loader?id=happybabel'</span>
    }
  ]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-keyword">new</span> HappyPack({
    <span class="hljs-attr">id</span>: <span class="hljs-string">'happybabel'</span>,
    <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'babel-loader?cacheDirectory'</span>],
    <span class="hljs-comment">// 开启 4 个线程</span>
    <span class="hljs-attr">threads</span>: <span class="hljs-number">4</span>
  })
]
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-27">（3）DllPlugin</h4>
        <p><strong>DllPlugin 可以将特定的类库提前打包然后引入</strong>。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。DllPlugin的使用方法如下：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 单独配置在一个文件中</span>
<span class="hljs-comment">// webpack.dll.conf.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">// 想统一打包的类库</span>
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'react'</span>]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].dll.js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]-[hash]'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-comment">// name 必须和 output.library 一致</span>
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]-[hash]'</span>,
      <span class="hljs-comment">// 该属性需要与 DllReferencePlugin 中一致</span>
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>, <span class="hljs-string">'[name]-manifest.json'</span>)
    })
  ]
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>然后需要执行这个配置文件生成依赖文件，接下来需要使用 <code>DllReferencePlugin</code> 将依赖文件引入项目中</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// webpack.conf.js</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ...省略其他配置</span>
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-comment">// manifest 就是之前打包出来的 json 文件</span>
      <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dist/vendor-manifest.json'</span>),
    })
  ]
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-28">（4）代码压缩</h4>
        <p>在 Webpack3 中，一般使用 <code>UglifyJS</code> 来压缩代码，但是这个是单线程运行的，为了加快效率，可以使用 <code>webpack-parallel-uglify-plugin</code> 来并行运行 <code>UglifyJS</code>，从而提高效率。</p>
        <p>在 Webpack4 中，不需要以上这些操作了，只需要将 <code>mode</code> 设置为 <code>production</code> 就可以默认开启以上功能。代码压缩也是我们必做的性能优化方案，当然我们不止可以压缩 JS 代码，还可以压缩 HTML、CSS 代码，并且在压缩 JS 代码的过程中，我们还可以通过配置实现比如删除 <code>console.log</code> 这类代码的功能。</p>
        <h4 data-id="heading-29">（5）其他</h4>
        <p>可以通过一些小的优化点来加快打包速度</p>
        <ul>
          <li><code>resolve.extensions</code>：用来表明文件后缀列表，默认查找顺序是 <code>['.js', '.json']</code>，如果你的导入文件没有添加后缀就会按照这个顺序查找文件。我们应该尽可能减少后缀列表长度，然后将出现频率高的后缀排在前面</li>
          <li><code>resolve.alias</code>：可以通过别名的方式来映射一个路径，能让 Webpack 更快找到路径</li>
          <li><code>module.noParse</code>：如果你确定一个文件下没有其他依赖，就可以使用该属性让 Webpack 不扫描该文件，这种方式对于大型的类库很有帮助</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. 减少 Webpack 打包体积">
        <h4 data-id="heading-31">（1）按需加载</h4>
        <p>在开发 SPA 项目的时候，项目中都会存在很多路由页面。如果将这些页面全部打包进一个 JS 文件的话，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。那么为了首页能更快地呈现给用户，希望首页能加载的文件体积越小越好，<strong>这时候就可以使用按需加载，将每个路由页面单独打包为一个文件</strong>。当然不仅仅路由可以按需加载，对于 <code>loadash</code> 这种大型类库同样可以使用这个功能。</p>
        <p>按需加载的代码实现这里就不详细展开了，因为鉴于用的框架不同，实现起来都是不一样的。当然了，虽然他们的用法可能不同，但是底层的机制都是一样的。都是当使用的时候再去下载对应文件，返回一个 <code>Promise</code>，当 <code>Promise</code> 成功以后去执行回调。</p>
        <h4 data-id="heading-32">（2）Scope Hoisting</h4>
        <p><strong>Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。</strong></p>
        <p>比如希望打包两个文件：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// test.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> a = <span class="hljs-number">1</span>
<span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> { a } <span class="hljs-keyword">from</span> <span class="hljs-string">'./test.js'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>对于这种情况，打包出来的代码会类似这样：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">[
  <span class="hljs-comment">/* 0 */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">module</span>, <span class="hljs-built_in">exports</span>, <span class="hljs-built_in">require</span></span>) </span>{
    <span class="hljs-comment">//...</span>
  },
  <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">module</span>, <span class="hljs-built_in">exports</span>, <span class="hljs-built_in">require</span></span>) </span>{
    <span class="hljs-comment">//...</span>
  }
]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>但是如果使用 Scope Hoisting ，代码就会尽可能的合并到一个函数中去，也就变成了这样的类似代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">[
  <span class="hljs-comment">/* 0 */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">module</span>, <span class="hljs-built_in">exports</span>, <span class="hljs-built_in">require</span></span>) </span>{
    <span class="hljs-comment">//...</span>
  }
]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>这样的打包方式生成的代码明显比之前的少多了。如果在 Webpack4 中你希望开启这个功能，只需要启用 <code>optimization.concatenateModules</code> 就可以了：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">concatenateModules</span>: <span class="hljs-literal">true</span>
  }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-33">（3）Tree Shaking</h4>
        <p><strong>Tree Shaking 可以实现删除项目中未被引用的代码</strong>，比如：</p>
        <pre><code class="copyable">// test.js
export const a = 1
export const b = 2
// index.js
import { a } from './test.js'
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>对于以上情况，<code>test</code> 文件中的变量 <code>b</code> 如果没有在项目中使用到的话，就不会被打包到文件中。</p>
        <p>如果使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
