<template>
	<div class="head">
	     <h2>首页</h2>
	     <div class="one">
         <el-card class="box-card">
         <span class="first fa fa-cloud"></span>
         <span class="span1">99.9%</span>
         <span class="span2">SERVER UPTIME</span>
         </el-card>
	     </div>
	     <div class="one">
         <el-card class="box-card">
         <span class="first fa fa-camera-retro" style="background:#800080"></span>
         <span class="span1">117K</span>
         <span class="span2">USERS TOTAL</span>
         </el-card>
	     </div>
	     <div class="one">
         <el-card class="box-card">
         <span class="first fa fa-user o" style="background:#4cb7e5"></span>
         <span class="span1">2,470</span>
         <span class="span2">NEW DAILY PHOTOS</span>
         </el-card>
	     </div>
	     <div class="one">
         <el-card class="box-card">
         
         </el-card>
	     </div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{

		}
	}
</script>
<style>
	h2{
		text-align: center;
	}
	 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .one .box-card {
    width: 200px;
    height:100px;
  }
  .box-card .first{
  	height:70px;
  	width:70px;
  	background-color:#66Ba12;
  	border-radius: 50%;
  }
  .box-card{
  	position: relative;
  	margin-bottom: 10px;
  }
  .box-card .first {
  	font-size: 2.5em;
  	text-align: center;
  	line-height: 70px;
  	color:white;
  	left:10px;
  	position: absolute;
  }
  .box-card .span1{
  	position: absolute;
  	font-size:2em;
  	right:20px;
  }
  .box-card .span2{
  	position: absolute;
  	color:#ccc;
  	bottom: 15px;
  	right:18px;
  	font-size: .8em;
  }
</style>