<template>
  <el-collapse v-model="activeName" accordion @change="handleSelect">
    <el-collapse-item name="1" title="1. src和href的区别">
      <div>src和href都是用来引用外部的资源，它们区别如下：</div>
      <div>src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src资源时会将其指向的资源下载并应⽤到⽂档内，如在请求js脚本，img图⽚和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，知道将该资源加载、编译、执⾏完毕，所以⼀般js脚本会放在底部⽽不是头部。</div>
      <div>href：表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。 常用在a、link等标签上。</div>
    </el-collapse-item>
    <el-collapse-item name="2" title="2. 对HTML语义化的理解">
      <div>语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。</div>
      <div>语义化的优点主要有以下两点：</div>
      <div>对于机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，利于SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录</div>
      <div>对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者也能清晰的看出网页的结构，便于团队的开发与维护。 常见的语义化标签：</div>
      <pre>
        header>头部
        nav>导航栏
        section>区块（有语义化的div）
        main>主要区域
        artical>主要内容
        aside>侧边栏
        footer>底部
      </pre>
    </el-collapse-item>
    <el-collapse-item name="3" title="3. DOCTYPE(⽂档类型) 的作⽤">
      <div>DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，它的目的是告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档，不同的渲染模式会影响到浏览器对于 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在HTML⽂档的第⼀⾏。</div>
      <div>浏览器渲染页面的两种模式（可通过document.compatMode获取）：</div>
      <div>CSS1Compat：标准模式（Strick mode），默认模式，浏览器使用W3C的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。</div>
      <div>BackCompat：怪异模式(混杂模式)(Quick mode )，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。</div>
    </el-collapse-item>
    <el-collapse-item name="4" title="4. script标签中defer和async的区别">
      <div>如果没有defer或async属性，浏览器会立即加载并执行相应的脚本。也就是说在渲染script标签之后的文档之前，不等待后续加载的文档元素，读到就开始加载和执行，这样就会阻塞后续文档的加载。</div>
      <div style="margin: 20px auto">下图可以直观的看出三者之间的区别:</div>
      <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1f240469dfe464cb7867ec89408f8e0~tplv-k3u1fbpfcp-zoom-1.image" alt="">
      <div style="margin: 20px auto">其中蓝色代表js脚本网络加载时间，红色代表js脚本执行时间，绿色代表html解析。</div>
      <div style="margin: 20px auto">defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析，其区别如下：</div>
      <div>多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行。</div>
      <div>async属性，表示后续文档的加载和渲染与js脚本的加载和执行是并行进行的，即异步执行；有了defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本的执行需要等到文档所有元素解析完成之后，DOMContentLoaded事件触发执行之前。</div>
    </el-collapse-item>
    <el-collapse-item name="5" title="5. 常⽤的meta标签有哪些">
      <div>meta标签由name和content属性定义，用来描述一个网页文档的属性，比如网页的作者，网页描述，关键词等，除了HTTP标准固定了一些name作为大家使用的共识，开发者还可以自定义name。</div>
      <div style="margin: 20px auto">常用的meta标签：</div>
      <div style="margin: 20px auto">（1）charset，用来描述HTML文档的编码类型</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> &gt;</span></code>
      <div style="margin: 20px auto">（2） keywords，页面关键词</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"关键词"</span> /&gt;</span></code>
      <div style="margin: 20px auto">（3）description，页面描述</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"想要描述的内容"</span> /&gt;</span></code>
      <div style="margin: 20px auto">（4）refresh，页面重定向和刷新</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"refresh"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0;url="</span> /&gt;</span></code>
      <div style="margin: 20px auto">（5）viewport，适配移动端，开发人员可以控制视口的大小和比例</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, maximum-scale=1"</span>&gt;</span></code>
      <div style="margin: 20px auto"><p>其中，<code>content</code> 参数有以下几种：</p></div>
      <ul>
        <li><code>width viewport</code> ：宽度(数值/device-width)</li>
        <li><code>height viewport</code> ：高度(数值/device-height)</li>
        <li><code>initial-scale</code> ：初始缩放比例</li>
        <li><code>maximum-scale</code> ：最大缩放比例</li>
        <li><code>minimum-scale</code> ：最小缩放比例</li>
        <li><code>user-scalable</code> ：是否允许用户缩放(yes/no）</li>
      </ul>
      <div style="margin: 20px auto">（6）搜索引擎索引方式</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"robots"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"index,follow"</span> /&gt;</span></code>
      <div style="margin: 20px auto"><p>其中，<code>content</code> 参数有以下几种：</p></div>
      <ul>
        <li><code>all</code>：文件将被检索，且页面上的链接可以被查询；</li>
        <li><code>none</code>：文件将不被检索，且页面上的链接不可以被查询；</li>
        <li><code>index</code>：文件将被检索；</li>
        <li><code>follow</code>：页面上的链接可以被查询；</li>
        <li><code>noindex</code>：文件将不被检索；</li>
        <li><code>nofollow</code>：页面上的链接不可以被查询。</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="6" title="6. HTML5有哪些更新">
      <div style="margin: 20px auto;">1. 语义化标签</div>
      <ul>
        <li>header：定义文档的页眉 头部</li>
        <li>nav：定义导航链接的部分</li>
        <li>footer：定义文档或节的页脚 底部</li>
        <li>article：定义文章。</li>
        <li>section：定义文档中的节（section、区段）</li>
        <li>aside：定义其所处内容之外的内容 侧边</li>
      </ul>
      <div style="margin: 20px auto;">2. 媒体标签</div>
      <div>（1） audio：音频</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">src</span>=<span class="hljs-string">''</span> <span class="hljs-attr">controls</span> <span class="hljs-attr">autoplay</span> <span class="hljs-attr">loop</span>=<span class="hljs-string">'true'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span></code>
      <div style="margin: 20px auto;">属性：</div>
      <ul>
        <li>controls 控制面板</li>
        <li>autoplay 自动播放</li>
        <li>loop=‘true’ 循环播放</li>
      </ul>
      <div style="margin: 20px auto;">（2）video视频</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">''</span> <span class="hljs-attr">poster</span>=<span class="hljs-string">'imgs/aa.jpg'</span> <span class="hljs-attr">controls</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code>
      <div style="margin: 20px auto;">属性：</div>
      <ul>
        <li>poster：指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过poster也可以自己指定。</li>
        <li>controls 控制面板</li>
        <li>width</li>
        <li>height</li>
      </ul>
      <div style="margin: 20px auto;">（3）source标签 因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过source来指定视频源。</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">video</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'aa.flv'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'video/flv'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">source</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'aa.mp4'</span> <span class="hljs-attr">type</span>=<span class="hljs-string">'video/mp4'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">source</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
      </code>
      <div style="margin: 20px auto;">3. 表单</div>
      <div style="margin: 20px auto;">表单类型：</div>
      <ul>
        <li>email ：能够验证当前输入的邮箱地址是否合法</li>
        <li>url ： 验证URL</li>
        <li>number ： 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max属性可以设置为最大值，min可以设置为最小值，value为默认值。</li>
        <li>search ： 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。</li>
        <li>range ： 可以提供给一个范围，其中可以设置max和min以及value，其中value属性可以设置为默认值</li>
        <li>color ： 提供了一个颜色拾取器</li>
        <li>time ： 时分秒</li>
        <li>data ： 日期选择年月日</li>
        <li>datatime ： 时间和日期(目前只有Safari支持)</li>
        <li>datatime-local ：日期时间控件</li>
        <li>week ：周控件</li>
        <li>month：月控件</li>
      </ul>
      <div style="margin: 20px auto;">表单属性：</div>
      <ul>
        <li>placeholder ：提示信息</li>
        <li>autofocus ：自动获取焦点</li>
        <li>autocomplete=“on” 或者 autocomplete=“off” 使用这个属性需要有两个前提：
          <ul>
            <li>必须表单提交过</li>
            <li>必须有name属性。</li>
          </ul>
        </li>
        <li>required：要求输入框不能为空，必须有值才能够提交。</li>
        <li>pattern=" " 里面写入想要的正则模式，例如手机号patte="^(+86)?\d{10}$"</li>
        <li>multiple：可以选择多个文件或者多个邮箱</li>
        <li>form=" form表单的ID"</li>
      </ul>
      <div style="margin: 20px auto;">表单事件：</div>
      <ul>
        <li>oninput 每当input里的输入框内容发生变化都会触发此事件。</li>
        <li>oninvalid 当验证不通过时触发此事件。</li>
      </ul>
      <div style="margin: 20px auto;">5.DOM查询操作</div>
      <ul>
        <li>document.querySelector()</li>
        <li>document.querySelectorAll()</li>
      </ul>
      <div style="margin: 20px auto;">它们选择的对象可以是标签，可以是类(需要加点)，可以是ID(需要加#)</div>
      <div style="margin: 20px auto;">6. Web存储</div>
      <div>HTML5 提供了两种在客户端存储数据的新方法</div>
      <ul>
        <li>localStorage - 没有时间限制的数据存储</li>
        <li>sessionStorage - 针对一个 session 的数据存储</li>
      </ul>
      <div style="margin: 20px auto;">它们选择的对象可以是标签，可以是类(需要加点)，可以是ID(需要加#)</div>
      <div style="margin: 20px auto;">7. 其他</div>
      <div>拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。</div>
      <div style="margin: 20px auto">设置元素可拖放：</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">draggable</span>=<span class="hljs-string">"true"</span> /&gt;</span></code>
      <ul>
        <li>画布（canvas ）： canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，您可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。</li>
      </ul>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"100"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span></code>
      <ul>
        <li>SVG：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准</li>
        <li>地理定位：Geolocation（地理定位）用于定位用户的位置。‘</li>
      </ul>
      <div style="margin: 20px auto"><strong>总结：</strong></div>
      <p>（1）新增语义化标签：nav、header、footer、aside、section、article</p>
      <p>（2）音频、视频标签：audio、video</p>
      <p>（3）数据存储：localStorage、sessionStorage</p>
      <p>（4）canvas（画布）、Geolocation（地理定位）、websocket（通信协议）</p>
      <p>（5）input标签新增属性：placeholder、autocomplete、autofocus、required</p>
      <ul>
      <li>设置宽高无效</li>
      <li>对margin设置左右方向有效，而上下无效，padding设置都无效</li>
      <li>不会自动换行</li>
     </ul>
      <p>（6）history API：go、forward、back、pushstate</p>
    </el-collapse-item>
    <el-collapse-item name="7" title="7. img的srcset属性的作⽤是什么？">
      <div>响应式页面中经常用到根据屏幕密度设置不同的图片。这个时候肯定会用到image标签的srcset属性。srcset属性用于设置不同屏幕密度下，image会自动加载不同的图片。用法如下：</div>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image-128.png"</span> <span class="hljs-attr">srcset</span>=<span class="hljs-string">"image-256.png 2x"</span> /&gt;</span></code>
      <p>使用上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png。</p>
      <p>按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有1x,2x,3x,4x四种，如果每一个图片都设置4张图片的话，很慢发。所以就有了新的srcset标准。代码如下：</p>
      <code class="hljs language-html copyable" lang="html">1. <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image-128.png"</span>
        <span class="hljs-attr">2.</span> <span class="hljs-attr">srcset</span>=<span class="hljs-string">"image-128.png 128w, image-256.png 256w, image-512.png 512w"</span>
          <span class="hljs-attr">3.</span> <span class="hljs-attr">sizes</span>=<span class="hljs-string">"(max-width: 360px) 340px, 128px"</span> /&gt;</span>
      </code>
      <p>其中srcset指定图片的地址和对应的图片质量。sizes用来设置图片的尺寸零界点。
        对于srcset里面出现了一个w单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片。</p>
      <p>sizes语法如下：</p>
      <code class="hljs language-html copyable" lang="html">sizes="[media query] [length], [media query] [length] ... "</code>
      <p>上面例子中的sizes就是指默认显示128px, 如果视区宽度大于360px, 则显示340px。</p>
    </el-collapse-item>
    <el-collapse-item name="8" title="8.  行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？">
      <ul>
        <li>行内元素有：<code>a b span img input select strong</code></li>
        <li>块级元素有：<code>div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p</code></li>
        <li>常见的空元素（标签内没有内容的 HTML 标签被称为空元素。空元素是在开始标签中关闭的。）:<code> &lt;br&gt; &lt;hr&gt; &lt;img&gt; &lt;input&gt; &lt;link&gt; &lt;meta&gt;</code></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="9" title="9. display的block、inline和inline-block的区别">
      <p> (1）<strong>block：</strong> 会独占一行，多个元素会另起一行，可以width、height、margin和padding属性。</p>
      <p>（2）<strong>inline</strong>：元素不会独占一行，设置width、height属性无效。但可以设置水平方向的margin和padding属性，不可以设置垂直方向的padding和margin。</p>
      <p>（3）<strong>inline-block：</strong> 将对象设置为inline对象，但对象的内容作为block对象呈现，之后的内联对象会被排列在同一行内。</p>
      <div style="margin: 20px auto">（1）行内元素</div>
      <ul>
        <li>设置宽高无效</li>
        <li>对margin设置左右方向有效，而上下无效，padding设置都无效</li>
        <li>不会自动换行</li>
      </ul>
      <div style="margin: 20px auto">（2）块级元素</div>
      <ul>
        <li>可以设置宽高</li>
        <li>设置margin和padding都有效</li>
        <li>可以自动换行</li>
        <li>多个块状，默认排列从上到下</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="10" title="10. HTML5的离线储存怎么使用，它的工作原理是什么">
      <p>离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。</p>
      <p><strong>原理：</strong> HTML5的离线存储是基于一个新建的.appcache文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示</p>
      <p style="margin: 20px auto;"><strong>使用方法：</strong></p>
      <p>（1）创建一个和 html 同名的 manifest 文件，然后在页面头部像下面一样加入一个 manifest 的属性。</p>
      <code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span> <span class="hljs-attr">manifest</span>=<span class="hljs-string">"index.manifest"</span>&gt;</span></code>
      <p style="margin: 20px auto;">&nbsp;（2）在如下 cache.manifest 文件的编写离线存储的资源。</p>
      <pre>
        <code class="hljs language-html copyable" lang="html">
        CACHE MANIFEST
        #v0.11
        CACHE:
        js/app.js
        css/style.css
        NETWORK:
        resourse/logo.png
        FALLBACK:
        / /offline.html
      </code>
    </pre>
      <ul>
        <li><strong>CACHE</strong>: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。</li>
        <li><strong>NETWORK</strong>: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。</li>
        <li><strong>FALLBACK</strong>: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html 。</li>
      </ul>
      <p>（3）在离线状态时，操作 window.applicationCache 进行离线缓存的操作。 **<strong>如何更新缓存：</strong></p>
      <p>（1）更新 manifest 文件</p>
      <p>（2）通过 javascript 操作</p>
      <p>（3）清除浏览器缓存</p>
      <div style="margin: 20px auto;"><strong>注意事项：</strong></div>
      <p>（1）浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。</p>
      <p>（2）如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。</p>
      <p>（3）引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。</p>
      <p>（4）FALLBACK 中的资源必须和 manifest 文件同源。</p>
      <p>（5）当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。</p>
      <p>（6）站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。</p>
      <p>（7）当 manifest 文件发生改变时，资源请求本身也会触发更新。</p>
    </el-collapse-item>
    <el-collapse-item name="11" title="11. 浏览器是怎么对 HTML5 的离线储存资源进行管理和加载的呢？">
      <ul>
        <li>在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。</li>
        <li>离线的情况下，浏览器就直接使用离线存储的资源。</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="12" title="12. title与h1的区别、b与strong的区别、i与em的区别？">
      <ul>
        <li>strong标明重点内容，有语气加强的含义，使用阅读设备阅读网络时会重读，而b是展示强调内容。</li>
        <li>title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取也有很大的影响</li>
        <li><strong><strong>i内容展示为斜体，em表示强调的文本</strong></strong></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item name="13" title="13. iframe 有哪些优点和缺点？">
        <div style="margin: 20px 0;">iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。</div>
        <p>优点：</p>
        <ul>
          <li>用来加载速度较慢的内容（如广告）</li>
          <li>可以使脚本可以并行下载</li>
          <li>可以实现跨子域通信</li>
        </ul>
        <p>缺点：</p>
        <ul>
          <li>iframe 会阻塞主页面的 onload 事件</li>
          <li>无法被一些搜索引擎索识别</li>
          <li>会产生很多页面，不容易管理</li>
        </ul>
    </el-collapse-item>
    <el-collapse-item title="14. label 的作用是什么？如何使用？" name="14">
      <p>label标签来定义表单控件的关系：当用户选择label标签时，浏览器会自动将焦点转到和label标签相关的表单控件上。</p>
      <div style="margin: 20px 0;">使用方法1：</div>
      <pre>
        <code class="hljs language-html copyable" lang="html">
          <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"mobile"</span>&gt;</span>Number:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mobile"</span>/&gt;</span>
        </code>
      </pre>
      <div style="margin: 20px 0;">使用方法2：</div>
      <pre><code class="hljs language-html copyable" lang="html"><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Date:<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="15. Canvas 和 SVG 有什么区别？" name="15">
      <div>Canvas 是一种通过 JavaScript 来绘制 2D 图形的方法。Canvas 是逐像素来进行渲染的，因此当我们对 Canvas 进行缩放时，会出现锯齿或者失真的情况。</div>
      <div>SVG 是一种使用 XML 描述 2D 图形的语言。SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。我们可以为某个元素附加 JavaScript 事件监听函数。并且 SVG 保存的是图形的绘制方法，因此当 SVG 图形缩放时并不会失真。</div>
    </el-collapse-item>
    <el-collapse-item title="16. head 标签中必不少的是？" name="16">
      <p>标签用于定义文档的头部，它是所有头部元素的容器。 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等。</p>
      <p>文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。</p>
      <p>下面这些标签可用在 head 部分：<code>&lt;base&gt;, &lt;link&gt;, &lt;meta&gt;, &lt;script&gt;, &lt;style&gt;, &lt;title&gt;。 </code></p>
      <p>其中<code>&lt;title&gt; </code>定义文档的标题，它是 head 部分中唯一必需的元素。</p>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      activeName: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
