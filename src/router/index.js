import Vue from 'vue'
import Router from 'vue-router'
import Category from '@/pages/Category'
import User from '@/pages/User'
import Article from '@/pages/Article'
import Setting from '@/pages/Setting'
import SettingInfo from '@/pages/Setting/info'
import SettingAudh from '@/pages/Setting/audh'
import SettingAdv from '@/pages/Setting/adv'
import Head from '@/pages/Head'

Vue.use(Router)

export default new Router({
  routes: [
    {
       path:'/Category',
       component:Category
    },
    {
       path:'/User',
       component:User
    },
    {
       path:'/Article',
       component:Article
    },{
       path:'/Head',
       component:Head
    },
     {
       path:'/Setting',
       component:Setting,
       children:[{
       	path:'Info',  
       	// setting/info ->SettingInfo
       component:SettingInfo
       },
       {
       	path:'Audh',  
       component:SettingAudh
       },
       {
       	path:'Adv',  	
       component:SettingAdv
       }]
    }
  ]
})
