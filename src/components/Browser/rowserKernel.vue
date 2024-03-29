<template>
  <div class="rowserKernel_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 对浏览器的理解">
        <p>浏览器的主要功能是将用户选择的 web 资源呈现出来，它需要从服务器请求资源，并将其显示在浏览器窗口中，资源的格式通常是 HTML，也包括 PDF、image 及其他格式。用户用 URI（Uniform Resource Identifier 统一资源标识符）来指定所请求资源的位置。</p>
        <p>HTML 和 CSS 规范中规定了浏览器解释 html 文档的方式，由 W3C 组织对这些规范进行维护，W3C 是负责制定 web 标准的组织。但是浏览器厂商纷纷开发自己的扩展，对规范的遵循并不完善，这为 web 开发者带来了严重的兼容性问题。</p>
        <p>简单来说浏览器可以分为两部分，shell 和 内核。其中 shell 的种类相对比较多，内核则比较少。也有一些浏览器并不区分外壳和内核。从 Mozilla 将 Gecko 独立出来后，才有了外壳和内核的明确划分。</p>
        <ul>
          <li>shell 是指浏览器的外壳：例如菜单，工具栏等。主要是提供给用户界面操作，参数设置等等。它是调用内核来实现各种功能的。</li>
          <li>内核是浏览器的核心。内核是基于标记语言显示内容的程序或模块。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="2. 对浏览器内核的理解">
        <p>浏览器内核主要分成两部分：</p>
        <ul>
          <li>渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也可以借助插件显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。</li>
          <li>JS 引擎：解析和执行 javascript 来实现网页的动态效果。</li>
        </ul>
        <p>最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。</p>
      </el-collapse-item>
      <el-collapse-item title="3. 常见的浏览器内核比较">
        <ul>
          <li><strong>Trident：</strong> 这种浏览器内核是 IE 浏览器用的内核，因为在早期 IE 占有大量的市场份额，所以这种内核比较流行，以前有很多网页也是根据这个内核的标准来编写的，但是实际上这个内核对真正的网页标准支持不是很好。但是由于 IE 的高市场占有率，微软也很长时间没有更新 Trident 内核，就导致了 Trident 内核和 W3C 标准脱节。还有就是 Trident 内核的大量 Bug 等安全问题没有得到解决，加上一些专家学者公开自己认为 IE 浏览器不安全的观点，使很多用户开始转向其他浏览器。</li>
          <li><strong>Gecko：</strong> 这是 Firefox 和 Flock 所采用的内核，这个内核的优点就是功能强大、丰富，可以支持很多复杂网页效果和浏览器扩展接口，但是代价是也显而易见就是要消耗很多的资源，比如内存。</li>
          <li><strong>Presto：</strong> Opera 曾经采用的就是 Presto 内核，Presto 内核被称为公认的浏览网页速度最快的内核，这得益于它在开发时的天生优势，在处理 JS 脚本等脚本语言时，会比其他的内核快3倍左右，缺点就是为了达到很快的速度而丢掉了一部分网页兼容性。</li>
          <li><strong>Webkit：</strong> Webkit 是 Safari 采用的内核，它的优点就是网页浏览速度较快，虽然不及 Presto 但是也胜于 Gecko 和 Trident，缺点是对于网页代码的容错性不高，也就是说对网页代码的兼容性较低，会使一些编写不标准的网页无法正确显示。WebKit 前身是 KDE 小组的 KHTML 引擎，可以说 WebKit 是 KHTML 的一个开源的分支。</li>
          <li><strong>Blink：</strong> 谷歌在 Chromium Blog 上发表博客，称将与苹果的开源浏览器核心 Webkit 分道扬镳，在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。其实 Blink 引擎就是 Webkit 的一个分支，就像 webkit 是KHTML 的分支一样。Blink 引擎现在是谷歌公司与 Opera Software 共同研发，上面提到过的，Opera 弃用了自己的 Presto 内核，加入 Google 阵营，跟随谷歌一起研发 Blink。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="4. 常见浏览器所用内核">
        <p>（1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；</p>
        <p>（2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；</p>
        <p>（3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；</p>
        <p>（4） Safari 浏览器内核：Webkit 内核；</p>
        <p>（5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；</p>
        <p>（6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；</p>
        <p>（7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；</p>
        <p>（8） 百度浏览器、世界之窗内核：IE 内核；</p>
        <p>（9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；</p>
        <p>（10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说是基于火狐内核。</p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
