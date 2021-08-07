<template>
    <div class="panel">
        <header>最近参与的话题</header>
        <Divider />
        <template v-for='item in user.recent_replies'>
            <div :key="item.id">
                <router-link v-if='simple' :to="{path: '/topic/' + item.id}">{{item.title}}</router-link>
                <div v-else class="main">
                    <div>
                        <router-link class="avatar" :to="{path: '/user/' + item.author.loginname}">
                            <img :src="item.author.avatar_url" alt="头像">
                        </router-link>
                        <router-link class="title" :to="{path: '/topic/' + item.id}">
                            {{ item.title }}
                        </router-link>
                    </div>
                    <span class="time">
                        {{$moment(item.last_reply_at,'YYYY-MM-DD')
                            .startOf('day')
                            .fromNow()
                        }}
                    </span>
                </div>
                <Divider class="inside-divider"/>
            </div>
        </template>
    </div>
</template>

<script>
    import bus from '@/utils/bus'
    import Divider from '@/components/Divider'
    export default {
        name: 'RecentReply',
        props: {
            simple: {
                default: true,
                type: Boolean
            }
        },
        data() {
            return {
                user: {}
            }
        },
        created() {
            bus.$on("user",data=>{
                this.user = data;
                console.log(this.user);
            })
        },
        components: {
            Divider
        }
    }
</script>

<style lang="scss" scoped>
    .panel {
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 20px;
        header {
            color: #000;
            font-weight: bold;
        }
        > div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .main {
                display: flex;
                justify-content: space-between;
                align-items: center;
                > div {
                    display: flex;
                    align-items: center;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 5px;
                        margin-right: 5px;
                    }
                    .avatar {
                        margin-left: 10px ;
                    }
                }
                .inside-divider {
                    margin: 10px 0;
                }
                .time {
                    float: right;
                    color: orangered;
                    font-size: 11px;
                }
            }
        }
        .divider {
            margin: 12px 0;
        }
    }
</style>