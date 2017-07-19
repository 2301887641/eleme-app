<template>
  <div class="goods">
    <!--在vue中可以通过给标签加ref属性，就可以在js中利用ref去引用它，从而操作该dom元素-->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <!--这里需要判断currentIndex中时时返回的数字是否和goods中的下标index相等-->
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!--food-list-hook的意义仅仅是被js操作所以后面加上hook-->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <!--因为有父级所以也要拿到event-->
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!--关联某一个具体的商品 循环给每一个添加-->
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--让父组件可以访问子组件的方法  v-ref:Shopcart -->
    <Shopcart ref="shopEle" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import Shopcart from '@/components/shopcart/shopcart.vue'
  import Cartcontrol from '@/components/cartcontrol/cartcontrol.vue'
  import food from '@/components/food/food.vue'
  export default {
      props: {
          seller: {
              type: Object
          }
      },
      data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
      },
      components: {
          Shopcart, Cartcontrol, food
      },
      beforeCreate() {
        let _this = this
        this.$root.Eventbus.$on('increment', (target) => {
          _this._drop(target)
        })
      },
      created() {
         //        定义一个数组存放我们需要的class类
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        const _this = this
        this.$http.get('/api/goods').then(function (response) {
          if (response.data.errno === window.ERROR_OK) {
              _this.goods = response.data.data
              _this.$nextTick(() => {
                _this.initScroll()
                _this.calculateHeight()
              })
          }
        })
      },
    computed: {
          currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
              let height1 = this.listHeight[i]
              let height2 = this.listHeight[i + 1]
              if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                  return i
              }
          }
          return 0
          },
          selectFoods() {
              let foods = []
              this.goods.forEach((good) => {
                  good.foods.forEach((food) => {
                      if (food.count) {
                          foods.push(food)
                      }
                  })
              })
            return foods
          }
    },
    methods: {
      selectFood(food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
//        父类调用子类的方法
        this.$refs.food.show()
      },
      _drop(target) {
//          拿到子元素后 直接调用子元素的drop方法
        this.$refs.shopEle.drop(target)
      },
      selectMenu(index, event) {
        if (!event._constructed) {
            return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
//        滚动到指定元素
        this.foodsScroll.scrollToElement(el, 300)
      },
      initScroll() {
//          这里需要添加click:true才行,因为pc端点击事件会响应2次
        this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
            click: true
        })
        this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
//            时时检测滚动位置
            probeType: 3,
            click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      calculateHeight() {
//          通过refs获取绑定的dom后,再通过class获取它下面的所有food-list-hook元素
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
