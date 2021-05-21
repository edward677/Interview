<template>
  <div class="http_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. GET和POST的请求的区别">
        <p>Post 和 Get 是 HTTP 请求的两种方法。</p>
        <ul>
          <li>应用场景：GET 请求是一个幂等的请求，一般 Get 请求用于对服务器资源不会产生影响的场景，比如说请求一个网页。而 Post 不是一个幂等的请求，一般用于对服务器资源会产生影响的情景。比如注册用户这一类的操作。</li>
          <li>是否缓存：因为不同的应用场景，所以浏览器一般会对 Get 请求缓存，但很少对 Post 请求缓存。</li>
          <li>发送的报文格式：Get 请求的报文中实体部分为空，Post 请求的报文中实体部分一般为向服务器发送的数据。</li>
          <li>安全性：Get 请求可以将请求的参数放入 url 中向服务器发送，这样的做法相对于 Post 请求来说，一个方面是不太安全，因为请求的 url 会被保留在历史记录中。</li>
          <li>请求长度：浏览器由于对 url 有一个长度上的限制，所以会影响 get 请求发送数据时的长度。这个限制是浏览器规定的，并不是 RFC 规定的。</li>
          <li>参数类型：post 的参数传递支持更多的数据类型。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. POST和PUT请求的区别">
        <ul>
          <li>PUT请求是向服务器端发送数据的，从而修改数据的内容，但是不会增加数据的种类等，也就是说无论进行多少次PUT操作，其结果并没有不同。（可以理解为时<strong>更新数据</strong>）</li>
          <li>POST请求是向服务器端发送数据的，该请求会改变数据的种类等资源，它会创建新的内容。（可以理解为是<strong>创建数据</strong>）
            <a name="user-content-nyi9M"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="3. 常见的HTTP请求头和响应头">
        <p><strong>HTTP Request Header 常见的请求头：</strong></p>
        <ul>
          <li>Accept:浏览器能够处理的内容类型</li>
          <li>Accept-Charset:浏览器能够显示的字符集</li>
          <li>Accept-Encoding：浏览器能够处理的压缩编码</li>
          <li>Accept-Language：浏览器当前设置的语言</li>
          <li>Connection：浏览器与服务器之间连接的类型</li>
          <li>Cookie：当前页面设置的任何Cookie</li>
          <li>Host：发出请求的页面所在的域</li>
          <li>Referer：发出请求的页面的URL</li>
          <li>User-Agent：浏览器的用户代理字符串</li>
        </ul>
        <p><strong>HTTP Responses Header 常见的响应头：</strong></p>
        <ul>
          <li>Date：表示消息发送的时间，时间的描述格式由rfc822定义</li>
          <li>server:服务器名字</li>
          <li>Connection：浏览器与服务器之间连接的类型</li>
          <li>Cache-Control：控制HTTP缓存</li>
          <li>content-type:表示后面的文档属于什么MIME类型</li>
        </ul>
        <p>常见的 Content-Type 属性值有以下四种：</p>
        <p>（1）application/x-www-form-urlencoded：浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。该种方式提交的数据放在 body 里面，数据按照 key1=val1&amp;key2=val2 的方式进行编码，key 和 val 都进行了 URL转码。</p>
        <p>（2）multipart/form-data：该种方式也是一个常见的 POST 提交方式，通常表单上传文件时使用该种方式。</p>
        <p>（3）application/json：告诉服务器消息主体是序列化后的 JSON 字符串。</p>
        <p>（4）text/xml：该种方式主要用来提交 XML 格式的数据。
          <a name="user-content-d0m5A"></a></p>
      </el-collapse-item>
      <el-collapse-item title="4. HTTP状态码304是多好还是少好">
        <p>服务器为了提高网站访问速度，对之前访问的部分页面制定缓存机制，当客户端在此对这些页面进行请求，服务器会根据缓存内容判断页面与之前是否相同，若相同便直接返回304，此时客户端调用缓存内容，不必进行二次下载。</p>
        <p>状态码304不应该认为是一种错误，而是对客户端<strong>有缓存情况下</strong>服务端的一种响应。</p>
        <p>搜索引擎蜘蛛会更加青睐内容源更新频繁的网站。通过特定时间内对网站抓取返回的状态码来调节对该网站的抓取频次。若网站在一定时间内一直处于304的状态，那么蜘蛛可能会降低对网站的抓取次数。相反，若网站变化的频率非常之快，每次抓取都能获取新内容，那么日积月累，的回访率也会提高。</p>
        <p><strong>产生较多304状态码的原因：</strong></p>
        <ul>
          <li>页面更新周期长或不更新</li>
          <li>纯静态页面或强制生成静态html</li>
        </ul>
        <p><strong>304状态码出现过多会造成以下问题：</strong></p>
        <ul>
          <li>网站快照停止</li>
          <li>收录减少</li>
          <li>权重下降
            <a name="user-content-IXubc"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="5. 常见的HTTP请求方法">
        <ul>
          <li>GET: 向服务器获取数据</li>
          <li>POST：将实体提交到指定的资源，通常会造成服务器资源的修改。</li>
          <li>PUT：上传文件，修改数据</li>
          <li>DELETE：删除服务器上的对象</li>
          <li>HEAD：获取报文首部，与GET相比，不返回报文主体部分</li>
          <li>OPTIONS：询问支持的请求方法，用来跨域请求</li>
          <li>TRACE：追踪 请求—响应 的传输路径</li>
          <li>CONNECT：要求在与代理服务器通信时建立隧道，使用隧道进行TCP通信
            <a name="user-content-ee6af112"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="6. options请求方法及使用场景">
        <p>OPTIONS是除了GET和POST之外的其中一种 HTTP请求方法。</p>
        <p>OPTIONS方法是用于请求获得由<code>Request-URI</code>标识的资源在请求/响应的通信过程中可以使用的功能选项。通过这个方法，客户端可以<strong>在采取具体资源请求之前，决定对该资源采取何种必要措施，或者了解服务器的性能</strong>。该请求方法的响应不能缓存。</p>
        <p>OPTIONS请求方法的<strong>主要用途</strong>有两个：</p>
        <ul>
          <li>获取服务器支持的所有HTTP请求方法；</li>
          <li>用来检查访问权限。例如：JS 的 XMLHttpRequest对象进行 CORS 跨域资源共享时，对于复杂请求，就是使用 OPTIONS 方法发送嗅探请求，以判断是否有对指定资源的访问权限。
            <a name="user-content-7sO8z"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="7. HTTP 1.0和 HTTP 1.1 之间有哪些区别？">
        <p><strong>HTTP 1.0和 HTTP 1.1 有以下区别</strong>：</p>
        <ul>
          <li><strong>连接方面</strong> 的区别，http1.1 默认使用持久连接，而 http1.0 默认使用非持久连接。http1.1 通过使用持久连接来使多个 http 请求复用同一个 TCP 连接，以此来避免使用非持久连接时每次需要建立连接的时延。</li>
          <li><strong>资源请求方面</strong> 的区别，在 http1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，http1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。</li>
          <li><strong>缓存方面</strong> 的区别，在 http1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，http1.1 则引入了更多的缓存控制策略例如 Etag、If-Unmodified-Since、If-Match、If-None-Match 等更多可供选择的缓存头来控制缓存策略。</li>
          <li>http1.1 中还<strong>新增了 host 字段</strong>，用来指定服务器的域名。http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，就可以将请求发往同一台服务器上的不同网站。</li>
          <li>http1.1 相对于 http1.0 还新增了很多<strong>请求方法</strong>，如 PUT、HEAD、OPTIONS 等。
            <a name="user-content-jcbmp"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="8. HTTP 1.1和 HTTP 2.0 的区别">
        <ul>
          <li><strong>二进制协议</strong>：HTTP/2 是一个二进制协议。在 HTTP/1.1 版中，报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是 二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"，可以分为头信息帧和数据帧。 帧的概念是它实现多路复用的基础。</li>
          <li><strong>多路复用：</strong> HTTP/2 实现了多路复用，HTTP/2 仍然复用 TCP 连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回 应，而且不用按照顺序一一发送，这样就避免了"队头堵塞"的问题。</li>
          <li><strong>数据流：</strong> HTTP/2 使用了数据流的概念，因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的 请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流。每 个数据流都有一个独一无二的编号。数据包发送的时候，都必须标记数据流 ID ，用来区分它属于哪个数据流。</li>
          <li><strong>头信息压缩：</strong> HTTP/2 实现了头信息压缩，由于 HTTP 1.1 协议不带有状态，每次请求都必须附上所有信息。所以，请求的很多字段都是 重复的，比如 Cookie 和 User Agent ，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面， 客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引 号，这样就能提高速度了。</li>
          <li><strong>服务器推送：</strong> HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。使用服务器推送，提前给客户端推送必要的资源 ，这样就可以相对减少一些延迟时间。这里需要注意的是 http2 下服务器主动推送的是静态资源，和 WebSocket 以及使用 SSE 等方式向客户端发送即时数据的推送是不同的。
            <a name="user-content-xII1u"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="9. HTTP和HTTPS协议的区别">
        <p>HTTP和HTTPS协议的主要区别如下：</p>
        <ul>
          <li>HTTPS协议需要CA证书，费用较高；HTTP协议不需要</li>
          <li>HTTP协议是超文本传输协议，信息是明文传输的，HTTPS则是具有安全性的SSL加密传输协议</li>
          <li>使用不同的连接方式，端口也不同，HTTP协议端口是80，HTTPS的协议端口是443</li>
          <li>HTTP协议连接很简单，是无状态的；HTTPS协议是有SSL和HTTP协议构建的可进行加密传输、身份认证的网络协议，比HTTP更加安全
            <a name="user-content-B4zy9"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="10. GET方法URL长度限制的原因">
        <p>实际上HTTP协议规范并没有对get方法请求的url长度进行限制，这个限制是特定的浏览器及服务器对它的限制。
          IE对URL长度的限制是2083字节(2K+35)。由于IE浏览器对URL长度的允许值是最小的，所以开发过程中，只要URL不超过2083字节，那么在所有浏览器中工作都不会有问题。</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">GET的长度值 = URL（<span class="hljs-number">2083</span>）- （你的Domain+Path）-<span class="hljs-number">2</span>（<span class="hljs-number">2</span>是get请求中?=两个字符的长度）
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>下面看一下主流浏览器对get方法中url的长度限制范围：</p>
        <ul>
          <li>Microsoft Internet Explorer (Browser)：IE浏览器对URL的最大限制为2083个字符，如果超过这个数字，提交按钮没有任何反应。</li>
          <li>Firefox (Browser)：对于Firefox浏览器URL的长度限制为65,536个字符。</li>
          <li>Safari (Browser)：URL最大长度限制为 80,000个字符。</li>
          <li>Opera (Browser)：URL最大长度限制为190,000个字符。</li>
          <li>Google (chrome)：URL最大长度限制为8182个字符。</li>
        </ul>
        <p>再来看一下主流的服务器对get方法中url的长度限制范围：</p>
        <ul>
          <li>Apache (Server)：能接受最大url长度为8,192个字符。</li>
          <li>Microsoft Internet Information Server(IIS)：能接受最大url的长度为16,384个字符。</li>
        </ul>
        <p>根据上面的数据，我们可以知道，get方法中的URL长度最长不超过2083个字符，这样所有的浏览器和服务器都可能正常工作。
          <a name="user-content-6da1820b"></a></p>
      </el-collapse-item>
      <el-collapse-item title="11. 当你在浏览器中输入 Google.com 并且按下回车之后发生了什么？">
        <p>（1）首先会对 URL 进行解析，分析所需要使用的传输协议和请求的资源的路径。如果输入的 URL 中的协议或者主机名不合法，将会把地址栏中输入的内容传递给搜索引擎。如果没有问题，浏览器会检查 URL 中是否出现了非法字符，如果存在非法字符，则对非法字符进行转义后再进行下一过程。</p>
        <p>（2）浏览器会判断所请求的资源是否在缓存里，如果请求的资源在缓存里并且没有失效，那么就直接使用，否则向服务器发起新的请求。</p>
        <p>（3）下一步我们首先需要获取的是输入的 URL 中的域名的 IP 地址，首先会判断本地是否有该域名的 IP 地址的缓存，如果有则使用，如果没有则向本地 DNS 服务器发起请求。本地 DNS 服务器也会先检查是否存在缓存，如果没有就会先向根域名服务器发起请求，获得负责的顶级域名服务器的地址后，再向顶级域名服务器请求，然后获得负责的权威域名服务器的地址后，再向权威域名服务器发起请求，最终获得域名的 IP 地址后，本地 DNS 服务器再将这个 IP 地址返回给请求的用户。用户向本地 DNS 服务器发起请求属于递归请求，本地 DNS 服务器向各级域名服务器发起请求属于迭代请求。</p>
        <p>（4）当浏览器得到 IP 地址后，数据传输还需要知道目的主机 MAC 地址，因为应用层下发数据给传输层，TCP 协议会指定源端口号和目的端口号，然后下发给网络层。网络层会将本机地址作为源地址，获取的 IP 地址作为目的地址。然后将下发给数据链路层，数据链路层的发送需要加入通信双方的 MAC 地址，我们本机的 MAC 地址作为源 MAC 地址，目的 MAC 地址需要分情况处理，通过将 IP 地址与我们本机的子网掩码相与，我们可以判断我们是否与请求主机在同一个子网里，如果在同一个子网里，我们可以使用 APR 协议获取到目的主机的 MAC 地址，如果我们不在一个子网里，那么我们的请求应该转发给我们的网关，由它代为转发，此时同样可以通过 ARP 协议来获取网关的 MAC 地址，此时目的主机的 MAC 地址应该为网关的地址。</p>
        <p>（5）下面是 TCP 建立连接的三次握手的过程，首先客户端向服务器发送一个 SYN 连接请求报文段和一个随机序号，服务端接收到请求后向服务器端发送一个 SYN ACK报文段，确认连接请求，并且也向客户端发送一个随机序号。客户端接收服务器的确认应答后，进入连接建立的状态，同时向服务器也发送一个ACK 确认报文段，服务器端接收到确认后，也进入连接建立状态，此时双方的连接就建立起来了。</p>
        <p>（6）如果使用的是 HTTPS 协议，在通信前还存在 TLS 的一个四次握手的过程。首先由客户端向服务器端发送使用的协议的版本号、一个随机数和可以使用的加密方法。服务器端收到后，确认加密的方法，也向客户端发送一个随机数和自己的数字证书。客户端收到后，首先检查数字证书是否有效，如果有效，则再生成一个随机数，并使用证书中的公钥对随机数加密，然后发送给服务器端，并且还会提供一个前面所有内容的 hash 值供服务器端检验。服务器端接收后，使用自己的私钥对数据解密，同时向客户端发送一个前面所有内容的 hash 值供客户端检验。这个时候双方都有了三个随机数，按照之前所约定的加密方法，使用这三个随机数生成一把秘钥，以后双方通信前，就使用这个秘钥对数据进行加密后再传输。</p>
        <p>（7）当页面请求发送到服务器端后，服务器端会返回一个 html 文件作为响应，浏览器接收到响应后，开始对 html 文件进行解析，开始页面的渲染过程。</p>
        <p>（8）浏览器首先会根据 html 文件构建 DOM 树，根据解析到的 css 文件构建 CSSOM 树，如果遇到 script 标签，则判端是否含有 defer 或者 async 属性，要不然 script 的加载和执行会造成页面的渲染的阻塞。当 DOM 树和 CSSOM 树建立好后，根据它们来构建渲染树。渲染树构建好后，会根据渲染树来进行布局。布局完成后，最后使用浏览器的 UI 接口对页面进行绘制。这个时候整个页面就显示出来了。</p>
        <p>（9）最后一步是 TCP 断开连接的四次挥手过程。
          <a name="user-content-SKW8u"></a></p>
      </el-collapse-item>
      <el-collapse-item title="12. 对keep-alive的理解">
        <p>HTTP1.0 中默认是在一次每个请求/应答，客户端和服务器都要新建一个连接，完成之后立即断开连接，这就是<strong>短连接</strong>。当使用Keep-Alive模式时，Keep-Alive功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接，这就是<strong>长连接</strong>。</p>
        <ul>
          <li>HTTP1.0版本是默认没有Keep-alive的（也就是默认会发送keep-alive），所以要想连接得到保持，必须手动配置发送<code>connection:keep-alive</code>字段。若想断开keep-alive连接，需发送<code>Connection:close</code>字段</li>
          <li>HTTP1.1规定了默认保持长连接，数据传输完成了保持TCP连接不断开，等待在同域名下继续用这个通道传输数据。如果需要关闭，需要客户端发送Connection：close首部字段。</li>
        </ul>
        <p>Keep-Alive的<strong>建立过程</strong>：</p>
        <ul>
          <li>客户端向服务器在发送请求报文同时在首部添加发送Connection字段</li>
          <li>服务器收到请求并处理connection字段</li>
          <li>服务器回送Connection:Keep-Alive字段给客户端</li>
          <li>客户端接收到connection字段</li>
          <li>Keep-Alive连接建立成功</li>
        </ul>
        <p><strong>服务端自动断开过程（也就是没有keep-alive）</strong>：</p>
        <ul>
          <li>客户端向服务器只是发送内容报文（不包含Connection字段）</li>
          <li>服务器收到请求并处理</li>
          <li>服务器返回客户端请求的资源并关闭连接</li>
          <li>客户端接收资源，发现没有Connection字段，断开连接</li>
        </ul>
        <p><strong>客户端请求断开连接过程</strong>：</p>
        <ul>
          <li>客户端向服务器发送Connection:close字段</li>
          <li>服务器收到请求并处理connection字段</li>
          <li>服务器回送响应资源并断开连接</li>
          <li>客户端接收资源并断开连接</li>
        </ul>
        <p>开启Keep-Alive的<strong>优缺点</strong>：</p>
        <ul>
          <li>优点：Keep-Alive模式更加高效，因为避免了连接建立和释放的开销。</li>
          <li>缺点：长时间的Tcp连接容易导致系统资源无效占用，浪费系统资源。
            <a name="user-content-uduTN"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="13. 页面有多张图片，HTTP是怎样的加载表现，如何解决？">
        <ul>
          <li>在<code>HTTP 1</code>下，浏览器对一个域名下最大TCP连接数为6，所以会请求多次。可以用<strong>多域名部署</strong>解决。 这样可以提高同时请求的数目，加快页面图片的获取速度。</li>
          <li>在<code>HTTP 2</code>下，可以一瞬间加载出来所有的资源，因为，HTTP2支持多路复用，可以在一个TCP连接中发送多个HTTP请求。
            <a name="user-content-mXq9J"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="14. HTTP2的头部压缩算法是怎样的？">
        <p>HTTP2的头部压缩是HPACK算法。在客户端和服务器两端建立“字典”，用索引号表示重复的字符串，采用哈夫曼编码来压缩整数和字符串，可以达到50%~90%的高压缩率。</p>
        <p>具体来说:</p>
        <ul>
          <li>在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键值对，对于相同的数据，不再通过每次请求和响应发送；</li>
          <li>首部表在HTTP/2的连接存续期内始终存在，由客户端和服务器共同渐进地更新；</li>
          <li>每个新的首部键值对要么被追加到当前表的末尾，要么替换表中之前的值。</li>
        </ul>
        <p>例如下图中的两个请求， 请求一发送了所有的头部字段，第二个请求则只需要发送差异数据，这样可以减少冗余数据，降低开销。
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41c0af03cade4115b4e082653344c50a~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image">
          <a name="user-content-UYMTj"></a></p>
      </el-collapse-item>
      <el-collapse-item title="15. HTTP请求报文和响应报文的组成">
        <p>HTTP协议报文的结构：
          <strong><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be1ce45bb45d412499101b8b64161339~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png" loading="lazy" class="medium-zoom-image"></strong>
          <a name="user-content-E8K7r"></a></p>
        <h4 data-id="heading-17">（1）HTTP 请求报文</h4>
        <p>HTTP 报文有两种，一种是请求报文，一种是响应报文。</p>
        <p>HTTP 请求报文的格式如下：</p>
        <pre><code class="hljs language-http copyable" lang="http"><span class="hljs-keyword">GET</span> <span class="hljs-string">/</span> <span class="hljs-meta">HTTP/1.1</span>
<span class="hljs-attribute">User-Agent</span><span class="hljs-punctuation">: </span>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
<span class="hljs-attribute">Accept</span><span class="hljs-punctuation">: </span>*/*
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>HTTP 请求报文的第一行叫做请求行，后面的行叫做首部行，首部行后还可以跟一个实体主体。请求首部之后有一个空行，这个空行不能省略，它用来划分首部与实体。</p>
        <p>请求行包含三个字段：</p>
        <ul>
          <li>方法字段</li>
          <li>URL 字段</li>
          <li>HTTP 版本字段。</li>
        </ul>
        <p>请求<strong>方法字段</strong>可以取以下的值：</p>
        <ul>
          <li>GET: 向服务器获取数据</li>
          <li>POST：将实体提交到指定的资源，通常会造成服务器资源的修改。</li>
          <li>PUT：上传文件，修改数据</li>
          <li>DELETE：删除服务器上的对象</li>
          <li>HEAD：获取报文首部，与GET相比，不返回报文主体部分</li>
          <li>OPTIONS：询问支持的请求方法，用来跨域请求</li>
          <li>TRACE：追踪 请求—响应 的传输路径</li>
          <li>CONNECT：要求在与代理服务器通信时建立隧道，使用隧道进行TCP通信</li>
        </ul>
        <p>虽然请求的方法很多，但更多表达的是一种语义上的区别，并不是说 POST 能做的事情，GET 就不能做了，主要看我们如何选择。
          <a name="user-content-0yaP0"></a></p>
        <h4 data-id="heading-18">（2）HTTP 响应报文</h4>
        <p>HTTP 报文有两种，一种是请求报文，一种是响应报文。</p>
        <p>HTTP 响应报文的格式如下：</p>
        <pre><code class="hljs language-http copyable" lang="http"><span class="hljs-meta">HTTP/1.0</span> <span class="hljs-number">200</span> OK
<span class="hljs-attribute">Content-Type</span><span class="hljs-punctuation">: </span>text/plain
<span class="hljs-attribute">Content-Length</span><span class="hljs-punctuation">: </span>137582
<span class="hljs-attribute">Expires</span><span class="hljs-punctuation">: </span>Thu, 05 Dec 1997 16:00:00 GMT
<span class="hljs-attribute">Last-Modified</span><span class="hljs-punctuation">: </span>Wed, 5 August 1996 15:55:28 GMT
<span class="hljs-attribute">Server</span><span class="hljs-punctuation">: </span>Apache 0.84
&lt;html&gt;
  &lt;body&gt;Hello World&lt;/body&gt;
&lt;/html&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>HTTP 响应报文的第一行叫做<strong>状态行</strong>，后面的行是<strong>首部行</strong>，最后是<strong>实体主体</strong>。</p>
        <ul>
          <li><strong>状态行</strong>包含了三个字段：协议版本字段、状态码和相应的状态信息。</li>
          <li><strong>实体部分</strong>是报文的主要部分，它包含了所请求的对象。</li>
          <li><strong>首部行</strong>首部可以分为四种首部，请求首部、响应首部、通用首部和实体首部。通用首部和实体首部在请求报文和响应报文中都可以设置，区别在于请求首部和响应首部。</li>
        </ul>
        <p>（1）常见的请求首部有 Accept 可接收媒体资源的类型、Accept-Charset 可接收的字符集、Host 请求的主机名。</p>
        <p>（2）常见的响应首部有 ETag 资源的匹配信息，Location 客户端重定向的 URI。</p>
        <p>（3）常见的通用首部有 Cache-Control 控制缓存策略、Connection 管理持久连接。</p>
        <p>（4）常见的实体首部有 Content-Length 实体主体的大小、Expires 实体主体的过期时间、Last-Modified 资源的最后修改时间。
          <a name="user-content-Weopr"></a></p>
      </el-collapse-item>
      <el-collapse-item title="16. HTTP协议的优点和缺点">
        <p>HTTP 是超文本传输协议，它定义了客户端和服务器之间交换报文的格式和方式，默认使用 80 端口。它使用 TCP 作为传输层协议，保证了数据传输的可靠性。</p>
        <p>HTTP协议具有以下<strong>优点</strong>：</p>
        <ul>
          <li>支持客户端/服务器模式</li>
          <li><strong>简单快速</strong>：客户向服务器请求服务时，只需传送请求方法和路径。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快。</li>
          <li><strong>无连接</strong>：无连接的含义是限制每次链接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开链接，采用这种方式可以节省传输时间。</li>
          <li><strong>无状态</strong>：HTTP 协议是无状态协议，这里的状态是指通信过程的上下文信息。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能会导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就比较快。</li>
          <li><strong>灵活</strong>：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记。</li>
        </ul>
        <p>HTTP协议具有以下<strong>缺点</strong>：</p>
        <ul>
          <li><strong>无状态：</strong> HTTP 是一个无状态的协议，HTTP 服务器不会保存关于客户的任何信息。</li>
          <li><strong>明文传输：</strong> 协议中的报文使用的是文本形式，这就直接暴露给外界，不安全。</li>
          <li><strong>不安全</strong></li>
        </ul>
        <p>（1）通信使用明文（不加密），内容可能会被窃听
          （2）不验证通信方的身份，因此有可能遭遇伪装
          （3）无法证明报文的完整性，所以有可能已遭篡改
          <a name="user-content-AQkUG"></a></p>
      </el-collapse-item>
      <el-collapse-item title="17. 说一下HTTP 3.0">
        <p>HTTP/3基于UDP协议实现了类似于TCP的多路复用数据流、传输可靠性等功能，这套功能被称为QUIC协议。
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/677456f993b54b63b73acca164698347~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <ol>
          <li>流量控制、传输可靠性功能：QUIC在UDP的基础上增加了一层来保证数据传输可靠性，它提供了数据包重传、拥塞控制、以及其他一些TCP中的特性。</li>
          <li>集成TLS加密功能：目前QUIC使用TLS1.3，减少了握手所花费的RTT数。</li>
          <li>多路复用：同一物理连接上可以有多个独立的逻辑数据流，实现了数据流的单独传输，解决了TCP的队头阻塞问题。</li>
        </ol>
        <p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac5f9b4b6def4e8e95b037d795b31f83~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <ol start="4">
          <li>快速握手：由于基于UDP，可以实现使用0 ~ 1个RTT来建立连接。
            <a name="user-content-bfZxM"></a></li>
        </ol>
      </el-collapse-item>
      <el-collapse-item title="18. HTTP协议的性能怎么样">
        <p>HTTP 协议是基于 TCP/IP，并且使用了<strong>请求-应答</strong>的通信模式，所以性能的关键就在这两点里。</p>
        <ul>
          <li><strong>长连接</strong></li>
        </ul>
        <p>HTTP协议有两种连接模式，一种是持续连接，一种非持续连接。
          （1）非持续连接指的是服务器必须为每一个请求的对象建立和维护一个全新的连接。
          （2）持续连接下，TCP 连接默认不关闭，可以被多个请求复用。采用持续连接的好处是可以避免每次建立 TCP 连接三次握手时所花费的时间。</p>
        <p>对于不同版本的采用不同的连接方式：</p>
        <ul>
          <li>在HTTP/1.0 每发起一个请求，都要新建一次 TCP 连接（三次握手），而且是串行请求，做了无畏的 TCP 连接建立和断开，增加了通信开销。该版本使用的非持续的连接，但是可以在请求时，加上 Connection: keep-a live 来要求服务器不要关闭 TCP 连接。</li>
          <li>在HTTP/1.1 提出了<strong>长连接</strong>的通信方式，也叫持久连接。这种方式的好处在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻了服务器端的负载。该版本及以后版本默认采用的是持续的连接。目前对于同一个域，大多数浏览器支持同时建立 6 个持久连接。</li>
        </ul>
        <p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc8cd5be1c31465cab711813d01261f7~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <ul>
          <li><strong>管道网络传输</strong></li>
        </ul>
        <p>HTTP/1.1 采用了长连接的方式，这使得管道（pipeline）网络传输成为了可能。</p>
        <p>管道（pipeline）网络传输是指：可以在同一个 TCP 连接里面，客户端可以发起多个请求，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以减少整体的响应时间。但是服务器还是按照顺序回应请求。要是前面的回应特别慢，后面就会有许多请求排队等着。这称为队头堵塞。</p>
        <ul>
          <li><strong>队头堵塞</strong></li>
        </ul>
        <p>HTTP 传输的报文必须是一发一收，但是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。这就是HTTP队头阻塞问题。</p>
        <p><strong>队头阻塞的解决方案：</strong>
          （1）并发连接：对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。
          （2）域名分片：将域名分出很多二级域名，它们都指向同样的一台服务器，能够并发的长连接数变多，解决了队头阻塞的问题。
          <a name="user-content-vNWJY"></a></p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
