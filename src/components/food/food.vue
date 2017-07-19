<template>
<div>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
      </div>

    </div>
  </transition>
</div>

</template>

<script type="text/ecmascript-6">
export default {
    props: {
        food: {
            type: Object
        }
    },
//    将变量放到data里面好观察变量的值
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
          this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      cursor:pointer
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: 20px
        color: #fff
</style>
