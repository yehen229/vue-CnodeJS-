<template>
  <div class="home">
    <el-tabs v-model="tab" @tab-click="tabChanged">
      <el-tab-pane label="全部" name="all">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="精华" name="good">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="分享" name="share">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="问答" name="ask">
        <Content :list="list" />
      </el-tab-pane>
      <el-tab-pane label="招聘" name="job">
        <Content :list="list" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // 主页
  import Content from '@/components/Content.vue'
  import { getTopics } from '@/utils/api';
  import { setSession, getSession } from '@/utils/util' 

  export default {
    name: 'home',
    
    data() {
      return {
        page: 1,
        limit: 20,
        tab: 'all',
        list: [],
        store: {} //存储所有Tab对应的数据
      }
    },
    methods: {
      /*
        封装好的获取首页数据函数
      */
     getTopics() {
       getTopics({
         page: this.page,
         limit: this.limit,
         tab: this.tab,
       }).then((res) => {
        console.log(res);
         this.list = res.data;
         this.limit = this.limit + 10;
         const store = this.store;
         store[this.tab] = {
           limit: this.limit,
           data: res.data,
         };
       })
     },
      /*
        滚动函数，判断当前滚动条是否到达底部决定是否重新获取数据
      */
     scrollMethod() {
       const sumH = document.body.scrollHeight || document.documentElement.scrollHeight;
       const viewH = document.documentElement.clientHeight;
       const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
       if(viewH + scrollH >= sumH){
         this.getTopics();
       }
     },
     /*
        当前Tab变化时判断store是否已经存数据
        是： 拉出来，设置到state中
        否： 重新获取数据
     */
    tabChanged(){
      const store = this.store;
      setSession('activeTab',this.tab);
      //如果未存储当前Tab的数据，重新获取
      if(!store[this.tab]){
        this.limit = 20;
        this.list = [];
        this.getTopics();
        return;
      }
      this.list = store[this.tab].data;
      this.limit = store[this.tab].limit;
    }
    },
    /*
      在created狗子下面调用接口获取数据
    */
    created() {
      this.tab = getSession('activeTab') ? getSession('activeTab') : 'all';
      this.getTopics();
      window.addEventListener('scroll',this.scrollMethod);
    },
    /*
      组件被销毁的钩子：移除绑定的滚动事件
    */
    destroyed() {
      window.removeEventListener('scroll',this.scrollMethod)
    },
    components: {
      Content
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    margin: auto;
    width: 75%;
    padding: 20px 30px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }
</style>
