<template>
  <div class="db-rate">
      <div class="wrap">
        <span class="rate-bkg" ></span>
        <span class="rate" :style="{width:rate*10+'px'}"></span>
        <span class="number">{{rate}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'dbRate',
  data () {
    return {
      myshow:this.show
    };
  },
  watch:{

  },
  methods: {
  },
  props:['rate']
};
</script>

<style scoped>
.db-rate{
    width:130px;
    height:20px;
    padding-left:20px;
}
.wrap{
    position: relative;
}
.rate-bkg{
    display: inline-block;
    background:url('../img/rate.min.png') top no-repeat;
    background-size: 100px;
    height:22px;
    width:100px;
    vertical-align: middle;
}
.rate{
    position:absolute;
    background:url('../img/rate.min.png') top no-repeat;
    background-size: 100px;
    background-position: 0 -21px;
    height:22px;
    width:80px;
    top:0;
    left:0;
}
.number{
     vertical-align: middle;
    color:#ff9900;
}
</style>
