<template>
  <el-collapse accordion>
    <el-collapse-item title="1. CSS选择器及其优先级">
      <table><thead><tr><th>选择器</th><th>格式</th><th align="center">优先级权重</th></tr></thead><tbody><tr><td>id选择器</td><td>#id</td><td align="center">100</td></tr><tr><td>类选择器</td><td>#classname</td><td align="center">10</td></tr><tr><td>属性选择器</td><td>a[ref=“eee”]</td><td align="center">10</td></tr><tr><td>伪类选择器</td><td>li:last-child</td><td align="center">10</td></tr><tr><td>标签选择器</td><td>div</td><td align="center">1</td></tr><tr><td>伪元素选择器</td><td>li:after</td><td align="center">1</td></tr><tr><td>相邻兄弟选择器</td><td>h1+p</td><td align="center">0</td></tr><tr><td>子选择器</td><td>ul&gt;li</td><td align="center">0</td></tr><tr><td>后代选择器</td><td>li a</td><td align="center">0</td></tr><tr><td>通配符选择器</td><td>*</td><td align="center">0</td></tr></tbody></table>
      <div style="margin: 20px auto;">对于选择器的优先级：</div>
      <ul>
        <li>标签选择器、伪元素选择器：1</li>
        <li>类选择器、伪类选择器、属性选择器：10</li>
        <li>id 选择器：100</li>
        <li>内联样式：1000</li>
      </ul>
      <div style="margin: 20px auto;">需要注意的是：</div>
      <ul>
        <li>!important声明的样式的优先级最高</li>
        <li>如果优先级相同，则最后出现的样式生效</li>
        <li>继承得到的样式的优先级最低</li>
        <li>通用选择器（*）、子选择器（&gt;）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0</li>
        <li>样式表的来源不同时，优先级顺序为：内联样式&gt; 内部样式 &gt; 外部样式 &gt; 浏览器用户自定义样式 &gt; 浏览器默认样式</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="2. CSS中可继承与不可继承属性有哪些">
      <div style="margin: 20px auto;">一、无继承性的属性</div>
      <ol>
        <li><strong>display</strong>：规定元素应该生成的框的类型</li>
        <li><strong>文本属性</strong>：</li>
      </ol>
      <ul>
        <li>vertical-align：垂直文本对齐</li>
        <li>text-decoration：规定添加到文本的装饰</li>
        <li>text-shadow：文本阴影效果</li>
        <li>white-space：空白符的处理</li>
        <li>unicode-bidi：设置文本的方向</li>
      </ul>
      <ol start="3">
        <li><strong>盒子模型的属性</strong>：width、height、margin 、border、padding</li>
        <li><strong>背景属性</strong>：background、background-color、background-image、background-repeat、background-position、background-attachment</li>
        <li><strong>定位属性</strong>：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index</li>
        <li><strong>生成内容属性</strong>：content、counter-reset、counter-increment</li>
        <li><strong>轮廓样式属性</strong>：outline-style、outline-width、outline-color、outline</li>
        <li><strong>页面样式属性</strong>：size、page-break-before、page-break-after</li>
        <li><strong>声音样式属性</strong>：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during</li>
      </ol>
      <div style="margin: 20px auto;">二、有继承性的属性</div>
      <div style="margin: 20px auto;">1、字体系列属性</div>
      <ul>
        <li>font-family：字体系列</li>
        <li>font-weight：字体的粗细</li>
        <li>font-size：字体的大小</li>
        <li>font-style：字体的风格</li>
      </ul>
      <div style="margin: 20px auto;"><p>2、文本系列属性</p></div>
      <ul>
        <li>text-indent：文本缩进</li>
        <li>text-align：文本水平对齐</li>
        <li>line-height：行高</li>
        <li>word-spacing：单词之间的间距</li>
        <li>letter-spacing：中文或者字母之间的间距</li>
        <li>text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）</li>
        <li>color：文本颜色</li>
      </ul>
      <div style="margin: 20px auto;"><p>3、元素可见性：</p></div>
      <ul>
        <li>visibility：控制元素显示隐藏</li>
      </ul>
      <div style="margin: 20px auto;"><p>4、列表布局属性：</p></div>
      <ul>
        <li>list-style：列表风格，包括list-style-type、list-style-image等</li>
      </ul>
      <div style="margin: 20px auto;"><p>5、光标属性：</p></div>
      <ul>
        <li>cursor：光标显示为何种形态</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="3. display的属性值及其作用"><table><thead><tr><th align="center"><strong>属性值</strong></th><th align="center"><strong>作用</strong></th></tr></thead><tbody><tr><td align="center">none</td><td align="center">元素不显示，并从文档流中移除。</td></tr><tr><td align="center">block</td><td align="center">块类型。默认宽度为父元素宽度，可设置宽高，换行显示。</td></tr><tr><td align="center">inline</td><td align="center">行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。</td></tr><tr><td align="center">inline-block</td><td align="center">默认宽度为内容宽度，可以设置宽高，同行显示。</td></tr><tr><td align="center">list-item</td><td align="center">像块类型元素一样显示，并添加样式列表标记。</td></tr><tr><td align="center">table</td><td align="center">此元素会作为块级表格来显示。</td></tr><tr><td align="center">inherit</td><td align="center">规定应该从父元素继承display属性的值。</td></tr></tbody></table></el-collapse-item>
    <el-collapse-item title="4. 单行、多行文本溢出隐藏">
      <ul>
        <li>单行文本溢出</li>
      </ul>
      <pre>
        <code class="hljs language-css copyable" lang="css">
          <span class="hljs-attribute">overflow</span>: hidden;            // 溢出隐藏
          <span class="hljs-attribute">text-overflow</span>:ellipsis;      // 文本溢出时发生的事，ellipsis表示用省略号代替溢出的文本
          <span class="hljs-attribute">white-space</span>: nowrap;         // 规定段落中的文本不进行换行
        </code>
      </pre>
      <ul>
        <li>多行文本溢出</li>
      </ul>
      <pre>
        <code class="hljs language-css copyable" lang="css">
          <span class="hljs-attribute">overflow</span>: hidden;            // 溢出隐藏
          <span class="hljs-attribute">text-overflow</span>: ellipsis;     // 溢出用省略号显示
          <span class="hljs-attribute">display</span>:-webkit-box;         // 作为弹性伸缩盒子模型显示。
          -webkit-box-orient:vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
          -webkit-line-clamp:<span class="hljs-number">3</span>;        // 显示的行数
        </code>
      </pre>
      <p>注意：由于上面的三个属性都是CSS3的属性，没有浏览器可以兼容，所以要在前面加一个<code>-webkit-</code>来兼容一部分浏览器。<a name="user-content-wP7pW"></a></p>
    </el-collapse-item>
    <el-collapse-item title="5. 隐藏元素的方法有哪些">
      <ul>
        <li><strong>display:none</strong>：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。</li>
        <li><strong>visibility:hidden</strong>：元素在页面中仍占据空间，但是不会响应绑定的监听事件。</li>
        <li><strong>opacity:0</strong>：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。</li>
        <li><strong>position: absolute</strong>：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。</li>
        <li><strong>z-index 负值</strong>：来使其他元素遮盖住该元素，以此来实现隐藏。</li>
        <li><strong>clip/clip-path</strong> ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。</li>
        <li><strong>transform:scale(0,0)</strong>：将元素缩放为 0，以此来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
          <a name="user-content-2kC58"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="6. link和@import的区别">
      <p>两者都是外部引用CSS的方式，它们的区别如下：</p>
      <ul>
        <li>link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。</li>
        <li>link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。</li>
        <li>link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。</li>
        <li>link支持使用Javascript控制DOM去改变样式；而@import不支持。
          <a name="user-content-Ne3KP"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="7. transition和animation的区别">
      <ul>
        <li><strong>transition是过度属性</strong>，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，设置一个开始关键帧，一个结束关键帧。</li>
        <li><strong>animation是动画属性</strong>，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。他也类似于flash的补间动画，但是他可以设置多个关键帧（用@keyframe定义）完成动画。
          <a name="user-content-0dm4Q"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="8. display:none与visibility:hidden的区别">
      <p>这两个属性都是让元素隐藏，不可见。<strong>区别：</strong></p>
      <p>（1）<strong>在渲染树中</strong></p>
      <ul>
        <li><code>display:none</code>会让元素完全中渲染树中消失，渲染的时候不会占据任何空间；</li>
        <li><code>visibility:hidden</code>不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见</li>
      </ul>
      <p>（2）<strong>继承</strong></p>
      <ul>
        <li><code>display:none</code>是非继承属性，他的子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示。</li>
        <li><code>visibility:hidden</code>是继承属性，子孙节点消失是由于继承了<code>hidden</code>，通过设置<code>visibility:visible</code>可以让子孙节点显示。</li>
      </ul>
      <p>（3）修改常规文档流中的元素的</p>
      <code>display</code>通常会造成文档的重排，但是修改<code>visibility</code>属性只会造成本元素的重绘
      <p>（4）如果使用读屏器，设置为</p>
      <code>display:none</code>的内容不会被读取，设置为<code>visibility:hidden</code>的内容会被读取。<code>visibility:hidden</code>
      <a name="user-content-BQMwB"></a>
    </el-collapse-item>
    <el-collapse-item title="9. 伪元素和伪类的区别和作用？">
      <ul>
        <li>伪元素 -- 在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="10. 对requestAnimationframe的理解">
      <p>实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，css3 可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 还提供一个专门用于请求动画的API，那就是 requestAnimationFrame，顾名思义就是请求动画帧。
        先看一下MDN对该方法的描述：</p>
      <blockquote>
        <p>window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行</p>
      </blockquote>
      <p><strong>语法：</strong> <code>window.requestAnimationFrame(callback);</code>
        其中，callback是<strong>下一次重绘之前更新动画帧所调用的函数</strong>(即上面所说的回调函数)。该回调函数会被传入DOMHighResTimeStamp参数，它表示requestAnimationFrame() 开始去执行回调函数的时刻。该方法属于<strong>宏任务</strong>，所以会在执行完微任务之后再去执行。</p>
      <p><strong>取消动画：</strong> 使用cancelAnimationFrame()来取消执行动画，该方法接收一个参数——requestAnimationFrame默认返回的id，cancelAnimationFrame只需要传入这个id就可以取消动画了。</p>
      <p><strong>优势：</strong></p>
      <ul>
        <li>
          <p><strong>CPU节能</strong>：使用SetTinterval 实现的动画，当页面被隐藏或最小化时，SetTinterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而RequestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的RequestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。</p>
        </li>
        <li>
          <p><strong>函数节流</strong>：在高频率事件( resize, scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。</p>
        </li>
        <li>
          <p><strong>减少DOM操作</strong>： requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。</p>
        </li>
      </ul>
      <p><strong>setTimeout执行动画的缺点</strong>： 它通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：</p>
      <ul>
        <li>settimeout任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；</li>
        <li>settimeout的固定时间间隔不一定与屏幕刷新时间相同，会引起丢帧。
          <a name="user-content-P1VpT"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="11. 对盒模型的理解">
      <p>CSS3中的盒模型有以下两种：标准盒模型、IE盒模型
        <img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603600820746-e10daafa-451a-454e-9705-f8c358769d5b.png#align=left&amp;display=inline&amp;height=366&amp;margin=%5Bobject%20Object%5D&amp;originHeight=455&amp;originWidth=746&amp;size=0&amp;status=done&amp;style=none&amp;width=600" alt="" loading="lazy" class="medium-zoom-image">
        <img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603600820555-dc6ed390-d47e-412b-942a-857bbe5f280d.png#align=left&amp;display=inline&amp;height=368&amp;margin=%5Bobject%20Object%5D&amp;originHeight=462&amp;originWidth=791&amp;size=0&amp;status=done&amp;style=none&amp;width=630" alt="" loading="lazy" class="medium-zoom-image">
        盒模型都是由四个部分组成的，分别是margin、border、padding和content。</p>
      <p>标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同：</p>
      <ul>
        <li>标准盒模型的width和height属性的范围只包含了content，</li>
        <li>IE盒模型的width和height属性的范围包含了border、padding和content。</li>
      </ul>
      <p>一般来说，我们可以通过修改元素的box-sizing属性来改变元素的盒模型。</p>
      <ul>
        <li><code>box-sizeing:content-box</code>表示标准盒模型（默认值）</li>
        <li><code>box-sizeing:border-box</code>表示IE盒模型（也就是怪异盒模型）
          <a name="user-content-5ZAjr"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="12. Canvas和SVG的区别">
      <p><strong>（1）SVG：</strong>
        SVG可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言XML描述的2D图形的语言，SVG基于XML就意味着SVG DOM中的每个元素都是可用的，可以为某个元素附加Javascript事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。</p>
      <p>其特点如下：</p>
      <ul>
        <li>不依赖分辨率</li>
        <li>支持事件处理器</li>
        <li>最适合带有大型渲染区域的应用程序（比如谷歌地图）</li>
        <li>复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）</li>
        <li>不适合游戏应用</li>
      </ul>
      <p><strong>（2）Canvas：</strong>
        Canvas是画布，通过Javascript来绘制2D图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。</p>
      <p>其特点如下：</p>
      <ul>
        <li>依赖分辨率</li>
        <li>不支持事件处理器</li>
        <li>弱的文本渲染能力</li>
        <li>能够以 .png 或 .jpg 格式保存结果图像</li>
        <li>最适合图像密集型的游戏，其中的许多对象会被频繁重绘</li>
      </ul>
      <p>注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。
        <a name="user-content-WX3Bs"></a></p>
    </el-collapse-item>
    <el-collapse-item title="13. CSS中有哪些是空元素？">
      <p>空元素，即没有内容的HTML元素。空元素是在开始标签中关闭的，也就是说空元素没有闭合标签的。
        常见的有：<code>&lt;br&gt;</code>、<code>&lt;hr&gt;</code>、<code>&lt;img&gt;</code>、<code>&lt;input&gt;</code>、<code>&lt;link&gt;</code>、<code>&lt;meta&gt;</code>
        鲜见的有：<code>&lt;area&gt;</code>、<code>&lt;base&gt;</code>、<code>&lt;col&gt;</code>、<code>&lt;colgroup&gt;</code>、<code>&lt;command&gt;</code>、<code>&lt;embed&gt;</code>、<code>&lt;keygen&gt;</code>、<code>&lt;param&gt;</code>、<code>&lt;source&gt;</code>、<code>&lt;track&gt;</code>、<code>&lt;wbr&gt;</code>
        <a name="user-content-ft5Uf"></a></p>
    </el-collapse-item>
    <el-collapse-item title="14. CSS3中有哪些新特性">
      <ul>
        <li>新增各种CSS选择器 （: not(.input)：所有 class 不是“input”的节点）</li>
        <li>圆角 （border-radius:8px）</li>
        <li>多列布局 （multi-column layout）</li>
        <li>阴影和反射 （Shadow\Reflect）</li>
        <li>文字特效 （text-shadow、）</li>
        <li>文字渲染 （Text-decoration）</li>
        <li>线性渐变 （gradient）</li>
        <li>旋转 （transform）</li>
        <li>增加了旋转,缩放,定位,倾斜,动画,多背景</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="15. 替换元素的概念及计算规则">
      <p>通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，<img loading="lazy" class="medium-zoom-image">、、、或者表单元素和和都是典型的替换元素。</p>
      <p>替换元素除了内容可替换这一特性以外，还有以下一些特性：</p>
      <ul>
        <li><strong>内容的外观不受页面上的CSS的影响</strong>：用专业的话讲就是在样式表现在CSS作用域之外。如何更改替换元素本身的外观需要类似appearance属性，或者浏览器自身暴露的一些样式接口。</li>
        <li><strong>有自己的尺寸</strong>：在Web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸（不包括边框）是300像素×150像素，如、或者等，也有少部分替换元素为0像素，如图片，而表单元素的替换元素的尺寸则和浏览器有关，没有明显的规律。
        </li><li><strong>在很多CSS属性上有自己的一套表现规则</strong>：比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。</li>
        <li><strong>所有的替换元素都是内联水平元素</strong>：也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。但是，替换元素默认的display值却是不一样的，有的是inline，有的是inline-block。</li>
      </ul>
      <p>替换元素的尺寸从内而外分为3类：</p>
      <ul>
        <li><strong>固有尺寸：</strong> 指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时候，都是有着自己的宽度和高度的。</li>
        <li><strong>HTML尺寸：</strong> 只能通过HTML原生属性改变，这些HTML原生属性包括<img loading="lazy" class="medium-zoom-image">的width和height属性、<input type="checkbox" disabled="">的size属性、的cols和rows属性等。
        </li><li><strong>CSS尺寸：</strong> 特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸，对应盒尺寸中的content box。</li>
      </ul>
      <p>这3层结构的计算规则具体如下：</p>
      <p>（1）如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高。</p>
      <p>（2）如果没有CSS尺寸，则使用HTML尺寸作为最终的宽高。</p>
      <p>（3）如果有CSS尺寸，则最终尺寸由CSS属性决定。</p>
      <p>（4）如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示。</p>
      <p>（5）如果上面的条件都不符合，则最终宽度表现为300像素，高度为150像素。</p>
      <p>（6）内联替换元素和块级替换元素使用上面同一套尺寸计算规则。<a name="user-content-2sCyA"></a></p>
    </el-collapse-item>
    <el-collapse-item title="16. 常见的图片格式有哪些，使用场景">
      <p>（1）<strong>BMP</strong>，是无损的、既支持索引色也支持直接色的、点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常 具有较大的文件大小。</p>
      <p>（2）<strong>GIF</strong>是无损的、采用索引色的、点阵图。采用LZW压缩算法进行编码。文件小，是GIF格式的优点，同时，GIF格式还具 有支持动画以及透明的优点。但，GIF格式仅支持8bit的索引色，所以GIF格式适用于对色彩要求不高同时需要文件体积 较小的场景。</p>
      <p>（3）<strong>JPEG</strong>是有损的、采用直接色的、点阵图。JPEG的图片的优点，是采用了直接色，得益于更丰富的色彩，JPEG非常适合用来 存储照片，与GIF相比，JPEG不适合用来存储企业Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用， 又会导致图片文件较GIF更大。</p>
      <p>（4）<strong>PNG-8</strong>是无损的、使用索引色的、点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的 情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。现在，除非需要动画的支持，否则我们没有理由使用GIF而不是PNG-8。</p>
      <p>（5）<strong>PNG-24</strong>是无损的、使用直接色的、点阵图。PNG-24的优点在于，它压缩了图片的数据，使得同样效果的图片，PNG-24格 式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。</p>
      <p>（6）<strong>SVG</strong>是无损的、矢量图。SVG是矢量图。这意味着SVG图片由直线和曲线以及绘制它们的方法组成。当你放大一个SVG图 片的时候，你看到的还是线和曲线，而不会出现像素点。这意味着SVG图片在放大时，不会失真，所以它非常适合用来绘制企 业Logo、Icon等。</p>
      <p>（7）<strong>WebP</strong>是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的、点阵图。从名字就可以看出来它是 为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片， 如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。</p>
      <ul>
        <li>在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；</li>
        <li>在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；</li>
        <li>WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。</li>
      </ul>
      <p>目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。<a name="user-content-vW3V2"></a></p>
    </el-collapse-item>
    <el-collapse-item title="17. 阐述一下 CSSSprites">
      <p>CSSSprites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的background-image，background-repeat，background-position的组合进行背景定位。利用CSSSprites能很好地减少网页的http请求，从而很好的提高页面的性能；CSSSprites能减少图片的字节。</p>
      <p><strong>优点：</strong></p>
      <ul>
        <li>减少HTTP请求数，极大地提高页面加载速度</li>
        <li>增加图片信息重复度，提高压缩比，减少图片大小</li>
        <li>更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现</li>
      </ul>
      <p><strong>缺点：</strong></p>
      <ul>
        <li>图片合并麻烦</li>
        <li>维护麻烦，修改一个图片可能需要重新布局整个图片，样式
          <a name="user-content-q4qc7"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="18. 什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？">
      <p>以 iPhone XS 为例，当我们在写 CSS 代码时，针对于我们的单位 px，其宽度为 414px &amp; 896px，也就是说当我们赋予一个 DIV 414px，这个 DIV 就会填满手机的宽度；</p>
      <p>而如果我们有一把尺子来实际测量这部手机的物理像素，实际为 1242*2688 物理像素；经过计算可知，1242/414=3，也就是说，在单边上，一个逻辑像素=3个物理像素，我们就说这个屏幕的像素密度为 3，也就是我们常说的 3 倍屏。</p>
      <p>对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。
        <img src="https://cdn.nlark.com/yuque/0/2020/jpeg/1500604/1605252903834-27a1d90a-7e04-49bc-822a-dadcf974c141.jpeg#align=left&amp;display=inline&amp;height=1478&amp;margin=%5Bobject%20Object%5D&amp;originHeight=1478&amp;originWidth=1600&amp;size=0&amp;status=done&amp;style=stroke&amp;width=1600" alt="" loading="lazy" class="medium-zoom-image">
        当然，也有一个简单粗暴的适配方案，就是针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。</p>
      <p>还可以使用 CSS 媒体查询来判断不同的像素密度，从而选择不同的图片:</p>
      <pre><code class="hljs language-javascript copyable" lang="javascript">my-image { <span class="hljs-attr">background</span>: (low.png); }
          @media only screen and (min-device-pixel-ratio: <span class="hljs-number">1.5</span>) {
          #my-image { <span class="hljs-attr">background</span>: (high.png); }
         </code></pre>
    </el-collapse-item>
    <el-collapse-item title="19. margin和padding分别适合什么场景使用？">
      <ul>
        <li>需要在border外侧添加空白，且空白处不需要背景（色）时，使用 margin</li>
        <li>需要在border内测添加空白，且空白处需要背景（色）时，使用 padding
          <a name="user-content-5QDVL"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="20. 对line-height 的理解及其赋值方式">
      <p><strong>（1）line-height的概念：</strong></p>
      <ul>
        <li>line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离</li>
        <li>如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的</li>
        <li>一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容</li>
        <li>把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中</li>
        <li>line-height 和 height 都能撑开一个高度，height 会触发 haslayout，而 line-height 不会</li>
      </ul>
      <p><strong>（2）line-height 的赋值方式：</strong></p>
      <ul>
        <li>带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高</li>
        <li>纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px</li>
        <li>百分比：将计算后的值传递给后代</li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="21. li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？">
      <p>浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格。而为了美观。我们通常是一个<code>&lt;li&gt;</code>放在一行，这导致<code>&lt;li&gt;</code>换行后产生换行字符，它变成一个空格，占用了一个字符的宽度。</p>
      <p><strong>解决办法：</strong></p>
      <p>（1）为<code>&lt;li&gt;</code>设置float:left。不足：有些容器是不能设置浮动，如左右切换的焦点图等。</p>
      <p>（2）将所有<code>&lt;li&gt;</code>写在同一行。不足：代码不美观。</p>
      <p>（3）将<code>&lt;ul&gt;</code>内的字符尺寸直接设为0，即font-size:0。不足：<code>&lt;ul&gt;</code>中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。</p>
      <p>（4）消除<code>&lt;ul&gt;</code>的字符间隔letter-spacing:-8px，不足：这也设置了<code>&lt;li&gt;</code>内的字符间隔，因此需要将<code>&lt;li&gt;</code>内的字符间隔设为默认letter-spacing:normal。
        <a name="user-content-CndkW"></a></p>
    </el-collapse-item>
    <el-collapse-item title="22. CSS 优化、提高性能的方法有哪些？">
      <p>（1）css压缩：将写好的css进行打包压缩，可以减少很多的体积。</p>
      <p>（2）css单一样式：当需要下边距和左边距的时候，很多时候选择:margin:top 0 bottom 0;但margin-bottom:bottom;margin-left:left;执行的效率更高。</p>
      <p>（3）减少使用@import,而建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。</p>
      <p><strong>选择器性能：</strong></p>
      <p>（1）关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；</p>
      <p>（2）如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。</p>
      <p>（3）避免使用通配规则，如*{}计算次数惊人！只对需要用到的元素进行选择。</p>
      <p>（4）尽量少的去对标签进行选择，而是用class。</p>
      <p>（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。</p>
      <p>（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。</p>
      <p><strong>渲染性能：</strong></p>
      <p>（1）慎重使用高性能属性：浮动、定位。</p>
      <p>（2）尽量减少页面重排、重绘。</p>
      <p>（3）去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。</p>
      <p>（4）属性值为0时，不加单位。</p>
      <p>（5）属性值为浮动小数0.**，可以省略小数点之前的0。</p>
      <p>（6）标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。</p>
      <p>（7）不使用@import前缀，它会影响css的加载速度。</p>
      <p>（8）选择器优化嵌套，尽量避免层级过深。</p>
      <p>（9）css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。</p>
      <p>（10）正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。</p>
      <p>（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。</p>
      <p><strong>可维护性、健壮性：</strong></p>
      <p>（1）将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。</p>
      <p>（2）样式与内容分离：将css代码定义到外部css中。
        <a name="user-content-99tt9"></a></p>
    </el-collapse-item>
    <el-collapse-item title="23. 常见的CSS布局单位">
      <p>常用的布局单位包括像素（<code>px</code>），百分比（<code>%</code>），<code>em</code>，<code>rem</code>，<code>vw/vh</code>。</p>
      <p><strong>（1）像素</strong>（<code>px</code>）是页面布局汇总的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS像素和物理像素。两者区别如下：</p>
      <ul>
        <li><strong>CSS像素</strong>：为web开发者提供，在CSS中使用的一个抽象单位；</li>
        <li><strong>物理像素</strong>：只与设备的硬件密度有关，任何设备的物理像素都是固定的。</li>
      </ul>
      <p><strong>（2）百分比</strong>（<code>%</code>），当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般我们的直观理解都会认为子元素的百分比完全相对于直接父元素。</p>
      <p><strong>（3）em和rem</strong>相对于px更具灵活性，它们都是相对长度单位，而它们之间的区别可以用一句话来概括：<strong>em相对于父元素，rem相对于根元素。</strong></p>
      <ul>
        <li><strong>em：</strong> 文本相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸(默认16px)。(相对父元素的字体大小倍数)</li>
        <li><strong>rem：</strong> rem是CSS3新增的一个相对单位（root em，根em），相对于根元素(即html元素)font-size计算值的倍数只相对于根元素的大小。<strong>作用</strong>：利用rem可以实现简单的响应式布局，可以利用html元素中字体的大小与屏幕间的比值设置font-size的值实现当屏幕分辨率变化时让元素也变化。</li>
      </ul>
      <p><strong>（4）vw/vh</strong>是与视图窗口有关的单位，vw表示相对于视图窗口的宽度，vh表示相对于视图窗口高度，除了vw和vh外，还有vmin和vmax两个相关的单位。</p>
      <ul>
        <li>vw：相对于视窗的宽度，视窗宽度是100vw</li>
        <li>vh：相对于视窗的高度，视窗高度是100vh</li>
        <li>vmin：vw和vh中的较小值</li>
        <li>vmax：vw和vh中的较大值</li>
      </ul>
      <p><strong>vw/vh</strong> 和百分比很类似，但是还是有区别的：</p>
      <ul>
        <li>百分比（<code>%</code>）：大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate等)</li>
        <li>vw/vm：相对于视窗的尺寸
          <a name="user-content-QqEXq"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="24. px、em、rem的区别及使用场景">
      <p><strong>三者的区别：</strong></p>
      <ul>
        <li>px是固定的像素，一旦设置了就无法因为适应页面大小而改变。</li>
        <li>em和rem相对于px更具有灵活性，他们是相对长度单位，意思是长度不是固定的，更适用于响应式布局。</li>
        <li>em是相对于其父元素来设置字体大小的，一般都是以的“<a href="https://www.baidu.com/s?wd=font-size&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao" target="_blank" rel="nofollow noopener noreferrer">font-size</a>”为基准。这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而rem是相对于根元素，这样就意味着，我们只需要在根元素确定一个参考值。</li>
      </ul>
      <p><strong>使用场景：</strong></p>
      <ul>
        <li>对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可 。</li>
        <li>对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备。
          <a name="user-content-Qi7NF"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="25. 两栏布局的实现">
      <p>一般两栏布局指的是左边一栏宽度固定，右边一栏宽度自适应，两栏布局的具体实现：</p>
      <ul>
        <li>利用浮动，将左边元素宽度设置为200px，并且设置向左浮动。将右边元素的margin-left设置为200px，宽度设置为auto（默认为auto，撑满整个父元素）。</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;

  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;

  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">200px</span>;

  <span class="hljs-attribute">width</span>: auto;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;

  <span class="hljs-attribute">background</span>: gold;
}
</code></pre>
      <ul>
        <li>利用flex布局，将左边元素的放大和缩小比例设置为0，基础大小设置为200px。将右边的元素的放大比例设置为1，缩小比例设置为1，基础大小设置为auto。</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">display</span>: flex;

  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">flex-basis</span>: <span class="hljs-number">200px</span>;

  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">flex</span>: auto;
  <span class="hljs-comment">/*11auto*/</span>

  <span class="hljs-attribute">background</span>: gold;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>利用绝对定位布局的方式，将父级元素设置相对定位。左边元素设置为absolute定位，并且宽度设置为</li>
      </ul>
      <p>200px。将右边元素的margin-left的值设置为200px。</p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: tomato;
}
<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: gold;
}
</code></pre>
    </el-collapse-item>
    <el-collapse-item title="26. 三栏布局的实现">
      <p>三栏布局一般指的是页面中一共有三栏，左右两栏宽度固定，中间自适应的布局，三栏布局的具体实现：</p>
      <ul>
        <li>利用绝对定位的方式，左右两栏设置为绝对定位，中间设置对应方向大小的margin的值。</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">position</span>: absolute;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: gold;
}

<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: lightgreen;
}
</code></pre>
      <ul>
        <li>利用flex布局的方式，左右两栏的放大和缩小比例都设置为0，基础大小设置为固定的大小，中间一栏设置为auto</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">00100px</span>;
  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">flex</span>: <span class="hljs-number">00200px</span>;
  <span class="hljs-attribute">background</span>: gold;
}

<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">flex</span>: auto;
  <span class="hljs-attribute">background</span>: lightgreen;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>利用浮动的方式，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的margin值，注意这种方式，中间一栏必须放到最后</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">float</span>: right;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: gold;
}

<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">background</span>: lightgreen;
}

<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>圣杯布局，利用浮动和负边距来实现。父级元素设置左右的 padding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边。</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">200px</span>;
}

<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">left</span>: -<span class="hljs-number">100px</span>;

  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">200px</span>;

  <span class="hljs-attribute">float</span>: right;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: gold;
}

<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">float</span>: left;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: lightgreen;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>双飞翼布局，双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元素的 padding 来实现的。本质上来说，也是通过浮动和外边距负值来实现的。</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.outer</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}

<span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: tomato;
}

<span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">200px</span>;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: gold;
}

<span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">float</span>: left;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: lightgreen;
}

<span class="hljs-selector-class">.center</span> {
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><a name="user-content-op8L2"></a></p>
    </el-collapse-item>
    <el-collapse-item title="27. 水平垂直居中的实现">
      <p>水平垂直居中的具体实现：</p>
      <ul>
        <li>利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过translate来调整元素的中心点到页面的中心。该方法需要<strong>考虑浏览器兼容问题。</strong></li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-<span class="hljs-number">50%</span>,-<span class="hljs-number">50%</span>);
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>利用绝对定位，设置四个方向的值都为0，并将margin设置为auto，由于宽高固定，因此对应方向实现平分，可以实现水平和垂直方向上的居中。该方法适用于<strong>盒子有宽高</strong>的情况</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>利用绝对定位，先将元素的左上角通过top:50%和left:50%定位到页面的中心，然后再通过margin负值来调整元素的中心点到页面的中心。该方法适用于<strong>盒子宽高已知</strong>的情况</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">50px</span>;     <span class="hljs-comment">/* 自身 height 的一半 */</span>
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;    <span class="hljs-comment">/* 自身 width 的一半 */</span>
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>使用flex布局，通过align-items:center和justify-content:center设置容器的垂直和水平方向上为居中对齐，然后它的子元素也可以实现垂直和水平的居中。该方法要<strong>考虑兼容的问题</strong>，该方法在移动端用的较多</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>:center;
    <span class="hljs-attribute">align-items</span>:center;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><a name="user-content-xxI1e"></a></p>
    </el-collapse-item>
    <el-collapse-item title="28. 如何根据设计稿进行移动端适配？">
      <p>移动端适配主要有两个维度：</p>
      <ul>
        <li><strong>适配不同像素密度</strong>。这一部分比较简单，针对不同的像素密度，使用 CSS 媒体查询，选择不同精度的图片，以保证图片不会失真</li>
        <li><strong>适配不同屏幕大小</strong>。由于不同的屏幕有着不同的逻辑像素大小，所以如果直接使用 px 作为开发单位，会使得开发的页面在某一款手机上可以准确显示，但是在另一款手机上就会失真。为了适配不同屏幕的大小，应按照比例来还原设计稿的内容。</li>
      </ul>
      <p>为了能让页面的尺寸自适应，可以使用 rem，em，vw，vh 等相对单位。
        <a name="user-content-xcbkf"></a></p>
    </el-collapse-item>
    <el-collapse-item title="29. 对Flex布局的理解及其使用场景">
      <p>Flex是FlexibleBox的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。</p>
      <p>任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。注意，设为Flex布局以后，子元素的float、cl
        ear和vertical-align属性将失效。</p>
      <p>采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex
        项目（flex item），简称"项目"。</p>
      <p>容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。</p>
      <p>以下6个属性设置在<strong>容器上</strong>：</p>
      <ul>
        <li>flex-direction属性决定主轴的方向（即项目的排列方向）。</li>
        <li>flex-wrap属性定义，如果一条轴线排不下，如何换行。</li>
        <li>flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。</li>
        <li>justify-content属性定义了项目在主轴上的对齐方式。</li>
        <li>align-items属性定义项目在交叉轴上如何对齐。</li>
        <li>align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。</li>
      </ul>
      <p>以下6个属性设置在<strong>项目上</strong>：</p>
      <ul>
        <li>order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。</li>
        <li>flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。</li>
        <li>flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。</li>
        <li>flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。</li>
        <li>flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。</li>
        <li>align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。</li>
      </ul>
      <p><strong>简单来说：</strong></p>
      <p>flex布局是CSS3新增的一种布局方式，我们可以通过将一个元素的display属性值设置为flex从而使它成为一个flex
        容器，它的所有子元素都会成为它的项目。</p>
      <p>一个容器默认有两条轴，一个是水平的主轴，一个是与主轴垂直的交叉轴。我们可以使用flex-direction来指定主轴的方向。
        我们可以使用justify-content来指定元素在主轴上的排列方式，使用align-items来指定元素在交叉轴上的排列方式。还
        可以使用flex-wrap来规定当一行排列不下时的换行方式。</p>
      <p>对于容器中的项目，我们可以使用order属性来指定项目的排列顺序，还可以使用flex-grow来指定当排列空间有剩余的时候，项目的放大比例。还可以使用flex-shrink来指定当排列空间不足时，项目的缩小比例。</p>
    </el-collapse-item>
    <el-collapse-item title="30. 为什么需要清除浮动？清除浮动的方式">
      <p><strong>浮动的定义：</strong> 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。 此时，内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）。</p>
      <p><strong>浮动的工作原理：</strong></p>
      <ul>
        <li>浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）</li>
        <li>浮动元素碰到包含它的边框或者其他浮动元素的边框停留</li>
      </ul>
      <p>浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“高度塌陷”。</p>
      <p><strong>浮动元素引起的问题？</strong></p>
      <ul>
        <li>父元素的高度无法被撑开，影响与父元素同级的元素</li>
        <li>与浮动元素同级的非浮动元素会跟随其后</li>
      </ul>
      <p><strong>清除浮动的方式如下：</strong></p>
      <ul>
        <li>给父级div定义<code>height</code>属性</li>
        <li>最后一个浮动元素之后添加一个空的div标签，并添加<code>clear:both</code>样式</li>
        <li>包含浮动元素的父级标签添加<code>overflow:hidden</code>或者<code>overflow:auto</code></li>
        <li>使用 :after 伪元素。由于IE6-7不支持 :after，使用 zoom:1 触发 hasLayout**</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.clearfix</span>:after{
    content: <span class="hljs-string">"\200B"</span>;
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">clear</span>: both;
  }
  <span class="hljs-selector-class">.clearfix</span>{
    *zoom: <span class="hljs-number">1</span>;
  }
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="31. 使用 clear 属性清除浮动的原理？">
      <p>使用clear属性清除浮动，其语法如下：</p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-attribute">clear</span>:none|left|right|both
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>如果单看字面意思，clear:left应该是“清除左浮动”，clear:right应该是“清除右浮动”的意思，实际上，这种解释是有问题的，因为浮动一直还在，并没有清除。</p>
      <p>官方对clear属性的解释是：“<strong>元素盒子的边不能和前面的浮动元素相邻</strong>”，我们对元素设置clear属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动。</p>
      <p>还需要注意的一点是clear属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“前面的”3个字，也就是clear属性对“后面的”浮动元素是不闻不问的。考虑到float属性要么是left，要么是right，不可能同时存在，同时由于clear属性对“后面的”浮动元素不闻不问，因此，当clear:left有效的时候，clear:right必定无效，也就是此时clear:left等同于设置clear:both；同样地，clear:right如果有效也是等同于设置clear:both。由此可见，clear:left和clear:right这两个声明就没有任何使用的价值，至少在CSS世界中是如此，直接使用clear:both吧。</p>
      <p>一般使用伪元素的方式清除浮动：</p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.clear</span><span class="hljs-selector-pseudo">::after</span>{
<span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>;
<span class="hljs-attribute">display</span>:table;//也可以是'block'，或者是'list-item'
<span class="hljs-attribute">clear</span>:both;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>clear属性只有块级元素才有效的，而::after等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置display属性值的原因。
        <a name="user-content-mPifR"></a></p>
    </el-collapse-item>
    <el-collapse-item title="32. 对BFC的理解，如何创建BFC">
      <p>块格式化上下文（Block Formatting Context，BFC）是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。</p>
      <p>通俗来讲：</p>
      <ul>
        <li>BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。</li>
        <li>如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。</li>
      </ul>
      <p><strong>创建BFC的条件：</strong></p>
      <ul>
        <li>根元素：body</li>
        <li>元素设置浮动：float 除 none 以外的值</li>
        <li>元素设置绝对定位：position (absolute、fixed)</li>
        <li>display 值为：inline-block、table-cell、table-caption、flex等</li>
        <li>overflow 值为：hidden、auto、scroll</li>
      </ul>
      <p><strong>BFC的特点：</strong></p>
      <ul>
        <li>垂直方向上，自上而下排列，和文档流的排列方式一致。</li>
        <li>在BFC中上下相邻的两个容器的margin会重叠（也就是上面第六题提到的问题）</li>
        <li>计算BFC的高度时，需要计算浮动元素的高度</li>
        <li>BFC区域不会与浮动的容器发生重叠</li>
        <li>BFC是独立的容器，容器内部元素不会影响外部元素</li>
        <li>每个元素的左margin值和容器的左border相接触</li>
      </ul>
      <p><strong>BFC的作用：</strong></p>
      <ul>
        <li>
          <p><strong>解决margin的重叠问题</strong>：由于BFC是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个BFC，就解决了margin重叠的问题。</p>
        </li>
        <li>
          <p><strong>解决高度塌陷的问题</strong>：我们在 对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要把父元素变成一个BFC就行了。常用的办法是给父元素设置<code>overflow:hidden</code>。</p>
        </li>
        <li>
          <p><strong>创建自适应两栏布局</strong>：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。</p>
        </li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.left</span>{
     <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
     <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
     <span class="hljs-attribute">background</span>: red;
     <span class="hljs-attribute">float</span>: left;
 }
 <span class="hljs-selector-class">.right</span>{
     <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
     <span class="hljs-attribute">background</span>: blue;
     <span class="hljs-attribute">overflow</span>: hidden;
 }

&lt;<span class="hljs-selector-tag">div</span> class="<span class="hljs-attribute">left</span>"&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
&lt;<span class="hljs-selector-tag">div</span> class="<span class="hljs-attribute">right</span>"&gt;&lt;/<span class="hljs-selector-tag">div</span>&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>左侧设置<code>float:left</code>，右侧设置ve<code>rflow: hidden</code>。这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。
        <a name="user-content-wW3ds"></a></p>
    </el-collapse-item>
    <el-collapse-item title="33. 什么是margin重叠问题？如何解决？">
      <p><strong>问题描述：</strong>
        两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会取其中外边距值大的那个，这种行为就是外边距折叠。需要注意的是，<strong>浮动的元素和绝对定位</strong>这种脱离文档流的元素的外边距不会折叠。重叠只会出现在<strong>垂直方向</strong>。</p>
      <p><strong>计算原则：</strong>
        折叠合并后外边距的计算原则如下：</p>
      <ul>
        <li>如果两者都是正数，那么就去最大者</li>
        <li>如果是一正一负，就会正值减去负值的绝对值</li>
        <li>两个都是负值时，用0减去两个中绝对值大的那个</li>
      </ul>
      <p><strong>解决办法：</strong></p>
      <p>对于折叠的情况，主要有两种：<strong>兄弟之间重叠</strong>和<strong>父子之间重叠</strong></p>
      <p>（1）兄弟之间重叠</p>
      <ul>
        <li>底部元素变为行内盒子：<code>display: inline-block</code></li>
        <li>底部元素设置浮动：<code>float</code></li>
        <li>底部元素的position的值为<code>absolute/fixed</code></li>
      </ul>
      <p>（2）父子之间重叠</p>
      <ul>
        <li>父元素加入：<code>overflow: hidden</code></li>
        <li>父元素添加透明边框：<code>border:1px solid transparent</code></li>
        <li>子元素变为行内盒子：<code>display: inline-block</code></li>
        <li>子元素加入浮动属性或定位
          <a name="user-content-bawba"></a></li>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="34. 元素的层叠顺序">
      <p>层叠顺序，英文称作 stacking order，表示元素发生层叠时有着特定的垂直显示顺序。下面是盒模型的层叠规则：</p>
      <p>对于上图，由上到下分别是：</p>
      <p>（1）背景和边框：建立当前层叠上下文元素的背景和边框。</p>
      <p>（2）负的z-index：当前层叠上下文中，z-index属性值为负的元素。</p>
      <p>（3）块级盒：文档流内非行内级非定位后代元素。</p>
      <p>（4）浮动盒：非定位浮动元素。</p>
      <p>（5）行内盒：文档流内行内级非定位后代元素。</p>
      <p>（6）z-index:0：层叠级数为0的定位元素。</p>
      <p>（7）正z-index：z-index属性值为正的定位元素。
        **</p>
      <p><strong>特别说明:</strong> 当定位元素z-index:auto，生成盒在当前层叠上下文中的层级为 0，不会建立新的层叠上下文，除非是根元素。
        <a name="user-content-oSdS5"></a></p>
    </el-collapse-item>
    <el-collapse-item title="35. position的属性有哪些，区别是什么">
      <p>position有以下属性值：</p>
      <table><thead><tr><th>属性值</th><th>概述</th></tr></thead><tbody><tr><td>absolute</td><td>生成绝对定位的元素，相对于static定位以外的一个父元素进行定位。元素的位置通过left、top、right、bottom属性进行规定。</td></tr><tr><td>relative</td><td>生成相对定位的元素，相对于其原来的位置进行定位。元素的位置通过left、top、right、bottom属性进行规定。</td></tr><tr><td>fixed</td><td>生成绝对定位的元素，指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如那 种回到顶部的按钮⼀般都是⽤此定位⽅式。</td></tr><tr><td>static</td><td>默认值，没有定位，元素出现在正常的文档流中，会忽略 top, bottom, left, right 或者 z-index 声明，块级元素从上往下纵向排布，⾏级元素从左向右排列。</td></tr><tr><td>inherit</td><td>规定从父元素继承position属性的值</td></tr></tbody></table>
      <p>前面三者的定位方式如下：</p>
      <ul>
        <li><strong>relative</strong></li>
      </ul>
      <p>元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素。</p>
      <p><img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694939-58dfe7f7-2fc9-45e5-9961-a953f95496a7.png#align=left&amp;display=inline&amp;height=105&amp;margin=%5Bobject%20Object%5D&amp;originHeight=105&amp;originWidth=448&amp;size=0&amp;status=done&amp;style=stroke&amp;width=447" alt="" loading="lazy" class="medium-zoom-image"></p>
      <ul>
        <li><strong>fixed</strong></li>
      </ul>
      <p>元素的定位是相对于 window （或者 iframe）边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化。</p>
      <p><img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694841-89472ba9-b236-4098-802f-c3c26ff49466.png#align=left&amp;display=inline&amp;height=117&amp;margin=%5Bobject%20Object%5D&amp;originHeight=135&amp;originWidth=516&amp;size=0&amp;status=done&amp;style=stroke&amp;width=446" alt="" loading="lazy" class="medium-zoom-image"></p>

      <ul>
        <li><strong>absolute</strong></li>
      </ul>
      <p>元素的定位相对于前两者要复杂许多。如果为 absolute 设置了 top、left，浏览器会根据什么去确定它的纵向和横向的偏移量呢？答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了<code>position:relative/absolute/fixed</code>的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。如下两个图所示：
        <img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694882-589670e0-cd52-41d4-a3ed-4ebbdfc88f32.png#align=left&amp;display=inline&amp;height=142&amp;margin=%5Bobject%20Object%5D&amp;originHeight=183&amp;originWidth=576&amp;size=0&amp;status=done&amp;style=stroke&amp;width=446" alt="" loading="lazy" class="medium-zoom-image">
        <img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603554694842-2764d9ed-d5fe-45f4-8ede-34a73d237f94.png#align=left&amp;display=inline&amp;height=118&amp;margin=%5Bobject%20Object%5D&amp;originHeight=137&amp;originWidth=516&amp;size=0&amp;status=done&amp;style=stroke&amp;width=446" alt="" loading="lazy" class="medium-zoom-image">
        <a name="user-content-kzXPS"></a></p>
    </el-collapse-item>
    <el-collapse-item title="36. display、float、position的关系">
      <p>（1）首先我们判断display属性是否为none，如果为none，则position和float属性的值不影响元素最后的表现。</p>
      <p>（2）然后判断position的值是否为absolute或者fixed，如果是，则float属性失效，并且display的值应该被设置为table或者block，具体转换需要看初始转换值。</p>
      <p>（3）如果position的值不为absolute或者fixed，则判断float属性的值是否为none，如果不是，则display的值则按上面的规则转换。注意，如果position的值为relative并且float属性的值存在，则relative相对于浮动后的最终位置定位。</p>
      <p>（4）如果float的值为none，则判断元素是否为根元素，如果是根元素则display属性按照上面的规则转换，如果不是，则保持指定的display属性值不变。</p>
      <p>总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。</p>
    </el-collapse-item>
    <el-collapse-item title="37. 实现一个三角形">
      <p>CSS绘制三角形主要用到的是border属性，也就是边框。
        我们平时在给盒子设置边框的时候，往往都设置很窄，就可能误以为边框是由矩形组成的。实际上，border属性是右三角形组成的，下面我们看一个例子：</p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">100px</span> solid;
    <span class="hljs-attribute">border-color</span>: orange blue red green;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>我们将元素的长宽都设置为0，显示出来的效果是这样的：
        <img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603636245125-d60dca78-0577-4aa1-8809-f1d38594889a.png#align=left&amp;display=inline&amp;height=298&amp;margin=%5Bobject%20Object%5D&amp;originHeight=502&amp;originWidth=1012&amp;size=0&amp;status=done&amp;style=stroke&amp;width=600" alt="" loading="lazy" class="medium-zoom-image">
        所以我们就可以根据border这个特性来绘制三角形：</p>
      <p><strong>（1）三角1</strong></p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">50px</span> solid red;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">50px</span> solid transparent;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid red;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">50px</span> solid transparent;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><strong>（3）三角3</strong></p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">50px</span> solid red;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid transparent;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><strong>（4）三角4</strong></p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">50px</span> solid red;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">50px</span> solid transparent;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">50px</span> solid transparent;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><strong>（5）三角5</strong></p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">100px</span> solid red;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">100px</span> solid transparent;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <p><img src="https://cdn.nlark.com/yuque/0/2020/png/1500604/1603636245095-5b40d585-7e68-4bb0-aaef-6c8fce7d36b8.png#align=left&amp;display=inline&amp;height=177&amp;margin=%5Bobject%20Object%5D&amp;originHeight=218&amp;originWidth=738&amp;size=0&amp;status=done&amp;style=stroke&amp;width=600" alt="" loading="lazy" class="medium-zoom-image">
        还有很多，就不一一实现了，总体的原则就是通过上下左右边框来控制三角形的方向，用边框的宽度比来控制三角形的角度。
        <a name="user-content-GcVBb"></a></p>
    </el-collapse-item>
    <el-collapse-item title="37. 实现一个扇形">
      <p>用CSS实现扇形的思路和三角形基本一致，就是多了一个圆角的样式，实现一个90°的扇形：</p>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">border</span>: <span class="hljs-number">100px</span> solid transparent;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
    heigt: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border-top-color</span>: red;
}
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="38. 实现一个宽高自适应的正方形">
      <ul>
        <li>利用vw来实现</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.square</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">10%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">10vw</span>;
  <span class="hljs-attribute">background</span>: tomato;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>利用元素的margin/padding百分比是相对父元素width的性质来实现</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.square</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">20%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">20%</span>;
  <span class="hljs-attribute">background</span>: orange;
}
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li>利用子元素的margin-top的值来实现</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-selector-class">.square</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">30%</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">background</span>: yellow;
}
<span class="hljs-selector-class">.square</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100%</span>;
}
<span class="copy-code-btn">复制代码</span></code></pre>
    </el-collapse-item>
    <el-collapse-item title="39. 画一条0.5px的线">
      <ul>
        <li><strong>采用transform: scale()的方式</strong>，该方法用来定义元素的2D 缩放转换：</li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css"><span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(<span class="hljs-number">0.5</span>,<span class="hljs-number">0.5</span>);
<span class="copy-code-btn">复制代码</span></code></pre>
      <ul>
        <li><strong>采用meta viewport的方式</strong></li>
      </ul>
      <pre><code class="hljs language-css copyable" lang="css">&lt;meta name="viewport" <span class="hljs-attribute">content</span>="<span class="hljs-attribute">width</span>=device-<span class="hljs-attribute">width</span>, <span class="hljs-attribute">initial</span>-scale=<span class="hljs-number">0.5</span>, minimum-scale=<span class="hljs-number">0.5</span>, maximum-scale=<span class="hljs-number">0.5</span>"/&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
      <p>这样子就能缩放到原来的0.5倍，如果是1px那么就会变成0.5px。viewport只针对于移动端，只在移动端上才能看到效果
        <a name="user-content-DFevV"></a></p>
    </el-collapse-item>
    <el-collapse-item title="40. 设置小于12px的字体">
      <p>在谷歌下css设置字体大小为12px及以下时，显示都是一样大小，都是默认12px。</p>
      <p>解决办法：</p>
      <ul>
        <li>使用Webkit的内核的-webkit-text-size-adjust的私有CSS属性来解决，只要加了-webkit-text-size-adjust:none;字体大小就不受限制了。但是chrome更新到27版本之后就不可以用了。所以高版本chrome谷歌浏览器已经不再支持-webkit-text-size-adjust样式，所以要使用时候慎用。</li>
        <li>使用css3的transform缩放属性-webkit-transform:scale(0.5); 注意-webkit-transform:scale(0.75);收缩的是整个元素的大小，这时候，如果是内联元素，必须要将内联元素转换成块元素，可以使用display：block/inline-block/...；</li>
        <li>使用图片：如果是内容固定不变情况下，使用将小于12px文字内容切出做图片，这样不影响兼容也不影响美观。</li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</template>

<script>

export default {
  name: 'About',
  data () {
    return {
      activeIndex: '1',
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
