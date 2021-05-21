<template>
  <div class="lazyLoading_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. 懒加载的概念">
        <p>懒加载也叫做延迟加载、按需加载，指的是在长网页中延迟加载图片数据，是一种较好的网页性能优化的方式。</p>
        <p>在比较长的网页或应用中，如果图片很多，所有的图片都被加载出来，而用户只能看到可视窗口的那一部分图片数据，这样就浪费了性能。</p>
      </el-collapse-item>
      <el-collapse-item title="2. 懒加载的特点">
        <ul>
          <li><strong>减少无用资源的加载</strong>：使用懒加载明显减少了服务器的压力和流量，同时也减小了浏览器的负担。</li>
          <li><strong>提升用户体验</strong>: 如果同时加载较多图片，可能需要等待的时间较长，这样影响了用户体验，而使用懒加载就能大大的提高用户体验。</li>
          <li><strong>防止加载过多图片而影响其他资源文件的加载</strong> ：会影响网站应用的正常使用。</li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="3. 懒加载的实现原理">
        <p>图片的加载是由<code>src</code>引起的，当对<code>src</code>赋值时，浏览器就会请求图片资源。根据这个原理，我们使用HTML5 的<code>data-xxx</code>属性来储存图片的路径，在需要加载图片的时候，将<code>data-xxx</code>中图片的路径赋值给<code>src</code>，这样就实现了图片的按需加载，即懒加载。
          注意：<code>data-xxx</code> 中的<code>xxx</code>可以自定义，这里我们使用<code>data-src</code>来定义。</p>
      </el-collapse-item>
      <el-collapse-item title="4. 懒加载的实现">
        <p>懒加载的实现重点在于确定用户需要加载哪张图片，在浏览器中，可视区域内的资源就是用户需要的资源。所以当图片出现在可视区域时，获取图片的真实地址并赋值给图片即可。
          使用原生JavaScript实现懒加载：
          <strong>知识点：</strong>
          （1）<code>window.innerHeight</code> 是浏览器可视区的高度
          （2）<code>document.body.scrollTop || document.documentElement.scrollTop</code> 是浏览器滚动的过的距离
          （3）<code>imgs.offsetTop</code> 是元素顶部距离文档顶部的高度（包括滚动条的距离）
          （4）图片加载条件：<code>img.offsetTop &lt; window.innerHeight + document.body.scrollTop;</code>
          <strong>图示：</strong>
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d341126e3cd74aa39b5a9f4be9fca380~tplv-k3u1fbpfcp-zoom-1.image" alt="在这里插入图片描述" loading="lazy" class="medium-zoom-image"></p>
        <p><strong>代码实现：</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
     &lt;img src="loading.gif"  data-src="pic.png"&gt;
     &lt;img src="loading.gif"  data-src="pic.png"&gt;
     &lt;img src="loading.gif"  data-src="pic.png"&gt;
     &lt;img src="loading.gif"  data-src="pic.png"&gt;
     &lt;img src="loading.gif"  data-src="pic.png"&gt;
     &lt;img src="loading.gif"  data-src="pic.png"&gt;
&lt;/div&gt;
&lt;script&gt;
var imgs = document.querySelectorAll('img');
function lozyLoad(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		var winHeight= window.innerHeight;
		for(var i=0;i &lt; imgs.length;i++){
			if(imgs[i].offsetTop &lt; scrollTop + winHeight ){
				imgs[i].src = imgs[i].getAttribute('data-src');
			}
		}
	}
  window.onscroll = lozyLoad();
&lt;/script&gt;
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="5. 懒加载与预加载的区别">
        <p>这两种方式都是提高网页性能的方式，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。</p>
        <ul>
          <li><strong>懒加载也叫延迟加载，指的是在长网页中延迟加载图片的时机，当用户需要访问时，再去加载</strong>，这样可以提高网站的首屏加载速度，提升用户的体验，并且可以减少服务器的压力。它适用于图片很多，页面很长的电商网站的场景。懒加载的实现原理是，将页面上的图片的 src 属性设置为空字符串，将图片的真实路径保存在一个自定义属性中，当页面滚动的时候，进行判断，如果图片进入页面可视区域内，则从自定义属性中取出真实路径赋值给图片的 src 属性，以此来实现图片的延迟加载。</li>
          <li><strong>预加载指的是将所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。</strong> 通过预加载能够减少用户的等待时间，提高用户的体验。我了解的预加载的最常用的方式是使用 js 中的 image 对象，通过为 image 对象来设置 scr 属性，来实现图片的预加载。</li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
