<template>
  <div id="nav">
    <keep-alive><router-link to="/">html</router-link></keep-alive>|
    <keep-alive><router-link to="/css">css</router-link></keep-alive> |
    <keep-alive><router-link to="/js">js</router-link></keep-alive> |
    <keep-alive><router-link to="/vue">vue</router-link></keep-alive>|
    <keep-alive><router-link to="/theInternet">网络</router-link></keep-alive>|
    <keep-alive><router-link to="/browser">浏览器</router-link></keep-alive>|
    <keep-alive><router-link to="/optimization">性能优化</router-link></keep-alive>
  </div>
  <div class="content">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 24px;
  margin: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content{
  border: 1px solid #EBEEF5;
  max-width: 1000px;
  margin: 0 auto;
    .el-collapse-item__header{
      font-size: 18px;
      padding-left: 20px;
    }
  .el-collapse-item__content{
    font-size: 18px;
    text-align: left;
    margin-left: 20px;
  }
}
</style>
