<template>
  <div class="cartcontrol">
    <transition name="move">
      <!--@click.stop.prevent 防止点击冒泡 影响其他-->
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
      <transition name="inner">
      <span class="inner icon-remove_circle_outline"></span>
      </transition>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object
            }
        },
      methods: {
            addCart() {
               if (!event._constructed) {
                   return
               }
//               当我们给一个观测对象添加一个它不存在的属性时,直接给这个属性赋值是不可以的
//              因为definePrototype是检测不到这个属性的,所以在新增和删除某个字段的时候,想让对象观察得到这个变化
//              需要使用vue的一个接口--vue.set() 这样这个变化就能被观察到
               if (!this.food.count) {
                   Vue.set(this.food, 'count', 1)
               } else {
                   this.food.count++
               }
              // 子组件通过 $emit触发父组件的方法 increment
              this.$root.Eventbus.$emit('increment', event.target)
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return
                }
                if (this.food.count) {
                    --this.food.count
                }
            }
        }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3d(0, 0, 0)
        animation: bounce-out .1s;
      .inner
          display: inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave-active
        opacity: 0
        transform  rotate(180deg)
        transform: translate3d(24px, 0, 0)
      .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
