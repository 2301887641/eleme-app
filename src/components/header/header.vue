<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <!--这里的图片src前面要使用:才行,因为是异步获取的数据-->
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达



        </div>
        <div class="support" v-if="seller.supports">
          <!--添加动态class 这样两个class会合并-->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
//     使用props接收传过来的seller
    props: {
      seller: {
        type: Object
      }
    },
    created() {
//        定义一个数组存放我们需要的class类
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style>
  .header {
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
  }

  .header .content-wrapper {
    padding: 24px 12px 18px 24px;
    position: relative;
    /*将父元素的字体大小设为0 取消里面的空白间距*/
    font-size: 0;
  }

  .header .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .header .avatar img {
    border-radius: 2px;
  }

  .header .content {
    display: inline-block;
    /*这样才能正确的设置距离左边的间距*/
    margin-left: 16px;
  }

  .header .content .title {
    margin: 2px 0 8px 0;
  }

  .header .content .title .brand {
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: top;
    background: url("./brand@2x.png");
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }

  .header .content .title .name {
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }

  body, html {
    line-height: 1;
    font-weight: 200;
    font-family: "PingFang SC", 'STHeitiSc-Light', 'Helvetica-Light', Arial, sans-serif;
  }

  .header .content .description {
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }

  .header .content .support .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .header .content .support .decrease {
    background: url("./decrease_1@2x.png");
  }

  .header .content .support .discount {
    background: url("./discount_1@2x.png");
  }

  .header .content .support .guarantee {
    background: url("./guarantee_1@2x.png");
  }

  .header .content .support .invoice {
    background: url("./invoice_1@2x.png");
  }

  .header .content .support .special {
    background: url("./special_1@2x.png");
  }

  .header .content .support .text {
    line-height: 12px;
    font-size: 10px;
  }

  .header .content-wrapper .support-count {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .header .content-wrapper .support-count .count {
    vertical-align: top;
    font-size: 10px;
  }

  .header .content-wrapper .support-count .icon-keyboard_arrow_right {
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
    content: "\e909";
  }

  .header .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.2);
  }

  .header .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
  bg-image('bulletin') background-size: 22 px 12 px;  //------------------
    background-repeat: no-repeat;
  }

  .header .bulletin-wrapper .bulletin-title .bulletin-text{
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
  }

  .icon-keyboard_arrow_right{
    position: absolute;
    font-size:10px;
    right:12px;
    top:8px;
  }


  /*设备像素比为3的*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .header .content .title .brand {
      background: url("./brand@3x.png");
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .header .content .title .brand {
      background: url("./brand@2x.png");
    }
  }

  /*decrease*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .header .content .support .decrease {
      background: url("./decrease_1@3x.png");

    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .header .content .support .decrease {
      background: url("./decrease_1@2x.png");
    }
  }

  /*discount*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .header .content .support .discount {
      background: url("./discount_1@3x.png");

    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .header .content .support .discount {
      background: url("./discount_1@2x.png");
    }
  }

  /*guarantee*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .header .content .support .guarantee {
      background: url("./guarantee_1@3x.png");

    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .header .content .support .guarantee {
      background: url("./guarantee_1@2x.png");
    }
  }

  /*invoice*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .header .content .support .invoice {
      background: url("./invoice_1@3x.png");

    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .header .content .support .invoice {
      background: url("./invoice_1@2x.png");
    }
  }

  /*special*/
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
    .header .content .support .special {
      background: url("./special_1@3x.png");

    }
  }

  @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
    .header .content .support .special {
      background: url("./special_1@2x.png");
    }
  }


</style>
