<template>
  <div id="app">
      <!-- 头 -->
      <div class="header">
        <div class="title"><span class="fa fa-television"></span>看点资讯后台管理</div>
      </div>
      <!-- 体 -->
      <div class="center">
      <!-- 左侧导航栏 -->
        <div class="left-nav">
        <ul>
          <li>
        <router-link to='/head' ><span class='fa fa-bank'></span>首页</router-link>
            
          </li>
          <li>
        <router-link to='/category' ><span class='fa fa-bars'></span>栏目管理</router-link>
            
          </li>
          <li>
        <router-link to='/article'><span class="fa fa-file"></span>文章管理</router-link>
            
          </li>
          <li>
        <router-link to='/user'><span class="fa fa-user circle-o"></span>用户管理</router-link>
            
          </li>
          <li>
        <router-link to='/setting'><span class="fa fa-cogs"></span>系统设置</router-link>
            
          </li>
        </ul>

        </div>
        <!-- 右侧内容栏 -->
        <div class="content">
          <div class="wrapper">
            <router-view></router-view>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  }
}
</script>
<style>

    html{
      font:normal normal 12px '微软雅黑','Microsoft YaHei';
      color:#666;
    }
    body,ul,ol,dl,p,h1,h2,h3{
      margin: 0;
      padding: 0;
    }
    ul,ol{
      list-style: none;
    }
    a{
      color: #666;
      text-decoration: none;
    }
    div{
      box-sizing: border-box;
    }
    .header{
      width: 100%;
      height: 60px;
      position: absolute;
      top:0;
      background: teal;
      padding: 0 1em;
    }
    .header .title{
      color: #fff;
      line-height: 60px;
      font-size:18px;
      padding-left: 40px;
    }
    .center{
      position: absolute;
      top:60px;
      bottom: 0;
      width: 100%;
    }
    .center .left-nav{
      width: 180px;
      height: 100%;
      /*background: pink;*/
      float: left;
    }
    .center .left-nav>ul{

    }
    .center .left-nav>ul>li{
      /*font-size: 1.1em;*/
      line-height: 3em;
      text-align: center;
      cursor:pointer;
      border-bottom:.5px solid #f0f0f0;
      position: relative;
    }
    .center .left-nav>ul>li.current{
      background-color: #f0f0f0;
    }
    .center > .content{
      margin-left:180px;
      height: 100%;
      background: #f0f0f0;
      padding: 1em 1em 0 1em;
    }

    .center > .content > .wrapper{
      width: 100%;
      height: 100%;
     background: #fff;
      border-radius: 5px;
      padding:1em;
    }
   ul>li .fa{
     position: absolute;
     margin-left:10px;
     left:20px;
     top:12px;

    }
    .title>span{
      position:absolute;
      left:10px;
      font-size:1.2em;
      top:22px;

    }
</style>