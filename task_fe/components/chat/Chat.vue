<template>
  <div
    class="z-20 fixed left-0 md:left-auto md:right-0 top-0 mt-16 md:mx-2 w-full md:max-width"
  >
    <div class="flex flex-col items-stretch shadow-md rounded-md">
      <div
        :class="{ 'rounded-b-md': !open }"
        class="bg-green-600 text-white cursor-pointer px-4 py-1 flex w-full justify-between"
        @click="open = !open"
      >
        <span class="text-lg">Chat...</span>
        <span>({{ messages.length }})</span>
      </div>
      <div v-if="open" class="border rounded-b-md p-4 space-y-4 bg-white">
        <div ref="wrapper" class="overflow-y-scroll chat-wrapper">
          <div v-for="(msg, idx) in messages" :key="idx" class="p-4 text-white">
            <div
              v-if="msg.in"
              class="rounded-xl bg-green-600 w-40 py-2 px-2 mr-auto"
            >
              <div class="text-xs text-gray-400 text-left">
                {{ msg.date.format('DD/MM/YYYY HH:mm') }}
              </div>
              {{ msg.txt }}
            </div>
            <div
              v-else-if="msg.out"
              class="rounded-xl bg-blue-600 w-40 py-2 px-2 ml-auto"
            >
              <div class="text-xs text-gray-400 text-right">
                {{ msg.date.format('DD/MM/YYYY HH:mm') }}
              </div>
              {{ msg.txt }}
            </div>
          </div>
        </div>
        <div>
          <form action="#" @submit.prevent="onSubmit">
            <input
              v-model="message"
              type="text"
              name="msg"
              class="border rounded-md w-full px-1 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Write your message..."
              autocomplete="off"
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const io = require('socket.io-client')
export default {
  data () {
    return {
      open: false,
      message: '',
      messages: [],
      socket: null
    }
  },
  mounted () {
    this.socket = io('http://localhost:3001', { forceNew: true })
    this.socket.on('message', (msg) => {
      this.addMessage({ txt: msg, date: this.$moment(), in: true })
    })
  },
  methods: {
    scrollToBottom () {
      this.$refs.wrapper.scrollTop = 99999999999
    },
    addMessage (msg) {
      this.messages.push(msg)
      this.message = ''
      this.$nextTick(this.scrollToBottom)
    },
    onSubmit () {
      const txt = this.message.trim()
      if (!txt) {
        return
      }
      this.socket.emit('message', txt)
      this.addMessage({ txt, date: this.$moment(), out: true })
    }
  }
}
</script>

<style>
@responsive {
  .max-width {
    width: 23rem;
  }
}
.chat-wrapper {
  height: 60vh;
}
</style>
