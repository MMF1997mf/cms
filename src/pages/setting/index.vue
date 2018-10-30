<template>
	<div class="setting">
		<ul class="setting-nav">
			<li :class="{current:currentRoute='/setting/info'}">
				<router-link to='/setting/info'>基础设置</router-link>
			</li>
			<li :class="{current:currentRoute='/setting/audh'}">
				<router-link to='/setting/audh'>权限设置</router-link>
			</li>
			<li :class="{current:currentRoute='/setting/adv'}">
				<router-link to='/setting/adv'>广告设置</router-link>
			</li>
		</ul>
		<div class="setting-content">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
            currentRoute:'/setting/info'
			}
		},
		mounted(){
            this.$router.push(this.currentRoute);
		},
		watch:{
			'$route':function(to,from){
				this.currentRoute=to.path;
			}
		},
		methods:{

		}
	}
</script>
<style>
.setting-nav{
	height:30px;
	line-height: 30px;
	border-bottom: .5px solid #f0f0f0;

}
.current{
border-bottom:2px solid lightblue;
}
.setting-nav >li{
float: left;
width: 120px;
text-align: center;

}
.setting-content{
	padding:0.5em 0;
}
</style>