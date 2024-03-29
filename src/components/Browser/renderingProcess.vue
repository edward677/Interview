<template>
  <div class="renderingProcess_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 浏览器本地存储方式及使用场景">
        <h4 data-id="heading-38">（1）Cookie</h4>
        <p>Cookie是最早被提出来的本地存储方式，在此之前，服务端是无法判断网络中的两个请求是否是同一用户发起的，为解决这个问题，Cookie就出现了。Cookie的大小只有4kb，它是一种纯文本文件，每次发起HTTP请求都会携带Cookie。
          <strong>Cookie的特性：</strong></p>
        <ul>
          <li>Cookie一旦创建成功，名称就无法修改</li>
          <li>Cookie是无法跨域名的，也就是说a域名和b域名下的cookie是无法共享的，这也是由Cookie的隐私安全性决定的，这样就能够阻止非法获取其他网站的Cookie</li>
          <li>每个域名下Cookie的数量不能超过20个，每个Cookie的大小不能超过4kb</li>
          <li>有安全问题，如果Cookie被拦截了，那就可获得session的所有信息，即使加密也于事无补，无需知道cookie的意义，只要转发cookie就能达到目的</li>
        </ul>
        <p>如果需要域名之间跨域共享Cookie，有两种方法：</p>
        <ol>
          <li>使用Nginx反向代理</li>
          <li>在一个站点登陆之后，往其他网站写Cookie。服务端的Session存储到一个节点，Cookie存储sessionId</li>
        </ol>
        <p><strong>Cookie的使用场景</strong></p>
        <ul>
          <li>最常见的使用场景就是Cookie和session结合使用，我们将sessionId存储到Cookie中，每次发请求都会携带这个sessionId，这样服务端就知道是谁发起的请求，从而响应相应的信息。</li>
          <li>可以用来统计页面的点击次数</li>
        </ul>
        <h4 data-id="heading-39">（2）LocalStorage</h4>
        <p>LocalStorage是HTML5新引入的特性，由于有的时候我们存储的信息较大，Cookie就不能满足我们的需求，这时候LocalStorage就派上用场了。
          **
          <strong>LocalStorage的优点：</strong></p>
        <ul>
          <li>在大小方面，LocalStorage的大小一般为5MB，可以储存更多的信息</li>
          <li>LocalStorage是持久储存，并不会随着页面的关闭而消失，除非主动清理，不然会永久存在</li>
          <li>仅储存在本地，不像Cookie那样每次HTTP请求都会被携带</li>
        </ul>
        <p><strong>LocalStorage的缺点：</strong></p>
        <ul>
          <li>存在浏览器兼容问题，IE8以下版本的浏览器不支持</li>
          <li>如果浏览器设置为隐私模式，那我们将无法读取到LocalStorage</li>
          <li>LocalStorage受到同源策略的限制，即端口、协议、主机地址有任何一个不相同，都不会访问</li>
        </ul>
        <p><strong>LocalStorage的常用API：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 保存数据到 localStorage</span>
<span class="hljs-built_in">localStorage</span>.setItem(<span class="hljs-string">'key'</span>, <span class="hljs-string">'value'</span>);

<span class="hljs-comment">// 从 localStorage 获取数据</span>
<span class="hljs-keyword">let</span> data = <span class="hljs-built_in">localStorage</span>.getItem(<span class="hljs-string">'key'</span>);

<span class="hljs-comment">// 从 localStorage 删除保存的数据</span>
<span class="hljs-built_in">localStorage</span>.removeItem(<span class="hljs-string">'key'</span>);

<span class="hljs-comment">// 从 localStorage 删除所有保存的数据</span>
<span class="hljs-built_in">localStorage</span>.clear();

<span class="hljs-comment">// 获取某个索引的Key</span>
<span class="hljs-built_in">localStorage</span>.key(index)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>LocalStorage的使用场景：</strong></p>
        <ul>
          <li>有些网站有换肤的功能，这时候就可以将换肤的信息存储在本地的LocalStorage中，当需要换肤的时候，直接操作LocalStorage即可</li>
          <li>在网站中的用户浏览信息也会存储在LocalStorage中，还有网站的一些不常变动的个人信息等也可以存储在本地的LocalStorage中</li>
        </ul>
        <h4 data-id="heading-40">（3）SessionStorage</h4>
        <p>SessionStorage和LocalStorage都是在HTML5才提出来的存储方案，SessionStorage 主要用于临时保存同一窗口(或标签页)的数据，刷新页面时不会删除，关闭窗口或标签页之后将会删除这些数据。</p>
        <p><strong>SessionStorage与LocalStorage对比：</strong></p>
        <ul>
          <li>SessionStorage和LocalStorage都在<strong>本地进行数据存储</strong>；</li>
          <li>SessionStorage也有同源策略的限制，但是SessionStorage有一条更加严格的限制，SessionStorage<strong>只有在同一浏览器的同一窗口下才能够共享</strong>；</li>
          <li>LocalStorage和SessionStorage<strong>都不能被爬虫爬取</strong>；</li>
        </ul>
        <p><strong>SessionStorage的常用API：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 保存数据到 sessionStorage</span>
sessionStorage.setItem(<span class="hljs-string">'key'</span>, <span class="hljs-string">'value'</span>);

<span class="hljs-comment">// 从 sessionStorage 获取数据</span>
<span class="hljs-keyword">let</span> data = sessionStorage.getItem(<span class="hljs-string">'key'</span>);

<span class="hljs-comment">// 从 sessionStorage 删除保存的数据</span>
sessionStorage.removeItem(<span class="hljs-string">'key'</span>);

<span class="hljs-comment">// 从 sessionStorage 删除所有保存的数据</span>
sessionStorage.clear();

<span class="hljs-comment">// 获取某个索引的Key</span>
sessionStorage.key(index)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>SessionStorage的使用场景</strong></p>
        <ul>
          <li>由于SessionStorage具有时效性，所以可以用来存储一些网站的游客登录的信息，还有临时的浏览记录的信息。当关闭网站之后，这些信息也就随之消除了。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. Cookie有哪些字段，作用分别是什么">
        <p><strong>Cookie由以下字段组成：</strong></p>
        <ul>
          <li><strong>Name</strong>：cookie的名称</li>
          <li><strong>Value</strong>：cookie的值，对于认证cookie，value值包括web服务器所提供的访问令牌；</li>
          <li><strong>Size</strong> ： cookie的大小</li>
          <li><strong>Path</strong> ： 可以访问此cookie的页面路径。 比如domain是abc.com，path是<code>/test</code>，那么只有<code>/test</code>路径下的页面可以读取此cookie。</li>
          <li><strong>Secure</strong>： 指定是否使用HTTPS安全协议发送Cookie。使用HTTPS安全协议，可以保护Cookie在浏览器和Web服务器间的传输过程中不被窃取和篡改。该方法也可用于Web站点的身份鉴别，即在HTTPS的连接建立阶段，浏览器会检查Web网站的SSL证书的有效性。但是基于兼容性的原因（比如有些网站使用自签署的证书）在检测到SSL证书无效时，浏览器并不会立即终止用户的连接请求，而是显示安全风险信息，用户仍可以选择继续访问该站点。</li>
          <li><strong>Domain</strong>：可以访问该cookie的域名，Cookie 机制并未遵循严格的同源策略，允许一个子域可以设置或获取其父域的 Cookie。当需要实现单点登录方案时，Cookie 的上述特性非常有用，然而也增加了 Cookie受攻击的危险，比如攻击者可以借此发动会话定置攻击。因而，浏览器禁止在 Domain 属性中设置.org、.com 等通用顶级域名、以及在国家及地区顶级域下注册的二级域名，以减小攻击发生的范围。</li>
          <li><strong>HTTP</strong>： 该字段包含<code>HTTPOnly</code> 属性 ，该属性用来设置cookie能否通过脚本来访问，默认为空，即可以通过脚本访问。在客户端是不能通过js代码去设置一个httpOnly类型的cookie的，这种类型的cookie只能通过服务端来设置。该属性用于防止客户端脚本通过<code>document.cookie</code>属性访问Cookie，有助于保护Cookie不被跨站脚本攻击窃取或篡改。但是，HTTPOnly的应用仍存在局限性，一些浏览器可以阻止客户端脚本对Cookie的读操作，但允许写操作；此外大多数浏览器仍允许通过XMLHTTP对象读取HTTP响应中的Set-Cookie头。</li>
          <li><strong>Expires/Max-size</strong> ： 此cookie的超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。</li>
        </ul>
        <p><strong>总结：</strong>
          服务器端可以使用 Set-Cookie 的响应头部来配置 cookie 信息。一条cookie 包括了5个属性值 expires、domain、path、secure、HttpOnly。其中 expires 指定了 cookie 失效的时间，domain 是域名、path是路径，domain 和 path 一起限制了 cookie 能够被哪些 url 访问。secure 规定了 cookie 只能在确保安全的情况下传输，HttpOnly 规定了这个 cookie 只能被服务器访问，不能使用 js 脚本访问。</p>
      </el-collapse-item>
      <el-collapse-item title="3. Cookie、LocalStorage、SessionStorage区别">
        <p>浏览器端常用的存储技术是 cookie 、localStorage 和 sessionStorage。</p>
        <ul>
          <li>cookie 其实最开始是服务器端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服务器端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。</li>
          <li>sessionStorage 是 html5 提供的一种浏览器本地存储的方法，它借鉴了服务器端 session 的概念，代表的是一次会话中所保存的数据。它一般能够存储 5M 或者更大的数据，它在当前窗口关闭后就失效了，并且 sessionStorage 只能被同一个窗口的同源页面所访问共享。</li>
          <li>localStorage 也是 html5 提供的一种浏览器本地存储的方法，它一般也能够存储 5M 或者更大的数据。它和 sessionStorage 不同的是，除非手动删除它，否则它不会失效，并且 localStorage 也只能被同源页面所访问共享。</li>
        </ul>
        <p>上面几种方式都是存储少量数据的时候的存储方式，当我们需要在本地存储大量数据的时候，我们可以使用浏览器的 indexDB 这是浏览器提供的一种本地的数据库存储机制。它不是关系型数据库，它内部采用对象仓库的形式存储数据，它更接近 NoSQL 数据库。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
