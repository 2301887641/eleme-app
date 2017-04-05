<template>
  <div id="app">
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
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    import vheader from './components/header/header.vue'
    export default {
        components: {
            vheader
        }
    }
    this.$http.get('/goods').then(function (response) {
        console.log(response)
    })
</script>

<style>
  a{
    text-decoration:none;
  }
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-color:red;
    position: relative;
  }
  .tab:after{
    display:block;
    position:absolute;
    left:0;
    bottom:0;
    border-top:1px solid rgba(7,17,27,0.1);
    content: ' ';
    width:100%;
  }

  .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab-item a{
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
  .tab-item a.active{
    color: rgb(240, 20, 20);
  }
   /* 缩放 */
  @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
    .border-1px::after{
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
    .border-1px::after{
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }

</style>
