<template>
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item @click="logout">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import { recordRoute } from '@/config'
  import { DownOutlined } from '@ant-design/icons-vue'
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  export default {
    name: 'VabAvatar',
    components: { DownOutlined },
    setup() {
      const store = useStore()

      const logout = async () => {
        await this.$store.dispatch('user/logout')
        if (recordRoute) {
          const fullPath = this.$route.fullPath
          this.$router.push(`/login?redirect=${fullPath}`)
        } else {
          this.$router.push('/login')
        }
          this.$router.push('/login')

      }

      const buy = () => {
        window.open('http://vue-admin-beautiful.com/authorization/')
      }

      return {
        avatar: computed(() => store.getters['user/avatar']),
        username: computed(() => store.getters['user/username']),
        logout,
        buy,
      }
    },
  }
</script>
<style lang="less">
  .vab-avatar {
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      color: #fff;
      cursor: pointer;
    }
  }
  .ant-layout-sider-children {
    background: #001529;
  }
</style>
