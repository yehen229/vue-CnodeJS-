<template>
  <div class="panel">
    <header>最近创建的话题</header>
    <Divider class="divider" />
    <template v-for="item in user.recent_topics">
      <div :key="item.id">
        <router-link v-if='simple' :to="{path: '/topic/' + item.id}">{{item.title}}</router-link>
        <div v-else class="main">
          <div>
            <router-link
              class="avatar"
              :to="{ path: '/user/' + user.loginname }"
            >
              <img :src="user.avatar_url" alt="用户头像" />
            </router-link>
            <router-link class="title" :to="{ path: '/topic/' + item.id }">
              {{ item.title }}
            </router-link>
          </div>
          <span class="time">
            {{
              $moment(item.last_reply_at, "YYYY-MM-DD").startOf("day").fromNow()
            }}
          </span>
        </div>
        <Divider class="inside-divider" />
      </div>
    </template>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import Divider from "@/components/Divider";
export default {
  name: "OtherTopic",
  props: {
    simple: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    bus.$on("user", (data) => {
      this.user = data;
    });
  },
  components: {
    Divider,
  },
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  header {
    color: black;
    font-weight: bold;
  }
  > div {
    .main {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        .avatar {
          margin-left: 10px;
          img {
            width: 30px;
            height: 30px;
            border-radius: 3px;
            margin-right: 5px;
          }
        }
        .time {
          float: right;
          font-size: 11px;
          color: orangered;
        }
      }
    }
    .inside-divider {
      margin: 10px 0;
    }
  }
  .divider {
      margin: 10px 0;
  }
}
</style>