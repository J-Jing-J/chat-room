<template>
  <div class="login">
    <input type="text" placeholder="请输入用户名" v-model="username"/>
    <button @click="handleEnterBtnClick">进入聊天室</button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup(props, ctx) {
    const username = ref('')
    const router = useRouter()

    onMounted(() => {
      username.value = localStorage.getItem('username')
      if(username.value) {
        router.push('/')
        return
      }
    })

    const handleEnterBtnClick = () => {
      const _username = username.value.trim()
      if(_username.length < 6) {
        alert('用户名不能小于六位')
      }
      localStorage.setItem('username', _username)
      username.value = ''
      router.push('/')
    }

    return {
      username,
      handleEnterBtnClick
    }
  }
}
</script>