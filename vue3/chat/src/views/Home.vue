<template>
  <div class="home">
    <ul>
      <li v-for="item of messageList" :key="item.id">
        <p>
          <span>{{ item.user }}</span>
          <span>{{ new Date(item.dateTime) }}</span>
        </p>
        <p>消息：{{ item.msg }}</p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息" v-model="message"/>
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useWebsocket } from '../hooks'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const ws = useWebsocket(handleMessage)
    const state = reactive({
      message: '',
      messageList: [],
    })

    let username = '' 
    onMounted(() => {
      username = localStorage.getItem('username')
      if(!username) {
        router.push('/login')
      }
    })

    const handleSendBtnClick = () => {
      const _message = state.message
      if(!_message.trim().length) {
        return
      }

      ws.send(JSON.stringify({
        id: new Date().getTime(),
        user: username,
        dateTime: new Date().getTime(),
        msg: state.message,
      }))

      state.message = ''
    }

    function handleMessage (e) {
      const _message = JSON.parse(e.data)
      state.messageList.push(_message)
    }
    
    return {
      ...toRefs(state),
      handleSendBtnClick
    }
  }
}
</script>
