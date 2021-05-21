<template>
  <div class="route_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. Vue-Router 的懒加载如何实现">
        <p>非懒加载：</p>
        <p>（1）方案一(常用)：使用箭头函数+import动态加载</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> List = <span class="hljs-function">() =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'@/components/list.vue'</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/list'</span>, <span class="hljs-attr">component</span>: List }
  ]
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（2）方案二：使用箭头函数+require动态加载</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
   {
     <span class="hljs-attr">path</span>: <span class="hljs-string">'/list'</span>,
     <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/components/list'</span>], resolve)
   }
  ]
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>（3）方案三：使用webpack的require.ensure技术，也可以实现按需加载。 这种情况下，多个路由指定相同的chunkName，会合并打包成一个js文件。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// r就是resolve</span>
<span class="hljs-keyword">const</span> List = <span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function">() =&gt;</span> r(<span class="hljs-built_in">require</span>(<span class="hljs-string">'@/components/list'</span>)), <span class="hljs-string">'list'</span>);
<span class="hljs-comment">// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 </span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/list'</span>,
    <span class="hljs-attr">component</span>: List,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'list'</span>
  }
 ]
}))
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="2. 路由的hash和history模式的区别">
        <p>Vue-Router有两种模式：<strong>hash模式</strong>和<strong>history模式</strong>。默认的路由模式是hash模式。
          <a name="user-content-d30ZO"></a></p>
        <h4 data-id="heading-59">1. hash模式</h4>
        <p><strong>简介：</strong> hash模式是开发中默认的模式，它的URL带着一个#，例如：<code>[http://www.abc.com/#/vue](http://www.abc.com/#/vue)</code>，它的hash值就是<code>#/vue</code>。</p>
        <p><strong>特点</strong>：hash值会出现在URL里面，但是不会出现在HTTP请求中，对后端完全没有影响，所以改变hash值，不会重新加载页面。这种模式的浏览器支持度很好，低版本的IE浏览器也支持这种模式。
          hash路由被称为是前端路由，已经成为SPA（单页面应用）的标配。</p>
        <p><strong>原理：</strong> hash模式的主要原理就是<strong>onhashchange()事件</strong>：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">window</span>.onhashchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
	<span class="hljs-built_in">console</span>.log(event.oldURL, event.newURL);
	<span class="hljs-keyword">let</span> hash = location.hash.slice(<span class="hljs-number">1</span>);
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>使用onhashchange()事件的好处就是，在页面的hash值发生变化时，无需向后端发起请求，window就可以监听事件的改变，并按规则加载相应的代码。
          除此之外，hash值变化对应的URL都会被浏览器记录下来，这样浏览器就能实现页面的前进和后退。虽然是没有请求后端服务器，但是页面的hash值和对应的URL关联起来了。
          <a name="user-content-eNUMD"></a></p>
        <h4 data-id="heading-60">2. history模式</h4>
        <p><strong>简介：</strong> history模式的URL中没有#，它使用的是传统的路由分发模式，即用户在输入一个URL时，服务器会接收这个请求，并解析这个URL，然后做出相应的逻辑处理。</p>
        <p><strong>特点：</strong> 当使用history模式时，URL就像这样：<code>[http://abc.com/user/id](http://abc.com/user/id)</code>。相比hash模式更加好看。但是，history模式需要后台配置支持。如果后台没有正确配置，访问时会返回404。</p>
        <p><strong>API：</strong> history api可以分为两大部分，切换历史状态和修改历史状态：</p>
        <ul>
          <li><strong>修改历史状态</strong>：包括了 HTML5 History Interface 中新增的 <code>pushState()</code> 和 <code>replaceState()</code> 方法，这两个方法应用于浏览器的历史记录栈，提供了对历史记录进行修改的功能。只是当他们进行修改时，虽然修改了url，但浏览器不会立即向后端发送请求。如果要做到改变url但又不刷新页面的效果，就需要前端用上这两个API。</li>
          <li><strong>切换历史状态：</strong> 包括<code>forward()</code>、<code>back()</code>、<code>go()</code>三个方法，对应浏览器的前进，后退，跳转操作。</li>
        </ul>
        <p>虽然history模式丢弃了丑陋的#。但是，它也有自己的缺点，就是在刷新页面的时候，如果没有相应的路由或资源，就会刷出404来。
          如果想要切换到history模式，就要进行以下配置（后端也要进行配置）：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">routes</span>: [...]
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><a name="user-content-zGbYd"></a></p>
        <h4 data-id="heading-61">3. 两种模式对比</h4>
        <p>调用 history.pushState() 相比于直接修改 hash，存在以下优势:</p>
        <ul>
          <li>pushState() 设置的新 URL 可以是与当前 URL 同源的任意 URL；而 hash 只可修改 # 后面的部分，因此只能设置与当前 URL 同文档的 URL；</li>
          <li>pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；</li>
          <li>pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；</li>
          <li>pushState() 可额外设置 title 属性供后续使用。</li>
          <li>hash模式下，仅hash符号之前的url会被包含在请求中，后端如果没有做到对路由的全覆盖，也不会返回404错误；history模式下，前端的url必须和实际向后端发起请求的url一致，如果没有对用的路由处理，将返回404错误。</li>
        </ul>
        <p>hash模式和history模式都有各自的优势和缺陷，我们还是要根据实际情况选择性的使用。
          <a name="user-content-rtwEO"></a></p>
      </el-collapse-item>
      <el-collapse-item title="3. 如何获取页面的hash变化">
        <p><strong>（1）监听$route的变化</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 监听,当路由发生变化的时候执行</span>
<span class="hljs-attr">watch</span>: {
  <span class="hljs-attr">$route</span>: {
    <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, oldVal</span>)</span>{
      <span class="hljs-built_in">console</span>.log(val);
    },
    <span class="hljs-comment">// 深度观察监听</span>
    <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>
  }
},
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（2）window.location.hash读取#值</strong>
          window.location.hash 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。
          <a name="user-content-KxTbw"></a></p>
      </el-collapse-item>
      <el-collapse-item title="4. $route和 $router 的区别">
        <ul>
          <li>$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数</li>
          <li>$router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。
            <a name="user-content-rx0k1"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="5. 如何定义动态路由？如何获取传过来的动态参数？">
        <p><strong>（1）param方式</strong></p>
        <ul>
          <li>配置路由格式：<code>/router/:id</code></li>
          <li>传递的方式：在path后面跟上对应的值</li>
          <li>传递后形成的路径：<code>/router/123</code></li>
        </ul>
        <p>1）路由定义</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">//在APP.vue中</span>
&lt;router-link :to=<span class="hljs-string">"'/user/'+userId"</span> replace&gt;用户&lt;/router-link&gt;

<span class="hljs-comment">//在index.js</span>
{
&nbsp; &nbsp;<span class="hljs-attr">path</span>: <span class="hljs-string">'/user/:userid'</span>,
&nbsp; &nbsp;<span class="hljs-attr">component</span>: User,
},
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）路由跳转</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 方法1：</span>
&lt;router-link :to=<span class="hljs-string">"{ name: 'users', params: { uname: wade }}"</span>&gt;按钮&lt;/router-link

<span class="hljs-comment">// 方法2：</span>
<span class="hljs-built_in">this</span>.$router.push({<span class="hljs-attr">name</span>:<span class="hljs-string">'users'</span>,<span class="hljs-attr">params</span>:{<span class="hljs-attr">uname</span>:wade}})

<span class="hljs-comment">// 方法3：</span>
<span class="hljs-built_in">this</span>.$router.push(<span class="hljs-string">'/user/'</span> + wade)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>3）参数获取
          通过 <code>$route.params.userid</code> 获取传递的值</p>
        <p><strong>（2）query方式</strong></p>
        <ul>
          <li>配置路由格式：<code>/router</code>，也就是普通配置</li>
          <li>传递的方式：对象中使用query的key作为传递方式</li>
          <li>传递后形成的路径：<code>/route?id=123</code></li>
        </ul>
        <p>1）路由定义</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">//方式1：直接在router-link 标签上以对象的形式</span>
&lt;router-link :to=<span class="hljs-string">"{path:'/profile',query:{name:'why',age:28,height:188}}"</span>&gt;档案&lt;/router-link&gt;

<span class="hljs-comment">// 方式2：写成按钮以点击事件形式</span>
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">'profileClick'</span>&gt;</span>我的<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>

<span class="hljs-function"><span class="hljs-title">profileClick</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">this</span>.$router.push({
    <span class="hljs-attr">path</span>: <span class="hljs-string">"/profile"</span>,
    <span class="hljs-attr">query</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"kobi"</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-string">"28"</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">198</span>
    }
  });
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）跳转方法</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 方法1：</span>
&lt;router-link :to=<span class="hljs-string">"{ name: 'users', query: { uname: james }}"</span>&gt;按钮&lt;/router-link&gt;

<span class="hljs-comment">// 方法2：</span>
<span class="hljs-built_in">this</span>.$router.push({ <span class="hljs-attr">name</span>: <span class="hljs-string">'users'</span>, <span class="hljs-attr">query</span>:{ <span class="hljs-attr">uname</span>:james }})

<span class="hljs-comment">// 方法3：</span>
&lt;router-link :to=<span class="hljs-string">"{ path: '/user', query: { uname:james }}"</span>&gt;按钮&lt;/router-link&gt;

<span class="hljs-comment">// 方法4：</span>
<span class="hljs-built_in">this</span>.$router.push({ <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>, <span class="hljs-attr">query</span>:{ <span class="hljs-attr">uname</span>:james }})

<span class="hljs-comment">// 方法5：</span>
<span class="hljs-built_in">this</span>.$router.push(<span class="hljs-string">'/user?uname='</span> + jsmes)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>3）获取参数</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">通过$route.query 获取传递的值
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><a name="user-content-HD54R"></a></p>
      </el-collapse-item>
      <el-collapse-item title="6. Vue-router 路由钩子在生命周期的体现">
        <p>一、Vue-Router导航守卫
          有的时候，我们需要通过路由来进行一些操作，比如最常见的登录权限验证，当用户满足条件时，才让其进入导航，否则就取消跳转，并跳到登录页面让其登录。
          为此我们有很多种方法可以植入路由的导航过程：全局的，单个路由独享的，或者组件级的</p>
        <ol>
          <li>全局路由钩子</li>
        </ol>
        <p>vue-router全局有三个路由钩子;</p>
        <ul>
          <li>router.beforeEach 全局前置守卫 进入路由之前</li>
          <li>router.beforeResolve 全局解析守卫（2.5.0+）在 beforeRouteEnter 调用之后调用</li>
          <li>router.afterEach 全局后置钩子 进入路由之后</li>
        </ul>
        <p>具体使用∶</p>
        <ul>
          <li>beforeEach（判断是否登录了，没登录就跳转到登录页）</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> ifInfo = Vue.prototype.$common.getSession(<span class="hljs-string">'userData'</span>);  <span class="hljs-comment">// 判断是否登录的存储信息</span>
    <span class="hljs-keyword">if</span> (!ifInfo) {
        <span class="hljs-comment">// sessionStorage里没有储存user信息    </span>
        <span class="hljs-keyword">if</span> (to.path == <span class="hljs-string">'/'</span>) {
            <span class="hljs-comment">//如果是登录页面路径，就直接next()      </span>
            next();
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//不然就跳转到登录      </span>
            Message.warning(<span class="hljs-string">"请重新登录！"</span>);
            <span class="hljs-built_in">window</span>.location.href = Vue.prototype.$loginUrl;
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> next();
    }
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>afterEach （跳转之后滚动条回到顶部）</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript">router.afterEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span></span>) =&gt;</span> {
    <span class="hljs-comment">// 跳转之后滚动条回到顶部  </span>
    <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <ol start="2">
          <li>单个路由独享钩子</li>
        </ol>
        <p><strong>beforeEnter</strong>
          如果不想全局配置守卫的话，可以为某些路由单独配置守卫，有三个参数∶ to、from、next</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'login'</span>,
        <span class="hljs-attr">component</span>: login,
        <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'即将进入登录页面'</span>)
            next()
        }
    }
]
<span class="copy-code-btn">复制代码</span></code></pre>
        <ol start="3">
          <li>组件内钩子</li>
        </ol>
        <p>beforeRouteUpdate、beforeRouteEnter、beforeRouteLeave</p>
        <p>这三个钩子都有三个参数∶to、from、next</p>
        <ul>
          <li>beforeRouteEnter∶ 进入组件前触发</li>
          <li>beforeRouteUpdate∶ 当前地址改变并且改组件被复用时触发，举例来说，带有动态参数的路径foo/∶id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的foa组件，这个钩子在这种情况下就会被调用</li>
          <li>beforeRouteLeave∶ 离开组件被调用</li>
        </ul>
        <p>注意点，beforeRouteEnter组件内还访问不到this，因为该守卫执行前组件实例还没有被创建，需要传一个回调给 next来访问，例如：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-title">beforeRouteEnter</span>(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>)</span> {
    next(<span class="hljs-function"><span class="hljs-params">target</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">from</span>.path == <span class="hljs-string">'/classProcess'</span>) {
            target.isFromProcess = <span class="hljs-literal">true</span>
        }
    })
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>二、Vue路由钩子在生命周期函数的体现</p>
        <ol>
          <li>完整的路由导航解析流程（不包括其他生命周期）</li>
        </ol>
        <ul>
          <li>触发进入其他路由。</li>
          <li>调用要离开路由的组件守卫beforeRouteLeave</li>
          <li>调用局前置守卫∶ beforeEach</li>
          <li>在重用的组件里调用 beforeRouteUpdate</li>
          <li>调用路由独享守卫 beforeEnter。</li>
          <li>解析异步路由组件。</li>
          <li>在将要进入的路由组件中调用 beforeRouteEnter</li>
          <li>调用全局解析守卫 beforeResolve</li>
          <li>导航被确认。</li>
          <li>调用全局后置钩子的 afterEach 钩子。</li>
          <li>触发DOM更新（mounted）。</li>
          <li>执行beforeRouteEnter 守卫中传给 next 的回调函数</li>
        </ul>
        <ol start="2">
          <li>触发钩子的完整顺序</li>
        </ol>
        <p>路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从a组件离开，第一次进入b组件∶</p>
        <ul>
          <li>beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。</li>
          <li>beforeEach：路由全局前置守卫，可用于登录验证、全局路由loading等。</li>
          <li>beforeEnter：路由独享守卫</li>
          <li>beforeRouteEnter：路由组件的组件进入路由前钩子。</li>
          <li>beforeResolve：路由全局解析守卫</li>
          <li>afterEach：路由全局后置钩子</li>
          <li>beforeCreate：组件生命周期，不能访问tAis。</li>
          <li>created;组件生命周期，可以访问tAis，不能访问dom。</li>
          <li>beforeMount：组件生命周期</li>
          <li>deactivated：离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。</li>
          <li>mounted：访问/操作dom。</li>
          <li>activated：进入缓存组件，进入a的嵌套子组件（如果有的话）。</li>
          <li>执行beforeRouteEnter回调函数next。</li>
        </ul>
        <ol start="3">
          <li>导航行为被触发到导航完成的整个过程</li>
        </ol>
        <ul>
          <li>导航行为被触发，此时导航未被确认。</li>
          <li>在失活的组件里调用离开守卫 beforeRouteLeave。</li>
          <li>调用全局的 beforeEach守卫。</li>
          <li>在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。</li>
          <li>在路由配置里调用 beforeEnteY。</li>
          <li>解析异步路由组件（如果有）。</li>
          <li>在被激活的组件里调用 beforeRouteEnter。</li>
          <li>调用全局的 beforeResolve 守卫（2.5+），标示解析阶段完成。</li>
          <li>导航被确认。</li>
          <li>调用全局的 afterEach 钩子。</li>
          <li>非重用组件，开始组件实例的生命周期：beforeCreate&amp;created、beforeMount&amp;mounted</li>
          <li>触发 DOM 更新。</li>
          <li>用创建好的实例调用 beforeRouteEnter守卫中传给 next 的回调函数。</li>
          <li>导航完成
            <a name="user-content-HFPT1"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="7. Vue-router跳转和location.href有什么区别">
        <ul>
          <li>使用 <code>location.href= /url&nbsp;</code>来跳转，简单方便，但是刷新了页面；</li>
          <li>使用 <code>history.pushState( /url )</code> ，无刷新页面，静态跳转；</li>
          <li>引进 router ，然后使用 <code>router.push( /url )</code> 来跳转，使用了 <code>diff</code> 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 <code>history.pushState()</code> 没什么差别的，因为vue-router就是用了 <code>history.pushState()</code> ，尤其是在history模式下。
            <a name="user-content-iJxmO"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="8. params和query的区别">
        <p><strong>用法</strong>：query要用path来引入，params要用name来引入，接收参数都是类似的，分别是 <code>this.$route.query.name</code> 和 <code>this.$route.params.name</code> 。</p>
        <p><strong>url地址显示</strong>：query更加类似于我们ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示</p>
        <p><strong>注意</strong>：query刷新不会丢失query里面的数据 params刷新会丢失 params里面的数据。
          <a name="user-content-0sKfq"></a></p>
      </el-collapse-item>
      <el-collapse-item title="9. Vue-router 导航守卫有哪些">
        <ul>
          <li>全局前置/钩子：beforeEach、beforeResolve、afterEach</li>
          <li>路由独享的守卫：beforeEnter</li>
          <li>组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
            <a name="user-content-k0lkx"></a></li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
