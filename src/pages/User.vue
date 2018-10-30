<template>
	<div class="user">
		<h2>用户管理</h2>
			<!-- 按钮区域 -->
		<div class="btns">
			<el-button size='small' @click='toAddUser'>新增</el-button>
		</div>
		<!-- 按钮区结束 -->

		<!-- 卡片区开始 -->
     <div class="cards">
     	<el-card class="box-card" v-for='user in users'>
<!-- 图片 -->
  <div class="one">
  	 <img class="img-circle"  :src='user.userface?user.userface:"http://120.79.73.132/images/1.jpg"'  alt="通用的占位符缩略图">
  </div>
  <!-- 列表 -->
  <div class="two">
  	<table class="one-first">
			<tbody>
				<tr>
					<td>用户名</td>
					<td>{{user.username}}</td>
				</tr>
				<tr>
					<td>真实姓名</td>
					<td>{{user.nickname}}</td>
				</tr>
				<tr>
					<td>email</td>
					<td>{{user.email}}</td>
				</tr>
				<tr>
					<td>状态</td>
					<td >
					<el-tooltip :content="value" placement="top">
 <el-switch v-model="user.enabled" active-color="#13ce66" inactive-color="#ff4949" active-value="user.enabled" inactive-value="user.enabled" change='active'>
                     </el-switch>
                   </el-tooltip>
					</td>
				</tr>
				<tr>
					<td>操作</td>
					<td>
        <i class="fa fa-trash" @click='deleteUser(user)'></i>
        <i class="fa fa-pencil" @click='modifyUser(user)'></i>
					</td>
				</tr>
			</tbody>
		</table>
  </div>
</el-card>
     </div>

		<!-- 卡片区结束 -->
		<!-- 模态框 -->
    <div class="modal">
<el-dialog :title="userDialog.title" :visible.sync="userDialog.visible">{{userDialog.form}}
  <el-form :model="userDialog.form">
    <el-form-item label="头像" label-width="120px">
      <el-input v-model="userDialog.form.userface" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户名" label-width="120px">
      <el-input v-model="userDialog.form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" label-width="120px">
      <el-input v-model="userDialog.form.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 密码 -->
  <el-form-item label="密码" label-width="120px">
      <el-input type="password" v-model="userDialog.form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" label-width="120px">
      <el-input type="password" v-model="userDialog.form.password1" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 密码结束 -->
    <el-form-item label="邮箱" label-width="120px">
      <el-input v-model="userDialog.form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态" label-width="120px">
      <el-select v-model="userDialog.form.enabled" placeholder="请选择">
        <el-option value="true">true</el-option>
        <el-option value="false">false</el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeuserDialog" size='small'>取 消</el-button>
    <el-button type="primary" @click="saveOrUpdateUser" size='small'>确 定</el-button>
  </div>
</el-dialog>
	</div>
	<!-- 模态框结束 -->

	</div>
</template>
<script>
import axios from '@/http/axios'
	export default{
		data(){
			return{
             loading:false,
             users:[],
             userDialog:{
           	 title:'',
           	 form:{},
           	 visible:false
           },
             value:true,
             user:{}
			}
		},
    created(){
			this.findAllUsers();
		},
	methods:{
	findAllUsers(){
	this.loading=true
	let url='/manager/user/findAllUser';
	axios.get(url).then(({data:result})=>{
		console.log(result);
		// 将查询到的数据绑定到页面中，进而加载到页面中
		this.users=result.data;
	}).catch((error)=>{
		console.log(error,error);
	}).finally(()=>{
		this.loading=false;
	});
			},
	closeuserDialog(){
    this.userDialog.form={};
	this.userDialog.visible=false;
	},
	saveOrUpdateUser(){
    let url='/manager/user/saveOrUpdateUser';
            axios.post(url,this.userDialog.form).then(({data:result})=>{
              if(result.status==200){
              	// 关闭模态框
              	this.closeuserDialog();
              	// 提示成功
              	this.$notify({
              		title:"成功",
              		message:result.message,
              		type:"success"
              	})
              	
              	// 刷新
               this.findAllUsers();
              }else{
              this.$notify({
              		title:"失败",
              		message:error,
              		type:"error"
              	})
              }
            }).catch((error)=>{
              alert("网络异常");
            })
	},
	deleteUser(user){
		this.$confirm("此操作将永久删除这个用户，是否确定？","提示",{
              	confirmButtonText:"确定",
              	cancelButtonText:"取消",
              	type:'warning'
              }).then(()=>{
              	let url='/manager/user/deleteUserById?id='+user.id;
              	axios.get(url)
                .then(({data:result})=>{
              	this.$notify({
              		title:"成功",
              		message:result.message,
              		type:"success"
              	});
              	// 刷新
               this.findAllUsers();
              })
                .catch(()=>{
               this.$notify.error({
                  title:"错误",
                  message:'删除异常',
                })
            })
              }).catch(()=>{
              	alert("错误");
              })
		console.log(user.id);
	
	},
	modifyUser(user){
	// var arr = []
 //    for (var i in user) {
 //    arr.push(user[i]); 

 //    }
 //     arr.splice(7,2);
 var obj={
 	id:user.id,
 	userface:user.userface,
 	username:user.username,
 	nickname:user.nickname,
 	password:user.password,
 	enabled:user.enabled,
 	email:user.email
 }
 this.userDialog.form=obj;

	this.userDialog.visible=true;
	},
	toAddUser(){
      this.userDialog.title='添加新用户';
	  this.userDialog.visible=true;
	}

		}
	}
</script>
<style>
	h2{
		text-align:center;
	}
	  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .user .cards .box-card {
    width: 300px;
    margin:10px;
  }
  .box-card .one{
  	margin:0 auto;
  	height:100px;
  	width:100px;
  }
  .one-first{
  	text-align:center;
  	margin:0 auto;
  	width:250px;
  	padding:5px 20px;
  	font-size:1.1em;
  }
  .img-circle{
  	width:100px;
  	height:100px;
  	border-radius:50%;
  }
  .cards{
  	display:flex;
  	flex-wrap:wrap;
  }
  i.fa{
     margin:0.3em;
     cursor: pointer;
	}
	i.fa.fa-trash{
		color:#f56c6c;
	}
	.one-first>tbody>tr{
		height:30px;
	}
</style>