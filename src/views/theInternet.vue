<template>
  <div class="theInternet_warp">
    <el-tabs>
      <el-tab-pane label="http" ><http/></el-tab-pane>
      <el-tab-pane label="https" ><https/></el-tab-pane>
      <el-tab-pane label="状态码" ><status-code/></el-tab-pane>
      <el-tab-pane label="dns协议" ><dns/></el-tab-pane>
      <el-tab-pane label="网络模型" ><network-model/></el-tab-pane>
      <el-tab-pane label="TCP和UDP" ><tcp-addudp/></el-tab-pane>
      <el-tab-pane label="webSocket" ><web-socket/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import http from '../components/internet/http'
import https from '../components/internet/https'
import statusCode from '../components/internet/statusCode'
import dns from '../components/internet/dns'
import networkModel from '../components/internet/networkModel'
import tcpAddudp from '../components/internet/TCPaddUDP'
import webSocket from '../components/internet/webSocket'

export default {
  components: {
    http,
    https,
    statusCode,
    dns,
    networkModel,
    tcpAddudp,
    webSocket
  }
}
</script>

<style lang="less" scoped>

</style>
