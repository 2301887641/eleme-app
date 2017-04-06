<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <!--这里的图片src前面要使用:才行,因为是异步获取的数据-->
        <img width="64"  height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
            <span class="icon"></span>
            <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
 export default {
     props: {
         seller: {
             type: Object
         }
     }
 }
</script>

<style>
    .header{
      color:#fff;
      background:#000;
    }

</style>
