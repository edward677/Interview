<template>
  <div class="crossDomain_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 什么是同源策略">
        <p>跨域问题其实就是浏览器的同源策略造成的。</p>
        <blockquote>
          <p>同源策略限制了从同一个源加载的文档或脚本如何与另一个源的资源进行交互。这是浏览器的一个用于隔离潜在恶意文件的重要的安全机制。同源指的是：<strong>协议</strong>、<strong>端口号</strong>、<strong>域名</strong>必须一致。</p>
        </blockquote>
        <p>下表给出了与 URL <code>[http://store.company.com/dir/page.html](http://store.company.com/dir/page.html)</code> 的源进行对比的示例:</p>
        <table><thead><tr><th>URL</th><th>是否跨域</th><th>原因</th></tr></thead><tbody><tr><td><a href="http://store.company.com/dir/page.html" target="_blank" rel="nofollow noopener noreferrer">store.company.com/dir/page.ht…</a></td><td>同源</td><td>完全相同</td></tr><tr><td><a href="http://store.company.com/dir/inner/another.html" target="_blank" rel="nofollow noopener noreferrer">store.company.com/dir/inner/a…</a></td><td>同源</td><td>只有路径不同</td></tr><tr><td><a href="https://store.company.com/secure.html" target="_blank" rel="nofollow noopener noreferrer">store.company.com/secure.html</a></td><td>跨域</td><td>协议不同</td></tr><tr><td><a href="http://store.company.com:81/dir/etc.html" target="_blank" rel="nofollow noopener noreferrer">store.company.com:81/dir/etc.htm…</a></td><td>跨域</td><td>端口不同 ( http:// 默认端口是80)</td></tr><tr><td><a href="http://news.company.com/dir/other.html" target="_blank" rel="nofollow noopener noreferrer">news.company.com/dir/other.h…</a></td><td>跨域</td><td>主机不同</td></tr></tbody></table>
        <p><strong>同源策略：protocol（协议）、domain（域名）、port（端口）三者必须一致。</strong>
          **
          <strong>同源政策主要限制了三个方面：</strong></p>
        <ul>
          <li>当前域下的 js 脚本不能够访问其他域下的 cookie、localStorage 和 indexDB。</li>
          <li>当前域下的 js 脚本不能够操作访问操作其他域下的 DOM。</li>
          <li>当前域下 ajax 无法发送跨域请求。</li>
        </ul>
        <p>同源政策的目的主要是为了保证用户的信息安全，它只是对 js 脚本的一种限制，并不是对浏览器的限制，对于一般的 img、或者script 脚本请求都不会有跨域的限制，这是因为这些操作都不会通过响应结果来进行可能出现安全问题的操作。</p>
      </el-collapse-item>
      <el-collapse-item title="2. 如何解决跨越问题">
        <h4 data-id="heading-46">（1）CORS</h4>
        <p>下面是MDN对于CORS的定义：</p>
        <blockquote>
          <p>跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 &nbsp;让运行在一个 origin (domain)上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域HTTP 请求。</p>
        </blockquote>
        <p>CORS需要浏览器和服务器同时支持，整个CORS过程都是浏览器完成的，无需用户参与。因此实现<strong>CORS的关键就是服务器，只要服务器实现了CORS请求</strong>，就可以跨源通信了。</p>
        <p>浏览器将CORS分为<strong>简单请求</strong>和<strong>非简单请求</strong>：</p>
        <p>简单请求不会触发CORS预检请求。若该请求满足以下两个条件，就可以看作是简单请求：
          <strong>1）请求方法是以下三种方法之一：</strong></p>
        <ul>
          <li>HEAD</li>
          <li>GET</li>
          <li>POST</li>
        </ul>
        <p><strong>2）HTTP的头信息不超出以下几种字段：</strong></p>
        <ul>
          <li>Accept</li>
          <li>Accept-Language</li>
          <li>Content-Language</li>
          <li>Last-Event-ID</li>
          <li>Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain</li>
        </ul>
        <p>若不满足以上条件，就属于非简单请求了。</p>
        <p><strong>（1）简单请求过程：</strong>
          对于简单请求，浏览器会直接发出CORS请求，它会在请求的头信息中增加一个Orign字段，该字段用来说明本次请求来自哪个源（协议+端口+域名），服务器会根据这个值来决定是否同意这次请求。如果Orign指定的域名在许可范围之内，服务器返回的响应就会多出以下信息头：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">Access-Control-Allow-Origin: http:<span class="hljs-comment">//api.bob.com  // 和Orign一直</span>
Access-Control-Allow-Credentials: <span class="hljs-literal">true</span>   <span class="hljs-comment">// 表示是否允许发送Cookie</span>
Access-Control-Expose-Headers: FooBar   <span class="hljs-comment">// 指定返回其他字段的值</span>
Content-Type: text/html; charset=utf-<span class="hljs-number">8</span>   <span class="hljs-comment">// 表示文档类型</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>如果Orign指定的域名不在许可范围之内，服务器会返回一个正常的HTTP回应，浏览器发现没有上面的Access-Control-Allow-Origin头部信息，就知道出错了。这个错误无法通过状态码识别，因为返回的状态码可能是200。</p>
        <p><strong>在简单请求中，在服务器内，至少需要设置字段：<code>Access-Control-Allow-Origin</code></strong></p>
        <p><strong>（2）非简单请求过程</strong>
          非简单请求是对服务器有特殊要求的请求，比如请求方法为DELETE或者PUT等。非简单请求的CORS请求会在正式通信之前进行一次HTTP查询请求，<strong>称为预检请求</strong>。</p>
        <p>浏览器会询问服务器，当前所在的网页是否在服务器允许访问的范围内，以及可以使用哪些HTTP请求方式和头信息字段，只有得到肯定的回复，才会进行正式的HTTP请求，否则就会报错。</p>
        <p>预检请求使用的<strong>请求方法是OPTIONS</strong>，表示这个请求是来询问的。他的头信息中的关键字段是Orign，表示请求来自哪个源。除此之外，头信息中还包括两个字段：</p>
        <ul>
          <li><strong>Access-Control-Request-Method</strong>：该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法。</li>
          <li><strong>Access-Control-Request-Headers</strong>： 该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段。</li>
        </ul>
        <p>服务器在收到浏览器的预检请求之后，会根据头信息的三个字段来进行判断，如果返回的头信息在中有Access-Control-Allow-Origin这个字段就是允许跨域请求，如果没有，就是不同意这个预检请求，就会报错。</p>
        <p>服务器回应的CORS的字段如下：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">Access-Control-Allow-Origin: http:<span class="hljs-comment">//api.bob.com  // 允许跨域的源地址</span>
Access-Control-Allow-Methods: GET, POST, PUT <span class="hljs-comment">// 服务器支持的所有跨域请求的方法</span>
Access-Control-Allow-Headers: X-Custom-Header  <span class="hljs-comment">// 服务器支持的所有头信息字段</span>
Access-Control-Allow-Credentials: <span class="hljs-literal">true</span>   <span class="hljs-comment">// 表示是否允许发送Cookie</span>
Access-Control-Max-Age: <span class="hljs-number">1728000</span>  <span class="hljs-comment">// 用来指定本次预检请求的有效期，单位为秒</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>只要服务器通过了预检请求，在以后每次的CORS请求都会自带一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。</p>
        <p><strong>在非简单请求中，至少需要设置以下字段：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-string">'Access-Control-Allow-Origin'</span>
<span class="hljs-string">'Access-Control-Allow-Methods'</span>
<span class="hljs-string">'Access-Control-Allow-Headers'</span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <h5 data-id="heading-47"></h5>
        <h5 data-id="heading-48">减少OPTIONS请求次数：</h5>
        <p>OPTIONS请求次数过多就会损耗页面加载的性能，降低用户体验度。</p>
        <p>所以尽量要减少OPTIONS请求次数，可以后端在请求的返回头部添加：Access-Control-Max-Age：number。它表示预检请求的返回结果可以被缓存多久，单位是秒。</p>
        <p>该字段只对完全一样的URL的缓存设置生效，所以设置了缓存时间，在这个时间范围内，再次发送请求就不需要进行预检请求了。</p>
        <h5 data-id="heading-50">CORS中Cookie相关问题：</h5>
        <p>在CORS请求中，如果想要传递Cookie，就要满足以下三个条件：</p>
        <ul>
          <li><strong>在请求中设置 <code>withCredentials</code></strong></li>
        </ul>
        <p>默认情况下在跨域请求，浏览器是不带 cookie 的。但是我们可以通过设置 withCredentials 来进行传递 cookie.</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 原生 xml 的设置方式</span>
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.withCredentials = <span class="hljs-literal">true</span>;
<span class="hljs-comment">// axios 设置方式</span>
axios.defaults.withCredentials = <span class="hljs-literal">true</span>;
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li><strong>Access-Control-Allow-Credentials 设置为 true</strong></li>
          <li><strong>Access-Control-Allow-Origin 设置为为非 <code>*</code></strong></li>
        </ul>
        <h4 data-id="heading-51">（2）JSONP</h4>
        <p><strong>jsonp</strong>的原理就是利用<code>&lt;script&gt;</code>标签没有跨域限制，通过<code>&lt;script&gt;</code>标签src属性，发送带有callback参数的GET请求，服务端将接口返回数据拼凑到callback函数中，返回给浏览器，浏览器解析执行，从而前端拿到callback函数返回的数据。</p>
        <p>1）原生JS实现：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;script&gt;
    <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    script.type = <span class="hljs-string">'text/javascript'</span>;
    <span class="hljs-comment">// 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数</span>
    script.src = <span class="hljs-string">'http://www.domain2.com:8080/login?user=admin&amp;callback=handleCallback'</span>;
    <span class="hljs-built_in">document</span>.head.appendChild(script);
    <span class="hljs-comment">// 回调执行函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleCallback</span>(<span class="hljs-params">res</span>) </span>{
        alert(<span class="hljs-built_in">JSON</span>.stringify(res));
    }
 &lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>服务端返回如下（返回时即执行全局函数）：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">handleCallback({<span class="hljs-string">"success"</span>: <span class="hljs-literal">true</span>, <span class="hljs-string">"user"</span>: <span class="hljs-string">"admin"</span>})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）Vue axios实现：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">this</span>.$http = axios;
<span class="hljs-built_in">this</span>.$http.jsonp(<span class="hljs-string">'http://www.domain2.com:8080/login'</span>, {
    <span class="hljs-attr">params</span>: {},
    <span class="hljs-attr">jsonp</span>: <span class="hljs-string">'handleCallback'</span>
}).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);
})
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>后端node.js代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> querystring = <span class="hljs-built_in">require</span>(<span class="hljs-string">'querystring'</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> server = http.createServer();
server.on(<span class="hljs-string">'request'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">var</span> params = querystring.parse(req.url.split(<span class="hljs-string">'?'</span>)[<span class="hljs-number">1</span>]);
    <span class="hljs-keyword">var</span> fn = params.callback;
    <span class="hljs-comment">// jsonp返回设置</span>
    res.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'text/javascript'</span> });
    res.write(fn + <span class="hljs-string">'('</span> + <span class="hljs-built_in">JSON</span>.stringify(params) + <span class="hljs-string">')'</span>);
    res.end();
});
server.listen(<span class="hljs-string">'8080'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server is running at port 8080...'</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>JSONP的缺点：</strong></p>
        <ul>
          <li>具有局限性， 仅支持get方法</li>
          <li>不安全，可能会遭受XSS攻击</li>
        </ul>
        <h4 data-id="heading-52">（3）postMessage 跨域</h4>
        <p>postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：</p>
        <ul>
          <li>页面和其打开的新窗口的数据传递</li>
          <li>多窗口之间消息传递</li>
          <li>页面与嵌套的iframe消息传递</li>
          <li>上面三个场景的跨域数据传递</li>
        </ul>
        <p>用法：postMessage(data,origin)方法接受两个参数：</p>
        <ul>
          <li><strong>data</strong>： html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。</li>
          <li><strong>origin</strong>： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。</li>
        </ul>
        <p>1）a.html：(domain1.com/a.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;iframe id=<span class="hljs-string">"iframe"</span> src=<span class="hljs-string">"http://www.domain2.com/b.html"</span> style=<span class="hljs-string">"display:none;"</span>&gt;&lt;/iframe&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'iframe'</span>);
    iframe.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> data = {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'aym'</span>
        };
        <span class="hljs-comment">// 向domain2传送跨域数据</span>
        iframe.contentWindow.postMessage(<span class="hljs-built_in">JSON</span>.stringify(data), <span class="hljs-string">'http://www.domain2.com'</span>);
    };
    <span class="hljs-comment">// 接受domain2返回数据</span>
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        alert(<span class="hljs-string">'data from domain2 ---&gt; '</span> + e.data);
    }, <span class="hljs-literal">false</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）b.html：(domain2.com/b.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;script&gt;
    <span class="hljs-comment">// 接收domain1的数据</span>
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        alert(<span class="hljs-string">'data from domain1 ---&gt; '</span> + e.data);
        <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(e.data);
        <span class="hljs-keyword">if</span> (data) {
            data.number = <span class="hljs-number">16</span>;
            <span class="hljs-comment">// 处理后再发回domain1</span>
            <span class="hljs-built_in">window</span>.parent.postMessage(<span class="hljs-built_in">JSON</span>.stringify(data), <span class="hljs-string">'http://www.domain1.com'</span>);
        }
    }, <span class="hljs-literal">false</span>);
&lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-53">（4）nginx代理跨域</h4>
        <p>nginx代理跨域，实质和CORS跨域原理一样，通过配置文件设置请求响应头Access-Control-Allow-Origin…等字段。</p>
        <p>1）nginx配置解决iconfont跨域
          浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。</p>
        <pre><code class="hljs language-http copyable" lang="http">location / {
  add_header Access-Control-Allow-Origin *;
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）nginx反向代理接口跨域
          跨域问题：同源策略仅是针对浏览器的安全策略。服务器端调用HTTP接口只是使用HTTP协议，不需要同源策略，也就不存在跨域问题。
          实现思路：通过Nginx配置一个代理服务器域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域访问。</p>
        <p>nginx具体配置：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">#proxy服务器
server {
    listen       <span class="hljs-number">81</span>;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http:<span class="hljs-comment">//www.domain2.com:8080;  #反向代理</span>
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;
        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http:<span class="hljs-comment">//www.domain1.com;  #当前端只跨域不带cookie时，可为*</span>
        add_header Access-Control-Allow-Credentials <span class="hljs-literal">true</span>;
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-54">（5）nodejs 中间件代理跨域</h4>
        <p>node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。
          <strong>1）非vue框架的跨域</strong>
          使用node + express + http-proxy-middleware搭建一个proxy服务器。</p>
        <ul>
          <li>前端代码：</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
<span class="hljs-comment">// 前端开关：浏览器是否读写cookie</span>
xhr.withCredentials = <span class="hljs-literal">true</span>;
<span class="hljs-comment">// 访问http-proxy-middleware代理服务器</span>
xhr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">'http://www.domain1.com:3000/login?user=admin'</span>, <span class="hljs-literal">true</span>);
xhr.send();
<span class="copy-code-btn">复制代码</span></code></pre>
        <ul>
          <li>中间件服务器代码：</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> proxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);
<span class="hljs-keyword">var</span> app = express();
app.use(<span class="hljs-string">'/'</span>, proxy({
    <span class="hljs-comment">// 代理跨域目标接口</span>
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://www.domain2.com:8080'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 修改响应头信息，实现跨域并允许带cookie</span>
    <span class="hljs-attr">onProxyRes</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">proxyRes, req, res</span>) </span>{
        res.header(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'http://www.domain1.com'</span>);
        res.header(<span class="hljs-string">'Access-Control-Allow-Credentials'</span>, <span class="hljs-string">'true'</span>);
    },
    <span class="hljs-comment">// 修改响应信息中的cookie域名</span>
    <span class="hljs-attr">cookieDomainRewrite</span>: <span class="hljs-string">'www.domain1.com'</span>  <span class="hljs-comment">// 可以为false，表示不修改</span>
}));
app.listen(<span class="hljs-number">3000</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Proxy server is listen at port 3000...'</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>2）vue框架的跨域</strong></p>
        <p>node + vue + webpack + webpack-dev-server搭建的项目，跨域请求接口，直接修改webpack.config.js配置。开发环境下，vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面与代理接口之间不再跨域。</p>
        <p>webpack.config.js部分配置：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {},
    <span class="hljs-attr">module</span>: {},
    ...
    <span class="hljs-attr">devServer</span>: {
        <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">proxy</span>: [{
            <span class="hljs-attr">context</span>: <span class="hljs-string">'/login'</span>,
            <span class="hljs-attr">target</span>: <span class="hljs-string">'http://www.domain2.com:8080'</span>,  <span class="hljs-comment">// 代理跨域目标接口</span>
            <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">secure</span>: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 当代理某些https服务报错时用</span>
            <span class="hljs-attr">cookieDomainRewrite</span>: <span class="hljs-string">'www.domain1.com'</span>  <span class="hljs-comment">// 可以为false，表示不修改</span>
        }],
        <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>
    }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-55">（6）document.domain + iframe跨域</h4>
        <p>此方案仅限主域相同，子域不同的跨域应用场景。实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
          1）父窗口：(domain.com/a.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;iframe id=<span class="hljs-string">"iframe"</span> src=<span class="hljs-string">"http://child.domain.com/b.html"</span>&gt;&lt;/iframe&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.domain = <span class="hljs-string">'domain.com'</span>;
    <span class="hljs-keyword">var</span> user = <span class="hljs-string">'admin'</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>1）子窗口：(child.domain.com/a.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;script&gt;
    <span class="hljs-built_in">document</span>.domain = <span class="hljs-string">'domain.com'</span>;
    <span class="hljs-comment">// 获取父窗口中变量</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'get js data from parent ---&gt; '</span> + <span class="hljs-built_in">window</span>.parent.user);
&lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-56">（7）location.hash + iframe跨域</h4>
        <p>实现原理：a欲与b跨域相互通信，通过中间页c来实现。 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。</p>
        <p>具体实现：A域：a.html -&gt; B域：b.html -&gt; A域：c.html，a与b不同域只能通过hash值单向通信，b与c也不同域也只能单向通信，但c与a同域，所以c可通过parent.parent访问a页面所有对象。</p>
        <p>1）a.html：(domain1.com/a.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;iframe id=<span class="hljs-string">"iframe"</span> src=<span class="hljs-string">"http://www.domain2.com/b.html"</span> style=<span class="hljs-string">"display:none;"</span>&gt;&lt;/iframe&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'iframe'</span>);
    <span class="hljs-comment">// 向b.html传hash值</span>
    <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        iframe.src = iframe.src + <span class="hljs-string">'#user=admin'</span>;
    }, <span class="hljs-number">1000</span>);

    <span class="hljs-comment">// 开放给同域c.html的回调方法</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onCallback</span>(<span class="hljs-params">res</span>) </span>{
        alert(<span class="hljs-string">'data from c.html ---&gt; '</span> + res);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）b.html：(.domain2.com/b.html)</p>
        <pre><code class="copyable">&lt;iframe id="iframe" src="http://www.domain1.com/c.html" style="display:none;"&gt;&lt;/iframe&gt;
&lt;script&gt;
    var iframe = document.getElementById('iframe');
    // 监听a.html传来的hash值，再传给c.html
    window.onhashchange = function () {
        iframe.src = iframe.src + location.hash;
    };
&lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>3）c.html：(<a href="https://link.zhihu.com/?target=http%3A//www.domain1.com/c.html" target="_blank" rel="nofollow noopener noreferrer">www.domain1.com/c.html</a>)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;script&gt;
    <span class="hljs-comment">// 监听b.html传来的hash值</span>
    <span class="hljs-built_in">window</span>.onhashchange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 再通过操作同域a.html的js回调，将结果传回</span>
        <span class="hljs-built_in">window</span>.parent.parent.onCallback(<span class="hljs-string">'hello: '</span> + location.hash.replace(<span class="hljs-string">'#user='</span>, <span class="hljs-string">''</span>));
    };
&lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <h4 data-id="heading-57">（8）window.name + iframe跨域</h4>
        <p>window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。</p>
        <p>1）a.html：(domain1.com/a.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> proxy = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url, callback</span>) </span>{
    <span class="hljs-keyword">var</span> state = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
    <span class="hljs-comment">// 加载跨域页面</span>
    iframe.src = url;
    <span class="hljs-comment">// onload事件会触发2次，第1次加载跨域页，并留存数据于window.name</span>
    iframe.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (state === <span class="hljs-number">1</span>) {
            <span class="hljs-comment">// 第2次onload(同域proxy页)成功后，读取同域window.name中数据</span>
            callback(iframe.contentWindow.name);
            destoryFrame();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (state === <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// 第1次onload(跨域页)成功后，切换到同域代理页面</span>
            iframe.contentWindow.location = <span class="hljs-string">'http://www.domain1.com/proxy.html'</span>;
            state = <span class="hljs-number">1</span>;
        }
    };
    <span class="hljs-built_in">document</span>.body.appendChild(iframe);
    <span class="hljs-comment">// 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">destoryFrame</span>(<span class="hljs-params"></span>) </span>{
        iframe.contentWindow.document.write(<span class="hljs-string">''</span>);
        iframe.contentWindow.close();
        <span class="hljs-built_in">document</span>.body.removeChild(iframe);
    }
};
<span class="hljs-comment">// 请求跨域b页面数据</span>
proxy(<span class="hljs-string">'http://www.domain2.com/b.html'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    alert(data);
});
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）proxy.html：(domain1.com/proxy.html)</p>
        <p>中间代理页，与a.html同域，内容为空即可。
          3）b.html：(domain2.com/b.html)</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;script&gt;
    <span class="hljs-built_in">window</span>.name = <span class="hljs-string">'This is domain2 data!'</span>;
&lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。</p>
        <h4 data-id="heading-58">（9）WebSocket协议跨域</h4>
        <p>WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。</p>
        <p>原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。</p>
        <p>1）前端代码：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;div&gt;user input：&lt;input type=<span class="hljs-string">"text"</span>&gt;&lt;/div&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> socket = io(<span class="hljs-string">'http://www.domain2.com:8080'</span>);
<span class="hljs-comment">// 连接成功处理</span>
socket.on(<span class="hljs-string">'connect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 监听服务端消息</span>
    socket.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data from server: ---&gt; '</span> + msg);
    });
    <span class="hljs-comment">// 监听服务端关闭</span>
    socket.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server socket has closed.'</span>);
    });
});
<span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'input'</span>)[<span class="hljs-number">0</span>].onblur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    socket.send(<span class="hljs-built_in">this</span>.value);
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>2）Nodejs socket后台：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> socket = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>);
<span class="hljs-comment">// 启http服务</span>
<span class="hljs-keyword">var</span> server = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>, {
        <span class="hljs-string">'Content-type'</span>: <span class="hljs-string">'text/html'</span>
    });
    res.end();
});
server.listen(<span class="hljs-string">'8080'</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Server is running at port 8080...'</span>);
<span class="hljs-comment">// 监听socket连接</span>
socket.listen(server).on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">client</span>) </span>{
    <span class="hljs-comment">// 接收信息</span>
    client.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>) </span>{
        client.send(<span class="hljs-string">'hello：'</span> + msg);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data from client: ---&gt; '</span> + msg);
    });
    <span class="hljs-comment">// 断开处理</span>
    client.on(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Client socket has closed.'</span>);
    });
});
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="3. 正向代理和反向代理的区别">
        <ul>
          <li><strong>正向代理：</strong></li>
          <p>客户端想获得一个服务器的数据，但是因为种种原因无法直接获取。于是客户端设置了一个代理服务器，并且指定目标服务器，之后代理服务器向目标服务器转交请求并将获得的内容发送给客户端。这样本质上起到了对真实服务器隐藏真实客户端的目的。实现正向代理需要修改客户端，比如修改浏览器配置。</p>
        </ul>
        <ul>
          <li>
            <strong>反向代理：</strong>
            <p>客户端想获得一个服务器的数据，但是因为种种原因无法直接获取。于是客户端设置了一个代理服务器，并且指定目标服务器，之后代理服务器向目标服务器转交请求并将获得的内容发送给客户端。这样本质上起到了对真实服务器隐藏真实客户端的目的。实现正向代理需要修改客户端，比如修改浏览器配置。</p></li>
        </ul>
        <p>服务器为了能够将工作负载分不到多个服务器来提高网站性能 (负载均衡)等目的，当其受到请求后，会首先根据转发规则来确定请求应该被转发到哪个服务器上，然后将请求转发到对应的真实服务器上。这样本质上起到了对客户端隐藏真实服务器的作用。
          一般使用反向代理后，需要通过修改 DNS 让域名解析到代理服务器 IP，这时浏览器无法察觉到真正服务器的存在，当然也就不需要修改配置了。</p>
        <p>两者区别如图示：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bf7e11c793d4f35b5852d692ac7c3a2~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image">
          正向代理和反向代理的结构是一样的，都是 client-proxy-server 的结构，它们主要的区别就在于中间这个 proxy 是哪一方设置的。在正向代理中，proxy 是 client 设置的，用来隐藏 client；而在反向代理中，proxy 是 server 设置的，用来隐藏 server。</p>
      </el-collapse-item>
      <el-collapse-item title="4. Nginx的概念及其工作原理">
        <p>Nginx 是一款轻量级的 Web 服务器，也可以用于反向代理、负载平衡和 HTTP 缓存等。Nginx 使用异步事件驱动的方法来处理请求，是一款面向性能设计的 HTTP 服务器。</p>
        <p>传统的 Web 服务器如 Apache 是 process-based 模型的，而 Nginx 是基于event-driven模型的。正是这个主要的区别带给了 Nginx 在性能上的优势。</p>
        <p>Nginx 架构的最顶层是一个 master process，这个 master process 用于产生其他的 worker process，这一点和Apache 非常像，但是 Nginx 的 worker process 可以同时处理大量的HTTP请求，而每个 Apache process 只能处理一个。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
