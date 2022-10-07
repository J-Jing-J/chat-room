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

const ws = new WebSocket('ws://localhost:8000')


export default {
  name: 'Home',
  data () {
    return {
      message: '',
      username: '',
      messageList: []
    }
  },
  mounted () {
    this.username = localStorage.getItem('username')
    if(!this.username) {
      this.$router.push('/login')
      return;
    }

    // bind 是因为：绑定后函数的 this 指向 ws（谁绑定指向谁）
    // 需要绑成 vue 实例的 this
    ws.addEventListener('open', this.handleWsOpen.bind(this), false)
    ws.addEventListener('close', this.handleWsClose.bind(this), false)
    ws.addEventListener('error', this.handleWsError.bind(this), false)
    ws.addEventListener('message', this.handleWsMessage.bind(this), false)
  },
  methods: {
    handleSendBtnClick() {
      const msg = this.message
      if(!msg.trim().length) {
        return;
      }
      ws.send(JSON.stringify({
        id: new Date().getTime(),
        user: this.username,
        dateTime: new Date().getTime(),
        msg: this.message,
      }))
      this.message = ''
    },

    handleWsOpen(e){
      console.log('open');
    },
    handleWsClose(e) {
      console.log('close');
    },
    handleWsError(e) {
      console.log('error');
    },
    handleWsMessage(e) {
      console.log('message');
      const message = JSON.parse(e.data)
      this.messageList.push(message)
    }
  }
}
</script>
