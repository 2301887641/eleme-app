<template>
  <div id="app">
    <!--将ajax获取的seller传给vheader组件-->
    <vheader :seller="seller"></vheader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--路由中也可以传递属性-->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/header/header'
  import Vue from 'vue'
  // 错误状态码
  export default {
    components: {
      vheader: header
    },
    data() {
      return {
        seller: {}
      }
    },
    beforeCreate() {
        this.$root.Eventbus = new Vue()
    },
    created() {
      const _this = this
      this.$http.get('/api/seller').then(function (response) {
        if (response.data.errno === window.ERROR_OK) {
          _this.seller = response.data.data
        }
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
  // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
