<template>
<div>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
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
</style>
