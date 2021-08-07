<template>
  <div>
    <div class="topic" v-for="item in list" :key="item.id">
      <router-link :to="{ path: '/user/' + item.author.loginname }">
        <img :src="item.author.avatar_url | imgCheck"
          @error="imgErr(item.author.avatar_url)"
         alt="用户头像">
      </router-link>
      <span class="count">
        <em>{{ item.reply_count }}</em>/<em>{{ item.visit_count }}</em>
      </span>
      <el-tag :type="$tab[item.tab] && $tab[item.tab].type">
        {{ item.tab ? $tab[item.tab] && $tab[item.tab].name : '无分类'}}
      </el-tag>
      <router-link class="title" :to="{path: '/topic/' + item.id}">
        {{ item.title }}
      </router-link>
      <span class="time">
        {{
          $moment(item.last_reply_at, 'YYYY-MM-DD')
          .startOf('day')
          .fromNow()
        }}
      </span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Topics',
  props: ["list"],
  data() {
    return {
      article: [],
    };
  },
  methods: {
    imgErr(url) {
      console.log(url);
    },
  },
  filters: {
    imgCheck(url) {
      return url.replace(/avatars[0-9]/, "avatars");
    },
  },
};
</script>

<style lang="scss" scoped>
  .topic {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    span.count {
      width: 50px;
      text-align: center;
      em:first-child {
        font-size: 1.2em;
        color: lightcoral;
      }
      em:last-child {
        color: grey;
      }
    }
    .title {
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 0;
    }
    span.time {
      width: 70px;
      text-align: right;
    }
  }
</style>