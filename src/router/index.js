import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
Vue.use(Router)

<<<<<<< HEAD
 const vrouter = new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
=======
export default new Router({
  routes: [
    {
>>>>>>> 02e8e0e0170988d9a146625f3c5822e56957a99e
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
<<<<<<< HEAD
  ],
  // 指定a链接被点击时的class名称 不使用别名
  linkActiveClass: 'active'
})

export default vrouter
=======
  ]
})
>>>>>>> 02e8e0e0170988d9a146625f3c5822e56957a99e
