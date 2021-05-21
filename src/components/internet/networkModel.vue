<template>
  <div class="networkModel_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. OSI七层模型">
        <p><code>ISO</code>为了更好的使网络应用更为普及，推出了<code>OSI</code>参考模型。
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10d6d8e9f6c8456bb0f9d15e1ed15b5a~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image">
          <a name="user-content-PnVOD"></a></p>
        <h4 data-id="heading-61">（1）应用层</h4>
        <p><code>OSI</code>参考模型中最靠近用户的一层，是为计算机用户提供应用接口，也为用户直接提供各种网络服务。我们常见应用层的网络服务协议有：<code>HTTP</code>，<code>HTTPS</code>，<code>FTP</code>，<code>POP3</code>、<code>SMTP</code>等。</p>
        <ul>
          <li>在客户端与服务器中经常会有数据的请求，这个时候就是会用到<code>http(hyper text transfer protocol)(超文本传输协议)</code>或者<code>https</code>.在后端设计数据接口时，我们常常使用到这个协议。</li>
          <li><code>FTP</code>是文件传输协议，在开发过程中，个人并没有涉及到，但是我想，在一些资源网站，比如<code>百度网盘``迅雷</code>应该是基于此协议的。</li>
          <li><code>SMTP</code>是<code>simple mail transfer protocol（简单邮件传输协议）</code>。在一个项目中，在用户邮箱验证码登录的功能时，使用到了这个协议。
            <a name="user-content-09IS6"></a></li>
        </ul>
        <h4 data-id="heading-62">（2）表示层</h4>
        <p>表示层提供各种用于应用层数据的编码和转换功能,确保一个系统的应用层发送的数据能被另一个系统的应用层识别。如果必要，该层可提供一种标准表示形式，用于将计算机内部的多种数据格式转换成通信中采用的标准表示形式。数据压缩和加密也是表示层可提供的转换功能之一。</p>
        <p>在项目开发中，为了方便数据传输，可以使用<code>base64</code>对数据进行编解码。如果按功能来划分，<code>base64</code>应该是工作在表示层。
          <a name="user-content-flE2f"></a></p>
        <h4 data-id="heading-63">（3）会话层</h4>
        <p>会话层就是负责建立、管理和终止表示层实体之间的通信会话。该层的通信由不同设备中的应用程序之间的服务请求和响应组成。
          <a name="user-content-ILRgG"></a></p>
        <h4 data-id="heading-64">（4）传输层</h4>
        <p>传输层建立了主机端到端的链接，传输层的作用是为上层协议提供端到端的可靠和透明的数据传输服务，包括处理差错控制和流量控制等问题。该层向高层屏蔽了下层数据通信的细节，使高层用户看到的只是在两个传输实体间的一条主机到主机的、可由用户控制和设定的、可靠的数据通路。我们通常说的，<code>TCP</code> <code>UDP</code>就是在这一层。端口号既是这里的“端”。
          <a name="user-content-1QPcG"></a></p>
        <h4 data-id="heading-65">（5）网络层</h4>
        <p>本层通过<code>IP</code>寻址来建立两个节点之间的连接，为源端的运输层送来的分组，选择合适的路由和交换节点，正确无误地按照地址传送给目的端的运输层。就是通常说的<code>IP</code>层。这一层就是我们经常说的<code>IP</code>协议层。<code>IP</code>协议是<code>Internet</code>的基础。我们可以这样理解，网络层规定了数据包的传输路线，而传输层则规定了数据包的传输方式。
          <a name="user-content-TI2FK"></a></p>
        <h4 data-id="heading-66">（6）数据链路层</h4>
        <p>将比特组合成字节,再将字节组合成帧,使用链路层地址 (以太网使用MAC地址)来访问介质,并进行差错检测。
          网络层与数据链路层的对比，通过上面的描述，我们或许可以这样理解，网络层是规划了数据包的传输路线，而数据链路层就是传输路线。不过，在数据链路层上还增加了差错控制的功能。
          <a name="user-content-q1Vzs"></a></p>
        <h4 data-id="heading-67">（7）物理层</h4>
        <p>实际最终信号的传输是通过物理层实现的。通过物理介质传输比特流。规定了电平、速度和电缆针脚。常用设备有（各种物理设备）集线器、中继器、调制解调器、网线、双绞线、同轴电缆。这些都是物理层的传输介质。</p>
        <p><strong>OSI七层模型通信特点：对等通信</strong>
          对等通信，为了使数据分组从源传送到目的地，源端OSI模型的每一层都必须与目的端的对等层进行通信，这种通信方式称为对等层通信。在每一层通信过程中，使用本层自己协议进行通信。</p>
      </el-collapse-item>
      <el-collapse-item title="2. TCP/IP五层协议">
        <p><code>TCP/IP</code>五层协议和<code>OSI</code>的七层协议对应关系如下：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2405aff906648f5b261e9ac1b649cb5~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <ul>
          <li><strong>应用层 (application layer)</strong>：直接为应用进程提供服务。应用层协议定义的是应用进程间通讯和交互的规则，不同的应用有着不同的应用层协议，如 HTTP协议（万维网服务）、FTP协议（文件传输）、SMTP协议（电子邮件）、DNS（域名查询）等。</li>
          <li><strong>传输层 (transport layer)</strong>：有时也译为运输层，它负责为两台主机中的进程提供通信服务。该层主要有以下两种协议：
            <ul>
              <li>传输控制协议 (Transmission Control Protocol，TCP)：提供面向连接的、可靠的数据传输服务，数据传输的基本单位是报文段（segment）；</li>
              <li>用户数据报协议 (User Datagram Protocol，UDP)：提供无连接的、尽最大努力的数据传输服务，但不保证数据传输的可靠性，数据传输的基本单位是用户数据报。</li>
            </ul>
          </li>
          <li><strong>网络层 (internet layer)</strong>：有时也译为网际层，它负责为两台主机提供通信服务，并通过选择合适的路由将数据传递到目标主机。</li>
          <li><strong>数据链路层 (data link layer)</strong>：负责将网络层交下来的 IP 数据报封装成帧，并在链路的两个相邻节点间传送帧，每一帧都包含数据和必要的控制信息（如同步信息、地址信息、差错控制等）。</li>
          <li><strong>物理层 (physical Layer)</strong>：确保数据可以在各种物理媒介上进行传输，为数据的传输提供可靠的环境。</li>
        </ul>
        <p>从上面的图中，我们可以看出，<code>TCP/IP</code>模型比<code>OSI</code>模型更加简洁，它把<code>应用层/表示层/会话层</code>全部整合为了<code>应用层</code>。
          在每一层都工作着不同的设备，比如我们常用的交换机就工作在数据链路层的，一般的路由器是工作在网络层的。
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbd86057193544b3ad2ad1f423e23bea~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image">
          在每一层实现的协议也各不同，即每一层的服务也不同，下图列出了每层主要的协议：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c73f71028fb4480bf9b27cf5ea8026d~tplv-k3u1fbpfcp-zoom-1.image" alt="" loading="lazy" class="medium-zoom-image"></p>
        <p>同样，<code>TCP/IP</code>五层协议的通信方式也是对等通信：
          <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79ac497722f5458e839dc4f939540323~tplv-k3u1fbpfcp-zoom-1.image" alt="image.png" loading="lazy" class="medium-zoom-image">
          <a name="user-content-YhF2j"></a></p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
