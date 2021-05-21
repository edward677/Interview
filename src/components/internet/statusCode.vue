<template>
  <div class="statusCode_warp">
    <p>状态码的类别：</p>
    <table><thead><tr><th><strong>类别</strong></th><th><strong>原因</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>1xx</td><td>Informational(信息性状态码)</td><td>接受的请求正在处理</td></tr><tr><td>2xx</td><td>Success(成功状态码)</td><td>请求正常处理完毕</td></tr><tr><td>3xx</td><td>Redirection(重定向状态码)</td><td>需要进行附加操作一完成请求</td></tr><tr><td>4xx</td><td>Client Error (客户端错误状态码)</td><td>服务器无法处理请求</td></tr><tr><td>5xx</td><td>Server Error(服务器错误状态码)</td><td>服务器处理请求出错</td></tr></tbody></table>
    <el-collapse accordion>
      <el-collapse-item title="1. 2XX (Success 成功状态码)">
        <p>状态码2XX表示请求被正常处理了。
          <a name="user-content-e4dyB"></a></p>
        <h4 data-id="heading-33">（1）200 OK</h4>
        <p>200 OK表示客户端发来的请求被服务器端正常处理了。
          <a name="user-content-2dsaR"></a></p>
        <h4 data-id="heading-34">（2）204 No Content</h4>
        <p>该状态码表示客户端发送的请求已经在服务器端正常处理了，但是没有返回的内容，响应报文中不包含实体的主体部分。
          一般在只需要从客户端往服务器端发送信息，而服务器端不需要往客户端发送内容时使用。
          <a name="user-content-KgvCH"></a></p>
        <h4 data-id="heading-35">（3）206 Partial Content</h4>
        <p>该状态码表示客户端进行了范围请求，而服务器端执行了这部分的 GET 请求。响应报文中包含由 Content-Range 指定范围的实体内容。
          <a name="user-content-geiRm"></a></p>
      </el-collapse-item>
      <el-collapse-item title="2. 3XX (Redirection 重定向状态码)">
        <p>3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。
          <a name="user-content-aF2UC"></a></p>
        <h4 data-id="heading-37">（1）301 Moved Permanently</h4>
        <p><strong>永久重定向。</strong>
          该状态码表示请求的资源已经被分配了新的 URI，以后应使用资源指定的 URI。新的 URI 会在 HTTP 响应头中的 Location 首部字段指定。
          若用户已经把原来的URI保存为书签，此时会按照 Location 中新的URI重新保存该书签。
          同时，搜索引擎在抓取新内容的同时也将旧的网址替换为重定向之后的网址。</p>
        <p><strong>使用场景：</strong></p>
        <ul>
          <li>当我们想换个域名，旧的域名不再使用时，用户访问旧域名时用301就重定向到新的域名。其实也是告诉搜索引擎收录的域名需要对新的域名进行收录。</li>
          <li>在搜索引擎的搜索结果中出现了不带www的域名，而带www的域名却没有收录，这个时候可以用301重定向来告诉搜索引擎我们目标的域名是哪一个。
            <a name="user-content-Gusp2"></a></li>
        </ul>
        <h4 data-id="heading-38">（2）302 Found</h4>
        <p><strong>临时重定向。</strong>
          该状态码表示请求的资源被分配到了新的 URI，希望用户（本次）能使用新的 URI 访问资源。
          和 301 Moved Permanently 状态码相似，但是 302 代表的资源不是被永久重定向，只是临时性质的。也就是说已移动的资源对应的 URI 将来还有可能发生改变。
          若用户把 URI 保存成书签，但不会像 301 状态码出现时那样去更新书签，而是仍旧保留返回 302 状态码的页面对应的 URI。
          同时，搜索引擎会抓取新的内容而保留旧的网址。因为服务器返回302代码，搜索引擎认为新的网址只是暂时的。</p>
        <p><strong>使用场景：</strong></p>
        <ul>
          <li>当我们在做活动时，登录到首页自动重定向，进入活动页面。</li>
          <li>未登陆的用户访问用户中心重定向到登录页面。</li>
          <li>访问404页面重新定向到首页。
            <a name="user-content-UhM7i"></a></li>
        </ul>
        <h4 data-id="heading-38">（3）303 See Other</h4>
        <p>该状态码表示由于请求对应的资源存在着另一个 URI，应使用 GET 方法定向获取请求的资源。
          303 状态码和 302 Found 状态码有着相似的功能，但是 303 状态码明确表示客户端应当采用 GET 方法获取资源。
          303 状态码通常作为 PUT 或 POST 操作的返回结果，它表示重定向链接指向的不是新上传的资源，而是另外一个页面，比如消息确认页面或上传进度页面。而请求重定向页面的方法要总是使用 GET。
          注意：</p>
        <blockquote>
          <p>当 301、302、303 响应状态码返回时，几乎所有的浏览器都会把 POST 改成GET，并删除请求报文内的主体，之后请求会再次自动发送。
            301、302 标准是禁止将 POST 方法变成 GET方法的，但实际大家都会这么做。</p>
        </blockquote>
        <h4 data-id="heading-38">（4）304 Not Modified</h4>
        <p><strong>浏览器缓存相关。</strong>
          该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在 3XX 类别中，但是和重定向没有关系。</p>
        <p>带条件的请求（Http 条件请求）：使用 Get方法 请求，请求报文中包含（<code>if-match</code>、<code>if-none-match</code>、<code>if-modified-since</code>、<code>if-unmodified-since</code>、<code>if-range</code>）中任意首部。</p>
        <p>状态码304并不是一种错误，而是告诉客户端有缓存，直接使用缓存中的数据。返回页面的只有头部信息，是没有内容部分的，这样在一定程度上提高了网页的性能。
          <a name="user-content-0xF8Q"></a></p>
        <h4 data-id="heading-41">（5）307 Temporary Redirect</h4>
        <p><strong>临时重定向。</strong>
          该状态码与 302 Found 有着相同含义，尽管 302 标准禁止 POST 变成 GET，但是实际使用时还是这样做了。
          307 会遵守浏览器标准，<strong>不会从 POST 变成 GET</strong>。但是对于处理请求的行为时，不同浏览器还是会出现不同的情况。规范要求浏览器继续向 Location 的地址 POST 内容。规范要求浏览器继续向 Location 的地址 POST 内容。
          <a name="user-content-Pa9Ee"></a></p>
      </el-collapse-item>
      <el-collapse-item title="3. 4XX (Client Error 客户端错误状态码)">
        <p>4XX 的响应结果表明客户端是发生错误的原因所在。
          <a name="user-content-lr2MR"></a></p>
        <h4 data-id="heading-43">（1）400 Bad Request</h4>
        <p>该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像 200 OK 一样对待该状态码。
          <a name="user-content-GCIzV"></a></p>
        <h4 data-id="heading-44">（2）401 Unauthorized</h4>
        <p>该状态码表示发送的请求需要有通过 HTTP 认证(BASIC 认证、DIGEST 认证)的认证信息。若之前已进行过一次请求，则表示用户认证失败
          返回含有 401 的响应必须包含一个适用于被请求资源的 WWW-Authenticate 首部用以质询(challenge)用户信息。当浏览器初次接收到 401 响应，会弹出认证用的对话窗口。
          以下情况会出现401：</p>
        <ul>
          <li>401.1 - 登录失败。</li>
          <li>401.2 - 服务器配置导致登录失败。</li>
          <li>401.3 - 由于 ACL 对资源的限制而未获得授权。</li>
          <li>401.4 - 筛选器授权失败。</li>
          <li>401.5 - ISAPI/CGI 应用程序授权失败。</li>
          <li>401.7 - 访问被 Web 服务器上的 URL 授权策略拒绝。这个错误代码为 IIS 6.0 所专用。
            <a name="user-content-irVzs"></a></li>
        </ul>
        <h4 data-id="heading-45">（3）403 Forbidden</h4>
        <p>该状态码表明请求资源的访问被服务器拒绝了，服务器端没有必要给出详细理由，但是可以在响应报文实体的主体中进行说明。进入该状态后，不能再继续进行验证。该访问是永久禁止的，并且与应用逻辑密切相关。
          IIS 定义了许多不同的 403 错误，它们指明更为具体的错误原因：</p>
        <ul>
          <li>403.1 - 执行访问被禁止。</li>
          <li>403.2 - 读访问被禁止。</li>
          <li>403.3 - 写访问被禁止。</li>
          <li>403.4 - 要求 SSL。</li>
          <li>403.5 - 要求 SSL 128。</li>
          <li>403.6 - IP 地址被拒绝。</li>
          <li>403.7 - 要求客户端证书。</li>
          <li>403.8 - 站点访问被拒绝。</li>
          <li>403.9 - 用户数过多。</li>
          <li>403.10 - 配置无效。</li>
          <li>403.11 - 密码更改。</li>
          <li>403.12 - 拒绝访问映射表。</li>
          <li>403.13 - 客户端证书被吊销。</li>
          <li>403.14 - 拒绝目录列表。</li>
          <li>403.15 - 超出客户端访问许可。</li>
          <li>403.16 - 客户端证书不受信任或无效。</li>
          <li>403.17 - 客户端证书已过期或尚未生效</li>
          <li>403.18 - 在当前的应用程序池中不能执行所请求的 URL。这个错误代码为 IIS 6.0 所专用。</li>
          <li>403.19 - 不能为这个应用程序池中的客户端执行 CGI。这个错误代码为 IIS 6.0 所专用。</li>
          <li>403.20 - Passport 登录失败。这个错误代码为 IIS 6.0 所专用。
            <a name="user-content-TaUM1"></a></li>
        </ul>
        <h4 data-id="heading-46">（4）404 Not Found</h4>
        <p>该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。
          以下情况会出现404：</p>
        <ul>
          <li>404.0 -（无） – 没有找到文件或目录。</li>
          <li>404.1 - 无法在所请求的端口上访问 Web 站点。</li>
          <li>404.2 - Web 服务扩展锁定策略阻止本请求。</li>
          <li>404.3 - MIME 映射策略阻止本请求。
            <a name="user-content-bsFPq"></a></li>
        </ul>
        <h4 data-id="heading-47">（5）405 Method Not Allowed</h4>
        <p>该状态码表示客户端请求的方法虽然能被服务器识别，但是服务器禁止使用该方法。
          GET 和 HEAD 方法，服务器应该总是允许客户端进行访问。
          客户端可以通过 OPTIONS 方法（预检）来查看服务器允许的访问方法, 如下</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="4. 5XX (Server Error 服务器错误状态码)">
        <p>5XX 的响应结果表明服务器本身发生错误.
          <a name="user-content-iXi4C"></a></p>
        <h4 data-id="heading-49">（1）500 Internal Server Error</h4>
        <p>该状态码表明服务器端在执行请求时发生了错误。也有可能是 Web 应用存在的 bug 或某些临时的故障。
          <a name="user-content-vSlKb"></a></p>
        <h4 data-id="heading-50">（2）502 Bad Gateway</h4>
        <p>该状态码表明扮演网关或代理角色的服务器，从上游服务器中接收到的响应是无效的
          注意，502 错误通常不是客户端能够修复的，而是需要由途经的 Web 服务器或者代理服务器对其进行修复
          以下情况会出现502：</p>
        <ul>
          <li>502.1 - CGI （通用网关接口）应用程序超时。</li>
          <li>502.2 - CGI （通用网关接口）应用程序出错。
            <a name="user-content-cvxsK"></a></li>
        </ul>
        <h4 data-id="heading-51">（3）503 Service Unavailable</h4>
        <p>该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入 RetryAfter 首部字段再返回给客户端。
          <strong>使用场景：</strong></p>
        <ul>
          <li>服务器停机维护时，主动用503响应请求；</li>
          <li>nginx 设置限速，超过限速，会返回503。
            <a name="user-content-I6u0Q"></a></li>
        </ul>
        <h4 data-id="heading-52">（4）504 Gateway Timeout</h4>
        <p>该状态码表示网关或者代理的服务器无法在规定的时间内获得想要的响应。他是HTTP 1.1中新加入的。
          使用场景：代码执行时间超时，或者发生了死循环。
          <a name="user-content-ckFk6"></a></p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
