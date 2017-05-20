<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>

    </div>

</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
    export default {
        props: {
           size: {
               type: Number
           },
           score: {
               type: Number
           }
        },
      // Vue中computed就是 实时计算使用 Vue检测到数据发生变动时就会执行对相应数据有引用的函数
      computed: {
        starType() {
            return 'star-' + this.size
        },
        itemClasses() {
            let result = []
            // 向下取0.5倍数算法
            let score = Math.floor(this.score * 2) / 2
            let hasDecimal = score % 1 !== 0
            // 全星
            let integer = Math.floor(score)
            for (let i = 0; i < integer; i++) {
                // 先放全星
              result.push(CLS_ON)
            }
            // 然后放半星
            if (hasDecimal) {
              result.push(CLS_HALF)
            }
            // 最后剩余的都是没星的
            while (result.length < LENGTH) {
              result.push(CLS_OFF)
            }
            return result
        }
      }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .star
    font-size:0
    .star-item
      display:inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          magin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          magin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          magin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
