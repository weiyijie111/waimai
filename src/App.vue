<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
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
    <keep-alive><router-view></router-view></keep-alive>
    
     <!-- <v-foot id="foot"></v-foot> -->
  </div>

   
</template>

<script>
  import Header from './components/header/Header.vue'

  // import Foot from './components/foot/Foot.vue'

  export default {
    components:{
      'v-header':Header,
      // 'v-foot':Foot
    }
  }
</script>

<style lang="less" scoped>
  #app .tab{
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    .tab-item{
      flex:1;
      text-align: center;
      & > a{
        font-size:0.28rem;
        display: block;
        color:#666;
        &.active{
          color:#ff7300;
        }
      }
    }
  }
</style>
