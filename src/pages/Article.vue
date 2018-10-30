<template>
	<div class="article">
		<h2>文章管理</h2>
			<!-- 按钮区域 -->
		<div class="btns">
			<el-button size='small' @click='toAddArticle'>添加</el-button>
			<el-button size='small' @click='batchDel'>批量删除</el-button>
       <!-- 选择器 -->
    <el-select v-model="params.categoryId" placeholder="请选择父栏目" size='small' clearable>
    <el-option v-for='c in categories' :label='c.name' :value='c.id' :key='c.id'></el-option>
    </el-select>

    <el-input
  placeholder="请输入关键字"
  v-model="params.keywords" size='small' style='width:140px'
  clearable>
</el-input>
		</div>
		<!-- 按钮区结束 -->
		<!-- 表格 -->
	<div class="table" v-loading='loading'>
		 <el-table :border='true' size='small' :data="articles"
      style="width: 100%"     @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="title"
        label="栏目标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="所属栏目"
        width="180">
      </el-table-column>
      <el-table-column
        prop="liststyle"
        label="列表样式">
      </el-table-column>
      <el-table-column
        prop="publishtime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="readtimes"
        label="阅读次数">
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作" width='60'>
        <template slot-scope='{row}'>
        <i class="fa fa-trash" @click='deleteArticle(row.id)'></i>
        <i class="fa fa-pencil" @click='modifyArticle(row)'></i>
        </template>
      </el-table-column>
    </el-table>
	</div>
	<!-- 表格区结束 -->
  <!-- 分页 -->
    <div class="page">
  <el-pagination 
    layout="prev, pager, next"
    :total="total" :page-size='params.pageSize' @current-change='handleCurrentChange'>
   </el-pagination>
    </div>
    <!-- 分页结束 -->
		<!-- 模态框 -->
   <!-- 模态框 -->
     <div class="modal">
<el-dialog :title="articleDialog.title" :visible.sync="articleDialog.visible" fullscreen>
  <el-form :model="articleDialog.form">
    <el-form-item label="资讯标题" label-width="120px">
      <el-input v-model="articleDialog.form.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属栏目" label-width="120px">
      <el-select v-model="articleDialog.form.categoryId" placeholder="请选择">
        <el-option v-for='c in categories' :label="c.name" :value="c.id"></el-option>
        
      </el-select>
    </el-form-item>
    <el-form-item label="列表样式" label-width="120px">
     <div class="list-style">
      <div class="list-one" :class='{current:articleDialog.form.liststyle=="style-one"}'
      @click='articleDialog.form.liststyle="style-one"'><img src="@/assets/1.jpg" alt=""></div>
      <div class="list-two" :class='{current:articleDialog.form.liststyle=="style-two"}'
      @click='articleDialog.form.liststyle="style-two"'><img src="@/assets/2.jpg" alt=""></div>
     </div>
    </el-form-item>
    <el-form-item label="缩略图" label-width="120px">
      <!-- 图片上传 -->
      <el-upload
  action="http://120.78.164.247:8099/manager/file/upload"
  :on-success='handlerUploadSuccess'
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<!-- 图片上传结束 -->
    </el-form-item>
     <el-form-item label="资讯正文" label-width="120px">
     <mavon-editor  v-model="articleDialog.form.content"></mavon-editor>
    </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeArticleDialog" size='small'>取 消</el-button>
    <el-button type="primary" @click="saveOrUpdateArticle" size='small'>确 定</el-button>
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
           articles:[],
           loading:false,
           articleDialog:{
           	title:'',
           	form:{
              liststyle:'style-one',
              fileIds:[]
            },
           	visible:false
           },
            total:0,
            params:{
                page:0,
                pageSize:5,
                categoryId:undefined,
                keywords:undefined  
            },
            multipleSelection: [],
            article:{},
            categories:[]
			}
		},
    watch:{
      params:{
        handler:function(){
          this.findAllArticles();
        },
        deep:true
      }
    },
		created(){
			this.findAllArticles();
			this.findAllCategories();
		},
		methods:{
			// 开始加载文章
			findAllArticles(){
        this.loading=true
        let url='/manager/article/findArticle';
        axios.get(url,{params:this.params
        }).then(({data:result})=>{
          console.log(result.data.list);
          this.total=result.data.total;
          console.log(this.total);
          // 将查询到的数据绑定到页面中，进而加载到页面中
          this.articles=result.data.list;
        }).catch((error)=>{
          this.$notify.error({
            title:'错误',
            message:'网络异常'
          })
          console.log(error,error);
        }).finally(()=>{
          this.loading=false;
        });
      },
         handleCurrentChange(page){
          this.params.page=page-1;
         },
         handlerUploadSuccess(response,file,filelist){
         this.articleDialog.form.fileIds.push(response.data.id);
         },
			findAllCategories(){
				this.loading=true
				let url='/manager/category/findAllCategory';
				axios.get(url).then(({data:result})=>{
					console.log(result);
					// 将查询到的数据绑定到页面中，进而加载到页面中
					this.categories=result.data;
				}).catch((error)=>{
					console.log(error,error);
				}).finally(()=>{
					this.loading=false;
				});
			},

			 handleSelectionChange(val){
             console.log(val);
             this.multipleSelection = val; 
              },
			// 删除
			deleteArticle(id){
              this.$confirm("此操作竞永久删除这个文章，是否确定？","提示",{
              	confirmButtonText:"确定",
              	cancelButtonText:"取消",
              	type:'warning'
              }).then(()=>{
              	let url='/manager/article/deleteArticleById?id='+id;
              	axios.get(url)
                .then(({data:result})=>{
              	this.$notify({
              		title:"成功",
              		message:result.message,
              		type:"success"
              	});
              	// 刷新
               this.findAllArticles();
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
			},
			
			// 增加
			toAddArticle(){
			 this.articleDialog.title='添加文章';
			 this.articleDialog.visible=true;

			},
			saveOrUpdateArticle(){
              let url='/manager/article/saveOrUpdateArticle';
            axios.post(url,this.articleDialog.form).then(({data:result})=>{
            	console.log({data:result})
              if(result.status==200){
                alert("成功");
              	// 关闭模态框
              	this.closeArticleDialog();
              	// 提示成功
              	this.$notify({
              		title:"成功",
              		message:result.message,
              		type:"success"
              	})
              	// 刷新
               this.findAllArticles();
              }else{
              this.$notify({
              		title:"失败",
              		message:error,
              		type:"error"
              	})
              }
            }).catch((error)=>{
            	console.log(error);
            	console.log('hello')
                alert("网络异常");
                this.closeArticleDialog();
                this.findAllArticles();
            })
			},
			closeArticleDialog(){
				this.articleDialog.form={};
				this.articleDialog.visible=false;
			},
			// 修改
			modifyArticle(row){
              this.articleDialog.visible=true; 
           var obj={
          id:row.id,
          title:row.title,
          liststyle:row.liststyle,
          content:row.content,
          readtimes:row.readtimes,
          publishtime:row.publishtime
        };
              this.articleDialog.form=obj;
			},

			// 批量删除
			batchDel(){
				var arr=this.multipleSelection;
       let ids=[];
       arr.forEach(function(item){
        ids.push(item.id);
       })
       // alert(ids);
       console.log(ids.toString());
      this.$confirm("此操作竞永久删除这些栏目，是否确定？","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:'warning'
              }).then(()=>{
         
                // console.log(ids);
                let obj={
                  ids:ids.toString()
                }
                let url='/manager/article/batchDeleteArticle';
                axios.post(url,obj)
                .then(({data:result})=>{
                this.$notify({
                  title:"成功",
                  message:result.message,
                  type:"success"
                });
                // 刷新
               this.findAllArticles();
              })
                .catch(()=>{
               this.$notify.error({
                  title:"错误",
                  message:'删除异常',
              })
                })
                  }).catch(()=>{
                    alert('网络异常');
                 })

			}

		}
	}
</script>
<style>
	.btns{
		margin:.5em;
	}
	i.fa{
     margin:0.3em;
     cursor: pointer;
	}
	i.fa.fa-trash{
		color:#f56c6c;
	}
  h2{
    text-align:center;
  }
  .list-style>div{
    width:200px;
    padding:.5em;
    height:100px;
    border-radius: .5em;
    border:1px solid #ccc;
  }
   .list-style>.list-one{
    float:left;
   }
  .list-style>.list-two{
   margin-left:240px;
  } 
  img{
    width:190px;
    height:100%;
  }

</style>