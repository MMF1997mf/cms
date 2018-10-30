<template>
	<div class="category">
		<h2>栏目管理</h2>
		<!-- 按钮区域 -->
		<div class="btns">
			<el-button size='small' @click='toAddCategory'>添加</el-button>
			<el-button size='small' @click='batchDel'>批量删除</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 表格 -->
	<div class="table" v-loading='loading'>
		 <el-table :border='true' size='small' :data="categories"
      style="width: 100%"     @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="name"
        label="栏目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parent.name"
        label="父栏目"
        width="180">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="描述">
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作" width='60'>
        <template slot-scope='{row}'>
        <i class="fa fa-trash" @click='deleteCategory(row.id)'></i>
        <i class="fa fa-pencil" @click='modifyCategory(row)'></i>
        </template>
      </el-table-column>
    </el-table>
	</div>
	<!-- 表格区结束 -->
	<!-- 模态框 -->
    <div class="modal">
<el-dialog :title="categoryDialog.title" :visible.sync="categoryDialog.visible">
  <el-form :model="categoryDialog.form">
    <el-form-item label="栏目名称" label-width="120px">
      <el-input v-model="categoryDialog.form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="父栏目" label-width="120px">
      <el-select v-model="categoryDialog.form.parentId" placeholder="请选择">
        <el-option v-for='c in categories' :label="c.name" :value="c.id"></el-option>
        
      </el-select>
    </el-form-item>
     <el-form-item label="描述" label-width="120px">
        <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="categoryDialog.form.comment">
</el-input>
        
      </el-select>
    </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closecategoryDialog" size='small'>取 消</el-button>
    <el-button type="primary" @click="saveOrUpdateCategory" size='small'>确 定</el-button>
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
           categories:[],
           loading:false,
           categoryDialog:{
           	title:'',
           	form:{},
           	visible:false
           },
            multipleSelection: [],
            category:{}
			}
		},
		created(){
			this.findAllCategories();
		},
		methods:{
			// 查询左右栏目
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
      // 删除
			deleteCategory(id){
              this.$confirm("此操作竞永久删除这个栏目，是否确定？","提示",{
              	confirmButtonText:"确定",
              	cancelButtonText:"取消",
              	type:'warning'
              }).then(()=>{
              	let url='/manager/category/deleteCategoryById?id='+id;
              	axios.get(url)
                .then(({data:result})=>{
              	this.$notify({
              		title:"成功",
              		message:result.message,
              		type:"success"
              	});
              	// 刷新
               this.findAllCategories();
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
			closecategoryDialog(){
				this.categoryDialog.form={};
				this.categoryDialog.visible=false;
			},
			saveOrUpdateCategory(){
				let url='/manager/category/saveOrUpdateCategory';
            axios.post(url,this.categoryDialog.form).then(({data:result})=>{
              if(result.status==200){
              	// 关闭模态框
              	this.closecategoryDialog();
              	// 提示成功
              	this.$notify({
              		title:"成功",
              		message:result.message,
              		type:"success"
              	})
              	
              	// 刷新
               this.findAllCategories();
              }else{
              this.$notify({
              		title:"失败",
              		message:error,
              		type:"error"
              	})
              }
            }).catch((error)=>{
              alert("网络异常");
              // console.log(error);
            })
			},
			toAddCategory(){
				this.categoryDialog.title='添加栏目';
				this.categoryDialog.visible=true;

			},
      handleSelectionChange(val){
        console.log(val);
       this.multipleSelection = val; 
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
                let url='/manager/category/batchDeleteCategory';
                axios.post(url,obj)
                .then(({data:result})=>{
                this.$notify({
                  title:"成功",
                  message:result.message,
                  type:"success"
                });
                // 刷新
               this.findAllCategories();
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
      },
      // 修改栏目信息
      modifyCategory(row){
        // console.log(row);
        this.categoryDialog.visible=true;
        this.categoryDialog.form=row;
        // this.categoryDialog.form.parentId=row.parent.name;
        // console.log(row.parent.name);
      }

           
            
		}
	}
</script>
<style scoped>
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

</style>